/**
 * @module onml/stringify
 * Stringifies an ONML array into an XML/HTML/SVG string.
 */

/**
 * Checks if an object is a plain JavaScript object.
 * @param {any} o - The object to check.
 * @returns {o is Record<string, any>} True if the object is a plain JavaScript object, false otherwise.
 */
const isObject = (o: any): o is Record<string, any> =>
  o && Object.prototype.toString.call(o) === '[object Object]';

/**
 * Creates an indentation function for pretty-printing.
 * @param {number} indentation - The number of spaces to indent.
 * @returns {(txt: string | any) => string} A function that indents a given string.
 */
function indenter(indentation: number): (txt: string | any) => string {
  if (!(indentation > 0)) {
    return (txt: string | any): string | any => txt;
  }
  const space = ' '.repeat(indentation);
  return (txt: string | any): string | any => {
    if (typeof txt !== 'string') {
      return txt;
    }

    const arr = txt.split('\n');

    if (arr.length === 1) {
      return space + txt;
    }

    return arr
      .map((e) => (e.trim() === '') ? e : space + e)
      .join('\n');
  };
}

/**
 * Removes leading and trailing whitespace from each line of a string.
 * @param {string} txt The string to clean.
 * @returns {string} The cleaned string.
 */
const clean = (txt: string): string =>
  txt
    .split('\n')
    .filter((e) => e.trim() !== '')
    .join('\n');

/**
 * Stringifies an ONML array into an XML/HTML/SVG string.
 * @param {any[]} a - The ONML array to stringify.
 * @param {number} [indentation] - The number of spaces to use for indentation (optional).
 * @returns {string} The stringified XML/HTML/SVG.
 */
export function stringify(a: any[], indentation?: number): string {
  const cr = indentation && indentation > 0 ? '\n' : '';
  const indent = indenter(indentation || 0);

  function rec(a: any[]): string {
    let body = '';
    let isFlat = true;

    let res = '';
    const isEmpty = a.some((e, i, arr) => {
      if (i === 0) {
        res = '<' + e;
        return arr.length === 1;
      }

      if (i === 1) {
        if (isObject(e)) {
          Object.keys(e).forEach((key) => {
            let val = e[key];
            if (Array.isArray(val)) {
              val = val.join(' ');
            }
            res += ' ' + key + '="' + val + '"';
          });
          if (arr.length === 2) {
            return true;
          }
          res += '>';
          return;
        }
        res += '>';
      }

      switch (typeof e) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'undefined':
          body += e + cr;
          return;
      }

      isFlat = false;
      body += rec(e);
    });

    if (isEmpty) {
      return res + '/>' + cr; // short form
    }

    return isFlat
      ? res + clean(body) + '</' + a[0] + '>' + cr
      : res + cr + indent(body) + '</' + a[0] + '>' + cr;
  }

  return rec(a);
}
