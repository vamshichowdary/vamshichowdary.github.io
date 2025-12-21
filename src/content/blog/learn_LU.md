---
title: "Learn LU"
description: "Learn LU factorization of linear operators using gradient descent."
pubDatetime: 2025-12-21
tags: ["general"]
---

In our previous work \[1\], we introduced the GFMM-block, which is a generalized parameterization of the Fast Multipole Method's (FMM) matrix-vector computational graph. We showed that gradient descent can be used to learn FMM-like representations of (inverses of) linear operators instead of relying on hand-crafted FMM construction algorithms. This is useful when the operator structures are complex and the construction of FMM is unknown for certain operators. Moreover, the parameterization is efficient in the number of required parameters compared to a fully dense representation of the operator.

In this post, I want to extend this idea further to explore the possibility of ***learning*** the factorizations of linear operators, specifically the LU factorization. Previous work \[2\] tried to achieve this with gradient descent by representing L and U as dense linear layers and masking the upper and lower triangular parts of the learnable weight matrices, which is not an efficient parameterization. Inspired by the GFMM-block, we can actually represent L and U more compactly and thus save on memory as well as compute complexity. This could be useful for large $N \times N$ matrices, as the GFMM-block representation is only $O(N)$ in the number of parameters.

The rest of the post is structured as follows: 
1. GFMM-block : I will describe the GFMM-block and how it can be also used to represent block-lower and block-upper triangular matrices.
1. Training to factorize: There are some tricks that I used to improve the training - transpose loss, block-wise training.
1. Examples: Numerical examples of LU factorization of 1D discrete Laplacian, 1D and 2D, convection diffusion, 1D and 2D biharmonic operators and dense but low-rank covariance matrix of RBF kernel.
1. Thoughts: I will discuss the limitations of the current approach and some thoughts about future work.


