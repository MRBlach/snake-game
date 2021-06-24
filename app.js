
// import data from the snake.js file; seperate each import with a comma and include the from file path
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'

import { update as updateFood, draw as drawFood } from './food.js'

import { outsideGrid } from './grid.js'

alert('\nWelcome to Snake In The Grass!\n\nEat as many eggs as you can, but don\'t hit your own tail or go out of bounds.')
// set speed of UI rendering
let lastRenderTime = 0

let gameOver = false

// grab the gameboard div from the index.html file
const gameBoard = document.getElementById('game-board')

// set function so game knows the current time upon UI rendering
function main(currentTime) {
  if (gameOver) {
    if (confirm('GAME OVER. Press ok to reset.')) {
      window.location = '/'
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
// tells the browser that you wish to perform an animation and requests that the browser calls a specified function, in this case 'main,' to update an animation before the next repaint
window.requestAnimationFrame(main)



// update the snakes position and length
function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

// render the correct position and length of the snake
function draw() {
  // clear old snake pieces
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

// check for gameover
function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}