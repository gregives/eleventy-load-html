# eleventy-load-html

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Prettier][prettier-src]][prettier-href]

Find dependencies in and minify HTML using [eleventy-load](https://github.com/gregives/eleventy-load).

## Getting Started

Firstly, you'll need to install [eleventy-load](https://github.com/gregives/eleventy-load) (if you haven't already) and eleventy-load-html.

```sh
npm install --save-dev eleventy-load eleventy-load-html
```

Then you can set up eleventy-load-html using a rule in your eleventy-load options. Note that eleventy-load tests the **input path**, so we want to apply eleventy-load-html to both HTML and Markdown templates. Within a template the dependency source path should be relative to the input path: 

e.g. for dependency `<inputPath>/sass/styles.scss` use `<link rel="stylesheet" href="sass/styles.scss" />`

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require("eleventy-load"), {
    rules: [
      {
        test: /\.(html|md)$/,
        loaders: [
          {
            loader: require("eleventy-load-html"),
          },
        ],
      },
    ],
  });
};
```

## Options

| Name                            | Type              | Default | Description                                                                           |
| ------------------------------- | ----------------- | ------- | ------------------------------------------------------------------------------------- |
| [**`attributes`**](#attributes) | `Boolean`         | `true`  | Find dependencies from HTML attributes                                                |
| [**`minimize`**](#minimize)     | `Boolean\|Object` | `false` | Minimize using [html-minifier-terser](https://github.com/terser/html-minifier-terser) |

### `attributes`

Type: `Boolean` Default: `true`

Find dependencies from HTML attributes which will be processed by eleventy-load (if a loader is configured to process the dependency).

<details>
<summary>List of attributes which eleventy-load-html checks for dependencies</summary>

```js
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
```

</details>

### `minimize`

Type: `Boolean|Object` Default: `false`

If `true` or an `Object`, eleventy-load-html will minimize HTML using [html-minifier-terser](https://github.com/terser/html-minifier-terser). If an `Object`, these will be provided to html-minifier-terser as options.

```js
{
  loader: require("eleventy-load-html"),
  options: {
    minimize: {
      removeComments: true,
    }
  },
},
```

<!-- References -->

[npm-version-src]: https://img.shields.io/npm/v/eleventy-load-html/latest.svg
[npm-version-href]: https://npmjs.com/package/eleventy-load-html
[npm-downloads-src]: https://img.shields.io/npm/dt/eleventy-load-html.svg
[npm-downloads-href]: https://npmjs.com/package/eleventy-load-html
[license-src]: https://img.shields.io/npm/l/eleventy-load-html.svg
[license-href]: https://npmjs.com/package/eleventy-load-html
[prettier-src]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-href]: https://github.com/prettier/prettier
