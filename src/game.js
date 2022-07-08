
import { Board } from './component/board.js';
import { BlockType } from './component/boardBlock.js';
import { Snake, SnakeDirection } from './component/snake.js';

const DEFAULT_TICK_INTERVAL = 300;
const DEFAULT_SNAKE_LENGTH_TO_WIN = 50;

const GameState = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETE: 'complete',
};

export class Game {
  constructor({
    tickInterval = DEFAULT_TICK_INTERVAL,
    pointToWin = DEFAULT_SNAKE_LENGTH_TO_WIN,
  }) {
    this.board = new Board({});
    this.snake = null;
    this.food = [-1, -1];
    this.reset();

    this.point = 0;
    this.pointToWin = pointToWin;

    this.tick = null;
    this.tickInterval = tickInterval;

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
  generateSnakeFood() {
    if (this.isPlaying) {
      // TODO:
      console.log('hi');

      let food_x = Math.floor(Math.random() * 25 + 1); 
      let food_y = Math.floor(Math.random() * 25 + 1); 

      console.log(food_x);
      
      this.board.setBlockAs(food_x, food_y, BlockType.FOOD);

      /*
      if(){
        this.board.setBlockAs(food_x, food_y, BlockType.FOOD);
      }
      */

    }
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
    
    // TODO:
    
    var timeleft = 5;

    var reset_Timer = setInterval(function(){
      document.getElementById(message).innerHTML = timeleft + " seconds remaining for reset";
      timeleft -= 1;
      if(timeleft <= 0){
        clearInterval(reset_Timer);
        this.reset();
      }
    }, 1000);
    
    //setTimeout(reset, 3000);
    
  }
  start() {
    if (!this.isPlaying) {
      this.state = GameState.RUNNING;
      this.gainPoint(0);
      this.generateSnakeFood();

      //console.log('hellohello');

      this.tick = setInterval(() => {
        const { head, footprint, grown } = this.snake.move();
        // TODO:

        //console.log('hellohello');

        //this.board.setBlockAs(nextX, nextY, BlockType.SNAKE);
        //this.board.setBlockAs(lastX, lastY, BlockType.SNAKE);

        

        this.board.render();
      }, this.tickInterval);
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

    this.point = 0;
    this.board.render();
    this._message('Press spacebar to start.');
  }
}