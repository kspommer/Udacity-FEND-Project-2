// Susan Pommer 
// FEND May 2018 

/*
 * Create a list that holds all of your cards
*/
 // Build HTML collection of elements with class = cards
var cardsHtmlCollection = document.getElementsByClassName('card');

// Convert HTML Collection to an Array 
// Help provided by:  https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
var cardArray = [].slice.call(cardsHtmlCollection);

// Create an empty array for card names (class name on i element)
var cardNames = [];

// Create an empty array for shuffled cards
var shuffledCardNames = [];

// Initialize new string variable (to hold new shuffled card HTML)
var newCardContentHTML = '';

// Loop to get card names (class name of i element)
for (let j = 0; j < cardArray.length; j++) {
	var card = cardArray[j].querySelector('i');
	// add each card to array 
	cardNames.push(card);
}

// IMPORTANT: Ensure DOM fully loaded before other actions triggered!
document.addEventListener('DOMContentLoaded', function () {
});

// reset button variable
var resetButton = document.querySelector(".restart");

// actions driven when user hits reset button 
resetButton.addEventListener("click", function() { 
	// delete existing deck displayed
	var deck = document.querySelector('.deck');
	deck.remove();

	// create new deck with class=deck
	var newDeck = document.createElement('ul');
	newDeck.classList.add("deck");

	// call function to suffle cards
	shuffledCardNames = shuffle(cardNames); 

	// refresh display of cards on screen
	refreshDeckHTML(shuffledCardNames, newDeck);

	// remove stars and reset number of moves 
	resetStars();
	resetNumberMoves();
	
	// initialize counters
	var moveCounter = 0;
	//var matchCounter = 0;
	//var numberOfCardClicks = 0;

	// ADD STOP AND RESET TIMER

	// Assign variable to all cards 
	var cardNodesList = document.querySelectorAll(".card");
	// convert NodeList to an array to use
	var cardNodesArray = [].slice.call(cardNodesList);
	// create array to hold all open cards
	var openCardNames = [];

 // Set up the event listener on each card. If a card is clicked:
 // - display the card's symbol (put this functionality in another function that you call from this one)
 // - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 // - if the list already has another card, check to see if the two cards match

	cardNodesArray.forEach(function(card) {
		card.addEventListener("click", function() {
			// if click on card that is already open, take no action
			if (card.className == "card open show") {
				return; 
			}
			else {
				// length of open card array
				var numberOpen = openCardNames.length
				console.log(numberOpen);	
				// open card or check for match 
				if (numberOpen < 2) {
					// call function to open card on click
					moveCounter = openCard(card, moveCounter);
					console.log(moveCounter); // REMOVE  
					// call function to add card to array 
					openCardNames = addToOpenCardArray(card, openCardNames);
					console.log(openCardNames); // REMOVE 
				}	
			}
			// if two items in array, check for match 
			if (moveCounter == 2) {
				// call function to check for match  
				checkMatch(openCardNames);
			}
		});	
	});	
}); 


function openCard(card, countMoves) {
	// flip card (add class="open", class="show" (see CSS)
	card.classList.add("open", "show");
	console.log("flip");  // REMOVE 
	// increment counter
	countMoves = countMoves + 1;
	console.log(countMoves); // REMOVE 
	return countMoves; 
}

function addToOpenCardArray(card, openCardNames) {
	// determine open card name 
	var openCard = card.querySelector("i").className;
	// add open card to open card array
	openCardNames.push(openCard);
	console.log(openCardNames); // REMOVE 
	return openCardNames; 
}

// if match, call matchedCardsLock
// if no match, remove appended card from list
// if not match, call closeCard function to flip to back) 
function checkMatch(openCardNames) {
	// find length of array 
	var totalOpen = openCardNames.length;	
	console.log(totalOpen); // REMOVE
	// compare last and second-to-last array entries (as using push to add cards to array
	if (openCardNames[totalOpen-1] === openCardNames[totalOpen-2]) {
		console.log("MATCH!"); // REMOVE
		// reset number of card clicks 
		numberOfCardClicks = 0;
		// check if all cards matched, call pop-up window function
		if ((totalOpen/2) == 8) {
			console.log("all matches made!");
			//function endOfGame();
		}
	}
	else {
		console.log("not a match");
		// do not increments counters
		// close two unmatched cards
		flipCards(openCardNames);
		// remove last two cards from OpenCardNames array
		openCardNames = removeCards(openCardNames);
		return(openCardNames);
		console.log("unmatched done");
	}	
}

function matchedCardsLock(openCardNames) {
	// remove open and show classes
	card.classList.remove("open", "show");
	// add match class to lock card
	card.classList.add("match"); 
}

function flipCards(openCardNames) {
// if card symbol does not have a match
// change from CSS card with symbol (face) to CSS for black card (back)
	// flip card (add class="open", class="show" (see CSS)
	card.classList.remove("open", "show");
}

function removeCards(openCardNames) {
	// remove card from openCardNames array
	openCardNames.slice(-2); 
	console.log(openCardNames); // REMOVE 
 	return openCardNames;
}

// FUNCTIONS //

// Display the cards on the page 
// Shuffle the list of cards using provided "shuffle" method 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

 // Loop through each card in shuffled deck and create its HTML
 // Add each card's HTML to the page
	// create HTML for each card
	// display new reshuffled cards
function refreshDeckHTML(shuffledCardNames, newDeck) {
	for (i = 0; i < shuffledCardNames.length; i++) {
		// create new li element 
		var newCard = document.createElement('li')
		// add "class=card" to li element
		newCard.classList.add("card");
		// create new <i> element with class fa and card name
		// e.g. <i class "fa fa-bomb"></i>
		var cardContent = shuffledCardNames[i];
		// insert i element into li element  
		newCard.appendChild(cardContent);
		// add to card newDeck
		newDeck.appendChild(newCard);
	}
	// add new deck to <div class="container"> to get to display
	var divBody = document.querySelector('.container')
	divBody.appendChild(newDeck);
} 

// Reset stars so none are displayed
function resetStars() {
	var stars = document.querySelector('.stars');
	stars.remove();
}

// Reset number of moves to 0
function resetNumberMoves() {
	var moves = document.querySelector('.moves'); 
	moves.textContent = 0; 
}

/* 
 * When the open card array has two cards, check to see if the two cards match
 * + if the cards match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 * + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/



//https://albert-gonzalez.github.io/easytimer.js/
function startTimer() {
// on first click (moveCounter = 1), of eventlistener, 
// start timer
// display timer in CSS

}

function stopTimer() {
// when matchCounter = 8 
// end timer
// display final time in CSS
}

function resetTimer() {
// when reset button is hit
// stops timer if running
// resets timer = 00.00.00
}

function congratsPopup() {
	// call this function when matchCounter = 8; 
	// launch alert with message 
	// pop-up has play again button with class = reset
	// add class restart to button on pop-up window too!
}

function displayStarRating() {
// if moveCounter > Y, display one star
// if moveCounter > X and < Y , display two stars
// if move counter < X display three stars 
// note:  more stars is good :-) 
}

function displayNumberMoves() {
	// blah blah
}
