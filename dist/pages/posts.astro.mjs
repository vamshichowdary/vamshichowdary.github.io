import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_tAbQYW0s.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_2DIUivu6.mjs';
import { $ as $$Layout, a as $$Header, c as $$Footer } from '../chunks/Footer_Ca244hjI.mjs';
import { $ as $$PostCard } from '../chunks/PostCard_Oux-E6Xa.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Posts" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main id="main-content" class="max-w-6xl mx-auto px-6 py-8"> <h1 class="text-2xl font-bold tracking-wide mb-8 uppercase text-gray-900 dark:text-white border-b-2 border-accent inline-block pb-1">Posts</h1> <div class="space-y-4"> ${sortedPosts.map(({ data, id }) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "href": `/posts/${id}`, "frontmatter": data })}`)} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/posts/index.astro", void 0);

const $$file = "/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/posts/index.astro";
const $$url = "/posts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
