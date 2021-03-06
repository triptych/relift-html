import {parseDirectives} from '../src/directives.js';
import {JSDOM} from 'jsdom';

function createHTML(text) {
  return (new JSDOM(text)).window.document.body;
}

test('r-if', () => {
  const root = createHTML(`<body><div id='root'><span r-if='this.a === b'>Hello</span></div></body>`);
  parseDirectives(root);
  const result = '<div id=\"root\">${this.a === b ? `<span>Hello</span>`:``}</div>'
  expect(root.innerHTML).toBe(result);
});


test('r-if else', () => {
  const root = createHTML(`<body><div id='root'><span r-if='this.a === b'>Hello</span><span r-else>World</span></div></body>`);
  parseDirectives(root);
  const result = '<div id=\"root\">${this.a === b ? `<span>Hello</span>`:`<span>World</span>`}</div>'
  expect(root.innerHTML).toBe(result);
});


test('r-if no immidiate else', () => {
  const root = createHTML(`<body><div id='root'><span r-if='this.a === b'>Hello</span><span>Something Else</span><span r-else>World</span></div></body>`);
  parseDirectives(root);
  const result = '<div id=\"root\">${this.a === b ? `<span>Hello</span>`:``}<span>Something Else</span><span r-else=\"\">World</span></div>'
  expect(root.innerHTML).toBe(result);
});



test('for', () => {
  const root = createHTML(`<body><div id='root'><ul><li r-for="item in this.items">{item}</li></ul></div></body>`);
  parseDirectives(root);
  const result = "<div id=\"root\"><ul>${this.items.map(function(item) { return `<li>{item}</li>`}.bind(this)).join('')}</ul></div>";
  expect(root.innerHTML).toBe(result);
});

test('inner for', () => {
  const root = createHTML(`<body><div id='root'><ul><li r-for="item in this.items"><ul><li r-for="item2 in item">{item2}</li></ul></li></ul></div></body>`);
  parseDirectives(root);
  const result = "<div id=\"root\"><ul>${this.items.map(function(item) { return `<li><ul>${item.map(function(item2) { return `<li>{item2}</li>`}.bind(this)).join('')}</ul></li>`}.bind(this)).join('')}</ul></div>";
  expect(root.innerHTML).toBe(result);
});

test('for with if', () => {
  const root = createHTML(`<body><div id='root'><ul><li r-for="item in this.items">{item} <span r-if="x === y">Yes</span></li></ul></div></body>`);
  parseDirectives(root);
  const result = "<div id=\"root\"><ul>${this.items.map(function(item) { return `<li>{item} ${x === y ? `<span>Yes</span>`:``}</li>`}.bind(this)).join('')}</ul></div>";
  expect(root.innerHTML).toBe(result);
});