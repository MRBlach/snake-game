
// Import data from the snake.js file; seperate each import with a comma and include the from file path
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

// Inform user of game instructions
alert('\nWelcome to Snake In The Grass!\n\nEat as many eggs as you can without hitting your own tail or leaving the yard.')

// Set speed of UI rendering
let lastRenderTime = 0

let gameOver = false

// Grab the gameboard div from the index.html file
const gameBoard = document.getElementById('game-board')

// Set function so game knows the current time upon UI rendering
function main(currentTime) {
  if (gameOver) {
    if (confirm('GAME OVER. Press ok to reset.')) {
      location.reload();
    }
    return
  }

  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
  

  lastRenderTime = currentTime
  
  update()
  draw()
}
// Tells the browser that you wish to perform an animation and requests that the browser calls a specified function, in this case 'main,' to update an animation before the next repaint
window.requestAnimationFrame(main)



// Update the snakes position and length
function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

// Render the correct position and length of the snake
function draw() {
  // Clear old snake pieces
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

// Check for gameover
function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
