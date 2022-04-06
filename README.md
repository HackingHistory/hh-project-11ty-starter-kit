# Hacking History 11ty starter

> Originally created by Stephanie Eckles ([@5t3ph](https://twitter.com/5t3ph)), and modified for use in Hacking History by Matt Price.

## Features

I've added this section to document features that we have only recently added to the template. None of them are entirely easy to use, and also none of them are finished, but here is a start. 

### Knight Labs Timeline from Pages
Several students wanted to dispaly timelineso ntheir sites, not always with the same intentions.  I've added a mechanism for this to the site through a couple of new templates that you can use in your pages.

The two templates are `./generated/timeline-data.njk` and `_includes/timeline.njk`. The first will generate a data source for the timeline to consume; it is pretty much working and sheouldn't need to bechanges. The second is a sub-template that you can insert into any page, or into any layut template, to add a timeline there. Rightn ow it is pretty rough, and will always insert the exact same timeline.  It won't take much work to change it, and I should be able to implement it soon.  

If you want to use thise feature, you will need to add metadata to your pages. Remember that every page starts off with a short metadata section:

``` md
title: "An Event that happened"
description: "This event was really important for lots of reasons."
year: 1804
```
notice I've added a now piece of metadata here: `year`. Add this metadata to every page that you want to have added to the timeline. 

Missing features:
- more precise timescales (months, days, times)
- ability to set initial appearance of timeline on a given page (that is, ability to pass one or more variables to the timeline)
- others?

### Simple Maps with geojson
A second feature is a simple map associated with a page.  Again, this is accomplished through a set of templates, but it also adds so-called "filters" to the site, which can be found in `.eleventy.js`.  These turned out to be necessary because of some confusing technicalites about how coplex data is treated by eleventy's templates. 

To use this feature:

- in the `src/maps` directory, create a **pair** of files with similar names.  If the first is called `my-first-map.md`, the second should be called `my-first-map.11tydata.json`. In the first, write Markdown as you unormally woould, but you'll likely want some extra metadata: 

``` md
---
title: "1941"
description: "beginning of war"
override:center: [53.291489065300226,29.355468750000004]
---
```
the `center` is a two-element array whose elements are latitude and longitude locations. We use `override` here for reasons I'll try to explain in class., but are related to the contents of `maps.json`, which you should copy over to your new site along with the templates `_layouts/map-page.njk` and `_includes/leaflet-single.njk`. 

The second file is a JSON file which should have the following form, but can also include other fields:

``` json
{"geojson": { GEOJSON FEATURECOLLECTION COPIED FROM GEOJSON.IO },
"any other fields you want": "values will be available in templates & can be used instead of frontmatter"}
```

You should be able to find your maps under a `maps` subtirectory on your new sites; e.g., look at the example https://hackinghistory.github.io/hh-project-11ty-starter-kit/maps/start/ on the website for this project. 

### Time-Map integration

This is a work in progress and needs a fair bit of work. It builds on the working implementation of normal maps, above, and generates time-restricted layers from the same map data that you create using the above method.  The main difference is that you will need to add an extra piece of metadata:

``` md
---
title: "1941"
description: "beginning of war"
year: 1941
override:center: [53.291489065300226,29.355468750000004]
---
```

Depending on which framework we ultimatley land on, you may need to add a couple of extra fields to the `properties` field of the `features` property in the acocmpanying json file -- I am working on this and will try to get this info to you ASAP. For now, though, you can start ubilding your site and eventually it wil lhopefully be updated properly.  

You can see the (still lsomewhat broken) demo online here: https://hackinghistory.github.io/hh-project-11ty-starter-kit/timeline-demo/ 

I hsold be able to make more progress on it later this week.

I should also say that the css for this is controlled by `sass/_maps.scss`, and you will need to update `sass/style.scss` with an extra line:  
```scss
@use "map";
```

Hopefully there are additional elemnts coming here, and also hopefully the scrolling will eventually work, but htere's a bit of debugging to do first.  

### Embeds

I know there are some issues right now with insgram and youtube embeds.  I hope to look into this more specifically in class when we talk.  



## Quick Start

1. [Clone this repository](https://github.com/HackingHistory/hh-project-11ty-starter-kit)
to your **personal** account.

1. Once cloned, run `npm install` to install 11ty and other dependencies. Then run `npm start`
to start a server which will (mostly) auto-update as you work.
Use `npm run build` to run a "production" version, which will also generate
social share preview images.

1. Open `src/_data/meta.js`, and update the metadata for the site

1. start editing the markdown to create your site.

1. Review the [styling documentation](https://5t3ph.github.io/html-sass-jumpstart/)
for the included minimal Sass framework, particularly the theme variables,
to quickly customize the starter.

1. Edit `src/index.njk` to change the home page - including changing the template type if desired - and then create content within `_pages` using any templating format you prefer to add content.

1. Check out the [About page](/about/) for expanded details on included features of this starter.

1. Review the [11ty documentation](https://11ty.dev) to more deeply apply customizations, including adding custom data sources and reviewing what template languages are available.

<!-- <h3 class="tdbc-h4">Is Netlify hosting required?</h3>

It's not required, but highly recommended, and is also how the build process is setup to run
against. -->

> For more Eleventy resources, check out @5t3ph's extended collection on [11ty.Rocks](https://11ty.rocks)!
