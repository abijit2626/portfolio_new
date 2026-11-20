// Where each page sits. Every page is its own HTML file:
//   index.html (profile), about.html, months/month-1.html … month-6.html, projects/dewy.html
// The page's <div id="root"> says how far it is from the site root (data-prefix), so links and
// images work the same from every folder. All links go through these helpers.

export const prefix = () => (typeof window !== "undefined" && window.SITE_PREFIX) || "";

export const img = (name) => `${prefix()}images/${name}`;
export const homeHref = () => `${prefix()}index.html`;
export const aboutHref = () => `${prefix()}about.html`;
export const monthHref = (n) => `${prefix()}months/month-${n}.html`;
export const projectHref = (id) => `${prefix()}projects/${id}.html`;
