// Function to remove all instances of Shorts videos, buttons, and related components
function removeShorts() {
    // Remove Shorts videos from the homepage
    const homepageShorts = document.querySelectorAll('ytd-rich-item-renderer');
    homepageShorts.forEach((element) => {
        const link = element.querySelector('a[href*="/shorts/"]');
        if (link) {
            element.remove();
        }
    });

    // Remove Shorts recommendations in search results or other sections
    const searchShorts = document.querySelectorAll('ytd-video-renderer, ytd-rich-item-renderer');
    searchShorts.forEach((result) => {
        const link = result.querySelector('a[href*="/shorts/"]');
        if (link) {
            result.remove();
        }
    });

    // Remove dynamically loaded Shorts sections
    const shortsSections = document.querySelectorAll('ytd-reel-shelf-renderer, ytd-reel-item-renderer');
    shortsSections.forEach((section) => {
        section.remove();
    });

    // Disable any click functionality related to Shorts
    const endpointElements = document.querySelectorAll("a[href*='/shorts']");
    endpointElements.forEach((endpoint) => {
        endpoint.removeAttribute('href'); // Remove the link
        endpoint.onclick = (e) => e.preventDefault(); // Prevent click functionality
    });

    // Pause and mute any active video/audio related to Shorts
    const activeShortsPlayers = document.querySelectorAll('video, audio');
    activeShortsPlayers.forEach((player) => {
        const playerSource = player.closest('a[href*="/shorts/"]');
        if (playerSource) {
            player.pause(); // Stop playback
            player.currentTime = 0; // Reset playback time
            player.muted = true; // Mute the audio
        }
    });

    // Remove Shorts buttons specifically
    removeShortsButton();

    // Remove the specific Shorts tab button
    removeShortsTabButton();

    // Remove Shorts up and down navigation buttons
    removeShortsNavigationButtons();

    // Remove Shorts "Previous video" button
    removeShortsPreviousButton();

    // Remove the "rich-shelf-header" div
    removeRichShelfHeader();
}

// Function to remove the Shorts button specifically
function removeShortsButton() {
    // Remove Shorts button in the main sidebar or anywhere in the page
    const shortsButtons = document.querySelectorAll('a#endpoint[title="Shorts"]');
    shortsButtons.forEach((button) => {
        button.remove(); // Remove the button from the DOM
    });
}

// Function to remove the specific Shorts tab button
function removeShortsTabButton() {
    const shortsTabButton = document.querySelector('yt-tab-shape[tab-title="Shorts"]');
    if (shortsTabButton) {
        shortsTabButton.remove();
    }
}

// Function to remove Shorts up and down navigation buttons
function removeShortsNavigationButtons() {
    const navigationButtons = document.querySelectorAll('.yt-spec-touch-feedback-shape__fill');
    navigationButtons.forEach((button) => {
        const parent = button.closest('button');
        if (parent) {
            parent.remove();
        }
    });
}

// Function to remove the Shorts "Previous video" button
function removeShortsPreviousButton() {
    const previousButton = document.querySelector('button.yt-spec-button-shape-next[aria-label="Previous video"]');
    if (previousButton) {
        previousButton.remove();
    }
}

// Function to block the Shorts window completely
function blockShortsWindow() {
    const shortsContainer = document.querySelector('#shorts-container');
    if (shortsContainer) {
        shortsContainer.style.display = 'none'; // Hide the Shorts container
    }

    // Ensure Shorts-related containers in search results or dynamically added sections are hidden
    const dynamicShortsContainers = document.querySelectorAll('#shorts-container, ytd-reel-video-renderer');
    dynamicShortsContainers.forEach((container) => {
        container.style.display = 'none';
    });
}

// Function to mute Shorts audio when on Shorts-specific pages
function muteShortsAudioOnPage() {
    if (window.location.href.includes('/shorts/')) {
        const activeShortsPlayers = document.querySelectorAll('video, audio');
        activeShortsPlayers.forEach((player) => {
            player.muted = true; // Ensure the audio is muted
        });
    }
}

// Function to remove the "rich-shelf-header" div
function removeRichShelfHeader() {
    const richShelfHeader = document.querySelector('#rich-shelf-header');
    if (richShelfHeader) {
        richShelfHeader.remove(); // Remove the element from the DOM
    }
}

// Continuously monitor for new Shorts sections, buttons, or playback and handle them
function monitorDynamicShorts() {
    const observer = new MutationObserver(() => {
        removeShorts();
        blockShortsWindow();
        muteShortsAudioOnPage(); // Mute audio if on a Shorts page
    });

    // Apply observer on DOM changes
    observer.observe(document.body, { childList: true, subtree: true });
}

// Initialize Shorts removal and blocking
function initShortsRemoval() {
    document.addEventListener('DOMContentLoaded', () => {
        removeShorts();
        blockShortsWindow();
        muteShortsAudioOnPage();
    });

    monitorDynamicShorts();
}

// Run the initialization
initShortsRemoval();
