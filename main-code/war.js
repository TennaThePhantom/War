import { cardGameChose } from "./cards-mode.js";
import * as warCards from "./cards.js";

/*
future me (for now)
fix the small bug issue when both players have different amount of cards
make sure when the cards reach 0 it's gets the added cards then displays next card
make a shuffle function for the added cards 
add numbers to deck cards and add a small card pile to show cards won
do the war cars function that does war 
add comments 

Quiley of life maybe make card highlight green if player wins if player loses highlight red

*/
const gameCards = {
	playerOneDeck: [],
	playerTwoDeck: [],
	player1CardsWon: [],
	player2CardsWon: [],
	player1CardValue: 0,
	player2CardValue: 0,
	warCardBattle: [], // cards that are in the center
	gameCardImage(cardSrc, leftOrRight) {
		// creates the cards
		const imageElement = document.createElement("img");
		imageElement.src = cardSrc;
		imageElement.className = `${twCSS.cardImageSize} ${leftOrRight}`;
		return imageElement;
	},
	removeFirstCard (playerDeck) {
		if (playerDeck.length > 0) {
			return playerDeck.shift(); // Removes and returns the first card from the array
		} else {
			return null; // If the deck is empty, return null
		}
	},
	resetWarCards (){
		this.warCardBattle = []
		return this.warCardBattle
	},
	resetPlayerOneCardsWon(){
		this.player1CardsWon = []
		return this.player1CardsWon
	},
	resetPlayerTwoCardsWon(){
		this.player2CardsWon = []
		return this.player2CardsWon
	},
};

const twCSS = {
	battleContainer:
		"tw-flex tw-justify-center	tw-items-center	tw-h-auto tw-w-auto tw-gap-24 tw-p-12",
	cardImageSize: "tw-h-52 tw-w-32",
	leftImage: "tw-rotate-90",
	rightImage: "tw-rotate-[-90deg]",
	player1DeckPosition:
		"tw-absolute tw-right-[27%] tw-h-52 tw-w-32 tw-rounded tw-cursor-pointer",
	player2DeckPosition: "tw-absolute tw-left-[27%] tw-h-52 tw-w-32 tw-rounded",
};
const battleContainer = document.createElement("div"); // container for players to place cards
const player1Hand = document.createElement("img"); // the deck of cards
const player2Hand = document.createElement("img");
const body = document.getElementById("bodyContainer");

export function createGameScreen() {
	// make this as a method for future images

	battleContainer.className = twCSS.battleContainer;
	player1Hand.src = warCards.cardsDeck.getBackOfCard();
	player1Hand.className = `${twCSS.player1DeckPosition} ${twCSS.rightImage}`;
	player2Hand.src = warCards.cardsDeck.getBackOfCard();
	player2Hand.className = `${twCSS.player2DeckPosition} ${twCSS.leftImage}`;

	dealCards();
	player1Hand.addEventListener("click", cardHitButtonHandler);
	// player1Hand.addEventListener("click", player2CardsHit )
	body.append(battleContainer, player1Hand, player2Hand);

}

function dealCards() {
	// starts the game
	warCards.cardsDeck.getCards();
	const { deck1, deck2 } = warCards.cardsDeck.drawTwoDecks(); // game cards into deck1 and deck2
	gameCards.playerOneDeck = deck1;
	gameCards.playerTwoDeck = deck2;

	console.log(gameCards.playerOneDeck);
	console.log(gameCards.playerTwoDeck);
}
let pokerCardImagePlayerOne = null;
let pokerCardImagePlayerTwo = null;

