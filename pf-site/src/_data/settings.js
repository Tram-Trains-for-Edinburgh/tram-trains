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
      enabled: false,
      // The hosted PayPal donation link, e.g.
      // https://www.paypal.com/donate/?hosted_button_id=XXXXXXXXXXXX
      paypalUrl: "https://www.paypal.com/donate/?hosted_button_id=REPLACE_WITH_BUTTON_ID",
    },
  };

  if (process.env.DONATE_ENABLED !== undefined) {
    settings.donate.enabled = process.env.DONATE_ENABLED === "true";
  }
  if (process.env.DONATE_PAYPAL_URL) {
    settings.donate.paypalUrl = process.env.DONATE_PAYPAL_URL;
  }

  return settings;
};
