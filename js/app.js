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
	var totalMoveCounter = 0;
	var clickCounter = 0;

	// ADD STOP AND RESET TIMER

	// Assign variable to all cards 
	var cardNodesList = document.querySelectorAll(".card");
	// convert NodeList to an array to use
	var cardNodesArray = [].slice.call(cardNodesList);
	// create array to hold all open card names
	var openCardNames = [];
	// get HTML collection of stars
	var starNodeList = document.getElementsByClassName('fa fa-star')
	// convert start NodeList to an array to use
	var starArray = [].slice.call(starNodeList);

 // Set up the event listener on each card. If a card is clicked:
 // - display the card's symbol (put this functionality in another function that you call from this one)
 // - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 // - if the list already has another card, check to see if the two cards match
	cardNodesArray.forEach(function(card) {
		card.addEventListener("click", function() {
			// if click on card that is already open, take no action
			if ((card.className == "card open show") || (card.className == "card open show match")) {
				return; 
			}
			else {
				// increment total moves
				totalMoveCounter = totalMoveCounter + 1
				console.log(totalMoveCounter) // REMOVE

				// display increase in moves 
				displayNumberMoves(totalMoveCounter);	
				// change star rating
				displayStarRating(totalMoveCounter);
				// increment counter
				clickCounter = clickCounter + 1;
				console.log(clickCounter) // REMOVE 

				if (clickCounter == 1) {
					// call function to open card #1 on click
					openCard(card);
					// call function to add card to openCardNames array 
					openCardNames = addToOpenCardArray(card, openCardNames);
				}
				else if (clickCounter == 2) {
					// call function to open card #2 on click
					openCard(card);
					// call function to add card to openCardNames array 
					openCardNames = addToOpenCardArray(card, openCardNames);
					// call match function
					checkMatch(card, openCardNames, cardNodesArray);
					// reset clickCounter
					clickCounter = 0; 	
				} 
			};
		});
	});		
}); 


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

// On click of reset, display three stars
function resetStars() {
    // select panel
	var starPanel = document.querySelector('.stars'); 
	// find number of existing stars
	var stars = document.getElementsByClassName('fa fa-star');
	var starsNeeded = (3-stars.length);

	// loop to add up to three stars
	for (var i=0; i<starsNeeded; i++) {
		// create li
		var starList = document.createElement('li'); 
		// create and add an image with class = "fa fa-star"
		var newStar = document.createElement('i');
		// add classes "fa fa-star" to image element
		newStar.classList.add("fa", "fa-star");
		// add images to li
		starList.appendChild(newStar);
		// add li to ul
		starPanel.appendChild(starList);
	}	
}
 
// Reduce number of stars displayed based on total moves
function displayStarRating(totalMoveCounter) {
	// select star li
	var star = document.querySelector('li');
	// remove star at certain total number of clicks 
	if (totalMoveCounter == 10 || totalMoveCounter == 20 || totalMoveCounter == 30) {
		// remove star
		star.remove();	
	}	
}

// Reset number of moves to 0
function resetNumberMoves() {
	var moves = document.querySelector('.moves'); 
	moves.textContent = 0; 
}

// display number of moves 
function displayNumberMoves(totalMoveCounter) {
	var moves = document.querySelector('.moves'); 
	moves.textContent = totalMoveCounter
}

/* 
 * When the open card array has two cards, check to see if the two cards match
 * + if the cards match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 * + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
// flip open card which is not already open or matched on click 
function openCard(card) {
	// flip card (add class="open", class="show" (see CSS)) 
	card.classList.add("open", "show");
};

function addToOpenCardArray(card, openCardNames) {
	// determine open card name 
	var openCard = card.querySelector("i").className;
	// add open card to open card array
	openCardNames.push(openCard); 
	return openCardNames; 
};

// if match, call matchedCardsLock
// if no match, remove appended card from list
// if no match, call closeCard function to flip to back 
function checkMatch(card, openCardNames, cardNodesArray) {
	// find length of array 
	var totalOpen = openCardNames.length;	
	// compare last and second-to-last array entries (as using push to add cards to array
	if (openCardNames[totalOpen-1] === openCardNames[totalOpen-2]) {
		console.log("MATCH!"); // REMOVE
		// lock the matched cards
		cardNodesArray = matchedCardsLock(cardNodesArray);
	}
	else {
		console.log("not a match"); // REMOVE 
		// close two unmatched cards
		cardNodesArray = flipUnmatchedCards(cardNodesArray);
		// remove last two cards from OpenCardNames array
		openCardNames = removeCards(openCardNames); 
	}	
}; 

// lock matching cards
function matchedCardsLock(cardNodesArray) {
	cardNodesArray.forEach(function(card) {
		if (card.className == "card open show") {
			// after determined a match, add class = "match"
			card.classList.add("match");
		}
	return cardNodesArray
	});
};

// flip over unmatched cards
function flipUnmatchedCards(cardNodesArray) {
	setTimeout(function(){ 
		cardNodesArray.forEach(function(card) {
			if (card.className == "card open show") {
				// remove class = "open" and "show"
				card.classList.remove("open");
				card.classList.remove("show");
			}
			return cardNodesArray
		});
	}, 700);	
}; 

// remove two unmatched cards from openCardNames array (last in array)
function removeCards(openCardNames) {
	openCardNames.pop();
	openCardNames.pop(); 
 	return openCardNames;
};

function congratsPopup() {
	console.log("You win!"); // NEED TO BUILD OUT ALERT
	// call this function when matchCounter = 8; 
	// launch alert with message 
	// pop-up has play again button with class = reset
	// add class restart to button on pop-up window too!
};

//
//https://albert-gonzalez.github.io/easytimer.js/
function startTimer() {
// on first click (moveCounter = 1), of eventlistener, 
// start timer
// display timer in CSS
};

function stopTimer() {
// when matchCounter = 8 
// end timer
// display final time in CSS
};

function resetTimer() {
// when reset button is hit
// stops timer if running
// resets timer = 00.00.00
};
