// Only build the /donate/ page when the donate feature switch is on
// (see src/_data/settings.js). When donate.linked is false the page is
// still built for quiet live testing, but it is excluded from the
// sitemap and marked noindex; the site-wide links to it are hidden by
// their own settings checks.
module.exports = {
  eleventyComputed: {
    permalink: (data) => (data.settings.donate.enabled ? "/donate/" : false),
    eleventyExcludeFromCollections: (data) =>
      !(data.settings.donate.enabled && data.settings.donate.linked),
    noindex: (data) => !data.settings.donate.linked,
  },
};
