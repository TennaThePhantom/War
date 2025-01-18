import { cardGameChose } from "./cards-mode.js";
import * as warCards from "./cards.js";

const gameCards = {
	playerOneDeck: [],
	playerTwoDeck: [],
	player1CardsWon: [],
	playerTwoCardsWon: [],
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
};

const twCSS = {
	battleContainer:
		"tw-flex tw-justify-center	tw-items-center	tw-h-auto tw-w-auto tw-bg-black tw-gap-24 tw-p-12",
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

	body.append(battleContainer, player1Hand, player2Hand);
	dealCards();
	player1Hand.addEventListener("click", cardHitButtonHandler);
	// player1Hand.addEventListener("click", player2CardsHit )

}

function dealCards() {
	// starts the game
	warCards.cardsDeck.getCards();
	const { deck1, deck2 } = warCards.cardsDeck.drawTwoDecks(); // Destructure the result into deck1 and deck2
	gameCards.playerOneDeck = deck1;
	gameCards.playerTwoDeck = deck2;

	console.log(gameCards.playerOneDeck);
	console.log(gameCards.playerTwoDeck);
}
let pokerCardImagePlayerOne = null;
let pokerCardImagePlayerTwo = null;

function cardHitButtonHandler() {
	// Check if there is already an image in the container and remove it if necessary
	if (pokerCardImagePlayerOne) {
		console.log("this removed");
		// Remove the previously appended card image
		battleContainer.removeChild(pokerCardImagePlayerOne);
		pokerCardImagePlayerOne = null; // Reset the image reference
	}
	// cards
	if (gameCards.playerOneDeck.length === 0) {
		console.log("out of cards ");
	} else {
		const randomCard = gameCards.removeFirstCard(gameCards.playerOneDeck);
		console.log(gameCards.playerOneDeck)
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerOne = gameCards.gameCardImage(cardSrc, twCSS.rightImage); // Create the new card image for player one
		const cardValue = randomCard.value;
		console.log(cardSrc);
		console.log(randomCard);
		console.log(cardValue);
		battleContainer.append(pokerCardImagePlayerOne); // Add the new card image to the container
	}
	player2CardsHit()

}

// adds the cards from player two to screen
function player2CardsHit() {
	if (pokerCardImagePlayerTwo) {
		console.log("this removed");
		// Remove the previously appended card image
		battleContainer.removeChild(pokerCardImagePlayerTwo);
		pokerCardImagePlayerTwo = null; // Reset the image reference
	}
	// cards
	if (gameCards.playerTwoDeck.length === 0) {
		console.log("out of cards2 ");
	} else {
		const randomCard = gameCards.removeFirstCard(gameCards.playerTwoDeck);
		console.log(gameCards.playerTwoDeck)
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerTwo = gameCards.gameCardImage(cardSrc, twCSS.leftImage); // Create the new card image for player two
		const cardValue = randomCard.value;
		console.log(cardSrc);
		console.log(randomCard);
		console.log(cardValue);
		battleContainer.append(pokerCardImagePlayerTwo); // Add the new card image to the container
	}
}

function whoWins() {}

function startWar() {
	// if all players plays the same card value
}
