// 11ty Plugins
const socialImages = require("@11tyrocks/eleventy-plugin-social-images");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

// Helper packages
const slugify = require("slugify");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote")
// Local utilities/data
const packageVersion = require("./package.json").version;
const pluginTOC = require('eleventy-plugin-toc');
const embeds = require("eleventy-plugin-embed-everything");
const instamarkup =  function(url) {
  const pattern = /(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:\/\/)?(?:w{3}\.)?(?:instagram\.com)\/(?:p\/)?([0-9a-zA-Z-_]{11})(?:\S*)(?=(\s*))\4(?:<\/a>)?(?=(\s*))\5/;
  const match = pattern.exec(url)
  const id = match ? match[3] : null
  let out = ''
  if (id) {
    out = '<blockquote ';
    // class MUST include "instagram-media" because Instagram's script uses it for DOM parsing
    out += `class="jade-gallery instagram-media"`;
    out += ` data-instgrm-permalink="https://www.instagram.com/p/${id}">`;
    out += '</blockquote>';
  } else {
    out = `<blockquote class="jade-gallery instagram-media">media not found</blockquote>`;
  }
  return out;
};
module.exports = function (eleventyConfig) {
  let markdownLibrary = markdownIt({
    html: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      class: "tdbc-anchor",
      space: false,
      symbol: "🔗",
    }),
    level: [1, 2, 3],
    slugify: (str) =>
    slugify(str, {
      lower: true,
      strict: true,
      remove: /["]/g,
    }),
  }).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", markdownLibrary);
  eleventyConfig.addPlugin(socialImages);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(embeds);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3', 'h4'], // which heading tags are selected headings must each have an ID attribute
    wrapper: 'nav',           // element to put around the root `ol`/`ul`
    wrapperClass: 'toc',      // class for the element around the root `ol`/`ul`
    ul: false,                // if to use `ul` instead of `ol`
    flat: false,              // if subheadings should appear as child of parent or as a sibling
  })
  eleventyConfig.addWatchTarget("./src/sass/");

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/favicon.png");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("packageVersion", () => `v${packageVersion}`);

  eleventyConfig.addFilter("slug", (str) => {
    if (!str) {
      return;
    }

    return slugify(str, {
      lower: true,
      strict: true,
      remove: /["]/g,
    });
  });

  eleventyConfig.addFilter("instamarkup", instamarkup);

  eleventyConfig.addPairedShortcode("instagallery", function(content,links) {
    let instaEmbeds = links.map((l) => instamarkup(l));
    return `<article class="gallery">
<section class="items">
${instaEmbeds.join('')}
</section>
<section class="text">
${markdownLibrary.render(content)}
</section>
</article>`
  })
  
  /* Markdown Overrides */

return {
    passthroughFileCopy: true,
    pathPrefix: "/hh-project-11ty-starter-kit",
    dir: {
      input: "src",
      output: "docs",
      layouts: "_layouts",
    },
  };
}