function cardHitButtonHandler() {
	player2CardsHit() // might change the position in the future but for now this is first because it allows the card to be position in the right order(player1 is right ai/player2 is left)

	// Check if there is already an image in the container and remove it if necessary
	if (pokerCardImagePlayerOne) {
		// Remove the previously appended card image
		battleContainer.removeChild(pokerCardImagePlayerOne);
		pokerCardImagePlayerOne = null; // Reset the image reference
	}
	// cards
	if (gameCards.playerOneDeck.length === 0) { // same thing as player 2 temporarily(adds the cards but when they are offset each player have different amounts of cards it doesn't work properly need to fix)
		gameCards.playerOneDeck.push(...gameCards.player1CardsWon)
		gameCards.resetPlayerOneCardsWon()
		const randomCard = gameCards.removeFirstCard(gameCards.playerOneDeck);
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerOne = gameCards.gameCardImage(cardSrc, twCSS.rightImage); // Create the new card image for player one
		const cardValue = randomCard.value;
		gameCards.player1CardValue = cardValue
		gameCards.warCardBattle.push(randomCard)
		console.log(gameCards.warCardBattle)
		console.log(gameCards.playerOneDeck);

		battleContainer.append(pokerCardImagePlayerOne); // Add the new card image to the container
	} else {
		const randomCard = gameCards.removeFirstCard(gameCards.playerOneDeck);
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerOne = gameCards.gameCardImage(cardSrc, twCSS.rightImage); // Create the new card image for player one
		const cardValue = randomCard.value;
		gameCards.player1CardValue = cardValue
		gameCards.warCardBattle.push(randomCard)
		console.log(gameCards.warCardBattle)
		battleContainer.append(pokerCardImagePlayerOne); // Add the new card image to the container
	}
	whoWinsWar()
}

// adds the cards from player two to screen
function player2CardsHit() {
	if (pokerCardImagePlayerTwo) {
		// Remove the previously appended card image
		battleContainer.removeChild(pokerCardImagePlayerTwo);
		pokerCardImagePlayerTwo = null; // Reset the image reference
	}
	// cards
	if (gameCards.playerTwoDeck.length === 0) {
		gameCards.playerTwoDeck.push(...gameCards.player2CardsWon)
		gameCards.resetPlayerTwoCardsWon()
		const randomCard = gameCards.removeFirstCard(gameCards.playerTwoDeck);
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerTwo = gameCards.gameCardImage(cardSrc, twCSS.leftImage); // Create the new card image for player two
		const cardValue = randomCard.value;
		gameCards.player2CardValue = cardValue
		gameCards.warCardBattle.push(randomCard)
		console.log(gameCards.playerOneDeck);
		battleContainer.append(pokerCardImagePlayerTwo); // Add the new card image to the container
	} else {
		const randomCard = gameCards.removeFirstCard(gameCards.playerTwoDeck);
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerTwo = gameCards.gameCardImage(cardSrc, twCSS.leftImage); // Create the new card image for player two
		const cardValue = randomCard.value;
		gameCards.player2CardValue = cardValue
		gameCards.warCardBattle.push(randomCard)
		battleContainer.append(pokerCardImagePlayerTwo); // Add the new card image to the container
	}
}

function whoWinsWar() { // working just need to do last condition
	const cardValuePlayer1 = gameCards.player1CardValue 
	const cardValuePlayer2 = gameCards.player2CardValue

	if (cardValuePlayer1 === 1 && cardValuePlayer2 === 100) { // ace beats joker but ace loses against everything else
		console.log("player 1 won");
		gameCards.player1CardsWon.push(...gameCards.warCardBattle)
		console.log(gameCards.player1CardsWon)
		gameCards.resetWarCards()
	} else if (cardValuePlayer2 === 1 && cardValuePlayer1 === 100) { 
		console.log("player 2 has won");
		gameCards.player2CardsWon.push(...gameCards.warCardBattle)
		console.log(gameCards.player2CardsWon)
		gameCards.resetWarCards()
	} else if (cardValuePlayer1 > cardValuePlayer2) {
		console.log("player 1 won");
		gameCards.player1CardsWon.push(...gameCards.warCardBattle)
		console.log(gameCards.player1CardsWon)
		gameCards.resetWarCards()
	} else if (cardValuePlayer2 > cardValuePlayer1) {
		console.log("player 2 has won");
		gameCards.player2CardsWon.push(...gameCards.warCardBattle)
		console.log(gameCards.player2CardsWon)
		gameCards.resetWarCards()
	} else if (cardValuePlayer1 === cardValuePlayer2) {
		console.log("WAR");
		gameCards.resetWarCards()
	}
	
	
}

function startWar() { 
	/*
	basically simulate 3 clicks or 4 whoever has the highest card wins 
	if one player has 2 cards left it does like those certain situations wars
	if war for ever reason decides to end in a draw like no more cards or no more cards won either
	game ends in a draw and game reset this is like a 0.00000000001 percent happening honestly
	*/
	// if all players plays the same card value
}
