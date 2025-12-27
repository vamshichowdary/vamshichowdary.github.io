import { b as createAstro, c as createComponent, m as maybeRenderHead, a as renderTemplate, e as addAttribute, r as renderComponent } from '../chunks/astro/server_tAbQYW0s.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_2DIUivu6.mjs';
import { $ as $$Layout, a as $$Header, d as SOCIALS, e as $$Socials, c as $$Footer } from '../chunks/Footer_Ca244hjI.mjs';
import 'clsx';
import { $ as $$PostCard } from '../chunks/PostCard_Oux-E6Xa.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://vamshichowdary.github.io/");
const $$ExperienceCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ExperienceCard;
  const { title, company, date, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="mb-6 ms-4 group"> <div class="absolute w-3 h-3 bg-accent rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900"></div> <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">${date}</time> <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${company}</h3> <h4 class="text-md font-normal text-gray-700 dark:text-gray-300 group-hover:mb-2 transition-all">${title}</h4> ${description && renderTemplate`<div class="max-h-0 overflow-hidden group-hover:max-h-96 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"> <ul class="list-disc list-inside text-sm font-normal text-gray-600 dark:text-gray-400"> ${description.map((item) => renderTemplate`<li>${item}</li>`)} </ul> </div>`} </li>`;
}, "/Users/vamshichowdary/github/vamshichowdary.github.io/src/components/ExperienceCard.astro", void 0);

