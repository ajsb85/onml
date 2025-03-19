import * as chai from 'chai';

import { stringify } from '../src/stringify.js';

const dat: Record<string, { src: any[], dst: string }> = { // added type annotation
  t0: {
    src: ['text', { a: 55 }, ['tspan', 'so me']],
    dst: '<text a="55">\n  <tspan>so me</tspan>\n</text>\n'
  },
  t1: {
    src: ['A',
      'aaa',
      ['B',
        ['C', true],
        777,
        ['D',
          ['E']
        ]
      ]
    ],
    dst: '<A>\n  aaa\n  <B>\n    <C>true</C>\n    777\n    <D>\n      <E/>\n    </D>\n  </B>\n</A>\n'
  }
};

describe('stringify', () => {
  Object.keys(dat).forEach(name => { // Changed from map to forEach
    it(name, done => {
      const src = dat[name].src;
      const dst = dat[name].dst;
      chai.expect(stringify(src, 2)).to.be.equal(dst);
      done();
    });
  });
});

/* eslint-env mocha */
