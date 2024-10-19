---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    // Ensure that GameControl.js is correctly loaded
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

    function resizeCanvas() {
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Optional: Trigger a game redraw if necessary
            if (gameControl) {
                gameControl.redraw();
            }
        } else {
            console.error("Canvas element not found");
        }
    }

    // Event listeners for resizing and fullscreen changes
    document.addEventListener('fullscreenchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

    // Initial canvas resize
    resizeCanvas();

    // Image assets data
    const images = [
        {
            src: "{{site.baseurl}}/images/rpg/41524.jpg",
            data: { pixels: { height: 580, width: 1038 } }
        },
        {
            src: "{{site.baseurl}}/images/rpg/Maze_Background.png",
            data: { pixels: { height: 580, width: 1038 } }
        }
    ];

    // Sprite data for Bunny-Sprite and Fishies
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

    const sprite2 = {
        src: "{{site.baseurl}}/images/rpg/fishies.png",
        data: { ...sprite.data } // Duplicate structure for sprite2
    };

    const assets = {
        images,
        sprite,
        sprite2
    };

    // Initialize the GameControl class
    let gameControl;
    try {
        gameControl = new GameControl();
        gameControl.start(assets);
    } catch (error) {
        console.error("Error initializing GameControl:", error);
    }

    // Toggle fullscreen mode on canvas click
    function toggleFullScreen() {
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            if (!document.fullscreenElement) {
                if (canvas.requestFullscreen) {
                    canvas.requestFullscreen();
                } else {
                    console.error("Fullscreen API not supported");
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        } else {
            console.error("Canvas element not found for fullscreen");
        }
    }

    // Add click listener to canvas
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        canvas.addEventListener('click', toggleFullScreen);
    } else {
        console.error("Canvas element not found");
    }
</script>
