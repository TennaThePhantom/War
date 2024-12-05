// code for everything to work

const startButton = document.getElementById("startButton");
const settingsButton = document.getElementById("settingsButton");
const helpButton = document.getElementById("helpButton");
const returnBackArrow = document.getElementById("previously");
let removeMainScreenElements = [];

// removes the main body of screen
function removableMainScreen() {
	startButton.addEventListener("click", () => {
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
	});
}

// returns back to the main screen
function remakeMainScreen() {
	returnBackArrow.addEventListener("click", () => {
		removeMainScreenElements.forEach(({element, parent, nextSibling}) => {
			// restores main screen elements to original position
			parent.insertBefore(element, nextSibling);
		});
        // Clear the array after restoring and hides arrow
        removeMainScreenElements = [];
        returnBackArrow.classList.toggle("tw-hidden");

	});
}

removableMainScreen();
remakeMainScreen();