I want to take a moment here to introduce the FMM representation. Consider, for example, an exponential covariance matrix $A$ defined as $A_{i,j} = \rho^{|i-j|}$ where $0 < \rho < 1$. This matrix appears frequently in ML applications (Gaussian Processes with exponential kernels) and [Physics](https://en.wikipedia.org/wiki/Ornstein%E2%80%93Uhlenbeck_process). This is a fully dense matrix. But if we $2\times2$ block-partition it and observe the $\color{orange}\text{off-diagonal blocks}$, we notice that they are actually rank-1. See an $8 \times 8$ example below.

$$
\left[
\begin{array}{c|c}
  \color{gray}
  \begin{matrix}
    1 & 0.5 & 0.25 & 0.12 \\
    0.5 & 1 & 0.5 & 0.25 \\
    0.25 & 0.5 & 1 & 0.5 \\
    0.12 & 0.25 & 0.5 & 1
  \end{matrix}
  & 
  \colorbox{#ff000033}{$
  \color{orange}
  \begin{matrix} 
    0.06 & 0.03 & 0.01 & 0.00 \\
    0.12 & 0.06 & 0.03 & 0.01 \\
    0.25 & 0.12 & 0.06 & 0.03 \\
    0.50 & 0.25 & 0.12 & 0.06 
  \end{matrix} 
  $} 
  \\
  \hline
  \color{orange}
  \begin{matrix}
    0.06 & 0.12 & 0.25 & 0.50 \\
    0.03 & 0.06 & 0.12 & 0.25 \\
    0.01 & 0.03 & 0.06 & 0.12 \\
    0.00 & 0.01 & 0.03 & 0.06
  \end{matrix}
  &
  \color{gray}
  \begin{matrix}
    1 & 0.5 & 0.25 & 0.12 \\
    0.5 & 1 & 0.5 & 0.25 \\
    0.25 & 0.5 & 1 & 0.5 \\
    0.12 & 0.25 & 0.5 & 1
  \end{matrix}
\end{array}
\right]
\begin{array}{l}
  \color{orange} \xrightarrow{\quad \text{SVD} \quad} 
  \underbrace{\begin{bmatrix} 0.125 \\ 0.25 \\ 0.5 \\ 1 \end{bmatrix}}_{U} \cdot 
  \underbrace{[0.5]}_{D} \cdot 
  \underbrace{\begin{bmatrix} 1 & 0.5 & 0.25 & 0.125 \end{bmatrix}}_{V^T}
  \\
  \phantom{
    \begin{matrix}
    1 & 0.5 & 0.25 & 0.12 \\
    0.5 & 1 & 0.5 & 0.25 \\
    0.25 & 0.5 & 1 & 0.5 \\
    0.12 & 0.25 & 0.5 & 1
    \end{matrix}
  }
\end{array}
$$
Thus we can compactly represent the above matrix as
$$
\left[
\begin{array}{c|c}
%\begin{matrix}
    B_{11} & U_{1} B_{12} V^{T}_{2} \\
\hline
    U_{2} B_{21} V^{T}_{1} & B_{22} \\
%  \end{matrix}
\end{array}
\right]
$$

We can actually do even better, by recursively partitioning the diagonal blocks like this:
$$
\left[
\begin{array}{c|c}
  \begin{array}{c|c}
    \color{gray} \begin{matrix} 1 & 0.5 \\ 0.5 & 1 \end{matrix} & 
    \color{yellow}\begin{matrix} 0.25 & 0.125 \\ 0.5 & 0.25 \end{matrix} \\
    \hline
    \color{yellow}\begin{matrix} 0.25 & 0.5 \\ 0.12 & 0.25 \end{matrix} & 
    \color{gray}\begin{matrix} 1 & 0.5 \\ 0.5 & 1 \end{matrix}
  \end{array}
  & 
 \color{orange}
  \begin{matrix} 
    0.06 & 0.03 & 0.01 & 0.00 \\
    0.12 & 0.06 & 0.03 & 0.01 \\
    0.25 & 0.12 & 0.06 & 0.03 \\
    0.50 & 0.25 & 0.12 & 0.06 
  \end{matrix} 
  \\
  \hline
 \color{orange}
  \begin{matrix}
    0.06 & 0.12 & 0.25 & 0.50 \\
    0.03 & 0.06 & 0.12 & 0.25 \\
    0.01 & 0.03 & 0.06 & 0.12 \\
    0.00 & 0.01 & 0.03 & 0.06
  \end{matrix}
  &
  \begin{array}{c|c}
    \color{gray} \begin{matrix} 1 & 0.5 \\ 0.5 & 1 \end{matrix} & 
    \color{yellow}\begin{matrix} 0.25 & 0.125 \\ 0.5 & 0.25 \end{matrix} \\
    \hline
    \color{yellow}\begin{matrix} 0.25 & 0.5 \\ 0.12 & 0.25 \end{matrix} & 
    \color{gray}\begin{matrix} 1 & 0.5 \\ 0.5 & 1 \end{matrix}
  \end{array}
\end{array}
\right]

\rightarrow
\left[
\begin{array}{c|c}
  \begin{array}{c|c}
    \color{gray} B^2_{11} & 
    \color{yellow} U^2_{1} B^2_{12} V^{2^T}_{2} \\
    \hline
    \color{yellow} U^2_{2} B^2_{21} V^{2^T}_{1} & 
    \color{gray} B^2_{22}
  \end{array}
  & 
 \color{orange}
  U^1_{1} B^1_{12} V^{1^T}_{2} 
  \\
  \hline
 \color{orange}
  U^1_{2} B^1_{21} V^{1^T}_{1}
  &
  \begin{array}{c|c}
    \color{gray} B^2_{33} & 
    \color{yellow} U^2_{3} B^2_{34} V^{2^T}_{4} \\
    \hline
    \color{yellow} U^2_{4} B^2_{43} V^{2^T}_{3} & 
    \color{gray} B^2_{44}
  \end{array}
\end{array}
\right]
$$
and obtaining the low-rank representations of the level-2 off-diagonal blocks (and denoted by super-scripts).

[See here for more such rank-structured matrix examples](https://scg.ece.ucsb.edu/publications/theses/Lyons_2005_Thesis.pdf).