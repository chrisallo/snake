
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
    this.nextDirection = this.direction;
    this.willGrow = false;
  }
  hasEaten(x, y) {
    const [headX, headY] = this.tail[0];
    return headX === x && headY === y;
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
      this.nextDirection = direction;
    }
  }
  grow() {
    this.willGrow = true;
  }
  move() {
    const grown = this.willGrow;
    const [lastX, lastY] = !grown ? this.tail.pop() : this.tail[this.tail.length - 1];
    const [currentX, currentY] = this.tail[0];
    let nextX, nextY;
    switch (this.nextDirection) {
      case SnakeDirection.UP: {
        [nextX, nextY] = [currentX, currentY - 1];
        break;
      }
      case SnakeDirection.DOWN: {
        [nextX, nextY] = [currentX, currentY + 1];
        break;
      }
      case SnakeDirection.LEFT: {
        [nextX, nextY] = [currentX - 1, currentY];
        break;
      }
      case SnakeDirection.RIGHT: {
        [nextX, nextY] = [currentX + 1, currentY];
        break;
      }
    }
    this.direction = this.nextDirection;
    this.tail.unshift([nextX, nextY]);
    this.willGrow = false;
    return {
      head: [nextX, nextY],
      footprint: [lastX, lastY],
      grown,
    };
  }
}