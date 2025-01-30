---
layout: base
title: Adventure Game
permalink: /gamify/adventureGame
---

<style>
/* Existing CSS styling */
#custom-prompt {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f0f8ff; /* Light blue background */
    border-radius: 12px;
    border: 1px solid #87ceeb; /* Sky blue border */
    padding: 25px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    z-index: 1000;
}

#custom-prompt-box {
    text-align: center;
    position: relative;
    padding: 40px 20px 20px;
}

#custom-prompt-message {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #4682b4;
}

/* New button style for NPC Tracker */
#npcTrackerButton {
    position: relative;
    display: block;
    margin: 15px auto;
    background-color: #4682b4;
    color: white;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    z-index: 1000;
}

#npcTrackerButton:hover {
    background-color: #5a9bd3;
}

/* NPC Tracker Pop-up */
#npcTrackerPopup {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: auto;
    min-height: 20%;
    background-color: white;
    border: 2px solid #4682b4;
    border-radius: 12px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
    padding: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: black;
    z-index: 1001;
}
</style>

<!-- Score & Stats -->
<div id="score" style="position: absolute; top: 75px; left: 10px; color: black; font-size: 20px; background-color: white;">
   Time: <span id="timeScore">0</span>
</div>

<div id="stats-container" style="position: absolute; top: 120px; left: 10px; background-color: rgba(0, 0, 0, 0.7); color: white; padding: 10px; border-radius: 5px;">
    <div>Balance: <span id="balance">0</span></div>
    <div>Chat Score: <span id="chatScore">0</span></div>
    <div>Questions Answered: <span id="questionsAnswered">0</span></div>
    
    <!-- NPC Tracker Button added below the stats -->
    <button id="npcTrackerButton">NPC Tracker</button>
</div>

<div id="gameContainer">
    <div id="promptDropDown" class="promptDropDown" style="z-index: 9999"></div>
    <canvas id='gameCanvas'></canvas>
</div>

<!-- NPC Tracker Pop-up -->
<div id="npcTrackerPopup">
    <h2>NPCs Met:</h2>
    <ul id="npcTrackerList"></ul>
</div>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/adventureGame/GameControl.js';
    import Prompt from '{{site.baseurl}}/assets/js/adventureGame/Prompt.js';
    import { getStats } from '{{site.baseurl}}/assets/js/adventureGame/StatsManager.js';

    const path = "{{site.baseurl}}";
    GameControl.start(path);
    GameControl.startTimer();
    Prompt.initializePrompt();

    window.submitAnswer = submitAnswer;
    window.showCustomPrompt = showCustomPrompt;
    window.closeCustomPrompt = closeCustomPrompt;

    window.onload = function() {
        getStats();
    };
</script>

<script>
    let npcTracker = []; // Stores NPC names in order

    // Function to update NPC tracker UI
    function updateNpcTracker() {
        const list = document.getElementById("npcTrackerList");
        list.innerHTML = ""; // Clear old data
        npcTracker.forEach(npc => {
            const li = document.createElement("li");
            li.textContent = npc;
            list.appendChild(li);
        });
    }

    // Function to toggle the NPC Tracker pop-up
    function toggleNpcTracker() {
        const popup = document.getElementById("npcTrackerPopup");
        if (popup.style.display === "none" || popup.style.display === "") {
            updateNpcTracker();
            popup.style.display = "block"; // Show the popup
        } else {
            popup.style.display = "none"; // Hide the popup
        }
    }

    // Wait until the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", function() {
        const npcTrackerButton = document.getElementById("npcTrackerButton");
        if (npcTrackerButton) {
            npcTrackerButton.addEventListener("click", toggleNpcTracker);
        }

        // Detect when the player presses "E" to interact with NPCs
        document.addEventListener("keydown", function(event) {
            if (event.key === "e" || event.key === "E") {
                trackNpcInteraction();
            }
        });
    });

    // Function to track NPC interactions
    function trackNpcInteraction() {
        // List of possible NPCs to track (in order)
        const possibleNpcs = ["Tux", "Octocat", "Linux Robot"];

        // If the player hasn't interacted yet, add the next NPC in order
        if (npcTracker.length < possibleNpcs.length) {
            const nextNpc = possibleNpcs[npcTracker.length];
            if (!npcTracker.includes(nextNpc)) {
                npcTracker.push(nextNpc);
            }
        }

        updateNpcTracker();
    }
</script>
