/**
 * @module onml/renderer
 * Provides a function to render an ONML array into an HTML/SVG element.
 */

import { stringify } from './stringify.js';

/**
 * Options for the renderer function.
 */
export type RenderOptions = {
    /**
     * The indent size, in spaces
     */
    tabs?: number;
};
/**
 * Creates a renderer function that renders ONML to a specified HTML element.
 * @param {string | HTMLElement} root - The ID of the root element or the element itself.
 * @param {function} fn - The render function, it receives the onml node, and the render options.
 * @param {RenderOptions} options - the object with render options.
 * @returns {(node: any[]) => string} A function to render ONML array to the root element.
 * @throws {Error} If the root element is not found.
 */
export function renderer(
    type: string,
    fn: (node: any[], options: RenderOptions) => string,
    options: RenderOptions = {}
): (node: any[]) => string {
    if (typeof fn !== 'function') {
        throw new Error(`${type} renderer requires a rendering function`);
    }

    const tabs = options.tabs || 0;

    return function (node: any[]): string {
        if (!Array.isArray(node)) {
            throw new Error(`${type} renderer requires an array argument`);
        }
        return fn(node, { tabs });
    };
}
