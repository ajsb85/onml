/**
 * @module onml/jsonml
 * Provides helper functions for working with JSONML.
 */

/**
 * Creates a JSONML element.
 *
 * @param {string} name The tag name.
 * @param {Record<string, any>} attributes The element attributes.
 * @param {...any[]} children The child nodes.
 * @returns {any[]} The JSONML element.
 */
export const Element = (name: string, attributes: Record<string, any>, ...children: any[]) => {
  return [name, attributes, ...children];
};

/**
 * Creates a JSONML text node.
 *
 * @param {string} text The text content.
 * @returns {string} The JSONML text node.
 */
export const text = (text: string) => {
  return text;
};

/**
 * Creates a JSONML comment node.
 *
 * @param {string} text The comment text.
 * @returns {(string | string)[]} The JSONML comment node.
 */
export const comment = (text: string) => {
  return ['!', text];
};
