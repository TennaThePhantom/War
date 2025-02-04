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
	player1resetWon: false,
	warCardBattle: [], // cards that are in the center 
	startWar: false,
	gameCardImage(cardSrc, leftOrRight) {
		// creates the cards
		const imageElement = document.createElement("img");
		imageElement.src = cardSrc;
		imageElement.className = `${twCSS.cardImageSize} ${leftOrRight}`;
		return imageElement;
	},
	removeFirstCard(playerDeck) {
		if (playerDeck.length > 0) {
			return playerDeck.shift(); // Removes and returns the first card from the array
		} else {
			return null; // If the deck is empty, return null
		}
	},
	resetWarCards() {
		if(startWar === false){
			this.warCardBattle = [];
			return this.warCardBattle;
		}
		else{
			return this.warCardBattle
		}
	},
	resetPlayerOneCardsWon() {
		this.player1CardsWon = [];
		return this.player1CardsWon;
	},
	resetPlayerTwoCardsWon() {
		this.player2CardsWon = [];
		return this.player2CardsWon;
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
	player1NumberDisplay:
		"playerNumberDisplay1 tw-absolute tw-right-[29.5%] tw-h-auto tw-w-auto tw-z-10 tw-font-black tw-text-4xl",
	player2NumberDisplay:
		"playerNumberDisplay2 tw-absolute tw-left-[29.5%] tw-h-auto tw-w-auto tw-z-10 tw-font-black tw-text-4xl",
	player1PileDeckDisplay: "PlayerOneCardWinnings tw-absolute tw-right-[29.5%] tw-h-32 tw-w-24 tw--translate-y-36 tw-rounded tw-border-solid tw-border-2 tw-border-zinc-300",
	cardCountDisplay: "CardWon tw-absolute tw-top-[28.8%] tw-right-[31.4%] tw-font-black tw-text-4xl tw-z-10 tw-h-auto tw-w-auto",
};
const battleContainer = document.createElement("div"); // container for players to place cards
const player1Hand = document.createElement("img"); // the deck of cards
const player2Hand = document.createElement("img");
const body = document.getElementById("bodyContainer");

export function createGameScreen() {
	// make this as a method for future images

	battleContainer.className = twCSS.battleContainer;
	battleContainer.id = "War"
	player1Hand.src = warCards.cardsDeck.getBackOfCard();
	player1Hand.id = "warClicker"
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
	gameCards.playerOneDeck = warCards.cardsDeck.warTestPlayer1;
	gameCards.playerTwoDeck = warCards.cardsDeck.warTestPlayer2;

	console.log(gameCards.playerOneDeck);
	console.log(gameCards.playerTwoDeck);
	twoPlayerCardNumberDisplay();
}
let pokerCardImagePlayerOne = null;
let pokerCardImagePlayerTwo = null;

function cardHitButtonHandler() {
	player2CardsHit(); // might change the position in the future but for now this is first because it allows the card to be position in the right order(player1 is right ai/player2 is left)
	// Check if there is already an image in the container and remove it if necessary
	if (pokerCardImagePlayerOne) {
		// Remove the previously appended card image
		battleContainer.removeChild(pokerCardImagePlayerOne);
		pokerCardImagePlayerOne = null; // Reset the image reference
	}
	// cards
	if (gameCards.playerOneDeck.length === 0) {
		// same thing as player 2 temporarily(adds the cards but when they are offset each player have different amounts of cards it doesn't work properly need to fix)
		gameCards.playerOneDeck.push(...gameCards.player1CardsWon);
		gameCards.resetPlayerOneCardsWon();
		gameCards.player1resetWon = true
		const randomCard = gameCards.removeFirstCard(gameCards.playerOneDeck);
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerOne = gameCards.gameCardImage(
			cardSrc,
			twCSS.rightImage
		); // Create the new card image for player one
		const cardValue = randomCard.value;
		gameCards.player1CardValue = cardValue;
		gameCards.warCardBattle.push(randomCard);
		console.log(gameCards.warCardBattle);
		console.log(gameCards.playerOneDeck);

		battleContainer.append(pokerCardImagePlayerOne); // Add the new card image to the container
	} else {
		const randomCard = gameCards.removeFirstCard(gameCards.playerOneDeck);
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerOne = gameCards.gameCardImage(
			cardSrc,
			twCSS.rightImage
		); // Create the new card image for player one
		const cardValue = randomCard.value;
		gameCards.player1CardValue = cardValue;
		gameCards.warCardBattle.push(randomCard);
		console.log(gameCards.warCardBattle);
		battleContainer.append(pokerCardImagePlayerOne); // Add the new card image to the container
	}
	whoWinsWar();
	twoPlayerCardNumberDisplay();
	cardsWonPileDisplay()
	if(gameCards.startWar === true){ // remove clicker for now when war is activated

		player1Hand.removeEventListener("click", cardHitButtonHandler);
	}
	

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
		gameCards.playerTwoDeck.push(...gameCards.player2CardsWon);
		gameCards.resetPlayerTwoCardsWon();
		const randomCard = gameCards.removeFirstCard(gameCards.playerTwoDeck);
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerTwo = gameCards.gameCardImage(cardSrc, twCSS.leftImage); // Create the new card image for player two
		const cardValue = randomCard.value;
		gameCards.player2CardValue = cardValue;
		gameCards.warCardBattle.push(randomCard);
		console.log(gameCards.playerOneDeck);
		battleContainer.append(pokerCardImagePlayerTwo); // Add the new card image to the container
	} else {
		const randomCard = gameCards.removeFirstCard(gameCards.playerTwoDeck);
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerTwo = gameCards.gameCardImage(cardSrc, twCSS.leftImage); // Create the new card image for player two
		const cardValue = randomCard.value;
		gameCards.player2CardValue = cardValue;
		gameCards.warCardBattle.push(randomCard);
		battleContainer.append(pokerCardImagePlayerTwo); // Add the new card image to the container
	}
}

