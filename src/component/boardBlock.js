
export const BlockType = {
  EMPTY: 'empty',
  SNAKE: 'snake',
  SNAKE_HEAD: 'snake-head',
  APPLE: 'apple',
  BOMB: 'bomb',
};

export class BoardBlock {
  constructor() {
    this.type = BlockType.EMPTY;
    this._dom = null;
  }
  render() {
    if (!this._dom) this._dom = document.createElement('div');
    this._dom.className = `block block-${this.type}`;
    return this._dom;
  }
}