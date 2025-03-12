import { screenPage } from "./script.js";

// html objects for the functions for this file
const settingsScreenElements = {
	removeElements: [],
};

const twCSS = {
	ButtonsContainer:
		"tw-flex tw-items-center tw-space-x-4 tw-absolute tw-top-28 player-screen-removable",
	textHeader: "tw-text-black tw-text-7xl tw-font-serif settings-screen-removable",
};
export function createSettingPageElements() {
    console.log(screenPage.settingsPage + "is ")
	const body = document.getElementById("bodyContainer");
	const settingsPageContainer = document.createElement("div");
	const settingsHeader = document.createElement("h1");
	const settingsHeaderContainer = document.createElement("div");

	settingsHeaderContainer.className = twCSS.ButtonsContainer;
	settingsHeader.className = twCSS.textHeader;
	settingsHeader.textContent = "Choose Your Theme";
	settingsPageContainer.id = "settingsPageContainer";
	settingsPageContainer.classList.add(
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
		"settings-screen-removable"
	);
	const normalTheme = document.createElement("button");
	const DragonBallThemeButton = document.createElement("button");
	const bleachThemeButton = document.createElement("button");
	const marvelAndDcThemeButton = document.createElement("button");
	const buttons = [
		normalTheme,
		DragonBallThemeButton,
		bleachThemeButton,
		marvelAndDcThemeButton,
	];
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
	normalTheme.textContent = "Normal Theme";
	DragonBallThemeButton.textContent = "Dragon Ball Theme";
	marvelAndDcThemeButton.textContent = "Marvel&Dc Theme";
	bleachThemeButton.textContent = "Bleach Theme";
	settingsPageContainer.append(
		normalTheme,
		DragonBallThemeButton,
		bleachThemeButton,
		marvelAndDcThemeButton
	);
	settingsHeaderContainer.append(settingsHeader);
	body.append(settingsHeaderContainer);
	body.append(settingsPageContainer);
}

export function deleteSettingsPageElements() {
	const settingsPageContainer = document.getElementById(
		"settingsPageContainer"
	);
	if (settingsPageContainer) {
		const removable = document.querySelectorAll(".settings-screen-removable");
		removable.forEach((settingsScreenElement) => {
			settingsScreenElements.removeElements.push({
				element: settingsScreenElement,
				parent: settingsScreenElement.parentNode,
				nextSibling: settingsScreenElement.nextSibling,
			});
			settingsScreenElement.remove();
		});
	} else {
		console.log("No player elements to remove or invalid state.");
	}
}
