import { cardGameChose } from "./cards-mode.js";
import * as warCards from "./cards.js";


const gameCards = {
	playerOneDeck: [],
	playerTwoDeck: [],
	player1CardsWon: [],
	player2CardsWon: [],
	player1CardValue: 0,
	player2CardValue: 0,
	player1resetWon: false,
	player2resetWon: false,
	player1WarRest: false,
	player2WarRest: false,
	Player1InWarRest: false,
	player2InWarRest: false,
	warBattles: 0,
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
		if (this.startWar === false) {
			this.warCardBattle = [];
			return this.warCardBattle;
		} else {
			return this.warCardBattle;
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

	// // in real life when you get your winning cards you usually if not always shuffle your winning cards
	shufflePlayer1WonDeck() {
		for (let card = this.player1CardsWon.length - 1; card > 0; card--) {
			// Generate a random index between 0 and card (inclusive)
			const randomCardIndex = Math.floor(Math.random() * (card + 1));
	
			// Swap the current card with the randomly selected card
			[this.player1CardsWon[card], this.player1CardsWon[randomCardIndex]] = 
			[this.player1CardsWon[randomCardIndex], this.player1CardsWon[card]];
		}
		return this.player1CardsWon
	},
	shufflePlayer2WonDeck() {
		for (let card = this.player2CardsWon.length - 1; card > 0; card--) {
			// Generate a random index between 0 and card (inclusive)
			const randomCardIndex = Math.floor(Math.random() * (card + 1));
	
			// Swap the current card with the randomly selected card
			[this.player2CardsWon[card], this.player2CardsWon[randomCardIndex]] = 
			[this.player2CardsWon[randomCardIndex], this.player2CardsWon[card]];
		}
		return this.player2CardsWon
	}
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
	player1PileDeckDisplay:
		"PlayerOneCardWinnings tw-absolute tw-right-[29.5%] tw-h-32 tw-w-24 tw--translate-y-36 tw-rounded tw-border-solid tw-border-2 tw-border-zinc-300",
	cardCountDisplayPlayer1:
		"CardWonPlayer1 tw-absolute tw-top-[28.8%] tw-right-[31.4%] tw-font-black tw-text-4xl tw-z-10 tw-h-auto tw-w-auto",
	player2PileDeckDisplayTest:
		"PlayerTwoCardWinnings tw-absolute tw-left-[29.5%] tw-bottom-[5%] tw-h-32 tw-w-24 tw--translate-y-36 tw-rounded tw-border-solid tw-border-2 tw-border-zinc-300",
	cardCountDisplayPlayer2Test:
		"CardWonPlayer2 tw-absolute tw-bottom-[28.8%] tw-left-[31.4%] tw-font-black tw-text-4xl tw-z-10 tw-h-auto tw-w-auto",
};
const battleContainer = document.createElement("div"); // container for players to place cards
const player1Hand = document.createElement("img"); // the deck of cards
const player2Hand = document.createElement("img");
const body = document.getElementById("bodyContainer");

export function createGameScreen() {
	// make this as a method for future images


	battleContainer.className = twCSS.battleContainer;
	battleContainer.id = "War";
	player1Hand.src = warCards.cardsDeck.getBackOfCard();
	player1Hand.id = "warClicker";
	player1Hand.className = `${twCSS.player1DeckPosition} ${twCSS.rightImage}`;
	player2Hand.src = warCards.cardsDeck.getBackOfCard();
	player2Hand.className = `${twCSS.player2DeckPosition} ${twCSS.leftImage}`;

	dealCards();
	player1Hand.addEventListener("click", cardHitButtonHandler);
	body.append(battleContainer, player1Hand, player2Hand);
}

function dealCards() {
	// starts the game
	warCards.cardsDeck.getCards();
	const { deck1, deck2 } = warCards.cardsDeck.drawTwoDecks(); // game cards into deck1 and deck2
	gameCards.playerOneDeck = deck1
	gameCards.playerTwoDeck = deck2

	console.log(gameCards.playerOneDeck);
	console.log(gameCards.playerTwoDeck);
	twoPlayerCardNumberDisplay();
}
let pokerCardImagePlayerOne = null;
let pokerCardImagePlayerTwo = null;

// look at screen recording 3:50 and the rest for minor text bugs

function cardHitButtonHandler() {
	gameCards.Player1InWarRest = false
	gameCards.player2InWarRest = false
	player2CardsHit(); // might change the position in the future but for now this is first because it allows the card to be position in the right order(player1 is right ai/player2 is left)
	// Check if there is already an image in the container and remove it if necessary
	if (pokerCardImagePlayerOne) {
		// Remove the previously appended card image
		battleContainer.removeChild(pokerCardImagePlayerOne);
		pokerCardImagePlayerOne = null; // Reset the image reference
	}
	// cards
	if (gameCards.playerOneDeck.length === 0) {
		console.log("Deck did normal reset not war reset")
		gameCards.shufflePlayer1WonDeck()
		gameCards.playerOneDeck.push(...gameCards.player1CardsWon);
		gameCards.resetPlayerOneCardsWon();
		gameCards.player1resetWon = true;
		const randomCard = gameCards.removeFirstCard(gameCards.playerOneDeck);
		const cardSrc = "../" + randomCard.src;
		pokerCardImagePlayerOne = gameCards.gameCardImage(
			cardSrc,
			twCSS.rightImage
		); // Create the new card image for player one
		const cardValue = randomCard.value;
		gameCards.player1CardValue = cardValue;
		gameCards.warCardBattle.push(randomCard);
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
		battleContainer.append(pokerCardImagePlayerOne); // Add the new card image to the container
	}
	whoWinsWar();
	twoPlayerCardNumberDisplay();
	cardsWonPileDisplayPlayer1();
	cardsWonPileDisplayPlayer2();
	if (gameCards.startWar === true) {
		// remove clicker for now when war is activated
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
		gameCards.shufflePlayer2WonDeck();
		gameCards.playerTwoDeck.push(...gameCards.player2CardsWon);
		gameCards.resetPlayerTwoCardsWon();
		gameCards.player2resetWon = true;
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
		gameCards.player1CardsWon.push(...gameCards.warCardBattle);
		gameCards.resetWarCards();
		gameCards.warBattles = 0;
		console.log(gameCards.warBattles)
		whoWinTheGame()
	} else if (cardValuePlayer2 === 1 && cardValuePlayer1 === 100) {
		gameCards.player2CardsWon.push(...gameCards.warCardBattle);
		gameCards.resetWarCards();
		gameCards.warBattles = 0;
		console.log(gameCards.warBattles)
		whoWinTheGame()
	} else if (cardValuePlayer1 > cardValuePlayer2) {
		gameCards.player1CardsWon.push(...gameCards.warCardBattle);
		gameCards.resetWarCards();
		gameCards.warBattles = 0;
		console.log(gameCards.warBattles)
		whoWinTheGame()
	} else if (cardValuePlayer2 > cardValuePlayer1) {
		gameCards.player2CardsWon.push(...gameCards.warCardBattle);
		gameCards.resetWarCards();
		gameCards.warBattles = 0;
		console.log(gameCards.warBattles)
		whoWinTheGame()
	} else if (cardValuePlayer1 === cardValuePlayer2) {
		console.log("WAR");
		gameCards.startWar = true;
		// checks if the player deck been rested but right after war happen
		if(gameCards.startWar === true && gameCards.player1resetWon === true){
			gameCards.player1WarRest = true;
		}
		if(gameCards.startWar === true && gameCards.player2resetWon === true){ 
			gameCards.player2WarRest = true;
		}
		gameCards.resetWarCards();
		startWar();
		gameCards.warBattles += 1;
		console.log(gameCards.warBattles)
		whoWinTheGame()
	}
}



function startWar() {

	const backImage = warCards.cardsDeck.getBackOfCard();
	const warBattleContainer = document.getElementById("War");
	const cardsInWar = warBattleContainer.querySelectorAll("img");
	pokerCardImagePlayerOne = gameCards.gameCardImage(
		backImage,
		twCSS.rightImage
	);
	/*
	this makes sure if war happens and deck a war reset 
	but one of the players doesn't win and war happens normally 
	make sure warRest = false remove this it causes the text to act weird during war
	*/ 
	if(gameCards.playerOneDeck.length >= 4 &&
		gameCards.playerTwoDeck.length >= 4){
			gameCards.player1WarRest = false
			gameCards.player2WarRest = false
		}


	// Check if either player has less than 3 cards
    if (gameCards.playerOneDeck.length <= 3 || gameCards.playerTwoDeck.length <= 3) {
        // Check if player 1 has less than 3 cards and has winning cards
        if (gameCards.playerOneDeck.length <= 3 && gameCards.player1CardsWon.length > 0) {
            // Add winning cards to player 1's deck
			gameCards.playerOneDeck.push(...gameCards.player1CardsWon);
			gameCards.resetPlayerOneCardsWon();
			gameCards.player1WarRest = true
			gameCards.Player1InWarRest = true
		}


        // Check if player 2 has less than 3 cards and has winning cards
        if (gameCards.playerTwoDeck.length <= 3 && gameCards.player2CardsWon.length > 0) {
            // Add winning cards to player 2's deck
			gameCards.playerTwoDeck.push(...gameCards.player2CardsWon);
			gameCards.resetPlayerTwoCardsWon();
			gameCards.player2WarRest = true
			gameCards.player2InWarRest = true
        }

		if(gameCards.playerOneDeck.length === 1 && gameCards.player1CardsWon.length === 0){
			war1Cards()
		}
		else if(gameCards.playerOneDeck.length === 2 && gameCards.player1CardsWon.length === 0){
			war2Cards();
		}
		else if(gameCards.playerOneDeck.length === 3 && gameCards.player1CardsWon.length === 0){
			war3Cards();
		}

		else if(gameCards.playerTwoDeck.length === 1 && gameCards.player2CardsWon.length === 0 ){
				console.log("UUUUUU")
				war1Cards()
		}
		else if(gameCards.playerTwoDeck.length === 2 && gameCards.player2CardsWon.length === 0){
				console.log("UUUUUU2")
				war2Cards()
			}
		else if(gameCards.playerTwoDeck.length === 3 && gameCards.player2CardsWon.length === 0){
				console.log("UUUUUU3")
				war3Cards()
		}
		
    }



	if (
		gameCards.playerOneDeck.length >= 4 &&
		gameCards.playerTwoDeck.length >= 4
	) {
		gameCards.player1resetWon = false;
		gameCards.player2resetWon = false
		console.log("START WAR");
		console.log(gameCards.warCardBattle);

		// Remove the cards in the middle after a delay
		setTimeout(() => {
			// Remove the cards in the middle
			cardsInWar.forEach((card) => card.remove());

			// Function to add and remove cards with fade animations
			const addAndRemoveCardsWithDelay = (
				playerDeck,
				player,
				imageClass,
				delay,
				isPlayer1
			) => {
				let currentIndex = 0;

				const addNextCard = () => {
					if (currentIndex >= 4) return; // Stop after 4 cards
					const card = gameCards.removeFirstCard(playerDeck);
					twoPlayerCardNumberDisplay();
					const isBackCard = currentIndex < 3; // First 3 cards are back cards, 4th is real
					const cardSrc = isBackCard ? backImage : "../" + card.src;

					// Create the card image
					const cardImage = gameCards.gameCardImage(cardSrc, imageClass);

					// Add fade-in animation to the card
					cardImage.classList.add("animate__animated", "animate__fadeIn");
					warBattleContainer.appendChild(cardImage);

					// Add the card to the warCardBattle array
					gameCards.warCardBattle.push(card);


					// If it's a back card, remove it after a delay with fade-out animation
					if (isBackCard) {
						setTimeout(() => {
							// Add fade-out animation to the card
							cardImage.classList.remove("animate__fadeIn");
							cardImage.classList.add("animate__fadeOut");

							// Remove the card from the DOM after the fade-out animation completes
							cardImage.addEventListener(
								"animationend",
								() => {
									cardImage.remove();
									// Add the next card after the fade-out completes
									currentIndex++;
									addNextCard();
								},
								{ once: true }
							);
						}, delay); // Delay before starting the fade-out
					} else {
						// For the real card, don't remove it
						currentIndex++;

						// If this is the last card (4th card), store the card value
						if (currentIndex === 4) {
							if (isPlayer1) {
								gameCards.player1CardValue = card.value; // Store Player 1's card value
							} else {
								gameCards.player2CardValue = card.value; // Store Player 2's card value
							}

							// Add the event listener to player1Hand for Player 1
							if (isPlayer1) {
								setTimeout(() => {
									// gets the updated current cards being display
									const currentCardsInWar =
									warBattleContainer.querySelectorAll("img");
									currentCardsInWar.forEach((card) => card.remove());
									console.log("CARDS ARE REMOVED ");
									pokerCardImagePlayerOne = null;
									pokerCardImagePlayerTwo = null;
									console.log(gameCards.warCardBattle);
									gameCards.startWar = false;
									whoWinsWar();
									twoPlayerCardNumberDisplay();
									cardsWarWonPileDisplayPlayer1();
									cardsWarWonPileDisplayPlayer2();
									player1Hand.addEventListener("click", cardHitButtonHandler);
								}, 2000);
							}
						}

						// Add the next card
						addNextCard();
					}
				};

				// Start adding cards
				addNextCard();
			};

			// Add and remove cards for Player 2 with a delay of 500ms between each step
			addAndRemoveCardsWithDelay(
				gameCards.playerTwoDeck,
				"Player 2",
				twCSS.leftImage,
				500,
				false
			);

			// Add and remove cards for Player 1 with a delay of 500.5ms between each step makes sure the card is added second
			addAndRemoveCardsWithDelay(
				gameCards.playerOneDeck,
				"Player 1",
				twCSS.rightImage,
				500.5,
				true
			);
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

function cardsWonPileDisplayPlayer1() {
	const cardCount = gameCards.player1CardsWon.length;

	// Calculate how many cards to create (two more each time)
	const cardsToCreate = Math.min(Math.floor(cardCount / 2) * 2, 10);

	// Clear existing cards
	const existingCards = document.querySelectorAll(".PlayerOneCardWinnings");
	existingCards.forEach((card) => card.remove());

	// Create the cards
	for (let card = 0; card < cardsToCreate; card++) {
		const player1Pile = document.createElement("img");
		player1Pile.src = warCards.cardsDeck.getBackOfCard();
		player1Pile.className = `${twCSS.player1PileDeckDisplay} ${twCSS.rightImage}`;

		if (card === 0) {
			// First card: Use its base transformation
			player1Pile.style.transform =
				window.getComputedStyle(player1Pile).transform;
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
	const cardCountDisplay = document.querySelector(".CardWonPlayer1");
	if (cardCount > 0) {
		// update the card count
		cardsWonTextDisplayPlayer1();
	} else {
		// if deck gets reset and player doesn't win remove the card display
		if (cardCountDisplay) {
			cardCountDisplay.remove();
			gameCards.player1resetWon = false;
		}
	}

	// this checks if the player won after the rest it reset the display
	if (cardCount === 2 && gameCards.player1resetWon === true) {
		cardCountDisplay.remove();
		cardsWonTextDisplayPlayer1();
		gameCards.player1resetWon = false;
	}
}
let lastTransformLengthPlayer1 = 0; // Track the last length at which the transform was applied

function cardsWonTextDisplayPlayer1() {
	// when the player wins normally update text spot
	const player1Count = gameCards.player1CardsWon.length;

	let cardCountDisplay = document.querySelector(".CardWonPlayer1");
	if (!cardCountDisplay) {
		cardCountDisplay = document.createElement("div");
		cardCountDisplay.className = twCSS.cardCountDisplayPlayer1;
		body.append(cardCountDisplay);
	}
	cardCountDisplay.textContent = `${player1Count}`;

	// Apply transform only if the length is even, between 2 and 10, and not already transformed
	if (
		player1Count >= 2 &&
		player1Count <= 10 &&
		player1Count % 2 === 0 &&
		player1Count !== lastTransformLengthPlayer1
	) {
		// Preserve existing transform styles while adding translation
		const existingTransform = cardCountDisplay.style.transform;
		cardCountDisplay.style.transform =
			`${existingTransform} translate(3px, -3px)`.trim();

		// Update the last transformed length
		lastTransformLengthPlayer1 = player1Count;
	} else if (gameCards.player1resetWon === true) {
		// if player won after reset make sure to add translate
		const existingTransform = cardCountDisplay.style.transform;
		cardCountDisplay.style.transform =
			`${existingTransform} translate(3px, -3px)`.trim();
		// Update the last transformed length
		lastTransformLengthPlayer1 = player1Count;
	}
}

function cardsWarWonPileDisplayPlayer1() {
	// when player wins in war
	const cardCount = gameCards.player1CardsWon.length;
	console.log("player 1 war rest is " + gameCards.player1WarRest)


	// Calculate how many cards to create (two more each time)
	const cardsToCreate = Math.min(Math.floor(cardCount / 2) * 2, 10);

	// Clear existing cards
	const existingCards = document.querySelectorAll(".PlayerOneCardWinnings");
	existingCards.forEach((card) => card.remove());

	// Create the cards
	for (let card = 0; card < cardsToCreate; card++) {
		const player1Pile = document.createElement("img");
		player1Pile.src = warCards.cardsDeck.getBackOfCard();
		player1Pile.className = `${twCSS.player1PileDeckDisplay} ${twCSS.rightImage} PlayerOneCardWinnings`;

		if (card === 0) {
			// First card: Use its base transformation
			player1Pile.style.transform =
				window.getComputedStyle(player1Pile).transform;
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
	const cardCountDisplay = document.querySelector(".CardWonPlayer1");
	if (cardCount > 0 && gameCards.player1WarRest === false) {
		console.log("Text been Updated Player 1")
		// update the card count
		cardsWonTextDisplayWarPlayer1();
	} else {
		// if deck gets reset and player doesn't win remove the card display
		if (cardCountDisplay) {
			console.log("text for player 1 deck been removed first if")
			cardCountDisplay.remove();
			gameCards.player1WarRest = false;
		}
	}

	// this checks if the player won after the reset it reset the display
	if (cardCount >= 2 && gameCards.player1WarRest === true) {
		if (cardCountDisplay) {
			console.log("text for player 1 deck been removed 2nd if")
			cardCountDisplay.remove();
		}
		cardsWonTextDisplayWarPlayer1();
		gameCards.player1WarRest = false;
	}
}

function cardsWonTextDisplayWarPlayer1() {
	const player1Count = gameCards.player1CardsWon.length;
	console.log("text updated War player 1 ")

	// Select the existing element or create a new one if it doesn't exist
	let cardCountDisplay = document.querySelector(".CardWonPlayer1");
	if (!cardCountDisplay) {
		cardCountDisplay = document.createElement("div");
		cardCountDisplay.className = twCSS.cardCountDisplayPlayer1;
		body.append(cardCountDisplay);
	}

	// Update the text content of the element
	cardCountDisplay.textContent = `${player1Count}`;

	// Apply transform logic
	if (player1Count >= 2 && player1Count % 2 === 0) {
		// Calculate how many translations are needed (capped at 5)
		const maxTranslations = 5; // Maximum allowed translations
		const totalTranslations = Math.min(player1Count / 2, maxTranslations); // Cap at 5
		const existingTranslations = (lastTransformLengthPlayer1 || 0) / 2; // Translations already applied
		const additionalTranslations = Math.max(
			totalTranslations - existingTranslations,
			0
		); // New translations to apply (cannot be negative)

		// Apply the additional translations
		let transformValue = "";
		for (let i = 0; i < additionalTranslations; i++) {
			transformValue += " translate(3px, -3px)";
		}

		// Preserve existing transform styles while adding new translations
		const existingTransform = cardCountDisplay.style.transform || "";
		cardCountDisplay.style.transform =
			`${existingTransform} ${transformValue}`.trim();

		// Update the last transformed length
		lastTransformLengthPlayer1 = player1Count;
	} if (gameCards.player1WarRest === true || gameCards.Player1InWarRest === true) {
		console.log("Player 1 Translations happen reset")
		lastTransformLengthPlayer1 = 0;
		const maxTranslations = 5; // Maximum allowed translations
		const totalTranslations = Math.min(player1Count / 2, maxTranslations); // Cap at 5
		const existingTranslations = (lastTransformLengthPlayer1 || 0) / 2; // Translations already applied
		const additionalTranslations = Math.max(
			totalTranslations - existingTranslations,
			0
		); // New translations to apply (cannot be negative)

		// Apply the additional translations
		let transformValue = "";
		for (let i = 0; i < additionalTranslations; i++) {
			transformValue += " translate(3px, -3px)";
		}

		// Preserve existing transform styles while adding new translations
		const existingTransform = cardCountDisplay.style.transform || "";
		cardCountDisplay.style.transform =
			`${existingTransform} ${transformValue}`.trim();

		// Update the last transformed length
		lastTransformLengthPlayer1 = player1Count;
	}
}

function cardsWonPileDisplayPlayer2() {
	const cardCount = gameCards.player2CardsWon.length;

	// Calculate how many cards to create (two more each time)
	const cardsToCreate = Math.min(Math.floor(cardCount / 2) * 2, 10);

	// Clear existing cards
	const existingCards = document.querySelectorAll(".PlayerTwoCardWinnings");
	existingCards.forEach((card) => card.remove());

	// Create the cards
	for (let card = 0; card < cardsToCreate; card++) {
		const player2Pile = document.createElement("img");
		player2Pile.src = warCards.cardsDeck.getBackOfCard();
		player2Pile.className = `${twCSS.player2PileDeckDisplayTest} ${twCSS.leftImage}`;

		if (card === 0) {
			// First card: Use its base transformation
			player2Pile.style.transform =
				window.getComputedStyle(player2Pile).transform;
		} else {
			// Subsequent cards: Add 2px translation to the first card's transformation
			const firstCard = document.querySelector(".PlayerTwoCardWinnings");
			const firstCardTransform = window.getComputedStyle(firstCard).transform;
			const translation = `translate(${2 * card}px, ${2 * card}px)`;
			player2Pile.style.transform = `${firstCardTransform} ${translation}`;
		}
		body.append(player2Pile);
	}
	// Show or hide the text display based on whether there are cards in the pile
	const cardCountDisplay = document.querySelector(".CardWonPlayer2");
	if (cardCount > 0) {
		// update the card count
		cardsWonTextDisplayPlayer2();
	} else {
		// if deck gets reset and player doesn't win remove the card display
		if (cardCountDisplay) {
			cardCountDisplay.remove();
			gameCards.player2resetWon = false;
		}
	}

	// this checks if the player won after the rest it reset the display
	if (cardCount === 2 && gameCards.player2resetWon === true) {
		cardCountDisplay.remove();
		cardsWonTextDisplayPlayer2();
		gameCards.player2resetWon = false;
	}
}
let lastTransformLengthPlayer2 = 0; // Track the last length at which the transform was applied

function cardsWonTextDisplayPlayer2() {
	// when the player wins normally update text spot
	const player2Count = gameCards.player2CardsWon.length;

	let cardCountDisplay = document.querySelector(".CardWonPlayer2");
	if (!cardCountDisplay) {
		cardCountDisplay = document.createElement("div");
		cardCountDisplay.className = twCSS.cardCountDisplayPlayer2Test;
		body.append(cardCountDisplay);
	}
	cardCountDisplay.textContent = `${player2Count}`;

	// Apply transform only if the length is even, between 2 and 10, and not already transformed
	if (
		player2Count >= 2 &&
		player2Count <= 10 &&
		player2Count % 2 === 0 &&
		player2Count !== lastTransformLengthPlayer2
	) {
		// Preserve existing transform styles while adding translation
		const existingTransform = cardCountDisplay.style.transform;
		cardCountDisplay.style.transform =
			`${existingTransform} translate(-3px, 3px)`.trim();

		// Update the last transformed length
		lastTransformLengthPlayer2 = player2Count;
	} else if (gameCards.player2resetWon === true) {
		// if player won after reset make sure to add translate
		const existingTransform = cardCountDisplay.style.transform;
		cardCountDisplay.style.transform =
			`${existingTransform} translate(-3px, 3px)`.trim();
		// Update the last transformed length
		lastTransformLengthPlayer2 = player2Count;
	}
}

function cardsWarWonPileDisplayPlayer2() {
	// when player wins in war
	const cardCount = gameCards.player2CardsWon.length;
	console.log("player 2 war rest is " + gameCards.player2WarRest)

	// Calculate how many cards to create (two more each time)
	const cardsToCreate = Math.min(Math.floor(cardCount / 2) * 2, 10);

	// Clear existing cards
	const existingCards = document.querySelectorAll(".PlayerTwoCardWinnings");
	existingCards.forEach((card) => card.remove());

	// Create the cards
	for (let card = 0; card < cardsToCreate; card++) {
		const player2Pile = document.createElement("img");
		player2Pile.src = warCards.cardsDeck.getBackOfCard();
		player2Pile.className = `${twCSS.player2PileDeckDisplayTest} ${twCSS.leftImage} PlayerTwoCardWinnings`;
		if (card === 0) {
			// First card: Use its base transformation
			player2Pile.style.transform =
				window.getComputedStyle(player2Pile).transform;
		} else {
			// Subsequent cards: Add 2px translation to the first card's transformation
			const firstCard = document.querySelector(".PlayerTwoCardWinnings");
			const firstCardTransform = window.getComputedStyle(firstCard).transform;
			const translation = `translate(${2 * card}px, ${2 * card}px)`;
			player2Pile.style.transform = `${firstCardTransform} ${translation}`;
		}
		body.append(player2Pile);
	}

	// Show or hide the text display based on whether there are cards in the pile
	const cardCountDisplay = document.querySelector(".CardWonPlayer2");
	if (cardCount > 0 && gameCards.player2WarRest === false) {
		// update the card count
		console.log("Text been Updated Player 2")
		cardsWonTextDisplayWarPlayer2();
	} else {
		// if deck gets reset and player doesn't win remove the card display
		if (cardCountDisplay) {
			console.log("text for player 2 deck been removed first if")
			cardCountDisplay.remove();
			gameCards.player2WarRest = false;
		}
		
	}

	// this checks if the player won after the reset it reset the display
	if (cardCount > 0 && gameCards.player2WarRest === true) {
		if (cardCountDisplay) {
			console.log("Text for player 2 been removed 2nd if ")
			cardCountDisplay.remove();
		}
		cardsWonTextDisplayWarPlayer2();
		gameCards.player2WarRest = false;
	}
}

function cardsWonTextDisplayWarPlayer2() {
	console.log("text updated War player 2 ")
	const player2Count = gameCards.player2CardsWon.length;

	// Select the existing element or create a new one if it doesn't exist
	let cardCountDisplay = document.querySelector(".CardWonPlayer2");
	if (!cardCountDisplay) {
		cardCountDisplay = document.createElement("div");
		cardCountDisplay.className = twCSS.cardCountDisplayPlayer2Test;
		body.append(cardCountDisplay);
	}

	// Update the text content of the element
	cardCountDisplay.textContent = `${player2Count}`;

	// Apply transform logic
	if (player2Count >= 2 && player2Count % 2 === 0) {
		// Calculate how many translations are needed (capped at 5)
		const maxTranslations = 5; // Maximum allowed translations
		const totalTranslations = Math.min(player2Count / 2, maxTranslations); // Cap at 5
		const existingTranslations = (lastTransformLengthPlayer2 || 0) / 2; // Translations already applied
		const additionalTranslations = Math.max(
			totalTranslations - existingTranslations,
			0
		); // New translations to apply (cannot be negative)

		// Apply the additional translations
		let transformValue = "";
		for (let i = 0; i < additionalTranslations; i++) {
			transformValue += " translate(-3px, 3px)";
		}

		// Preserve existing transform styles while adding new translations
		const existingTransform = cardCountDisplay.style.transform || "";
		cardCountDisplay.style.transform =
			`${existingTransform} ${transformValue}`.trim();

		// Update the last transformed length
		lastTransformLengthPlayer2 = player2Count;
	} if (gameCards.player2WarRest === true || gameCards.player2InWarRest === true) {
		console.log("Player 2 Translations happen reset")
		lastTransformLengthPlayer2 = 0
		// Calculate how many translations are needed (capped at 5)
		const maxTranslations = 5; // Maximum allowed translations
		const totalTranslations = Math.min(player2Count / 2, maxTranslations); // Cap at 5
		const existingTranslations = (lastTransformLengthPlayer2 || 0) / 2; // Translations already applied
		const additionalTranslations = Math.max(
			totalTranslations - existingTranslations,
			0
		); // New translations to apply (cannot be negative)

		// Apply the additional translations
		let transformValue = "";
		for (let i = 0; i < additionalTranslations; i++) {
			transformValue += " translate(-3px, 3px)";
		}

		// Preserve existing transform styles while adding new translations
		const existingTransform = cardCountDisplay.style.transform || "";
		cardCountDisplay.style.transform =
			`${existingTransform} ${transformValue}`.trim();

		// Update the last transformed length
		lastTransformLengthPlayer2 = player2Count;
	}
}


// below is war for playerDeck if it's 3 2 or 1 with no winning cards
function war3Cards(){ // if player deck has 3 cards only during war
	const backImage = warCards.cardsDeck.getBackOfCard();
	const warBattleContainer = document.getElementById("War");
	const cardsInWar = warBattleContainer.querySelectorAll("img");
	pokerCardImagePlayerOne = gameCards.gameCardImage(
		backImage,
		twCSS.rightImage
	);

	if ((gameCards.playerOneDeck.length === 3) || (gameCards.playerTwoDeck.length === 3)) {
		console.log("START WAR 3 Card");
		console.log(gameCards.warCardBattle);

		// Remove the cards in the middle after a delay
		setTimeout(() => {
			// Remove the cards in the middle
			cardsInWar.forEach((card) => card.remove());

			// Function to add and remove cards with fade animations
			const addAndRemoveCardsWithDelay = (
				playerDeck,
				player,
				imageClass,
				delay,
				isPlayer1
			) => {
				let currentIndex = 0;

				const addNextCard = () => {
					if (currentIndex === 3) return; // Stop after 3 cards
					const card = gameCards.removeFirstCard(playerDeck);
					twoPlayerCardNumberDisplay();
					const isBackCard = currentIndex < 2; // First 2 cards are back cards, 4th is real
					const cardSrc = isBackCard ? backImage : "../" + card.src;

					// Create the card image
					const cardImage = gameCards.gameCardImage(cardSrc, imageClass);

					// Add fade-in animation to the card
					cardImage.classList.add("animate__animated", "animate__fadeIn");
					warBattleContainer.appendChild(cardImage);

					// Add the card to the warCardBattle array
					gameCards.warCardBattle.push(card);

					// Log the warCardBattle array after each card is added
					console.log(`Added card to ${player} warCardBattle:`, card);
					console.log("Current warCardBattle:", gameCards.warCardBattle);

					// If it's a back card, remove it after a delay with fade-out animation
					if (isBackCard) {
						setTimeout(() => {
							// Add fade-out animation to the card
							cardImage.classList.remove("animate__fadeIn");
							cardImage.classList.add("animate__fadeOut");

							// Remove the card from the DOM after the fade-out animation completes
							cardImage.addEventListener(
								"animationend",
								() => {
									cardImage.remove();
									console.log(`Removed back card from ${player}`);

									// Add the next card after the fade-out completes
									currentIndex++;
									addNextCard();
								},
								{ once: true }
							);
						}, delay); // Delay before starting the fade-out
					} else {
						// For the real card, don't remove it
						currentIndex++;

						// If this is the last card (3th card), store the card value
						if (currentIndex === 3) {
							if (isPlayer1) {
								gameCards.player1CardValue = card.value; // Store Player 1's card value
								console.log(`Player 1's last card value: ${card.value}`);
							} else {
								gameCards.player2CardValue = card.value; // Store Player 2's card value
								console.log(`Player 2's last card value: ${card.value}`);
							}

							// Add the event listener to player1Hand for Player 1
							if (isPlayer1) {
								setTimeout(() => {
									// gets the updated current cards being display
									const currentCardsInWar =
										warBattleContainer.querySelectorAll("img");
									currentCardsInWar.forEach((card) => card.remove());
									console.log("CARDS ARE REMOVED ");
									pokerCardImagePlayerOne = null;
									pokerCardImagePlayerTwo = null;
									console.log(gameCards.warCardBattle);
									gameCards.startWar = false;
									whoWinsWar();
									twoPlayerCardNumberDisplay();
									cardsWarWonPileDisplayPlayer1();
									cardsWarWonPileDisplayPlayer2();
									console.log(gameCards.warCardBattle);
									console.log(gameCards.player1CardsWon);
									player1Hand.addEventListener("click", cardHitButtonHandler);
									console.log(
										"Player 1's last card has been placed. Event listener added."
									);
									console.log(pokerCardImagePlayerOne);
								}, 2000);
							}
						}

						// Add the next card
						addNextCard();
					}
				};

				// Start adding cards
				addNextCard();
			};

			// Add and remove cards for Player 2 with a delay of 500ms between each step
			addAndRemoveCardsWithDelay(
				gameCards.playerTwoDeck,
				"Player 2",
				twCSS.leftImage,
				500,
				false
			);

			// Add and remove cards for Player 1 with a delay of 500.5ms between each step makes sure the card is added second
			addAndRemoveCardsWithDelay(
				gameCards.playerOneDeck,
				"Player 1",
				twCSS.rightImage,
				500.5,
				true
			);
		}, 1500); // Delay before removing cards and starting the card-adding process
	}
}


function war2Cards(){
	const backImage = warCards.cardsDeck.getBackOfCard();
	const warBattleContainer = document.getElementById("War");
	const cardsInWar = warBattleContainer.querySelectorAll("img");
	pokerCardImagePlayerOne = gameCards.gameCardImage(
		backImage,
		twCSS.rightImage
	);

	if ((gameCards.playerOneDeck.length) === 2 || gameCards.playerTwoDeck.length === 2) {
		console.log("START WAR 2 Card");
		console.log(gameCards.warCardBattle);

		// Remove the cards in the middle after a delay
		setTimeout(() => {
			// Remove the cards in the middle
			cardsInWar.forEach((card) => card.remove());

			// Function to add and remove cards with fade animations
			const addAndRemoveCardsWithDelay = (
				playerDeck,
				player,
				imageClass,
				delay,
				isPlayer1
			) => {
				let currentIndex = 0;

				const addNextCard = () => {
					if (currentIndex === 2) return; // Stop after 2 cards
					const card = gameCards.removeFirstCard(playerDeck);
					twoPlayerCardNumberDisplay();
					const isBackCard = currentIndex < 1; // First 1 cards are back cards, 4th is real
					const cardSrc = isBackCard ? backImage : "../" + card.src;

					// Create the card image
					const cardImage = gameCards.gameCardImage(cardSrc, imageClass);

					// Add fade-in animation to the card
					cardImage.classList.add("animate__animated", "animate__fadeIn");
					warBattleContainer.appendChild(cardImage);

					// Add the card to the warCardBattle array
					gameCards.warCardBattle.push(card);

					// Log the warCardBattle array after each card is added
					console.log(`Added card to ${player} warCardBattle:`, card);
					console.log("Current warCardBattle:", gameCards.warCardBattle);

					// If it's a back card, remove it after a delay with fade-out animation
					if (isBackCard) {
						setTimeout(() => {
							// Add fade-out animation to the card
							cardImage.classList.remove("animate__fadeIn");
							cardImage.classList.add("animate__fadeOut");

							// Remove the card from the DOM after the fade-out animation completes
							cardImage.addEventListener(
								"animationend",
								() => {
									cardImage.remove();
									console.log(`Removed back card from ${player}`);

									// Add the next card after the fade-out completes
									currentIndex++;
									addNextCard();
								},
								{ once: true }
							);
						}, delay); // Delay before starting the fade-out
					} else {
						// For the real card, don't remove it
						currentIndex++;

						// If this is the last card (2th card), store the card value
						if (currentIndex === 2) {
							if (isPlayer1) {
								gameCards.player1CardValue = card.value; // Store Player 1's card value
								console.log(`Player 1's last card value: ${card.value}`);
							} else {
								gameCards.player2CardValue = card.value; // Store Player 2's card value
								console.log(`Player 2's last card value: ${card.value}`);
							}

							// Add the event listener to player1Hand for Player 1
							if (isPlayer1) {
								setTimeout(() => {
									// gets the updated current cards being display
									const currentCardsInWar =
										warBattleContainer.querySelectorAll("img");
									currentCardsInWar.forEach((card) => card.remove());
									console.log("CARDS ARE REMOVED ");
									pokerCardImagePlayerOne = null;
									pokerCardImagePlayerTwo = null;
									console.log(gameCards.warCardBattle);
									gameCards.startWar = false;
									whoWinsWar();
									twoPlayerCardNumberDisplay();
									cardsWarWonPileDisplayPlayer1();
									cardsWarWonPileDisplayPlayer2();
									console.log(gameCards.warCardBattle);
									console.log(gameCards.player1CardsWon);
									player1Hand.addEventListener("click", cardHitButtonHandler);
									console.log(
										"Player 1's last card has been placed. Event listener added."
									);
									console.log(pokerCardImagePlayerOne);
								}, 2000);
							}
						}

						// Add the next card
						addNextCard();
					}
				};

				// Start adding cards
				addNextCard();
			};

			// Add and remove cards for Player 2 with a delay of 500ms between each step
			addAndRemoveCardsWithDelay(
				gameCards.playerTwoDeck,
				"Player 2",
				twCSS.leftImage,
				500,
				false
			);

			// Add and remove cards for Player 1 with a delay of 500.5ms between each step makes sure the card is added second
			addAndRemoveCardsWithDelay(
				gameCards.playerOneDeck,
				"Player 1",
				twCSS.rightImage,
				500.5,
				true
			);
		}, 1500); // Delay before removing cards and starting the card-adding process
	}
}


function war1Cards() { // if player has 1 card left 
    const backImage = warCards.cardsDeck.getBackOfCard();
    const warBattleContainer = document.getElementById("War");
    const cardsInWar = warBattleContainer.querySelectorAll("img");
    pokerCardImagePlayerOne = gameCards.gameCardImage(
        backImage,
        twCSS.rightImage
    );

    if (gameCards.playerOneDeck.length === 1 || gameCards.playerTwoDeck.length === 1) {
        console.log("START WAR 1 Card");
        console.log(gameCards.warCardBattle);

        // Remove the cards in the middle after a delay
        setTimeout(() => {
            // Remove the cards in the middle
            cardsInWar.forEach((card) => card.remove());

            // Function to add and remove cards with fade animations
            const addAndRemoveCardsWithDelay = (
                playerDeck,
                player,
                imageClass,
                delay,
                isPlayer1
            ) => {
                let currentIndex = 0;

                const addNextCard = () => {
                    if (currentIndex === 1) return; // Stop after 1 card
                    const card = gameCards.removeFirstCard(playerDeck);
                    twoPlayerCardNumberDisplay();
                    const cardSrc = "../" + card.src; // Directly use the card's image source

                    // Create the card image
                    const cardImage = gameCards.gameCardImage(cardSrc, imageClass);

                    // Add fade-in animation to the card
                    cardImage.classList.add("animate__animated", "animate__fadeIn");
                    warBattleContainer.appendChild(cardImage);

                    // Add the card to the warCardBattle array
                    gameCards.warCardBattle.push(card);

                    // Log the warCardBattle array after each card is added
                    console.log(`Added card to ${player} warCardBattle:`, card);
                    console.log("Current warCardBattle:", gameCards.warCardBattle);

                    // For the real card, don't remove it
                    currentIndex++;

                    // Store the card value
                    if (currentIndex === 1) {
                        if (isPlayer1) {
                            gameCards.player1CardValue = card.value; // Store Player 1's card value
                            console.log(`Player 1's last card value: ${card.value}`);
                        } else {
                            gameCards.player2CardValue = card.value; // Store Player 2's card value
                            console.log(`Player 2's last card value: ${card.value}`);
                        }

                        // Add the event listener to player1Hand for Player 1
                        if (isPlayer1) {
                            setTimeout(() => {
                                // Gets the updated current cards being displayed
                                const currentCardsInWar =
                                    warBattleContainer.querySelectorAll("img");
                                currentCardsInWar.forEach((card) => card.remove());
                                console.log("CARDS ARE REMOVED ");
                                pokerCardImagePlayerOne = null;
                                pokerCardImagePlayerTwo = null;
                                console.log(gameCards.warCardBattle);
                                gameCards.startWar = false;
                                whoWinsWar();
                                twoPlayerCardNumberDisplay();
                                cardsWarWonPileDisplayPlayer1();
                                cardsWarWonPileDisplayPlayer2();
                                console.log(gameCards.warCardBattle);
                                console.log(gameCards.player1CardsWon);
                                player1Hand.addEventListener("click", cardHitButtonHandler);
                                console.log(
                                    "Player 1's last card has been placed. Event listener added."
                                );
                                console.log(pokerCardImagePlayerOne);
                            }, 2000);
                        }
                    }

                    // Add the next card
                    addNextCard();
                };

                // Start adding cards
                addNextCard();
            };

            // Add and remove cards for Player 2 with a delay of 500ms between each step
            addAndRemoveCardsWithDelay(
                gameCards.playerTwoDeck,
                "Player 2",
                twCSS.leftImage,
                500,
                false
            );

            // Add and remove cards for Player 1 with a delay of 500.5ms between each step (ensures the card is added second)
            addAndRemoveCardsWithDelay(
                gameCards.playerOneDeck,
                "Player 1",
                twCSS.rightImage,
                500.5,
                true
            );
        }, 1500); // Delay before removing cards and starting the card-adding process
    }
}


function whoWinTheGame(){

	if(gameCards.player2CardsWon.length === 0 && gameCards.playerTwoDeck.length === 0){
		createWinnerScreen("Player 1 Is Victory")
	}
	else if(gameCards.player1CardsWon.length === 0 && gameCards.playerOneDeck.length === 0){
		createWinnerScreen("Player 2 Is Victory")
	}
}

// Function to create the "Player Won" screen
function createWinnerScreen(textWinner) {
	console.log("HI")
    // Create the overlay div (to block interactions)
    const overlay = document.createElement('div');
    overlay.className = "tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-90 tw-flex tw-justify-center tw-items-center tw-z-1000";
    overlay.style.pointerEvents = "auto"; // Allow interactions within the overlay

    // Disable pointer events for all other elements
    document.querySelectorAll('body *').forEach(element => {
        if (element !== overlay) {
            element.style.pointerEvents = "none"; // Disable interactions
        }
    });

    // Hide all text and other elements
    document.querySelectorAll('body *').forEach(element => {
        if (element !== overlay) {
            element.style.visibility = "hidden"; // Hide all elements
        }
    });

    // Create the winner screen container
    const winnerScreen = document.createElement('div');
    winnerScreen.className = "tw-bg-gray-800 tw-p-8 tw-rounded-lg tw-shadow-lg tw-text-center tw-max-w-md tw-w-full";
    winnerScreen.style.pointerEvents = "auto"; // Allow interactions within the winner screen

    // Add the two swords crossing (X)
    const swordsDiv = document.createElement('div');
    swordsDiv.className = "tw-relative tw-w-20 tw-h-20 tw-mx-auto tw-mb-6";

    const sword1 = document.createElement('div');
    sword1.innerHTML = `
        <svg class="tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0 tw-transform tw-rotate-45" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
    `;

    const sword2 = document.createElement('div');
    sword2.innerHTML = `
        <svg class="tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0 tw-transform -tw-rotate-45" fill="none" stroke="#ef4444" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
    `;

    swordsDiv.appendChild(sword1);
    swordsDiv.appendChild(sword2);

    // Add the congratulatory message
    const heading = document.createElement('h1');
    heading.className = "tw-text-3xl tw-font-bold tw-text-white tw-mb-4";
    heading.textContent = `${textWinner}`;

    const message = document.createElement('p');
    message.className = "tw-text-gray-300 tw-mb-6";
    message.textContent = 'You have emerged victorious. Well fought!';

    // Add the "Play Again" button
    const playAgainButton = document.createElement('button');
    playAgainButton.className = "tw-bg-purple-500 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg hover:tw-bg-purple-600 tw-transition tw-duration-300";
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', () => {
        // Restore pointer events and visibility for all elements
        document.querySelectorAll('body *').forEach(element => {
            element.style.pointerEvents = "auto";
            element.style.visibility = "visible";
        });
        document.body.removeChild(overlay); // Remove the winner screen
			resetGame(); // Reset the game state and reinitialize the game
    });

    // Append all elements to the winner screen
    winnerScreen.appendChild(swordsDiv);
    winnerScreen.appendChild(heading);
    winnerScreen.appendChild(message);
    winnerScreen.appendChild(playAgainButton);

    // Append the winner screen to the overlay
    overlay.appendChild(winnerScreen);

    // Append the overlay to the body
    document.body.appendChild(overlay);
}
function resetGame() {
    // Reset game state variables
	pokerCardImagePlayerOne = null;
	pokerCardImagePlayerTwo = null;
    gameCards.playerOneDeck = [];
    gameCards.playerTwoDeck = [];
    gameCards.player1CardsWon = [];
    gameCards.player2CardsWon = [];
    gameCards.player1CardValue = 0;
    gameCards.player2CardValue = 0;
    gameCards.player1resetWon = false;
    gameCards.player2resetWon = false;
    gameCards.player1WarRest = false;
    gameCards.player2WarRest = false;
    gameCards.Player1InWarRest = false;
    gameCards.player2InWarRest = false;
    gameCards.warBattles = 0;
    gameCards.warCardBattle = [];
    gameCards.startWar = false;


	const playerHand = document.querySelector("#warClicker");
	const playerNumber1 = document.querySelector(".playerNumberDisplay1");
	const playerNumber2 = document.querySelector(".playerNumberDisplay2");
	const warBattleCards = document.querySelector("#War");
	const player1PileWinnings = document.querySelectorAll(".PlayerOneCardWinnings");
	const player2PileWinnings = document.querySelectorAll(".PlayerTwoCardWinnings");
	const player1CardsTextWinnings = document.querySelector(".CardWonPlayer1");
	const player2CardsTextWinnings = document.querySelector(".CardWonPlayer2");
	
	if (playerHand) {
		playerHand.remove();
		playerNumber1.remove();
		playerNumber2.remove();
		while (warBattleCards.firstChild) {
			warBattleCards.removeChild(warBattleCards.firstChild);
		}
		warBattleCards.remove();
	}
	
	if (player1PileWinnings.length > 0) {
		player1PileWinnings.forEach(player1Pile => player1Pile.remove());
		if (player1CardsTextWinnings) {
			player1CardsTextWinnings.remove();
		}
	}
	
	if (player2PileWinnings.length > 0) {
		player2PileWinnings.forEach(player2Pile => player2Pile.remove());
		if (player2CardsTextWinnings) {
			player2CardsTextWinnings.remove();
		}
	}
	createGameScreen()
    

	// Reinitialize the game
}