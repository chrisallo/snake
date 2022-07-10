
import { BlockType, BoardBlock } from './boardBlock.js';

const DEFAULT_BOARD_WIDTH = 25;
const DEFAULT_BOARD_HEIGHT = 25;

export class Board {
  constructor({
    width = DEFAULT_BOARD_WIDTH,
    height = DEFAULT_BOARD_HEIGHT,
  }) {
    this.width = width;
    this.height = height;
    this.blocks = [];
    for (let i = 0; i < this.width; i++) {
      const row = [];
      for (let j = 0; j < this.height; j++) {
        const block = new BoardBlock();        
        row.push(block);
      }
      this.blocks.push(row);
    }
    this._dom = null;
    this.reset();
  }
  includes(x, y) {
    return !!this.blocks[y] && !!this.blocks[y][x];
  }
  setBlockAs(x, y, blockType) {    
    this.blocks[y][x].type = blockType;
  }
  reset() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.blocks[i][j].type = BlockType.EMPTY;
      }
    }
  }
  render() {
    if (!this._dom) {
      this._dom = document.getElementById('board');
      for (let i = 0; i < this.width; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < this.height; j++) {
          row.appendChild(this.blocks[i][j].render(i,j));
        }
        this._dom.appendChild(row);
      }
    } else {
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          this.blocks[i][j].render(i,j);
        }
      }
    }
    return this._dom;
  }
}