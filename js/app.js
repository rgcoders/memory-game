/// Create Card Deck Array
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

// select deck
const cardsContainer = document.querySelector(".deck");

// initiate empty arrays
let openedCards = [];
let matchedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
// Fisher–Yates shuffle. https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array) {
  var currentIndex = array.length,
  temporaryValue, randomIndex;

  while (currentIndex !== 0) {
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
  }
	return array;
}


// Initialize game
function init() {
  shuffle(icons);

  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);

  // Add Click Event to each Card
  click(card);
  }
}

// Click Event
// Initiate First Click as true;
let isFirstClick = true;

// Click Function
function click(card) {
// Event Listener
card.addEventListener("click", function () {

if (isFirstClick) {
// Start timer
startTimer();
// Change First Click to false
isFirstClick = false;
}

// set card values
const currentCard = this;
const previousCard = openedCards[0];

// If card is open...
if (openedCards.length === 1) {

  // add 3 classes to card
  card.classList.add("open", "show", "disable");
  openedCards.push(this); // push card to array []

  // compare cards via compare function
  compare(currentCard, previousCard);

} else {
  // If card is closed, add 3 classes to currentCard
  currentCard.classList.add("open", "show", "disable");
  openedCards.push(this); // push card to openedCards Array []
  }
  });
}


// Compare cards
function compare(currentCard, previousCard) {

  // If cards match...
  if (currentCard.innerHTML === previousCard.innerHTML) {
  // add match class to both cards
  currentCard.classList.add("match");
  previousCard.classList.add("match");

  // push matched cards to matchCards array[]
  matchedCards.push(currentCard, previousCard);

  // reset openedCards array to empty []
  openedCards = [];

  // Run function: Is game over?
  isOver();

  // If cards don't match...
  } else {
  // Wait a half-second: setTimeout
  // then remove 3 classes from cards
  setTimeout(function () {
  currentCard.classList.remove("open", "show", "disable");
  previousCard.classList.remove("open", "show", "disable");
  }, 500);

  // reset openedCards array to empty []
  openedCards = [];
  }

  // Increment move ++
  addMove();
}

// Start New Game
function newGame() {
  // CLEAR DECK and RESTART Game
  cardsContainer.innerHTML = "";
  init(); // Initialize new game
  reset(); // reset variable values
  }


// Is the game is over?
function isOver() {
  if (matchedCards.length === icons.length) {
  // If the game is over...
  stopTimer(); // Stop our timer
  modalBox(); // Run Function: Modal Box
  }
}

// Game moves
// Select moves container
const movesContainer = document.querySelector(".moves");
let moves = 0; // initiate moves variable at 0
movesContainer.innerHTML = 0; // iniitally set moves container to 0

// Increment moves ++
function addMove() {
moves++;
movesContainer.innerHTML = moves;

// Set game rating
rating();
}

// Rating Section
// Select stars container
const starsContainer = document.querySelector(".stars");
// set HTML tags for 'star' variable
const star = `<li><i class="fa fa-star"></i></li>`;
// set initial HTML to 3 stars
starsContainer.innerHTML = star + star + star;
// initialize starCount at 0. starCount will determine final game rating
let starCount = 0; // RG Add

// Run rating function
function rating() {

  // set startCount and game rating based on total moves when game ends
  if (moves < 10) {
  starsContainer.innerHTML = star + star + star;
  starCount = 3;
  } else if (moves < 15) {
  starsContainer.innerHTML = star + star;
  starCount = 2;
  } else {
  starsContainer.innerHTML = star;
  starCount = 1;
  }
}


// Timer
// select timer container
const timerContainer = document.querySelector(".timer");
// initiate timer variables
let liveTimer,
totalSeconds = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';

// start timer
// setInterval: 1 second delay (1000 ms)
function startTimer() {
liveTimer = setInterval(function () {
// Increase the totalSeconds by 1
totalSeconds++;
// Update the HTML Container with the new time
timerContainer.innerHTML = totalSeconds + 's';
}, 1000);
}

// stop timer
// clearInterval
function stopTimer() {
clearInterval(liveTimer);
}

// Restart Button
// select restart container
const restartBtn = document.querySelector(".restart");
// add 'click' Event Listner: Button
restartBtn.addEventListener("click", function () {
// Delete ALL cards
cardsContainer.innerHTML = ""; // empty string

// run init function to initialize new game
init();
// run reset function to reset game values
reset();
});


// Reset Game Variables for new game
function reset() {
// Empty the matchedCards array []
matchedCards = [];

// Reset moves variable
moves = 0; // ARGH!!!  Some where in code increments by 1 ++ to start new game at 0;
movesContainer.innerHTML = moves;

// Reset rating to original state 3 stars
starsContainer.innerHTML = star + star + star;

stopTimer(); // stop timer
isFirstClick = true; // reset First Click to true
totalSeconds = 0; // reset seconds to 0
timerContainer.innerHTML = totalSeconds + "s"; // reset innerHTMl: 0s
}


// Modal content
function modalBox() {
// select modal container
let modal = document.getElementById('myModal');
// select <span> element
let span = document.getElementsByClassName("close")[0];

// open the modal
modal.style.display = "block";

// dynamically add Congrats Msg
let congratsMsg = document.querySelector(".congrats");
congratsMsg.innerHTML = `Congratulations! It took you ${totalSeconds} seconds to win the game in ${moves+1} moves. You earned ${starCount} star(s). To play again, click the Play triangle to the right.`;

// When the user clicks on <span> triangle, close the modal
span.onclick = function () {
modal.style.display = "none"; // close modal
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none"; // close modal
    }
  }
}

// Start the game. Oh yeah!
init();
