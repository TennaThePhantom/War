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
	warGamePage: 0,
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
	if(screenPage.warGamePage === 1){
		console.log("h1")
	}

}
// returns back to the main screen
function remakeMainScreen() {
	startButton.addEventListener("click", handlesStartButton);
	returnBackArrow.addEventListener("click", returnArrowEventListenerHandler);
}

function musicPlayer() {
    const musicFolder = "../music/"; // Path to your music folder
    const songs = ["audio1.mp3", "audio2.mp3", "audio3.mp3", "audio4.mp3"]; // Add your song files here
    
    // Function to get a random song index
    function getRandomSongIndex() {
        return Math.floor(Math.random() * songs.length);
    }
    
    // Create audio element but don't play yet
    let currentSongIndex = getRandomSongIndex();
    const audio = new Audio(musicFolder + songs[currentSongIndex]);
    let isPlaying = false;
    let hasStarted = false; // Track if music has been started
    
    // Control elements
    const playButton = document.getElementById("play-pause-music");
    const skipMusic = document.getElementById("skip-music");
    const turnOffMusic = document.getElementById("turn-on-off-music");
    
    // Function to start music
    function startMusic() {
        if (!hasStarted) {
            audio.play();
            isPlaying = true;
            hasStarted = true;
            
            // Remove the click event listener once music has started
            document.removeEventListener('click', startMusic);
            document.removeEventListener('touchstart', startMusic);
        }
    }
    
    // Add click event listener to the entire document
    document.addEventListener('click', startMusic);
    document.addEventListener('touchstart', startMusic); // For mobile devices
    
    // Play/Pause functionality
    playButton.addEventListener("click", (e) => {
        // If this is the first interaction, startMusic will handle it
        // Prevent this event from firing twice
        if (hasStarted) {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
            } else {
                audio.play();
                isPlaying = true;
            }
        }
        // Stop propagation to prevent the document click from triggering again
        e.stopPropagation();
    });

    // Skip to a random next song
    skipMusic.addEventListener("click", (e) => {
        if (hasStarted) {
            audio.pause();
            currentSongIndex = getRandomSongIndex();
            audio.src = musicFolder + songs[currentSongIndex];
            audio.play();
            isPlaying = true;
        }
        e.stopPropagation();
    });

    // Turn off music
    turnOffMusic.addEventListener("click", (e) => {
        if (hasStarted) {
            audio.pause();
            audio.currentTime = 0;
            isPlaying = false;
        }
        e.stopPropagation();
    });

    // Automatically play a random next song when the current one ends
    audio.addEventListener("ended", () => {
        currentSongIndex = getRandomSongIndex();
        audio.src = musicFolder + songs[currentSongIndex];
        audio.play();
        isPlaying = true;
    });
}

musicPlayer();
remakeMainScreen();
