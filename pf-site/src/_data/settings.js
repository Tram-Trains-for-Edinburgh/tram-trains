// Site feature switches.
//
// Defaults live in this file. Each value can also be overridden per
// environment without a code change by setting the matching environment
// variable in the Cloudflare Pages dashboard (Settings → Environment
// variables) — e.g. DONATE_ENABLED=true on Preview to test the donate
// feature before switching it on in Production.
module.exports = function () {
  const settings = {
    donate: {
      // Master switch for the donate feature. When false, the /donate/
      // page is not built and the Donate buttons are not rendered.
      enabled: true,
      // Secondary switch for quiet live testing. When false, the
      // /donate/ page is still built (if enabled) and reachable at its
      // URL, but no links to it appear anywhere on the site, it is left
      // out of the sitemap, and it carries a noindex tag for search
      // engines. Set to true to announce the page across the site.
      linked: false,
      // The hosted donation checkout link (currently a Stripe Payment
      // Link), e.g. https://buy.stripe.com/xxxxxxxxxxxx
      url: "https://buy.stripe.com/dRmcMZfi51zM5WE1Z3afS02",
    },
  };

  if (process.env.DONATE_ENABLED !== undefined) {
    settings.donate.enabled = process.env.DONATE_ENABLED === "true";
  }
  if (process.env.DONATE_LINKED !== undefined) {
    settings.donate.linked = process.env.DONATE_LINKED === "true";
  }
  if (process.env.DONATE_URL) {
    settings.donate.url = process.env.DONATE_URL;
  }

  return settings;
};
