// code for everything to work
import {
	createPlayerPageElements,
	deletePlayerPageElements,
} from "./player-screen.js";

import { deleteCardsPageElement } from "./cards-mode.js";

export const screenPage = {
	mainPage: 1, // main is always 1 because this is the first page you see first always
	playersPage: 0,
	cardsAmountPage: 0,
	setActivePage(page) {
		//sets whatever screen person is seeing to 1 others 0
		Object.keys(this).forEach((currentPage) => {
			if (currentPage !== "setActivePage") {
				if (currentPage === page) {
					this[currentPage] = 1;
				} else {
					this[currentPage] = 0;
				}
			}
		});
	},
};

const startButton = document.getElementById("startButton");
const settingsButton = document.getElementById("settingsButton");
const helpButton = document.getElementById("helpButton");
const returnBackArrow = document.getElementById("previously");
let removeMainScreenElements = [];

// removes the main body of screen
function handlesStartButton() {
	const removable = document.querySelectorAll(".main-screen-removable");
	removable.forEach((mainScreenElement) => {
		// gets the current element and saves it
		removeMainScreenElements.push({
			element: mainScreenElement,
			parent: mainScreenElement.parentNode,
			nextSibling: mainScreenElement.nextSibling, // Save the current position
		});
		mainScreenElement.remove();
	});
	returnBackArrow.classList.toggle("tw-hidden");
	screenPage.setActivePage("playersPage");
	createPlayerPageElements();
}

function returnArrowEventListenerHandler() {
	if (screenPage.playersPage === 1) {
		// Transition back to mainPage
		removeMainScreenElements.forEach(({ element, parent, nextSibling }) => {
			parent.insertBefore(element, nextSibling);
		});
		removeMainScreenElements = []; // Clear saved elements
		returnBackArrow.classList.add("tw-hidden"); // Hide back arrow
		screenPage.setActivePage("mainPage");
		deletePlayerPageElements();
	}
	if (screenPage.cardsAmountPage === 1) {
		deleteCardsPageElement()
		screenPage.setActivePage("playersPage");
		createPlayerPageElements()
	}

}
// returns back to the main screen
function remakeMainScreen() {
	startButton.addEventListener("click", handlesStartButton);
	returnBackArrow.addEventListener("click", returnArrowEventListenerHandler);
}
remakeMainScreen();
