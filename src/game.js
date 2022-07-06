
import { Board } from './component/board.js';
import { BlockType } from './component/boardBlock.js';
import { Snake, SnakeDirection } from './component/snake.js';

const INITIAL_GAME_SPEED = 500;
const DEFAULT_SNAKE_LENGTH_TO_WIN = 40;

const GameState = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETE: 'complete',
};

export class Game {
  constructor({
    pointToWin = DEFAULT_SNAKE_LENGTH_TO_WIN,
  }) {
    this.board = new Board({});
    this.snake = null;
    this.reset();

    this.point = 0;
    this.pointToWin = pointToWin;

    this.speed = INITIAL_GAME_SPEED;
    this.tick = null;

    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case ' ':
          if (this.isIdle) this.start();
          break;
        case 'ArrowUp':
          if (this.isPlaying) this.snake.turn(SnakeDirection.UP);
          break;
        case 'ArrowDown':
          if (this.isPlaying) this.snake.turn(SnakeDirection.DOWN);
          break;
        case 'ArrowLeft':
          if (this.isPlaying) this.snake.turn(SnakeDirection.LEFT);
          break;
        case 'ArrowRight':
          if (this.isPlaying) this.snake.turn(SnakeDirection.RIGHT);
          break;
      }
    });
  }
  _message(content) {
    document.getElementById('message').innerHTML = content;
  }
  get isIdle() {
    return this.state === GameState.IDLE;
  }
  get isPlaying() {
    return this.state === GameState.RUNNING;
  }
  gainPoint(inc = 1) {
    this.point += inc;
    this._message(`You've got ${this.point} points.`);
    if (this.point >= this.pointToWin) {
      this.stop();
      this._message(`Mission complete!`);
    }
  }
  gameOver() {
    this.stop();
    this._message(`Game over.`);
    
    let restartAfter = 5;
    const restart = setInterval(() => {
      restartAfter--;
      if (restartAfter > 0) {
        this._message(`The game restarts after ${restartAfter}s...`);
      } else {
        clearInterval(restart);
        this.reset();
      }
    }, 1000);
  }
  start() {
    if (!this.isPlaying) {
      this.state = GameState.RUNNING;
      this.point = 0;
      this.gainPoint(0);

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
      this.state = GameState.PAUSED;
      clearInterval(this.tick);
      this.tick = null;
    }
  }
  reset() {
    this.state = GameState.IDLE;
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