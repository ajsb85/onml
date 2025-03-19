/**
 * @module onml/parse
 * Parses an XML/HTML/SVG string into an ONML array.
 */
import * as saxPkg from 'sax';
const sax = saxPkg.default || saxPkg;

/**
 * Options for the `parse` function.
 */
export interface ParseOptions {
  /**
   * If true, the parser will be strict.
   */
  strict?: boolean;
  /**
   * If true, whitespace will be trimmed from text nodes.
   */
  trim?: boolean;
  /**
   *  If true, tag and attribute names will be normalized to lowercase.
   */
  normalize?: boolean;
  /**
   * If true, tag and attribute names will be converted to lowercase.
   */
  lowercase?: boolean;
  /**
   * If true, XML namespaces will be supported.
   */
  xmlns?: boolean;
  /**
   * If true, the parser will keep track of the position of each node.
   */
  position?: boolean;
  /**
   *  If true, the parser will not process script tags.
   */
  noscript?: boolean;
}

/**
 * Parses an XML/HTML/SVG string into an ONML array.
 *
 * @param {string} text The input string to parse.
 * @param {ParseOptions} [options={}] Optional parsing options.
 * @returns {any[]} The parsed ONML array.
 */
export function parse(
  text: string,
  options: ParseOptions = {}
): any[] {
  const res: any[] = [];
  const stack: any[] = [res];

  const parser = sax.parser(options.strict !== false, {
    trim: options.trim !== false,
    normalize: options.normalize === true,
    lowercase: options.lowercase === true,
    xmlns: options.xmlns === true,
    position: options.position === true,
    noscript: options.noscript === true
  });

  parser.onopentag = function (node: any) {
    const top = stack[stack.length - 1];
    const el: any[] = [node.name];

    if (Object.keys(node.attributes).length > 0) {
      el.push(node.attributes);
    }

    top.push(el);
    stack.push(el);
  };

  parser.onclosetag = function () {
    stack.pop();
  };

  parser.ontext = function (text: string) {
    if (text.trim() !== '') {
      const top = stack[stack.length - 1];
      top.push(text);
    }
  };

  parser.oncdata = function (text: string) {
    const top = stack[stack.length - 1];
    // Just push the text content, not the CDATA wrapper
    top.push(text);
  };

  parser.write(text).close();

  return res[0];
}
