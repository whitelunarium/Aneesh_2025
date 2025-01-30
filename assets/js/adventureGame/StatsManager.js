import { javaURI, fetchOptions } from "../api/config.js";

/**
 * Fetches and updates the game stats UI (Balance, Chat Score, Questions Answered).
 */
export function getStats() {
    const personId = 1;
    const endpoints = {
        balance: `${javaURI}/rpg_answer/getBalance/${personId}`,
        chatScore: `${javaURI}/rpg_answer/getChatScore/${personId}`,
        questionsAnswered: `${javaURI}/rpg_answer/getQuestionsAnswered/${personId}`
    };

    for (let [key, url] of Object.entries(endpoints)) {
        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(data => {
                document.getElementById(key).innerText = data ?? 0;
            })
            .catch(err => console.error(`Error fetching ${key}:`, err));
    }
}

/**
 * Fetches the player's current balance.
 */
export function getBalance() {
    fetch(`${javaURI}/rpg_answer/getBalance/1`, fetchOptions)
        .then(response => response.json())
        .then(data => {
            document.getElementById("balance").innerText = data ?? 0;
        })
        .catch(err => console.error("Error fetching balance:", err));
}

/**
 * Fetches the player's current chat score.
 */
export function getChatScore() {
    fetch(`${javaURI}/rpg_answer/getChatScore/1`, fetchOptions)
        .then(response => response.json())
        .then(data => {
            document.getElementById("chatScore").innerText = data ?? 0;
        })
        .catch(err => console.error("Error fetching chat score:", err));
}

/**
 * Fetches the number of questions answered by the player.
 */
export function getQuestionsAnswered() {
    fetch(`${javaURI}/rpg_answer/getQuestionsAnswered/1`, fetchOptions)
        .then(response => response.json())
        .then(data => {
            document.getElementById("questionsAnswered").innerText = data ?? 0;
        })
        .catch(err => console.error("Error fetching questions answered:", err));
}
