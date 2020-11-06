const { JSDOM } = require("jsdom");
const { minify } = require("html-minifier-terser");

const ATTRIBUTES = [
  {
    tag: "audio",
    attribute: "src",
  },
  {
    tag: "embed",
    attribute: "src",
  },
  {
    tag: "img",
    attribute: "src",
  },
  {
    tag: "img",
    attribute: "srcset",
  },
  {
    tag: "input",
    attribute: "src",
  },
  {
    tag: "link",
    attribute: "href",
  },
  {
    tag: "object",
    attribute: "data",
  },
  {
    tag: "script",
    attribute: "src",
  },
  {
    tag: "script",
    attribute: "href",
  },
  {
    tag: "script",
    attribute: "xlink:href",
  },
  {
    tag: "source",
    attribute: "src",
  },
  {
    tag: "source",
    attribute: "srcset",
  },
  {
    tag: "track",
    attribute: "src",
  },
  {
    tag: "video",
    attribute: "poster",
  },
  {
    tag: "video",
    attribute: "src",
  },
  {
    tag: "image",
    attribute: "xlink:href",
  },
  {
    tag: "image",
    attribute: "href",
  },
  {
    tag: "use",
    attribute: "xlink:href",
  },
  {
    tag: "use",
    attribute: "href",
  },
];

const MINIMIZE = {
  caseSensitive: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

// Regex to match sources in srcset
const SRCSET = /(?:^|,)\s*(\S+)/g;

// Get dependencies from attribute of element
async function getDependencies(element, attribute) {
  // Get source from attribute of element
  let source = element.getAttribute(attribute);

  // Parse srcset
  const paths =
    attribute === "srcset"
      ? [...source.matchAll(SRCSET)].map(([, path]) => path)
      : [source];

  // Replace each path with the processed dependency
  for (const path of paths) {
    source = source.replace(path, await this.addDependency(path));
  }

  // Set the processed source attribute
  element.setAttribute(attribute, source);
}

module.exports = async function (content, options) {
  // Build DOM of the content
  const dom = new JSDOM(content);
  const { document } = dom.window;

  // Find all dependencies from attributes
  for (const { tag, attribute } of ATTRIBUTES) {
    const elements = [...document.querySelectorAll(tag)];

    for (const element of elements) {
      if (!element.hasAttribute(attribute)) continue;

      // Get dependencies from element
      await getDependencies.bind(this)(element, attribute);
    }
  }

  // Serialize DOM
  let html = dom.serialize();

  // Option to minimize HTML
  if (options.minimize) {
    html = minify(html, { ...MINIMIZE, ...options.minimize });
  }

  return html;
};
