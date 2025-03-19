# ONML

[![NPM version](https://img.shields.io/npm/v/onml.svg)](https://www.npmjs.org/package/onml)
[![Tests](https://github.com/drom/onml/actions/workflows/nodejs.yml/badge.svg)](https://github.com/drom/onml/actions/workflows/nodejs.yml)
[![codecov](https://codecov.io/gh/drom/onml/branch/main/graph/badge.svg?token=YOUR_CODECOV_TOKEN)](https://codecov.io/gh/drom/onml)

ONML is a lightweight JavaScript library for working with [JSONML](http://www.jsonml.org/) data, providing utilities for parsing XML/HTML/SVG strings into JSONML arrays, stringifying JSONML arrays back into XML/HTML/SVG strings, traversing the JSONML tree, and rendering JSONML to the DOM. It's written in TypeScript and provides full type safety.

## Installation

```bash
npm install onml
```

## Usage (JavaScript)

```javascript
const onml = require('onml');

// Parse an XML string
const parsed = onml.parse('<div id="myDiv" class="container">Hello, <b>world</b>!</div>');
console.log(parsed);
// Output:
// [ 'div', { id: 'myDiv', class: 'container' }, 'Hello, ', [ 'b', 'world' ], '!' ]

// Stringify a JSONML array
const stringified = onml.stringify(parsed, 2); // 2 spaces for indentation
console.log(stringified);
// Output:
// <div id="myDiv" class="container">
//   Hello,
//   <b>world</b>!
// </div>

// Traverse the JSONML tree
onml.traverse(parsed, {
  enter: (node, parent) => {
    if (node.name === 'div') {
      console.log('Found a div:', node.attr);
    }
  },
  leave: (node) => {
    if (node.name === 'b') {
      console.log('Leaving a b element');
    }
  }
});

// Render to the DOM (browser environment)
// Assuming you have an element with id="root" in your HTML
// const renderer = onml.renderer('root');
// renderer(parsed); // Renders the parsed ONML to the #root element
```

## Usage (TypeScript)

```typescript
import onml, { parse, stringify, traverse, Element, Attributes, TraverseCallbacks, TreeNode, TraverseContext, tt, renderer, gen, RenderOptions } from 'onml';

// Parse an XML string
const parsed: Element = parse('<div id="myDiv" class="container">Hello, <b>world</b>!</div>');
console.log(parsed);

// Stringify a JSONML array with indentation
const stringified: string = stringify(parsed, 2);
console.log(stringified);

// Traverse the JSONML tree
const callbacks: TraverseCallbacks = {
  enter: function (this: TraverseContext, node: TreeNode, parent?: TreeNode) {
    if (node.name === 'div') {
      console.log('Found a div:', node.attr);
      // Example of using the context:
      // this.skip(); // Skip traversing children of this div
    }
  },
  leave: (node: TreeNode) => {
    if (node.name === 'b') {
      console.log('Leaving a b element');
    }
  }
};
traverse(parsed, callbacks);

// Translate
const translated = tt(10, 20, {style: "color:red;"});

// Generate SVG

const svg = gen.svg("100", "200");

// Render using a render function

const renderFn = (node: any[], options: RenderOptions): string => {
    return onml.s(node, options.tabs);
}

const render = onml.renderer("div", renderFn);

const renderedString = render(parsed);

// Render using a string id

const renderById = onml.renderer("root");

renderById(parsed);
```

## API

### `parse(source: string, options?: ParseOptions): Element`

Parses an XML/HTML/SVG string into a JSONML array.

*   **`source`:**  The XML/HTML/SVG string to parse.
*   **`options`:** (Optional)
    * **`strict`:**: boolean; Default: true
    *   **`trim`**: boolean; Default: true
    *   **`normalize`**: boolean; Default: false
    *  **`lowercase`**: boolean; Default: false
    *  **`xmlns`**: boolean; Default: false
    *  **`position`**: boolean; Default: false
    *  **`noscript`**: boolean;  Default: false

Returns the parsed JSONML array.

### `p(source: string): Element`
Alias for `parse`.

### `stringify(data: Element, indentation?: number): string`

Stringifies a JSONML array into an XML/HTML/SVG string.

*   **`data`:** The JSONML array to stringify.
*   **`indentation`:** (Optional) The number of spaces to use for indentation.  If omitted, the output will not be indented.

Returns the stringified XML/HTML/SVG.

### `s(data: Element, indentation?: number): string`
Alias for `stringify`.

### `traverse(data: Element, callbacks: TraverseCallbacks): void`

Traverses a JSONML tree, calling the provided callbacks for each node.

*   **`data`:** The JSONML array to traverse.
*   **`callbacks`:** An object with `enter` and `leave` properties, which are functions that will be called when entering and leaving each node, respectively.

    *   **`enter(node: TreeNode, parent?: TreeNode): void`:** Called when entering a node.
        *    **`node`**: The current node being entered. Has properties `name`, `attr`, and `full`
        *    **`parent`**: The parent node (or `undefined` for the root node).
        *   **`this` (Context):**  The context object within the `enter` callback provides the following methods:
            *   `this.name(newName: string): void`:  Changes the name of the current node.
            *   `this.skip(): void`:  Skips traversing the children of the current node.
            *   `this.remove(): void`:  Removes the current node from the tree.
            *   `this.replace(newNode: Element): void`:  Replaces the current node with a new node.

    *   **`leave(node: TreeNode, parent?: TreeNode): void`:** Called when leaving a node.  Receives the same `node`, `parent`, and `this` context as `enter`.

### `t(data: Element, callbacks: TraverseCallbacks): void`
Alias for `traverse`.

### `renderer(root: string | HTMLElement): (ml: Element) => void`
Creates a function to render a onml tree into a HTMLElement.
 * **`root`**: The root HTMLElement or the id of the root HTMLElement

Returns a function that receives the onml to be rendered.

### `tt(x?: number, y?: number, obj?: object): { transform?: string }`

Translates an ONML element by the given x and y coordinates.

### `gen.svg(w: number | string, h: number | string): [string, SvgAttributes]`
Generates the basic SVG onml tree.
*  **`w`**: The width.
*  **`h`**: The height.
Returns the onml tree for a svg tag.

### `jsonml`

Provides helper functions for working with JSONML.
* `jsonml.Element(name: string, attributes: Record<string, any>, ...children: any[]): any[]` Create a onml element.
* `jsonml.text(text: string): string` Create a text node.
* `jsonml.comment(text: string): (string | string)[]` Create a comment node.

## Contributing

1.  Fork the repository.
2.  Create a new branch for your feature/fix.
3.  Make your changes, including tests.
4.  Run `npm test` to ensure all tests pass.
5.  Submit a pull request.

## License

MIT
