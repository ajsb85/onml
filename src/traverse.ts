/**
 * @module onml/traverse
 * Provides a function to traverse an ONML tree, calling callbacks for each node.
 */

/**
 * Callback functions for the traverse function.
 */
export interface CallbackFunctions {
  /**
   * Called when entering a node.
   * @param node The current node.
   * @param parent The parent node.
   */
  enter?: (node: TreeNode, parent?: TreeNode) => void;
  /**
   * Called when leaving a node.
   * @param node The current node.
   * @param parent The parent node.
   */
  leave?: (node: TreeNode, parent?: TreeNode) => void;
}

/**
 * Represents a node in the ONML tree.
 */
export interface TreeNode {
  name: string;
  attr: Record<string, any>;
  full: any[];
}

/**
 * The context object provided to the callback functions.
 */
export interface TraverseContext {
  /**
   * Changes the name of the current node.
   * @param name The new name.
   */
  name: (name: string) => void;
  /**
   * Skips traversing the children of the current node.
   */
  skip: () => void;
  /**
   * Removes the current node from the tree.
   */
  remove: () => void;
  /**
   * Replaces the current node with a new node.
   * @param node The new node.
   */
  replace: (node: any) => void;
  _name?: string;
  _skip: boolean;
  _remove: boolean;
  _replace?: any;
}

/** @ignore */
function skipFn(this: TraverseContext) {
  this._skip = true;
}

/** @ignore */
function removeFn(this: TraverseContext) {
  this._remove = true;
}

/** @ignore */
function nameFn(this: TraverseContext, name: string) {
  this._name = name;
}

/** @ignore */
function replaceFn(this: TraverseContext, node: any) {
  this._replace = node;
}

/**
 * Traverses an ONML tree, calling the provided callbacks for each node.
 *
 * @param {any} origin - The root of the ONML tree.
 * @param {CallbackFunctions} [callbacks] - The callback functions to call.
 */
export function traverse(origin: any, callbacks?: CallbackFunctions): void {
  const empty = function () { };

  const enter = callbacks?.enter || empty;
  const leave = callbacks?.leave || empty;


  function rec(tree: any, parent?: TreeNode) {
    if (tree === undefined || tree === null || tree === true || tree === false) {
      return;
    }

    const node: TreeNode = {
      name: '', // Initialize name
      attr: {},
      full: tree
    };

    const cxt: TraverseContext = {
      name: nameFn,
      skip: skipFn,
      // break: breakFn,
      remove: removeFn,
      replace: replaceFn,

      _name: undefined,
      _skip: false,
      // _break: false,
      _remove: false,
      _replace: undefined
    };

    let e1IsNotAnObject = true;

    switch (Object.prototype.toString.call(tree)) {
      case '[object String]':
      case '[object Number]':
        return;

      case '[object Array]':
        tree.some(function (e: any, i: number) {
          if (i === 0) {
            node.name = e;
            return false;
          }
          if (i === 1) {
            if (
              Object.prototype.toString.call(e) === '[object Object]'
            ) {
              e1IsNotAnObject = false;
              node.attr = e;
            }
            return true;
          }
        });

        enter.call(cxt, node, parent);

        if (cxt._name) {
          tree[0] = cxt._name;
        }

        if (cxt._replace) {
          return cxt._replace;
        }

        if (cxt._remove) {
          return null;
        }

        if (!cxt._skip) {
          let index = 0;
          let ilen = tree.length;
          while (index < ilen) {
            if ((index > 1) || ((index === 1) && e1IsNotAnObject)) {
              const returnRes = rec(tree[index], node);
              if (returnRes === null) {
                tree.splice(index, 1);
                ilen -= 1;
                continue;
              }
              if (returnRes) {
                tree[index] = returnRes;
              }
            }
            index += 1;
          }

          leave.call(cxt, node, parent);
          if (cxt._name) {
            tree[0] = cxt._name;
          }
          if (cxt._replace) {
            return cxt._replace;
          }
          if (cxt._remove) {
            return null;
          }
        }
    }
  }

  rec(origin, undefined);
}

/* eslint complexity: 0 */
