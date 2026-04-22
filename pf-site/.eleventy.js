const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  eleventyConfig.addGlobalData("cssHash", () => {
    const file = path.join(__dirname, "src/assets/css/style.css");
    const contents = fs.readFileSync(file);
    return crypto.createHash("md5").update(contents).digest("hex").slice(0, 10);
  });

  eleventyConfig.addFilter("striptags", function (value) {
    if (!value) return "";
    return String(value).replace(/<[^>]+>/g, "");
  });

  eleventyConfig.addFilter("date", function (value, format) {
    const d = value === "now" ? new Date() : new Date(value);
    if (format === "yyyy") return String(d.getFullYear());
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    if (format === "yyyy-MM-dd") {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }
    // "dd LLLL yyyy"
    const dd = String(d.getDate()).padStart(2, "0");
    return `${dd} ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  eleventyConfig.addCollection("news", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/news/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
