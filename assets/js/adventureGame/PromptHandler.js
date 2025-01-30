import { javaURI, fetchOptions } from "../api/config.js";
import { getBalance, getChatScore, getQuestionsAnswered } from './StatsManager.js';
import GameObject from "./GameObject.js";

// Handle disabling movement during prompts
let isPromptOpen = false;

export function disableGameControls() {
    isPromptOpen = true;
}

export function enableGameControls() {
    isPromptOpen = false;
}

export function isPromptCurrentlyOpen() {
    return isPromptOpen;
}

const originalHandleKeyDown = GameObject.prototype.handleKeyDown;
GameObject.prototype.handleKeyDown = function(event) {
    if (!isPromptOpen) {
        originalHandleKeyDown.call(this, event);
    }
};

/**
 * Displays a custom prompt with a question and handles user input.
 */
export function showCustomPrompt(question, callback) {
    // Get the necessary elements for the prompt
    const promptBox = document.getElementById('custom-prompt');
    const promptMessage = document.getElementById('custom-prompt-message');
    const promptInput = document.getElementById('custom-prompt-input');
    const submitButton = document.getElementById('custom-prompt-submit');

    // Prevent game controls from working while the prompt is open
    disableGameControls();

    // Split the question into a title (first line) and the rest of the content
    const questionLines = question.split("\n");
    const title = questionLines[0]; // First line is the title
    const content = questionLines.slice(1).join("<br>"); // Join the rest with line breaks

    // Set up the HTML for the prompt message
    promptMessage.innerHTML = `
        <h2 style="margin-bottom: 10px; color: #4682b4;">${title}</h2> <!-- Title with a blue color -->
        <div style="text-align: left; font-family: monospace; color: #333;"> <!-- Content styled as code -->
            ${content}
        </div>
    `;

    // Clear any previous input and show the prompt
    promptInput.value = '';
    promptBox.style.display = 'block';

    // Handle the submit button click
    submitButton.onclick = () => {
        const userAnswer = promptInput.value.trim(); // Get the user's answer
        if (userAnswer) {
            callback(userAnswer); // Pass the answer to the callback function
            closeCustomPrompt(); // Close the prompt after submitting
        } else {
            alert("Please provide an answer."); // Show a message if the input is empty
        }
    };
}

/**
 * Closes the custom prompt.
 */
export function closeCustomPrompt() {
    const promptBox = document.getElementById('custom-prompt');
    promptBox.style.display = 'none';
    const promptInput = document.getElementById('custom-prompt-input');
    if (promptInput) promptInput.value = '';
    enableGameControls();
}

/**
 * Submits the answer to the server and returns the score.
 */
export async function submitAnswer(content, questionId) {
    try {
        const response = await fetch(`${javaURI}/rpg_answer/submitAnswer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content, questionId, personId: 1 })
        });

        const data = await response.json();
        const score = data.question.points || "Error scoring answer";

        // Update stats immediately after submitting the answer
        getBalance();
        getChatScore();
        getQuestionsAnswered();

        return score;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return "Error submitting answer";
    }
}