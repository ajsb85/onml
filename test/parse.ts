import { expect } from 'chai';
import { parse } from '../src/parse.js';

describe('parse', function () {
  it('basic', function () {
    const res = parse('<svg width="99"></svg>');
    expect(res).to.deep.equal(['svg', { width: '99' }]);
  });

  it('cdata', function () {
    const res = parse('<style type="text/css"><![CDATA[rect {fill: red } ]]></style>');
    // Expect the CDATA content without the CDATA wrapper
    expect(res).to.deep.equal(['style', { type: 'text/css' }, 'rect {fill: red } ']);
  });
});
