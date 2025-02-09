

const gameCards = {
	playerOneDeck: [],
	playerTwoDeck: [],
	player1CardsWon: [],
	player2CardsWon: [],
	player1CardValue: 0,
	player2CardValue: 0,
	player1resetWon: false,
    player2resetWon: false,
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
		"CardWon tw-absolute tw-top-[28.8%] tw-right-[31.4%] tw-font-black tw-text-4xl tw-z-10 tw-h-auto tw-w-auto",
	player2PileDeckDisplayTest:
		"PlayerTwoCardWinnings tw-absolute tw-left-[29.5%] tw-bottom-[5%] tw-h-32 tw-w-24 tw--translate-y-36 tw-rounded tw-border-solid tw-border-2 tw-border-zinc-300",
	cardCountDisplayPlayer2Test:
		"CardWonPlayer2 tw-absolute tw-bottom-[28.8%] tw-left-[31.4%] tw-font-black tw-text-4xl tw-z-10 tw-h-auto tw-w-auto",
};

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
        console.log("CardCount is" + cardCount);
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
    console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIi");
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
        player2Pile.className = `${twCSS.player1PileDeckDisplay} ${twCSS.leftImage} PlayerTwoCardWinnings`;
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
        console.log("CardCount is " + cardCount);
        cardsWonTextDisplayWarPlayer2();
    } else {
        // if deck gets reset and player doesn't win remove the card display
        if (cardCountDisplay) {
            cardCountDisplay.remove();
            gameCards.player2resetWon = false;
        }
    }

    // this checks if the player won after the reset it reset the display
    if (cardCount === 2 && gameCards.player2resetWon === true) {
        if (cardCountDisplay) {
            cardCountDisplay.remove();
        }
        cardsWonTextDisplayWarPlayer2();
        gameCards.player2resetWon = false;
    }
}

function cardsWonTextDisplayWarPlayer2() {
    const player2Count = gameCards.player2CardsWon.length;
    console.log("Starting cardsWonTextDisplayWar");
    console.log("Player 1 cards won:", player2Count);

    // Select the existing element or create a new one if it doesn't exist
    let cardCountDisplay = document.querySelector(".CardWonPlayer2");
    if (!cardCountDisplay) {
        cardCountDisplay = document.createElement("div");
        cardCountDisplay.className = twCSS.cardCountDisplayPlayer2Test;
        body.append(cardCountDisplay);
        console.log("Created new CardWon element");
    }

    // Update the text content of the element
    cardCountDisplay.textContent = `${player2Count}`;
    console.log("Updated CardWon text content to:", player2Count);

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

        console.log("Total translations needed (capped at 5):", totalTranslations);
        console.log("Existing translations:", existingTranslations);
        console.log("Additional translations to apply:", additionalTranslations);

        // Apply the additional translations
        let transformValue = "";
        for (let i = 0; i < additionalTranslations; i++) {
            transformValue += " translate(-3px, 3px)";
        }

        // Preserve existing transform styles while adding new translations
        const existingTransform = cardCountDisplay.style.transform || "";
        cardCountDisplay.style.transform =
            `${existingTransform} ${transformValue}`.trim();
        console.log("Applied transform:", cardCountDisplay.style.transform);

        // Update the last transformed length
        lastTransformLengthPlayer2 = player2Count;
    } else if (gameCards.player2resetWon === true) {
        // If the player won after reset, apply the translation once
        const existingTransform = cardCountDisplay.style.transform || "";
        cardCountDisplay.style.transform =
            `${existingTransform} translate(-3px, 3px)`.trim();
        console.log("Applied reset transform:", cardCountDisplay.style.transform);

        // Update the last transformed length
        lastTransformLengthPlayer2 = player2Count;
    }
}
