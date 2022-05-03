// Local shortcodes and filters for student features
// some work out of the box, others require additonal ocnfiguration


// Helper packages
const { DateTime } = require("luxon");
// dealing with json
const util = require('util')

// Local utilities/data
const mapboxToken='pk.eyJ1IjoidGl0YW5pdW1ib25lcyIsImEiOiJjazF0bTdlNXQwM3gxM2hwbXY0bWtiamM3In0.FFPm7UIuj_b15xnd7wOQig'

// use youtube-embed's built-in embed function
// function w/ 3 parameters: youtube link, options, index (not sure how to deal w/ that)
const youtubeBuilder= require('eleventy-plugin-youtube-embed/lib/buildEmbed')

// use instagram-embed's built-in embed function
// requires the use of an id, so in the shortcode we need to re-use/modify the
// id extraction code from this plugin
const instagramBuilder=require('eleventy-plugin-embed-instagram/lib/buildEmbed')
// parse url's and add embed codes where possible. 
const instamarkup =  function(url) {
  const pattern = /(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:\/\/)?(?:w{3}\.)?(?:instagram\.com)\/(?:p\/)?([0-9a-zA-Z-_]{11})(?:\S*)(?=(\s*))\4(?:<\/a>)?(?=(\s*))\5/;
  const match = pattern.exec(url)
  const id = match ? match[3] : null
  if (id) {
    return instagramBuilder(id, {"embedClass":"instagram-gallery-embed"});
  } else {
    console.log(`Unable to create instagram from URL: ${url}; does not appear to be an instagram code. Skipped`)
  }
};
const instaGallery = function(content, embeds){
return `<script async defer src="https://www.instagram.com/embed.js"></script><article class="gallery">
<section class="items">
${embeds}
</section>
<section class="text">
${content}
</section>
</article>`
}
module.exports = function (eleventyConfig) {
  // instagram gallery builder
  eleventyConfig.addPairedShortcode("instagallery", function(content,links) {
    // collect and filter all the codes.  
    let instaEmbeds = links.map((l) => instamarkup(l)).filter(e => e).join('');
    return instaGallery(content, instaEmbeds)
  })
  eleventyConfig.addShortcode("dummy", function(input){console.log("context", this.context); return JSON.stringify(this.ctx)})
  // youtube paired description/embed builder
  eleventyConfig.addPairedShortcode("youtubebox", function(content, url){
    let youtubeItem = youtubeBuilder(url, {lite: null, embedClass: "hello"}, 1)
    console.log("item: ", youtubeItem)
    return `<section class="youtube-box">
<section class="youtube-description">

${content}

</section>
${youtubeItem}
</section>
`
  })

  eleventyConfig.addFilter('stringify', obj => {
    return JSON.stringify(obj)
  });

  // stolen from https://github.com/11ty/eleventy/issues/266#issuecomment-450397156
  // workaround for JSON not being properly exported in njk templates
  eleventyConfig.addFilter('serializeMaps', (value) => {
    const mapData = value.map((map) => {      
      return map.data.geojson ? {
        date: map.date,
        url: map.url,
        data: {
          title: map.data.title,
          excerpt: map.data.excerpt,
          geojson: map.data.geojson
        },
      } : null;
    });

    return JSON.stringify(
      mapData.filter( data => data  ),
     null, 2);
  });

  // two date filters for the map templates
  // I actually need to refactor/rewrite as templates nayway I think.
  eleventyConfig.addFilter("findDate", (item) => {
    let dateReference= item.data.date || item.data.year || item.data.time || item.geojson?.features?.properties?.time || item.geojson?.features?.properties?.start
    return DateTime.fromISO(dateReference).toISODate()})
  
  eleventyConfig.addFilter("dateToUnix", (item) => {
    let dateReference= item.data.date || item.data.year || item.data.time || item.geojson?.properties?.time || item.geojson?.properties?.start
    return DateTime.fromISO(dateReference).valueOf()})

  
};
