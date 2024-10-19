---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

    let gameControl = null;  // Initialize it here so it's declared in the global scope

    function resizeCanvas() {
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Render something basic for testing
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'green';
            ctx.fillRect(10, 10, 150, 100);

            // Check if gameControl exists before using it
            if (gameControl) {
                // Optionally, add some game logic here if needed
                console.log("GameControl is initialized, resizing canvas...");
            } else {
                console.log("GameControl is not initialized yet.");
            }
        } else {
            console.error("Canvas element not found");
        }
    }

    document.addEventListener('fullscreenchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();  // Initialize the canvas size

    // Initialize gameControl AFTER the resize functions
    try {
        gameControl = new GameControl();  // Initialize GameControl here
        console.log("GameControl initialized");
        
        // Load assets and start the game
        const sprite = {
            src: "{{site.baseurl}}/images/rpg/Bunny-Sprite.png",
            data: {
                SCALE_FACTOR: 10,
                STEP_FACTOR: 1000,
                ANIMATION_RATE: 50,
                pixels: { height: 159, width: 119 },
                orientation: { rows: 4, columns: 3 },
                down: { row: 0, start: 0, columns: 3 },
                left: { row: 2, start: 0, columns: 3 },
                right: { row: 3, start: 0, columns: 3 },
                up: { row: 1, start: 0, columns: 3 },
            }
        };

        const assets = { sprite };
        gameControl.start(assets);  // Start the game once initialized
    } catch (error) {
        console.error("Error initializing GameControl:", error);
    }

    // Add fullscreen toggle functionality
    const canvas = document.getElementById('gameCanvas');
    canvas.addEventListener('click', function toggleFullScreen() {
        if (!document.fullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
</script>

