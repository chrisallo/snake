
export const BlockType = {
  EMPTY: 'empty',
  SNAKE: 'snake',
  FOOD: 'food',
  BOMB: 'bomb',
};

export class BoardBlock {
  constructor() {
    this.type = BlockType.EMPTY;
    this._dom = null;
  }
  render( x , y) {
    if (!this._dom) this._dom = document.createElement('div');
    this._dom.className = `block block-${this.type}`;
    this._dom.setAttribute("x" , x);
    this._dom.setAttribute("y" , y);
    return this._dom;
  }
}