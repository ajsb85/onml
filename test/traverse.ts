import { traverse, TraverseContext, TreeNode } from '../src/traverse.js';
import * as chai from 'chai';

describe('#traverse', () => {
  const data = ['b',
    ['div', { a: true },
      ['span',
        'div',
        ['div',
          ['div', {},
            ['div', {
              a: true
            }]
          ]
        ],
        ['div', {},
          ['div']
        ]
      ]
    ]
  ];

  it('count divs on enter', done => {
    let count = 0;
    traverse(data, {
      enter: (node: TreeNode) => {
        if (node.name === 'div') {
          count++;
        }
      }
    });
    chai.expect(count).to.be.equal(6);
    done();
  });

  it('count divs on leave', done => {
    let count = 0;
    traverse(data, {
      leave: (node: TreeNode) => {
        if (node.name === 'div') {
          count++;
        }
      }
    });
    chai.expect(count).to.be.equal(6);
    done();
  });

  it('count divs with attr.a', done => {
    let count = 0;
    traverse(data, {
      enter: (node: TreeNode) => {
        if (
          node.name === 'div' &&
          node.attr.a
        ) {
          count++;
        }
      }
    });
    chai.expect(count).to.be.equal(2);
    done();
  });

  it('count divs in spans', done => {
    let count = 0;
    traverse(data, {
      enter: (node: TreeNode, parent?: TreeNode) => {
        if (
          parent &&
          parent.name === 'span' &&
          node.name === 'div'
        ) {
          count++;
        }
      }
    });
    chai.expect(count).to.be.equal(2);
    done();
  });

  it('count node.full.length === 1', done => {
    let count = 0;
    traverse(data, {
      enter: (node: TreeNode) => {
        if (node.full.length === 1) {
          count++;
        }
      }
    });
    chai.expect(count).to.be.equal(1);
    done();
  });

  it('gen XML skeleton', done => {
    let res = '';
    traverse(data, {
      enter: (node: TreeNode) => {
        res += '<' + node.name;
        Object.keys(node.attr).forEach(function (key) {
          res += ' ' + key + '="' + node.attr[key] + '"';
        });
        res += '>';
      },
      leave: (node: TreeNode) => {
        res += '</' + node.name + '>';
      }
    });
    chai.expect(res).to.be.equal('<b><div a="true"><span><div><div><div a="true"></div></div></div><div><div></div></div></span></div></b>');
    done();
  });

    it('count divs but skip spans', done => {
    let count = 0;
    traverse(data, {
      enter: function(this: TraverseContext, node: TreeNode) { // Explicitly type 'this'
        if (node.name === 'div') {
          count++;
        } else if (node.name === 'span') {
          this.skip();
        }
      }
    });
    chai.expect(count).to.be.equal(1);
    done();
  });

  it('replace divs with briks', done => {
    traverse(data, {
      leave: function(this: TraverseContext, node: TreeNode) { // Explicitly type 'this'
        if (node.name === 'div') {
          this.name('brick');
        }
      }
    });
    chai.expect(data).to.deep.equal(
      ['b',
        ['brick', { a: true },
          ['span',
            'div',
            ['brick',
              ['brick', {},
                ['brick', {
                  a: true
                }]
              ]
            ],
            ['brick', {},
              ['brick']
            ]
          ]
        ]
      ]
    );
    done();
  });

  it('replace span with wood', done => {
    traverse(data, {
      leave: function (this: TraverseContext, node: TreeNode) { // Explicitly type 'this'
        if (node.name === 'span') {
          this.replace(['wood']);
        }
      }
    });
    chai.expect(data).to.deep.equal(
      ['b',
        ['brick', { a: true },
          ['wood']
        ]
      ]
    );
    done();
  });

  it('add wood', done => {
    traverse(data, {
      leave: (node: TreeNode) => {
        let i;
        if (node.name === 'brick') {
          for (i = 0; i < 5; i++) {
            node.full.push(['wood']);
          }
        }
      }
    });
    chai.expect(data).to.deep.equal(
      ['b',
        ['brick', { a: true },
          ['wood'],
          ['wood'],
          ['wood'],
          ['wood'],
          ['wood'],
          ['wood']
        ]
      ]
    );
    done();
  });

  it('remove wood', done => {
    traverse(data, {
      leave: function (this: TraverseContext, node: TreeNode) { // Explicitly type 'this'
        if (node.name === 'wood') {
          this.remove();
        }
      }
    });
    chai.expect(data).to.deep.equal(
      ['b',
        ['brick', { a: true }]
      ]
    );
    done();
  });

});

/* eslint-env mocha */
