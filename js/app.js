/*
 * Create a list that holds all of your cards
 */
 
 // HTML collection 
//var cardList = document.getElementsByClassName('deck');
var cardsHtmlCollection = document.getElementsByClassName('card');
console.log(cardsHtmlCollection);

// Extract i tags content from each card class element
for (let i = 0; i < cardsHtmlCollection.length; i++ ) {
	var cardList = cardsHtmlCollection[i]
}

console.log(cardList);  // REMOVE 

for (let j = 0; j < cardList.length; j++) {
	var cardNames = cardList[j].child();
	console.log(cardNames);
}

console.log(cardNames); // REMOVE

// Make sure DOM fully loaded before other actions 
document.addEventListener('DOMContentLoaded', function () {
	console.log("DONE");  // REMOVE
});

var resetButton = document.querySelector(".restart");
console.log(resetButton); // REMOVE 

resetButton.addEventListener("click", function () {
	shuffle(cardName); 
	var moveCounter = 0;
	var matchCounter = 0;
	// Stop and reset timer
	console.log("GOT TO HERE 2");// REMOVE
});

 //loop through each card and create its HTML
 //add each card's HTML to the page
 
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
    console.log ("GOT TO HERE 3") // REMOVE 
}

/*
var resetButton = document.getElementByClassName("restart");
// add class restart to button on pop-up window too!

resetButton.addEventListener("click", function( {
// start back at main 
// call function shuffle(array);
// reset moveCounter, matchCounter = 0
// Stop and reset timer

}); 


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 

target.addEventListener("click", function () {
// when click on any card 
// call cardDisplay function 
// call openCardsList function 
}


function openCard() {
// when eventlistener for card click is clicked call this function 
// display the card's symbol 
// change from CSS for black card (back) to CSS for card with symbol (face)

}

function closeCard() {
// if card symbol does not have a match in openCardsList
// change from CSS card with symbol (face) to CSS for black card (back)
// remove symbol from openCardsList

}

function openCardHold {
// if card symbol finds match in openCardsList
// lock card open -- on click, nothing happens

}

function openCardsList {
// when eventlistener for card click is clicked call this function 
// add the card symbol to a list of open cards
// list must be initialized above 
// append list with card symbol

}

function checkOpenCardsList {
// when eventlistener for card clicked and openCardsList created, then call this function
// check appended card symbol with other symbols in list
// if match, call openCardHold
// if match, call matchCounter function
// if no match, remove appended card from list
// if not match, call closeCard function to flip to back) 
}


function moveCounter {
// when eventlistener for card click is clicked call this function 
// initialize this counter above   moveCounter = 0; 
// moveCounter = moveCounter + 1;
// change class = moves.innerHTML = +1
}

function matchCounter() {
// initialize above matchCounter = 0; 
// call this function when match is found in checkOpenCardsList
// matchCounter = matchCounter + 1;
}


function startTimer{
// on first click (moveCounter = 1), of eventlistener, 
// start timer
// display timer in CSS

}

function stopTimer {
// when matchCounter = 8 
// end timer
// display final time in CSS
}

function resetTimer {
// when reset button is hit
// stops timer if running
// resets timer = 00.00.00
}


var resetButton = document.getElementByClassName("restart");
// add class restart to button on pop-up window too!

resetButton.addEventListener("click", function( {
// start back at main 
// call function shuffle(array);
// reset moveCounter, matchCounter = 0
// Stop and reset timer

}); 

function congratsPopup() {
	// call this function when matchCounter = 8; 
	// launch alert with message 
	// pop-up has play again button with class = reset
}

function starRating() {
// if moveCounter >Y, display one star
// if moveCounter >X and < Y , display two stars
// if move counter <X display three stars 
// note:  more stars is good :-) 
}
*/


