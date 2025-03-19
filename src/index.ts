/**
 * The main entry point for the onml library.
 * Provides functions for parsing, stringifying, traversing, and rendering ONML data.
 * @module onml
 */

import { parse } from './parse.js';
import { stringify } from './stringify.js';
import { traverse } from './traverse.js';
import { renderer } from './renderer.js';
import { tt } from './tt.js';
import { genSvg } from './gen-svg.js';
import * as jsonml from './jsonml.js';

/**
 * The parse function. Parses an XML/HTML/SVG string.
 */
export { parse };
/**
 * The stringify function. Stringifies an ONML array to XML/HTML/SVG string.
 */
export { stringify };

/**
 * The traverse function. Traverses a onml tree.
 */
export { traverse };

/**
 * The renderer function. Render a onml to a string.
 */
export { renderer };
/**
 * The tt function. Translate a onml element.
 */
export { tt };

/**
 * Functions to generate common onml structures.
 */
export { genSvg };

/**
 * jsonml namespace with helper functions.
 */
export { jsonml };

/**
 * Default export, all the functions / namespaces of the lib.
 */
export default {
  parse,
  stringify,
  traverse,
  renderer,
  tt,
  genSvg,
  jsonml
};

/**
 * The parse function (alias). Parses an XML/HTML/SVG string.
 */
export { parse as p };
/**
* The stringify function (alias). Stringifies an ONML array to XML/HTML/SVG string.
 */
export { stringify as s };

/**
 * The traverse function (alias). Traverses a onml tree.
 */
export { traverse as t};
