import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_tAbQYW0s.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/","cacheDir":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/node_modules/.astro/","outDir":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/","srcDir":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/src/","publicDir":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/public/","buildClientDir":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/client/","buildServerDir":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/server/","adapterName":"","routes":[{"file":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/posts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts","isIndex":true,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/index.astro","pathname":"/posts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://vamshichowdary.github.io/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/posts/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/posts/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/posts/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/posts/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/404.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/posts/[slug]@_@astro":"pages/posts/_slug_.astro.mjs","\u0000@astro-page:src/pages/posts/index@_@astro":"pages/posts.astro.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_DPHNCEzu.mjs","/Users/vamshichowdary/github/vamshichowdary.github.io/.astro/content-assets.mjs":"chunks/content-assets_CvitPlR5.mjs","/Users/vamshichowdary/github/vamshichowdary.github.io/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BuqNnDb5.mjs","/Users/vamshichowdary/github/vamshichowdary.github.io/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_1C2pddye.mjs","/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/posts/[slug].astro?astro&type=script&index=0&lang.ts":"_astro/_slug_.astro_astro_type_script_index_0_lang.dKzzyn_d.js","/Users/vamshichowdary/github/vamshichowdary.github.io/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.Mdz3KX3V.js","/Users/vamshichowdary/github/vamshichowdary.github.io/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.QW52Ox2j.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/vamshichowdary/github/vamshichowdary.github.io/src/pages/posts/[slug].astro?astro&type=script&index=0&lang.ts","function d(){const t=document.getElementById(\"reading-progress\");if(!t)return;const i=window.scrollY,o=document.documentElement.scrollHeight-window.innerHeight,e=o>0?i/o*100:0;t.style.width=`${e}%`}function a(){const t=document.querySelectorAll(\".distill-content h2, .distill-content h3\"),i=document.querySelectorAll(\".distill-toc-list a\");let o=\"\";t.forEach(e=>{e.getBoundingClientRect().top<=100&&(o=e.id)}),i.forEach(e=>{e.getAttribute(\"href\")===`#${o}`?e.classList.add(\"active\"):e.classList.remove(\"active\")})}function m(){let t=document.getElementById(\"footnote-tooltip\");t||(t=document.createElement(\"div\"),t.id=\"footnote-tooltip\",t.className=\"footnote-tooltip\",document.body.appendChild(t)),document.querySelectorAll(\"a[data-footnote-ref]\").forEach(o=>{const e=o.getAttribute(\"href\");if(!e)return;const s=e.replace(\"#\",\"\"),f=document.getElementById(s);if(!f)return;const u=f.cloneNode(!0),h=u.querySelector(\"a[data-footnote-backref]\");h&&h.remove(),o.addEventListener(\"mouseenter\",()=>{t.innerHTML=u.innerHTML,t.classList.add(\"visible\");const r=o.getBoundingClientRect(),c=t.getBoundingClientRect();let n=r.left,l=r.bottom+10;n+c.width>window.innerWidth-20&&(n=window.innerWidth-c.width-20),n<20&&(n=20),l+c.height>window.innerHeight-20&&(l=r.top-c.height-10),t.style.left=`${n}px`,t.style.top=`${l}px`}),o.addEventListener(\"mouseleave\",()=>{t.classList.remove(\"visible\")})})}window.addEventListener(\"scroll\",()=>{d(),a()},{passive:!0});d();a();m();document.addEventListener(\"astro:after-swap\",()=>{d(),a(),m()});"],["/Users/vamshichowdary/github/vamshichowdary.github.io/src/components/Header.astro?astro&type=script&index=0&lang.ts","function s(){const e=document.querySelector(\"#menu-btn\"),t=document.querySelector(\"#menu-items\"),n=document.querySelector(\"#menu-icon\"),o=document.querySelector(\"#close-icon\");!e||!t||!n||!o||e.addEventListener(\"click\",()=>{const c=e.getAttribute(\"aria-expanded\")===\"true\";e.setAttribute(\"aria-expanded\",c?\"false\":\"true\"),e.setAttribute(\"aria-label\",c?\"Open Menu\":\"Close Menu\"),t.classList.toggle(\"hidden\"),n.classList.toggle(\"hidden\"),o.classList.toggle(\"hidden\")})}s();document.addEventListener(\"astro:after-swap\",s);"]],"assets":["/file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/404.html","/file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/posts/index.html","/file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/robots.txt","/file:///Users/vamshichowdary/github/vamshichowdary.github.io/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"serverIslandNameMap":[],"key":"jk88/ECSdtD1YDRGdDONHci3ix4vktF7CM/agS90dm4="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
