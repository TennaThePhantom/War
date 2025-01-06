import { cardGameChose } from "./cards-mode.js";
import * as warCards from "./cards.js";


const gameCards = {
	playerOneDeck: [],
	playerTwoDeck: [],
    player1CardsWon: [],
    playerTwoCardsWon: [],
	gameCardImage(cardSrc, leftOrRight) { // creates the cards
		const imageElement = document.createElement("img");
		imageElement.src = cardSrc;
		imageElement.className = `${twCSS.cardImageSize} ${leftOrRight}`;
		return imageElement;
	},
};

const twCSS = { 
	battleContainer:
		"tw-flex tw-justify-center	tw-items-center	tw-h-auto tw-w-auto tw-bg-black tw-gap-24 tw-p-12",
	cardImageSize: "tw-h-52 tw-w-32",
	leftImage: "tw-rotate-90",
	rightImage: "tw-rotate-[-90deg]",
    player1DeckPosition: "tw-absolute tw-right-[27%] tw-h-52 tw-w-32 tw-rounded tw-cursor-pointer",
    player2DeckPosition: "tw-absolute tw-left-[27%] tw-h-52 tw-w-32 tw-rounded"
};

export function createGameScreen() {
	const srcImage = "../cards/images/regular-cards/3_of_clubs.png";
	// make this as a method for future images
	const imageElement = gameCards.gameCardImage(srcImage, twCSS.rightImage);
	const imageElement2 = document.createElement("img");
	imageElement.src = srcImage;
	imageElement2.src = "../cards/images/regular-cards/5_of_clubs.png";
	imageElement2.className = `${twCSS.leftImage} ${twCSS.cardImageSize}`;

	const battleContainer = document.createElement("div"); // container for players to place cards
	battleContainer.className = twCSS.battleContainer;
	const player1Hand = document.createElement("img"); // the deck of cards
    player1Hand.src = warCards.cardsDeck.getBackOfCard()
    player1Hand.className = `${twCSS.player1DeckPosition} ${twCSS.rightImage}`
	const player2Hand = document.createElement("img");
    player2Hand.src = warCards.cardsDeck.getBackOfCard();
    player2Hand.className = `${twCSS.player2DeckPosition} ${twCSS.leftImage}`

	const body = document.getElementById("bodyContainer");

	battleContainer.append(imageElement, imageElement2);

	body.append(battleContainer, player1Hand, player2Hand);

    dealCards()
}

function dealCards() { // starts the game
    warCards.cardsDeck.getCards();
    const { deck1, deck2 } = warCards.cardsDeck.drawTwoDecks(); // Destructure the result into deck1 and deck2
    gameCards.playerOneDeck = deck1
    gameCards.playerTwoDeck = deck2


    console.log(gameCards.playerOneDeck )
    console.log(gameCards.playerTwoDeck )


}


function whoWins(){

}


function startWar(){ // if all players plays the same card value

}