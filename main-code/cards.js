// Code to handle the import/export of the images to other files

export const cardsDeck = {
    cards: [],
    
    randomCard: 0,
    getCards: function (){
        this.cards = [
            {
                suit: "hearts",
                value: 2,
                name: "2 of Hearts",
                imageSrc: "cards/images/regular-cards/2_of_hearts.png",
            },
            {
                suit: "spades",
                value: 2,
                name: "2 of Spades",
                imageSrc: "cards/images/regular-cards/2_of_spades.png",
            },
            {
                suit: "clubs",
                value: 2,
                name: "2 of Clubs",
                imageSrc: "cards/images/regular-cards/2_of_clubs.png",
            },
            {
                suit: "diamonds",
                value: 2,
                name: "2 of Diamonds",
                imageSrc: "cards/images/regular-cards/2_of_diamonds.png",
            },
        
            {
                suit: "hearts",
                value: 3,
                name: "3 of Hearts",
                imageSrc: "cards/images/regular-cards/3_of_hearts.png",
            },
            {
                suit: "spades",
                value: 3,
                name: "3 of Spades",
                imageSrc: "cards/images/regular-cards/3_of_spades.png",
            },
            {
                suit: "clubs",
                value: 3,
                name: "3 of Clubs",
                imageSrc: "cards/images/regular-cards/3_of_clubs.png",
            },
            {
                suit: "diamonds",
                value: 3,
                name: "3 of Diamonds",
                imageSrc: "cards/images/regular-cards/3_of_diamonds.png",
            },
        
            {
                suit: "hearts",
                value: 4,
                name: "4 of Hearts",
                imageSrc: "cards/images/regular-cards/4_of_hearts.png",
            },
            {
                suit: "spades",
                value: 4,
                name: "4 of Spades",
                imageSrc: "cards/images/regular-cards/4_of_spades.png",
            },
            {
                suit: "clubs",
                value: 4,
                name: "4 of Clubs",
                imageSrc: "cards/images/regular-cards/4_of_clubs.png",
            },
            {
                suit: "diamonds",
                value: 4,
                name: "4 of Diamonds",
                imageSrc: "cards/images/regular-cards/4_of_diamonds.png",
            },
        
            {
                suit: "hearts",
                value: 5,
                name: "5 of Hearts",
                imageSrc: "cards/images/regular-cards/5_of_hearts.png",
            },
            {
                suit: "spades",
                value: 5,
                name: "5 of Spades",
                imageSrc: "cards/images/regular-cards/5_of_spades.png",
            },
            {
                suit: "clubs",
                value: 5,
                name: "5 of Clubs",
                imageSrc: "cards/images/regular-cards/5_of_clubs.png",
            },
            {
                suit: "diamonds",
                value: 5,
                name: "5 of Diamonds",
                imageSrc: "cards/images/regular-cards/5_of_diamonds.png",
            },
        
            {
                suit: "hearts",
                value: 6,
                name: "6 of Hearts",
                imageSrc: "cards/images/regular-cards/6_of_hearts.png",
            },
            {
                suit: "spades",
                value: 6,
                name: "6 of Spades",
                imageSrc: "cards/images/regular-cards/6_of_spades.png",
            },
            {
                suit: "clubs",
                value: 6,
                name: "6 of Clubs",
                imageSrc: "cards/images/regular-cards/6_of_clubs.png",
            },
            {
                suit: "diamonds",
                value: 6,
                name: "6 of Diamonds",
                imageSrc: "cards/images/regular-cards/6_of_diamonds.png",
            },
        
            {
                suit: "hearts",
                value: 7,
                name: "7 of Hearts",
                imageSrc: "cards/images/regular-cards/7_of_hearts.png",
            },
            {
                suit: "spades",
                value: 7,
                name: "7 of Spades",
                imageSrc: "cards/images/regular-cards/7_of_spades.png",
            },
            {
                suit: "clubs",
                value: 7,
                name: "7 of Clubs",
                imageSrc: "cards/images/regular-cards/7_of_clubs.png",
            },
            {
                suit: "diamonds",
                value: 7,
                name: "7 of Diamonds",
                imageSrc: "cards/images/regular-cards/7_of_diamonds.png",
            },
        
            {
                suit: "hearts",
                value: 8,
                name: "8 of Hearts",
                imageSrc: "cards/images/regular-cards/8_of_hearts.png",
            },
            {
                suit: "spades",
                value: 8,
                name: "8 of Spades",
                imageSrc: "cards/images/regular-cards/8_of_spades.png",
            },
            {
                suit: "clubs",
                value: 8,
                name: "8 of Clubs",
                imageSrc: "cards/images/regular-cards/8_of_clubs.png",
            },
            {
                suit: "diamonds",
                value: 8,
                name: "8 of Diamonds",
                imageSrc: "cards/images/regular-cards/8_of_diamonds.png",
            },
        
            {
                suit: "hearts",
                value: 9,
                name: "9 of Hearts",
                imageSrc: "cards/images/regular-cards/9_of_hearts.png",
            },
            {
                suit: "spades",
                value: 9,
                name: "9 of Spades",
                imageSrc: "cards/images/regular-cards/9_of_spades.png",
            },
            {
                suit: "clubs",
                value: 9,
                name: "9 of Clubs",
                imageSrc: "cards/images/regular-cards/9_of_clubs.png",
            },
            {
                suit: "diamonds",
                value: 9,
                name: "9 of Diamonds",
                imageSrc: "cards/images/regular-cards/9_of_diamonds.png",
            },
        
            {
                suit: "hearts",
                value: 10,
                name: "10 of Hearts",
                imageSrc: "cards/images/regular-cards/10_of_hearts.png",
            },
            {
                suit: "spades",
                value: 10,
                name: "10 of Spades",
                imageSrc: "cards/images/regular-cards/10_of_spades.png",
            },
            {
                suit: "clubs",
                value: 10,
                name: "10 of Clubs",
                imageSrc: "cards/images/regular-cards/10_of_clubs.png",
            },
            {
                suit: "diamonds",
                value: 10,
                name: "10 of Diamonds",
                imageSrc: "cards/images/regular-cards/10_of_diamonds.png",
            },
        
            {
                suit: "hearts",
                value: 1,
                name: "Ace of Hearts",
                imageSrc: "cards/images/regular-cards/ace_of_hearts.png",
            },
            {
                suit: "spades",
                value: 1,
                name: "Ace of Spades",
                imageSrc: "cards/images/regular-cards/ace_of_spades2.png",
            },
            {
                suit: "clubs",
                value: 1,
                name: "Ace of Clubs",
                imageSrc: "cards/images/regular-cards/ace_of_clubs.png",
            },
            {
                suit: "diamonds",
                value: 1,
                name: "Ace of Diamonds",
                imageSrc: "cards/images/regular-cards/ace_of_diamonds.png",
            },
        
            {
                suit: "clubs",
                value: 11,
                name: "Jack of Clubs",
                imageSrc: "cards/images/regular-cards/jack_of_clubs2.png",
            },
            {
                suit: "diamonds",
                value: 11,
                name: "Jack of Diamonds",
                imageSrc: "cards/images/regular-cards/jack_of_diamonds2.png",
            },
            {
                suit: "hearts",
                value: 11,
                name: "Jack of Hearts",
                imageSrc: "cards/images/regular-cards/jack_of_hearts2.png",
            },
            {
                suit: "spades",
                value: 11,
                name: "Jack of Spades",
                imageSrc: "cards/images/regular-cards/jack_of_spades2.png",
            },
        
            {
                suit: "clubs",
                value: 12,
                name: "Queen of Clubs",
                imageSrc: "cards/images/regular-cards/queen_of_clubs2.png",
            },
            {
                suit: "diamonds",
                value: 12,
                name: "Queen of Diamonds",
                imageSrc: "cards/images/regular-cards/queen_of_diamonds2.png",
            },
            {
                suit: "hearts",
                value: 12,
                name: "Queen of Hearts",
                imageSrc: "cards/images/regular-cards/queen_of_hearts2.png",
            },
            {
                suit: "spades",
                value: 12,
                name: "Queen of Spades",
                imageSrc: "cards/images/regular-cards/queen_of_spades2.png",
            },
        
            {
                suit: "clubs",
                value: 13,
                name: "King of Clubs",
                imageSrc: "cards/images/regular-cards/king_of_clubs2.png",
            },
            {
                suit: "diamonds",
                value: 13,
                name: "King of Diamonds",
                imageSrc: "cards/images/regular-cards/king_of_diamonds2.png",
            },
            {
                suit: "hearts",
                value: 13,
                name: "King of Hearts",
                imageSrc: "cards/images/regular-cards/king_of_hearts2.png",
            },
            {
                suit: "spades",
                value: 13,
                name: "King of Spades",
                imageSrc: "cards/images/regular-cards/king_of_spades2.png",
            },
        
            {
                suit: "joker",
                value: 100,
                name: "Red Joker",
                imageSrc: "cards/images/regular-cards/red_joker.png",
            },
            {
                suit: "joker",
                value: 100,
                name: "Black Joker",
                imageSrc: "cards/images/regular-cards/black_joker.png",
            },
        ];
    },
    getBackOfCard: function (){
        return "../cards/images/regular-cards/card_back_red.png"
    },
    updateRandomIndex: function () {
		this.randomIndex = Math.floor(Math.random() * this.cards.length);
	},

	getRandomCard: function () {
		this.updateRandomIndex(); // Update the random index
		return this.cards[this.randomIndex]; // Return the card at the random index
	},
    drawTwoDecks: function () {
        let deck1 = [];
        let deck2 = [];

        // Draw 28 cards for each deck
        for (let card = 0; card < 28; card++) {
            let card1 = this.getRandomCard();
            let card2 = this.getRandomCard();

            // Ensure that the card is not repeated in the same deck
            while (deck1.includes(card1) || deck2.includes(card1)) {
                card1 = this.getRandomCard();
            }
            while (deck1.includes(card2) || deck2.includes(card2)) {
                card2 = this.getRandomCard();
            }

            deck1.push(card1);
            deck2.push(card2);
        }

        return { deck1, deck2 };
    },
    removeFirstCard: function () {
        if (this.cards.length > 0) {
            return this.cards.shift(); // Removes and returns the first card from the array
        } else {
            return null; // If the deck is empty, return null
        }
    },
};









export * from "./cards.js";