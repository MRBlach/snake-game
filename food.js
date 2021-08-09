// Import data from the snake.js file; seperate each import with a comma and include the from file path
import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';

// Assign position of food to a variable
let food = getRandomFoodPosition()
// Declare added length of snake upon food consumption
const EXPANSION_RATE = 2
// Update snake length if food eaten
export function update() {
 if (onSnake(food)) {
   expandSnake(EXPANSION_RATE)
   food = getRandomFoodPosition()
 }
}

// Render the gameboard 
export function draw(gameBoard) {
    // Create food element
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
  
  // Append food element to the gameboard   
  gameBoard.appendChild(foodElement)
  
  
}

// Move food to new random space after snake eats it
function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}

