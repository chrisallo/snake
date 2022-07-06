
# Snake

Snake is a well-known classic arcade game that a little snake grows by eating dots in a tessellated map. This project is designed for training purpose so it's basically incomplete. You can build up the project by branching out from the `main` branch to complete the game.

## Basic features

- A game starts by pressing `spacebar`.
  - A snake food is randomly generated in the board. The location should not overlap with the snake nor be around the path where the snake is heading.
  - The snake starts moving once the game starts.
  - A player could control the snake with arrow keys later on.
- If the snake eats the food,
  - Increase the length of the snake.
  - Increase the point.
  - Remove the current food and generate another one.
- If the snake goes out of the board or over himself, stop the game and show `Game over` message and reset the game in 5s.
- If the point reaches to `SNAKE_LENGTH_TO_WIN`, stop the game and show `Mission complete!` message.

## Advanced

- Every time the point increases by `10`, generate a bomb that the snake explodes when he eats. Eating a bomb stops the game and show `Game over` message and reset the game in 5s.
- When the point goes over `30`, increase the speed of the snake.

## How to run

- `npm install`
- `npm run start`