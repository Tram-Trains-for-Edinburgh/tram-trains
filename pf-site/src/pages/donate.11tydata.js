// Only build the /donate/ page when the donate feature switch is on
// (see src/_data/settings.js). When off, the page is not written to
// _site and is excluded from the sitemap.
module.exports = {
  eleventyComputed: {
    permalink: (data) => (data.settings.donate.enabled ? "/donate/" : false),
    eleventyExcludeFromCollections: (data) => !data.settings.donate.enabled,
  },
};
