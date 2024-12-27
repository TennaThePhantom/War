import { screenPage } from "./script.js";

// html objects for the functions for this file
const playerScreenElements = {
	removeElements: [],
};

const twCSS = {
	ButtonsContainer:
		"tw-flex tw-items-center tw-space-x-4 tw-absolute tw-top-28 player-screen-removable",
	textHeader: "tw-text-black tw-text-7xl tw-font-serif player-screen-removable",
};
export function createPlayerPageElements() {
	screenPage.playersPage = 1;
	screenPage.mainPage = 0;
	console.log(screenPage.playersPage, screenPage.mainPage);
	const body = document.getElementById(screenPage.body);
	const playersContainerSelector = document.createElement("div");
	const playersHeader = document.createElement("h1");
	const playersHeaderContainer = document.createElement("div");

	playersHeaderContainer.className = twCSS.ButtonsContainer;
	playersHeader.className = twCSS.textHeader;
	playersHeader.textContent = "Choose Your Player Mode";
	playersContainerSelector.id = "playerSelectorContainer";
	playersContainerSelector.classList.add(
		"tw-container",
		"tw-h-auto",
		"tw-w-auto",
		"tw-mx-auto",
		"tw-p-4",
		"tw-relative",
		"tw-top-10",
		"tw-flex",
		"tw-flex-col",
		"tw-items-center",
		"tw-space-y-7",
		"player-screen-removable"
	);
	const twoPlayerButton = document.createElement("button");
	const threePlayerButton = document.createElement("button");
	const fourPlayerButton = document.createElement("button");
	const buttons = [twoPlayerButton, threePlayerButton, fourPlayerButton];
	buttons.forEach((button) => {
		// adds the css to all the buttons
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
			"tw-duration-300"
		);
	}); // css styling for the buttons
	// buttons text
	twoPlayerButton.textContent = "Two Player";
	threePlayerButton.textContent = "Three Player";
	fourPlayerButton.textContent = "Four Player";
	playersContainerSelector.append(
		twoPlayerButton,
		threePlayerButton,
		fourPlayerButton
	);
	playersHeaderContainer.append(playersHeader);
	body.append(playersHeaderContainer);
	body.append(playersContainerSelector);
}

// deletes the created elements
export function deletePlayerPageElements() {
	const playersContainerSelector = document.getElementById(
		"playerSelectorContainer"
	);
	if (screenPage.playersPage === 1 && playersContainerSelector) {
		const removable = document.querySelectorAll(".player-screen-removable");
		removable.forEach((playerScreenElement) => {
			playerScreenElements.removeElements.push({
				element: playerScreenElement,
				parent: playerScreenElement.parentNode,
				nextSibling: playerScreenElement.nextSibling,
			});
			playerScreenElement.remove();
		});
	} else {
		console.log("No player elements to remove or invalid state.");
	}
}
