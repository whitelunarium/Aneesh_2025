---
layout: base
title: RPG v0.3
permalink: /rpg/latest
---

<script>
        // Player setup
        const player = { 
            x: 50, 
            y: canvas.height / 2, 
            width: 40, 
            height: 40, 
            speed: 5 
        };

        // Projectile setup
        const player2 = {
            x: 50,
            y: canvas.height / 2,
            width: 40,
            height: 40,
            speed: 5 
        };

          let gameRunning = true;
        let survivalTime = 0;
        let lastUpdateTime = Date.now();

        // Main game loop
       function gameLoop() {
            if (gameRunning) {
                checkCollision();

                if (gameRunning = false) {
                    alert("You died!");
                    if (confirm("Play again?")) resetGame();
                }

                requestAnimationFrame(gameLoop);
            }
        }



    // Check for collisions
        function checkCollision() {
            if (
                player.x < projectile.x + projectile.width &&
                player.x + player.width > projectile.x &&
                player.y < projectile.y + projectile.height &&
                player.y + player.height > projectile.y
            ) 
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

<div id="custom-alert" class="custom-alert">
    <button onclick="closeCustomAlert()" id="custom-alert-message"></button>
</div>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg0x/latest/GameControl.js';

    const path = "{{site.baseurl}}";

    // Start game engine
    GameControl.start(path);

</script>
