
import { Board } from './component/board.js';
import { BlockType } from './component/boardBlock.js';
import { Snake, SnakeDirection } from './component/snake.js';

const INITIAL_GAME_SPEED = 500;

export class Game {
  constructor() {
    this.board = new Board({});
    this.snake = null;
    this.reset();

    this.point = 0;
    this.speed = INITIAL_GAME_SPEED;
    this.tick = null;

    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case ' ':
          this.start();
          break;
        case 'ArrowUp':
          this.snake.turn(SnakeDirection.UP);
          break;
        case 'ArrowDown':
          this.snake.turn(SnakeDirection.DOWN);
          break;
        case 'ArrowLeft':
          this.snake.turn(SnakeDirection.LEFT);
          break;
        case 'ArrowRight':
          this.snake.turn(SnakeDirection.RIGHT);
          break;
      }
    });
  }
  _message(content) {
    document.getElementById('message').innerHTML = content;
  }
  get isPlaying() {
    return !!this.tick;
  }
  gainPoint() {
    this._message(`${this.point} points.`);
  }
  gameOver() {
    this.stop();
    this._message(`Game over.`);
    
    let restartAfter = 5;
    const restart = setInterval(() => {
      if (restartAfter > 0) {
        restartAfter--;
        this._message(`Game over. The game restarts after ${restartAfter}s...`);
      } else {
        clearInterval(restart);
        this.reset();
      }
    }, 1000);
  }
  start() {
    if (!this.isPlaying) {
      this.gainPoint();
      this.tick = setInterval(() => {
        const { head, footprint } = this.snake.move();
        if (this.board.includes(...head)
          && this.board.includes(...footprint)
          && !this.snake.hasTailOf(...head)) {
          this.board.setBlockAs(...head, BlockType.SNAKE);
          this.board.setBlockAs(...footprint, BlockType.EMPTY);
        } else {
          this.gameOver();
        }
        this.board.render();
      }, this.speed);
    }
  }
  stop() {
    if (this.isPlaying) {
      clearInterval(this.tick);
      this.tick = null;
    }
  }
  reset() {
    this.board.reset();
    this.snake = new Snake({
      startX: Math.floor(this.board.width / 2),
      startY: Math.floor(this.board.height / 2),
    });
    for (const [x, y] of this.snake.tail) {
      this.board.setBlockAs(x, y, BlockType.SNAKE);
    }
    this.board.render();
    this._message('Press spacebar to start.');
  }
}