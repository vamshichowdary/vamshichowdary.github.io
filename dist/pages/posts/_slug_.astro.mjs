import { b as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_tAbQYW0s.mjs';
import 'piccolore';
import { r as renderEntry, g as getCollection } from '../../chunks/_astro_content_2DIUivu6.mjs';
import { $ as $$Layout, a as $$Header, c as $$Footer } from '../../chunks/Footer_Ca244hjI.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://vamshichowdary.github.io/");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { post } = Astro2.props;
  const { title, description, pubDatetime, codeUrl } = post.data;
  const { Content, headings } = await renderEntry(post);
  const tocHeadings = headings.filter(
    (h) => (h.depth === 2 || h.depth === 3) && h.text.toLowerCase() !== "footnotes"
  );
  const formattedDate = pubDatetime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="distill-article"> ${renderComponent($$result2, "Header", $$Header, {})} <!-- Reading Progress Bar --> <div class="reading-progress" id="reading-progress"></div> <!-- Article Header --> <header class="distill-header"> <h1 class="distill-title">${title}</h1> ${description && renderTemplate`<p class="distill-description">${description}</p>`} <div class="distill-meta"> <div class="distill-meta-item"> <span class="distill-meta-label">Published</span> <time${addAttribute(pubDatetime.toISOString(), "datetime")}>${formattedDate}</time> </div> ${codeUrl && renderTemplate`<div class="distill-meta-item"> <span class="distill-meta-label">Code</span> <a${addAttribute(codeUrl, "href")} target="_blank" rel="noopener noreferrer" class="code-link" style="color: var(--accent);"> ${codeUrl} </a> </div>`} </div> </header> <!-- Main Content with TOC --> <div class="distill-wrapper"> <!-- Desktop Table of Contents --> ${tocHeadings.length > 0 && renderTemplate`<aside class="distill-toc"> <div class="distill-toc-title">Contents</div> <ul class="distill-toc-list"> ${tocHeadings.map((heading) => renderTemplate`<li> <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute(heading.depth === 3 ? "toc-level-3" : "", "class")}> ${heading.text} </a> </li>`)} </ul> </aside>`} <!-- Article Content --> <main id="main-content" class="distill-content"> <!-- Mobile Table of Contents --> ${tocHeadings.length > 0 && renderTemplate`<details class="distill-mobile-toc"> <summary>Table of Contents</summary> <ul class="distill-toc-list"> ${tocHeadings.map((heading) => renderTemplate`<li> <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute(heading.depth === 3 ? "toc-level-3" : "", "class")}> ${heading.text} </a> </li>`)} </ul> </details>`} ${renderComponent($$result2, "Content", Content, {})} </main> </div> ${renderComponent($$result2, "Footer", $$Footer, {})} </div> ` })} ${renderScript($$result, "/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/posts/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/posts/[slug].astro", void 0);

const $$file = "/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/posts/[slug].astro";
const $$url = "/posts/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
