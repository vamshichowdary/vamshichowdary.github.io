import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, a as renderTemplate } from './astro/server_tAbQYW0s.mjs';
import 'piccolore';
import { $ as $$ResponsiveImage } from './_astro_assets_D44ikUZe.mjs';

const $$Astro = createAstro("https://vamshichowdary.github.io/");
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostCard;
  const { href, frontmatter } = Astro2.props;
  const { title, pubDatetime, description, ogImage } = frontmatter;
  const date = pubDatetime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col sm:flex-row gap-4 mb-8"> <div class="w-full sm:w-48 shrink-0"> ${ogImage ? renderTemplate`${renderComponent($$result, "Image", $$ResponsiveImage, { "src": ogImage, "alt": title, "class": "w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700", "width": 192, "height": 128 })}` : renderTemplate`<div class="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700"> <span class="text-xs text-gray-400">No Image</span> </div>`} </div> <div class="flex-grow"> <h3 class="text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-2"> <a${addAttribute(href, "href")} class="hover:text-accent hover:underline decoration-dashed underline-offset-4"> ${title} </a> </h3> <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">${date}</p> <p class="text-sm italic text-gray-500 dark:text-gray-400 mb-2">${description}</p> </div> </div>`;
}, "/Users/vamshichowdary/github/vamshichowdary.github.io/src/components/PostCard.astro", void 0);

export { $$PostCard as $ };
