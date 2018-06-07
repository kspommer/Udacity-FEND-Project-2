// Susan Pommer 
// FEND May - June 2018 
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
// Initialize timer variables
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timer;

// Loop to get card names (class name of i element)
for (let j = 0; j < cardArray.length; j++) {
	var card = cardArray[j].querySelector('i');
	// Add each card to array 
	cardNames.push(card);
}

// IMPORTANT! Ensure DOM fully loaded before other actions triggered!
document.addEventListener('DOMContentLoaded', function () {
});

// Reset button variable
var resetButton = document.querySelector(".restart");

// When user hits reset button, reset board, timer
resetButton.addEventListener("click", function() { 
	resetBoard();
});

// Get the <span> element that closes the modal 
var closeButton = document.querySelector(".close");

// Get the button element that restarts the game 
var restartGame = document.querySelector(".playAgain");

// Get the modal
var modal = document.getElementById("myModal");

// If user clicks on <span>(X), close the modal
closeButton.addEventListener("click", function() {
	modal.style.display = "none";
});

// If user clicks restart game button, refresh board/counter/timer
restartGame.addEventListener("click", function() {
	resetBoard();
	modal.style.display = "none";
});

// FUNCTIONS //

function resetBoard() {	
	// Delete existing deck displayed
	var deck = document.querySelector('.deck');
	deck.remove();

	// Create new deck with class=deck
	var newDeck = document.createElement('ul');
	newDeck.classList.add("deck");

	// Call function to suffle cards
	shuffledCardNames = shuffle(cardNames); 

	// Refresh display of cards on screen
	refreshDeckHTML(shuffledCardNames, newDeck);

	// Remove stars and reset number of moves 
	resetStars();
	resetNumberMoves();
	
	// ADD TIMER RESET HERE
	var totalSeconds = 0;

	// (Re)Initialize counters
	var totalClicks = 0;
	var totalMoves = 0;
	var clickCounter = 0;

	// Assign variable to all cards 
	var cardNodesList = document.querySelectorAll(".card");
	// Convert NodeList to an array to use
	var cardNodesArray = [].slice.call(cardNodesList);
	// Create array to hold all open card names
	var openCardNames = [];
	// Get HTML collection of stars
	var starNodeList = document.getElementsByClassName('fa fa-star')
	// Convert start NodeList to an array to use
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
				// increment clickCounter
				// increment total clicks
				totalClicks = totalClicks + 1
				totalMoves = totalClicks / 2

				if ((totalClicks % 2) == 0) {
					// display increase in moves 
					displayNumberMoves(totalMoves);	
					// change star rating
					displayStarRating(totalMoves);	
					// calc starRating 
					var starRating = countStars(totalMoves);
				}
				// increment clickcounter
				clickCounter = clickCounter + 1;
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
			}		
			// on first click (totalMoveCounter = 1), restart timer
			if (totalClicks == 1) {
				timer = setInterval(setTime, 1000); 
				card.addEventListener("click", function() {
					setTime(timer); 
				});
			}

			// calculate length of openCardNames array 
			arrayLength = openCardNames.length; 
			// check if game is over 
			if (arrayLength == 2) { // NEED TO CHANGE TO 16
				var time = getTime(); 
				clearInterval(timer); 
				// Launch congrats modal 
				congratsPopup(time, starRating);
			}; 
		});
	});			
};	

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

function countStars(totalMoveCounter) {
	if (totalMoveCounter<10)
		starRating = 3; 
	else if (totalMoveCounter>=10 && totalMoveCounter<20)
		starRating = 2; 
	else if (totalMoveCounter>=20 && totalMoveCounter<30)
		starRating = 1; 
	else if (totalMoveCounter>=30)
		starRating = 0; 
	return starRating; 
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
		// lock the matched cards
		cardNodesArray = matchedCardsLock(cardNodesArray);
	}
	else {
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
	setTimeout(function() { 
		cardNodesArray.forEach(function(card) {
			if (card.className == "card open show") {
				// remove class = "open" and "show"
				card.classList.remove("open", "show"); 
			}
		return cardNodesArray
		});	
	}, 500); 	
}; 

// remove two unmatched cards from openCardNames array (last in array)
function removeCards(openCardNames) {
	openCardNames.pop();
	openCardNames.pop(); 
 	return openCardNames;
};

// call this function when openCardNames array length = 16 (after match function executed)
// launch modal with message and play again button
function congratsPopup(endTime, starRating) {
	setTimeout(function() {  		
		// Get the modal
		var modal = document.getElementById("myModal");
		// Get the paragraph in the modal 
		var modalParagraph = document.getElementById("modalText");
		var line1 = "Congratulations!<br>";
		var line2 = "You finished the game in:  " + endTime + "<br>";
		var line3 = "Your star rating is:  " + starRating + "<br>";
		var line4 = "Do you want to play again?";

		// Add content to the <p class=modalText> element 
		modalParagraph.innerHTML = (line1 + line2 + line3 + line4);

		// Open the modal 
		modal.style.display = "block";
	}, 400); 
};

// Timer functions
// refrence:  https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function setTime() {
	// increment total seconds
	++totalSeconds;
	// set what is displayed on page 
 	secondsLabel.innerHTML = pad(totalSeconds % 60); 
  	//seconds = pad(totalSeconds % 60); 
  	minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  	//minutes = pad(parseInt(totalSeconds / 60)); 
   	//time = minutes + ":" + seconds
   	//return time;
}

function getTime() {
	seconds = pad(totalSeconds % 60); 
	minutes = pad(parseInt(totalSeconds / 60)); 
	time = minutes + ":" + seconds
   	return time;
}

function pad(val) {
	var valString = val + ""
	if (valString.length < 2) {
    	return "0" + valString;
  	} 
  	else {
    	return valString;
  	}
}	