const $$Astro = createAstro("https://vamshichowdary.github.io/");
const $$PublicationCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PublicationCard;
  const { title, authors, venue, paperUrl, codeUrl, thumbnail } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col sm:flex-row gap-4 mb-8"> <div class="w-full sm:w-48 shrink-0"> ${thumbnail ? renderTemplate`<img${addAttribute(thumbnail, "src")}${addAttribute(title, "alt")} class="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700 hover:opacity-90 transition-opacity">` : renderTemplate`<div class="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700"> <span class="text-xs text-gray-400">No Image</span> </div>`} </div> <div class="flex-grow"> <h3 class="text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-2"> ${paperUrl ? renderTemplate`<a${addAttribute(paperUrl, "href")} target="_blank" rel="noopener noreferrer" class="hover:text-accent hover:underline decoration-dashed underline-offset-4"> ${title} </a>` : title} </h3> <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">${authors}</p> <p class="text-sm italic text-gray-500 dark:text-gray-400 mb-2">${venue}</p> <div class="flex gap-3 text-sm"> ${paperUrl && renderTemplate`<a${addAttribute(paperUrl, "href")} target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">
[Paper]
</a>`} ${codeUrl && renderTemplate`<a${addAttribute(codeUrl, "href")} target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">
[Code]
</a>`} </div> </div> </div>`;
}, "/Users/vamshichowdary/github/vamshichowdary.github.io/src/components/PublicationCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main id="main-content" data-layout="index"> <div class="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-12 gap-12"> <!-- Left Sidebar (Profile + CV) - Takes 4/12 columns --> <div class="md:col-span-4 space-y-12"> <!-- Profile Header --> <div class="flex flex-col items-center space-y-4"> <img src="/assets/images/profile.JPG" alt="Profile Image" class="w-48 h-48 rounded-full border-4 border-white dark:border-gray-900 shadow-lg object-cover shrink-0"> ${SOCIALS.length > 0 && renderTemplate`<div class="flex flex-wrap justify-center gap-2"> ${renderComponent($$result2, "Socials", $$Socials, {})} </div>`} <div class="text-center"> <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">vamchowdary72[at]gmail</p> </div> </div> <hr class="border-gray-200 dark:border-gray-700"> <!-- Education in Sidebar --> <section id="education"> <h2 class="text-lg font-bold tracking-wide mb-4 uppercase text-gray-800 dark:text-gray-200">Education</h2> <ol class="relative border-s border-gray-200 dark:border-gray-700 ms-3 space-y-6"> ${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { "date": "2021-Present", "title": "PhD", "company": "UCSB", "description": [
    "Understanding and designing DNN architectures from approximation theoretic perspective, with focus on efficincy and provable generalization.",
    "Advisor: Prof. Shivkumar Chandrasekaran"
  ] })} ${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { "date": "2019-2021", "title": "Masters", "company": "UCSB", "description": [
    "Thesis: A study of generalization in deep neural networks",
    "GPA: 4.0/4.0"
  ] })} ${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { "date": "2012-2016", "title": "Bachelors in ECE", "company": "IIT Roorkee", "description": [
    "Thesis: Low-cost display devices using nanoparticles",
    "Advisors: Prof. Brijesh Kumar and Prof. Sanjeev Manhas",
    "GPA: 8.09/10.0"
  ] })} </ol> </section> <hr class="border-gray-200 dark:border-gray-700"> <!-- Experience in Sidebar --> <section id="experience"> <h2 class="text-lg font-bold tracking-wide mb-4 uppercase text-gray-800 dark:text-gray-200">Experience</h2> <ol class="relative border-s border-gray-200 dark:border-gray-700 ms-3 space-y-8"> ${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { "date": "Summer 2025", "title": "Applied Scientist Intern", "company": "Amazon AGI", "description": [
    "Trained a novel Mixture of Experts (MoE) architecture to reduce inter-node communication costs."
  ] })} ${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { "date": "Jan 2024-Sep 2024", "title": "ML Researcher", "company": "Stealth startup", "description": [
    "Part of the founding team, I led groundwork and architectural setup for ML based solutions, developing Vision, NLP, and speech-based models for tasks in the supply chain industry."
  ] })} ${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { "date": "Summer 2022", "title": "Software Intern", "company": "Apple", "description": [
    "Developed physics based algorithms to improve the Fall Detection feature. Created data processing pipelines to efficiently handle hundreds of hours of time series data."
  ] })} ${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { "date": "2020 - 2021", "title": "Grad Researcher", "company": "UCSF", "description": [
    "Developed Medviz - an AWS web portal and visualization tool for deploying machine learning models for processing of large PET/MRI datasets."
  ] })} ${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { "date": "Summer 2020", "title": "ML Intern", "company": "Briteseed", "description": [
    "Trained CNNs on hyperspectral image data from surgical tools to detect tissues."
  ] })} ${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { "date": "2016 - 2019", "title": "Engineer", "company": "Samsung Research", "description": [
    "Music Information Retrieval (MIR)."
  ] })} ${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { "date": "Summer 2015", "title": "Embedded Intern", "company": "VIOS Medical", "description": [
    "Characterized different wireless modules for energy consumption and connectivity.",
    "Developed software packaging and Linux distribution tools."
  ] })} </ol> </section> </div> <!-- Right Main Content (Intro + Publications) - Takes 8/12 columns --> <div class="md:col-span-8 space-y-12"> <!-- Intro Section --> <section id="intro" class="prose dark:prose-invert max-w-none text-lg leading-relaxed"> <p>
I am a fifth year PhD student at University of California Santa Barbara (UCSB), advised by <a href="http://scg.ece.ucsb.edu/people.html">Shiv Chandrasekaran</a>.
</p> <p>
My PhD thesis focusses on approximation theoretic approaches to design neural network architectures that are efficient and have robust generalization. My most recent work involves efficient neural network based solvers for PDEs.
</p> </section> <hr class="border-gray-200 dark:border-gray-700"> <!-- Posts Section --> <section id="posts"> <h2 class="text-2xl font-bold tracking-wide mb-8 uppercase text-gray-900 dark:text-white border-b-2 border-accent inline-block pb-1">Posts</h2> ${sortedPosts.length > 0 ? sortedPosts.map(({ data, id }) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "href": `/posts/${id}`, "frontmatter": data })}`) : renderTemplate`<p class="text-gray-500 italic">No posts yet.</p>`} </section> <hr class="border-gray-200 dark:border-gray-700"> <!-- Publications --> <section id="publications"> <h2 class="text-2xl font-bold tracking-wide mb-8 uppercase text-gray-900 dark:text-white border-b-2 border-accent inline-block pb-1">Publications</h2> ${renderComponent($$result2, "PublicationCard", $$PublicationCard, { "title": "MNO: A Multi-modal Neural Operator for Parametric Nonlinear BVPs", "authors": "Vamshi C Madala, N Govindarajan, S Chandrasekaran", "venue": "AAAI Workshop on AI to Accelerate Science and Engineering (AI2ASE), 2026", "paperUrl": "https://arxiv.org/abs/2507.11870", "codeUrl": "https://github.com/vamshichowdary/MultimodalNeuralOperator", "thumbnail": "/assets/images/publications/fmm_block.png" })} ${renderComponent($$result2, "PublicationCard", $$PublicationCard, { "title": "CNNs Avoid the Curse of Dimensionality by Learning on Patches", "authors": "Vamshi C Madala, S Chandrasekaran, J Bunk", "venue": "IEEE Open Journal of Signal Processing, vol. 4, pp. 233-241, 2023", "paperUrl": "https://ieeexplore.ieee.org/abstract/document/10107763", "codeUrl": "https://github.com/vamshichowdary/cod-cnn", "thumbnail": "/assets/images/publications/cod_cnn.png" })} ${renderComponent($$result2, "PublicationCard", $$PublicationCard, { "title": "Understanding and Visualizing Generalization in UNets", "authors": "A Rajagopal, Vamshi C Madala, T.A Hope, P Larson", "venue": "Proceedings of the Fourth Conference on Medical Imaging with Deep Learning, 2021", "paperUrl": "https://proceedings.mlr.press/v143/rajagopal21a.html", "codeUrl": "https://gitlab.com/abhe/UNet-Generalization_MIDL2021", "thumbnail": "/assets/images/publications/midl.jpg" })} ${renderComponent($$result2, "PublicationCard", $$PublicationCard, { "title": "Predicting Generalization in Deep Learning via Local Measures of Distortion", "authors": "A Rajagopal, Vamshi C Madala, S Chandrasekaran, P Larson", "venue": "arXiv preprint arXiv:2012.06969, 2020", "paperUrl": "https://arxiv.org/abs/2012.06969", "thumbnail": "/assets/images/publications/cluster.jpg" })} ${renderComponent($$result2, "PublicationCard", $$PublicationCard, { "title": "A Study of Generalization in Deep Neural Networks", "authors": "Vamshi C Madala", "venue": "Master's Thesis, University of California, Santa Barbara, 2021", "paperUrl": "https://www.proquest.com/dissertations-theses/study-generalization-deep-neural-networks/docview/2604320736/se-2?accountid=14522", "thumbnail": "/assets/images/publications/ms.jpg" })} </section> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/index.astro", void 0);

const $$file = "/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
