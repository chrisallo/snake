
const INITIAL_SNAKE_LENGTH = 3;

export const SnakeDirection = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
};

export class Snake {
  constructor({
    startX,
    startY,
    initialLength = INITIAL_SNAKE_LENGTH,
  }) {
    this.tail = [];
    this.length = initialLength;
    this.direction = SnakeDirection.UP;
    for (let i = 0; i < this.length; i++) {
      this.tail.push([startX, startY + i]);
    }
  }
  hasTailOf(x, y) {
    return this.tail.slice(1)
      .some(([tailX, tailY]) => tailX === x && tailY === y);
  }
  isGoingOppositeOf(direction) {
    switch (direction) {
      case SnakeDirection.UP:
        return this.direction === SnakeDirection.DOWN;
      case SnakeDirection.DOWN:
        return this.direction === SnakeDirection.UP;
      case SnakeDirection.LEFT:
        return this.direction === SnakeDirection.RIGHT;
      case SnakeDirection.RIGHT:
        return this.direction === SnakeDirection.LEFT;
    }
  }
  turn(direction) {
    if (!this.isGoingOppositeOf(direction)) {
      this.direction = direction;
    }
  }
  move() {
    const [lastX, lastY] = this.tail.pop();
    const [firstX, firstY] = this.tail[0];
    let nextX, nextY;
    switch (this.direction) {
      case SnakeDirection.UP: {
        [nextX, nextY] = [firstX, firstY - 1];
        break;
      }
      case SnakeDirection.DOWN: {
        [nextX, nextY] = [firstX, firstY + 1];
        break;
      }
      case SnakeDirection.LEFT: {
        [nextX, nextY] = [firstX - 1, firstY];
        break;
      }
      case SnakeDirection.RIGHT: {
        [nextX, nextY] = [firstX + 1, firstY];
        break;
      }
    }
    this.tail.unshift([nextX, nextY]);
    return {
      head: [nextX, nextY],
      footprint: [lastX, lastY],
    };
  }
}