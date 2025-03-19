/**
 * @module onml/gen-svg
 * Provides a function to generate an SVG root element in ONML format.
 */

const w3 = {
  svg: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/1999/xlink',
  xmlns: 'http://www.w3.org/XML/1998/namespace'
};

/**
 * Attributes for the SVG root element.
 */
export interface SvgAttributes {
  xmlns: string;
  'xmlns:xlink': string;
  width: number | string;
  height: number | string;
  viewBox: string;
}


/**
 * Generates an SVG root element in ONML format.
 *
 * @param {number | string} w The width of the SVG element.
 * @param {number | string} h The height of the SVG element.
 * @returns {[string, SvgAttributes]} The ONML array representing the SVG element.
 */
export const genSvg = (w: number | string, h: number | string): [string, SvgAttributes] => {
  return ['svg', {
    xmlns: w3.svg,
    'xmlns:xlink': w3.xlink,
    width: w,
    height: h,
    viewBox: '0 0 ' + w + ' ' + h
  }];
};
