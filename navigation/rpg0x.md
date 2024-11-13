---
layout: base
title: RPG v0.3
permalink: /rpg/latest
---
<script type = "module">
import PlayerOne from '{{site.baseurl}}/assets/js/rpg0x/latest/PlayerOne.js';
import PlayerTwo from '{{site.baseurl}}/assets/js/rpg0x/latest/PlayerTwo.js';

function checkCollision() {
            if (
                PlayerOne.x < PlayerTwo.x + PlayerTwo.width &&
                PlayerOne.x + PlayerOne.width > PlayerTwo.x &&
                PlayerOne.y < PlayerTwo.y + PlayerTwo.height &&
                PlayerOne.y + PlayerOne.height > PlayerTwo.y
            ) {
                alert("Game over! You were caught.");
            }
        }
        function gameLoop() {
            checkCollision();

                requestAnimationFrame(gameLoop);
            }
</script>

<style>
.custom-alert {
    display: none;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
}

.custom-alert button {
    background-color: transparent; /* Fully transparent background */
    display: flex; /* Use flexbox for layout */
    align-items: center; /* Center items vertically */
    justify-content: center; /* Center items horizontally */
    width: 100%; /* Adjust width to fit content */
    height: 100%; /* Adjust height to fit content */
    position: absolute; /* Position the button relative to the alert box */
}

</style>

<div id="gameContainer">
    <canvas id='gameCanvas'></canvas>
</div>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg0x/latest/GameControl.js';

    const path = "{{site.baseurl}}";

    // Start game engine
    GameControl.start(path);

    // Full-screen toggle function
    function toggleFullscreen() {
        const gameContainer = document.getElementById('gameContainer');
        if (!document.fullscreenElement) {
            if (gameContainer.requestFullscreen) {
                gameContainer.requestFullscreen();
            } else if (gameContainer.mozRequestFullScreen) {
                gameContainer.mozRequestFullScreen();
            } else if (gameContainer.webkitRequestFullscreen) {
                gameContainer.webkitRequestFullscreen();
            } else if (gameContainer.msRequestFullscreen) {
                gameContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    // Detect "F" key press to toggle full-screen mode
    document.addEventListener('keydown', function(event) {
        if (event.key === 'f' || event.key === 'F') {
            toggleFullscreen();
        }
    });
</script>

<style>
    #gameContainer {
        width: 100vw; /* Full viewport width */
        height: 100vh; /* Full viewport height */
        position: relative;
        overflow: hidden;
    }

    #gameCanvas {
        width: 100%; /* Stretch to full container width */
        height: 100%; /* Stretch to full container height */
        display: block;
    }
</style>
