import { screenPage } from "./script.js";
import {createGameScreen} from "./war.js"

const cardsScreenElements = {
    removeElements: [],
}
const twCSS = {
	ButtonsContainer:
		"tw-flex tw-items-center tw-space-x-4 tw-absolute tw-top-28 cards-screen-removable",
	textHeader: "tw-text-black tw-text-7xl tw-font-serif cards-screen-removable",
	containerPosition:
		"tw-container tw-h-auto tw-w-auto tw-mx-auto tw-p-4 tw-relative tw-top-10 tw-flex tw-flex-col tw-items-center tw-space-y-7 cards-screen-removable",
};
export const cardGameChose = {
    cardsStartingAmount: 0,
}


export function twoPlayerCardsSection() {
	screenPage.setActivePage("cardsAmountPage");
	const cardsAmountContainer = document.createElement("div");
	const body = document.getElementById("bodyContainer");
	const cardsAmountHeader = document.createElement("h1");
	const cardsHeaderContainer = document.createElement("div");

	cardsHeaderContainer.className = twCSS.ButtonsContainer;
	cardsAmountHeader.className = twCSS.textHeader;
    cardsAmountHeader.textContent = "Choose How Many Cards"
    cardsAmountContainer.id = "CardsAmount"
    cardsAmountContainer.className = twCSS.containerPosition
    
    const _52CardsButton = document.createElement("button")
    const _104cardsButton = document.createElement("button")
    const _208cardsButton = document.createElement("button")
    const _416cardsButton = document.createElement("button")
    const buttons = [_52CardsButton, _104cardsButton, _208cardsButton, _416cardsButton]
    buttons.forEach((button) => {
        button.classList.add(
			"tw-w-60",
			"tw-h-20",
			"tw-px-30",
			"tw-py-2",
			"tw-bg-blue-500",
			"tw-text-white",
			"tw-rounded",
			"hover:tw-bg-blue-600",
			"tw-transition",
			"tw-duration-300",
		);
    })
    // buttons 
    _52CardsButton.textContent = "52 Cards"
    _52CardsButton.id = "52Cards"
    _104cardsButton.textContent = "104 Cards"
    _208cardsButton.textContent = "208 Cards"
    _416cardsButton.textContent = "416 Cards"
    cardsAmountContainer.append(_52CardsButton, _104cardsButton, _208cardsButton, _416cardsButton)
    cardsHeaderContainer.append(cardsAmountHeader)
    body.append(cardsHeaderContainer, cardsAmountContainer)
    _52CardsButton.addEventListener("click", WarCardGame52Cards)

}
export function deleteCardsPageElement(){
    const cardsAmountContainerID = document.getElementById("CardsAmount")
    if(screenPage.cardsAmountPage === 1 && cardsAmountContainerID){
        const removable = document.querySelectorAll(".cards-screen-removable")
        removable.forEach((cardsElements) => {
            cardsScreenElements.removeElements.push({
                element: cardsElements,
                parent: cardsElements.parentNode,
                nextSibling: cardsElements.nextSibling,
            })
            cardsElements.remove()
        })
    }
}

function WarCardGame52Cards(){
    cardGameChose.cardsStartingAmount = 52;
    deleteCardsPageElement();
    screenPage.setActivePage("warGamePage")
    createGameScreen()
}