function whoWinsWar() {
	// working just need to do last condition
	const cardValuePlayer1 = gameCards.player1CardValue;
	const cardValuePlayer2 = gameCards.player2CardValue;

	if (cardValuePlayer1 === 1 && cardValuePlayer2 === 100) {
		// ace beats joker but ace loses against everything else
		console.log("player 1 won");
		gameCards.player1CardsWon.push(...gameCards.warCardBattle);
		console.log(gameCards.player1CardsWon);
		gameCards.resetWarCards();
	} else if (cardValuePlayer2 === 1 && cardValuePlayer1 === 100) {
		console.log("player 2 has won");
		gameCards.player2CardsWon.push(...gameCards.warCardBattle);
		console.log(gameCards.player2CardsWon);
		gameCards.resetWarCards();
	} else if (cardValuePlayer1 > cardValuePlayer2) {
		console.log("player 1 won");
		gameCards.player1CardsWon.push(...gameCards.warCardBattle);
		console.log(gameCards.player1CardsWon);
		gameCards.resetWarCards();
	} else if (cardValuePlayer2 > cardValuePlayer1) {
		console.log("player 2 has won");
		gameCards.player2CardsWon.push(...gameCards.warCardBattle);
		console.log(gameCards.player2CardsWon);
		gameCards.resetWarCards();
	} else if (cardValuePlayer1 === cardValuePlayer2) {
		console.log("WAR");
		gameCards.resetWarCards();
		startWar();
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

	const backImage = warCards.cardsDeck.getBackOfCard();
	const warBattleContainer = document.getElementById("War")
	const cardsInWar = warBattleContainer.querySelectorAll('img')
	pokerCardImagePlayerOne = gameCards.gameCardImage(
		backImage,
		twCSS.rightImage
	); 
	

	if (gameCards.playerOneDeck.length >= 4 && gameCards.playerTwoDeck.length >= 4) {
		gameCards.startWar = true;
		console.log("START WAR");
		console.log(gameCards.warCardBattle);
	
		// Remove the cards in the middle after a delay
		setTimeout(() => {
			// Remove the cards in the middle
			cardsInWar.forEach(card => card.remove());
	
			// Function to add and remove cards with a delay
			const addAndRemoveCardsWithDelay = (playerDeck, player, imageClass, delay) => {
				for (let i = 0; i < 4; i++) {
					setTimeout(() => {
						const card = gameCards.removeFirstCard(playerDeck);
						twoPlayerCardNumberDisplay();
						const isBackCard = i < 3; // First 3 cards are back cards, 4th is real
						const cardSrc = isBackCard ? backImage : "../" + card.src;
	
						// Create the card image
						const cardImage = gameCards.gameCardImage(cardSrc, imageClass);
	
						// Add the card to the warBattleContainer
						warBattleContainer.appendChild(cardImage);
	
						// Add the card to the warCardBattle array
						gameCards.warCardBattle.push(card);
	
						// Log the warCardBattle array after each card is added
						console.log(`Added card to ${player} warCardBattle:`, card);
						console.log("Current warCardBattle:", gameCards.warCardBattle);
	
						// If it's a back card, remove it after a delay
						if (isBackCard) {
							setTimeout(() => {
								cardImage.remove();
								console.log(`Removed back card from ${player}`);
							}, delay); // Delay before removing the back card
						}
					}, delay * 2 * i); // Delay between adding each card
				}

			};
	
			// Add and remove cards for Player 1 with a delay of 500ms between each step
			addAndRemoveCardsWithDelay(gameCards.playerOneDeck, "Player 1", twCSS.rightImage, 500);
	
			// Add and remove cards for Player 2 with a delay of 500ms between each step
			addAndRemoveCardsWithDelay(gameCards.playerTwoDeck, "Player 2", twCSS.leftImage, 500);
		}, 1500); // Delay before removing cards and starting the card-adding process
	}



}

function twoPlayerCardNumberDisplay() {
	// display number center of deck
	const existingNumberDisplayPlayer1 = document.querySelector(
		".playerNumberDisplay1"
	);
	const existingNumberDisplayPlayer2 = document.querySelector(
		".playerNumberDisplay2"
	);
	/*
	if the number display hasn't been created yet create it
	if it's already created just update the number value 
	*/
	if (!existingNumberDisplayPlayer1) {
		const player1Number = document.createElement("div");
		player1Number.textContent = gameCards.playerOneDeck.length;
		player1Number.className = twCSS.player1NumberDisplay;
		body.append(player1Number);
	} else {
		existingNumberDisplayPlayer1.textContent = gameCards.playerOneDeck.length;
		
	}

	if (!existingNumberDisplayPlayer2) {
		const player2Number = document.createElement("div");
		player2Number.textContent = gameCards.playerTwoDeck.length;
		player2Number.className = twCSS.player2NumberDisplay;
		body.append(player2Number);
	} else {
		existingNumberDisplayPlayer2.textContent = gameCards.playerTwoDeck.length;
	}
}


function cardsWonPileDisplay() {
    const cardCount = gameCards.player1CardsWon.length;

    // Calculate how many cards to create (two more each time)
    const cardsToCreate = Math.min(Math.floor(cardCount / 2) * 2, 10);

    // Clear existing cards 
    const existingCards = document.querySelectorAll(".PlayerOneCardWinnings");
    existingCards.forEach(card => card.remove());

    // Create the cards
    for (let card = 0; card < cardsToCreate; card++) {
        const player1Pile = document.createElement("img");
        player1Pile.src = warCards.cardsDeck.getBackOfCard();
        player1Pile.className = `${twCSS.player1PileDeckDisplay} ${twCSS.rightImage}`;

        if (card === 0) {
            // First card: Use its base transformation
            player1Pile.style.transform = window.getComputedStyle(player1Pile).transform;
        } else {
            // Subsequent cards: Add 2px translation to the first card's transformation
            const firstCard = document.querySelector(".PlayerOneCardWinnings");
            const firstCardTransform = window.getComputedStyle(firstCard).transform;
            const translation = `translate(${2 * card}px, ${2 * card}px)`;
            player1Pile.style.transform = `${firstCardTransform} ${translation}`;
        }
        body.append(player1Pile);
    }
	 // Show or hide the text display based on whether there are cards in the pile
	const cardCountDisplay = document.querySelector(".CardWon");
	 if (cardCount > 0) { // update the card count 
		console.log("CardCount is" + cardCount)
		cardsWonTextDisplay();
	} 
	else { // if deck gets reset and player doesn't win remove the card display
        if (cardCountDisplay) {
            cardCountDisplay.remove();
			gameCards.player1resetWon = false
        }
    }

	// this checks if the player won after the rest it reset the display
	if(cardCount === 2 && gameCards.player1resetWon === true){
		cardCountDisplay.remove();
		cardsWonTextDisplay();
		gameCards.player1resetWon = false
	}

}


let lastTransformLength = 0; // Track the last length at which the transform was applied

function cardsWonTextDisplay() {
    const player1Count = gameCards.player1CardsWon.length;

    let cardCountDisplay = document.querySelector(".CardWon");
    if (!cardCountDisplay) {
        cardCountDisplay = document.createElement("div");
        cardCountDisplay.className = twCSS.cardCountDisplay;
        body.append(cardCountDisplay);
    }
    cardCountDisplay.textContent = `${player1Count}`;


    // Apply transform only if the length is even, between 2 and 10, and not already transformed
    if (player1Count >= 2 && player1Count <= 10 && player1Count % 2 === 0 && player1Count !== lastTransformLength) {
        // Preserve existing transform styles while adding translation
        const existingTransform = cardCountDisplay.style.transform;
        cardCountDisplay.style.transform = `${existingTransform} translate(3px, -3px)`.trim();
        
        // Update the last transformed length
        lastTransformLength = player1Count;
	} else if(gameCards.player1resetWon === true){ // if player won after reset make sure to add translate
		const existingTransform = cardCountDisplay.style.transform;
        cardCountDisplay.style.transform = `${existingTransform} translate(3px, -3px)`.trim();
        
        // Update the last transformed length
        lastTransformLength = player1Count;
	}
}
