import { baseurl, pythonURI, fetchOptions } from './config.js';

console.log("login.js loaded");

document.addEventListener('DOMContentLoaded', function() {
    console.log("Base URL:", baseurl); // Debugging line
    getCredentials(baseurl) // Call the function to get credentials
        .then(data => {
            console.log("Credentials data:", data); // Debugging line
            const loginArea = document.getElementById('loginArea');
            if (data) { // Update the login area based on the data
                // User is authenticated, replace "Login" with User's name
                loginArea.innerHTML = `
                    <div class="dropdown">
                        <button class="dropbtn">${data.name}</button>
                        <div class="dropdown-content">
                            <a href="${baseurl}/logout">Logout</a>
                            <a href="${baseurl}/profile">Profile</a>
                            <a href="${baseurl}/analytics">Analytics</a>
                            <a href="${baseurl}/gamify">Gamify</a>
                            <a href="${baseurl}/toolkit-login">Toolkit</a>
                        </div>
                    </div>
                `;
            } else {
                // User is not authenticated, then "Login" link is shown
                loginArea.innerHTML = `<a href="${baseurl}/login">Login</a>`;
            }
        })
        .catch(err => {
            console.error("Error fetching credentials: ", err);
        });
});

function getCredentials(baseurl) {
    const URL = pythonURI + '/api/id';
    return fetch(URL, fetchOptions)
        .then(response => {
            if (response.status !== 200) {
                console.error("HTTP status code: " + response.status);
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data === null) return null;
            console.log(data);
            return data;
        })
        .catch(err => {
            console.error("Fetch error: ", err);
            return null;
        });
}
