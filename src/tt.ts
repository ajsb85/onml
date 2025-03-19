/**
 * @module onml/tt
 * Translates an ONML element by the given x and y coordinates.
 *
 * @param {number} [x=0] - The x-coordinate translation.
 * @param {number} [y=0] - The y-coordinate translation.
 * @param {object} [obj={}] - An optional object to merge the transform into.
 * @returns {TransformObject} An object with a `transform` property containing the translation string.
 */

export interface TransformObject {
  transform?: string;
}

export const tt = (x?: number, y?: number, obj?: object): TransformObject => {
  let objt: TransformObject = {};
  if (x || y) {
    const tt: number[] = [x || 0, ...(y ? [y] : [])];
    objt = { transform: 'translate(' + tt.join(',') + ')' };
  }
  obj = (typeof obj === 'object') ? obj : {};
  return Object.assign(objt, obj ?? {});
};
