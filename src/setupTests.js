global.Range = function Range() {};

const createContextualFragment = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0]; // so hokey it's not even funny
};

Range.prototype.createContextualFragment = (html) => createContextualFragment(html);

const mockDomRectList = [
  { x: 1, y: 1, width: 100, height: 13 },
  { x: 2, y: 3, width: 101, height: 13 }
];

global.window.document.createRange = function createRange() {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {
      return { top: 1, left: 1, width: 100, height: 13 };
    },
    getClientRects: () => {
      return ({
        item: (index) => mockDomRectList[index],
        length: mockDomRectList.length
      });
    },
    createContextualFragment
  };
};
