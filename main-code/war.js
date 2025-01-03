import {cardGameChose} from "./cards-mode.js"

const gameCards = {
    deckOfCards: 0,
    playerOneDeck: 0,
    playerTwoDeck: 0
}

const twCSS = {
    battleContainer: "tw-flex tw-justify-center	tw-items-center	tw-h-auto tw-w-auto tw-bg-black tw-gap-24 tw-p-12",
    cardImageSize: "tw-h-52 tw-w-32",
    leftImage: "tw-rotate-90",
    rightImage: "tw-rotate-[-90deg]"

}


export function createGameScreen(){
    gameCards.deckOfCards = cardGameChose.cardsStartingAmount
    // make this as a method for future images
    const imageElement = document.createElement("img");
    const imageElement2 = document.createElement("img");
    imageElement.src = "../cards/images/regular-cards/3_of_clubs.png"
    imageElement2.src = "../cards/images/regular-cards/5_of_clubs.png"
    imageElement.className = `${twCSS.rightImage} ${twCSS.cardImageSize}`
    imageElement2.className = `${twCSS.leftImage} ${twCSS.cardImageSize}`;

    const battleContainer = document.createElement("div"); // container for players to place cards
    battleContainer.className = twCSS.battleContainer
    const player1Hand = document.createElement("div")
    const player2Hand = document.createElement("div")
    const body = document.getElementById("bodyContainer");

    battleContainer.append(imageElement, imageElement2)

    body.append(battleContainer)



}


function dealCards(){
    const player1Cards = gameCards.deckOfCards / 2;
    const player2Cards = gameCards.deckOfCards / 2;
}