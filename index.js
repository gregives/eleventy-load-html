const { JSDOM } = require('jsdom')

const ATTRIBUTES = [
  {
    tag: 'audio',
    attribute: 'src'
  },
  {
    tag: 'embed',
    attribute: 'src'
  },
  {
    tag: 'img',
    attribute: 'src'
  },
  {
    tag: 'img',
    attribute: 'srcset'
  },
  {
    tag: 'input',
    attribute: 'src'
  },
  {
    tag: 'link',
    attribute: 'href'
  },
  {
    tag: 'object',
    attribute: 'data'
  },
  {
    tag: 'script',
    attribute: 'src'
  },
  {
    tag: 'script',
    attribute: 'href'
  },
  {
    tag: 'script',
    attribute: 'xlink:href'
  },
  {
    tag: 'source',
    attribute: 'src'
  },
  {
    tag: 'source',
    attribute: 'srcset'
  },
  {
    tag: 'track',
    attribute: 'src'
  },
  {
    tag: 'video',
    attribute: 'poster'
  },
  {
    tag: 'video',
    attribute: 'src'
  },
  {
    tag: 'image',
    attribute: 'xlink:href'
  },
  {
    tag: 'image',
    attribute: 'href'
  },
  {
    tag: 'use',
    attribute: 'xlink:href'
  },
  {
    tag: 'use',
    attribute: 'href'
  }
]

// Regex to match sources in srcset
const SRCSET = /(?:^|,)\s*(\S+)/g

// Get dependencies from attribute of element
async function getDependencies(element, attribute) {
  // Get source from attribute of element
  const source = element.getAttribute(attribute.attribute)

  // Parse srcset
  const paths = attribute.attribute === 'srcset'
    ? [...source.matchAll(SRCSET)].map(([, path]) => path)
    : [source]

  // Replace each path with the processed dependency
  for (const path of paths) {
    source.replace(path, await this.addDependency(path))
  }
}

module.exports = async function(content, options) {
  // Build DOM of the content
  const dom = new JSDOM(content)
  const { document } = dom.window

  // Find all dependencies from attributes
  for (const attribute of ATTRIBUTES) {
    const elements = [...document.querySelectorAll(attribute.tag)]

    for (const element of elements) {
      if (!element.hasAttribute(attribute.attribute))
        continue

      // Get dependencies from element
      await getDependencies.bind(this)(element, attribute)
    }
  }

  return dom.serialize()
}
