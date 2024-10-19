---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

    function resizeCanvas() {
        const canvas = document.getElementById('gameCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    document.addEventListener('fullscreenchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Background data for images
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
        src: "{{site.baseurl}}/images/rpg/bunnyhunter.png.png",
        data: { ...sprite.data } // Use the same sprite data structure
    };

    const assets = {
        images,
        sprite,
        sprite2
    };

    // Start the game
    const gameControl = new GameControl();
    gameControl.start(assets);

    function toggleFullScreen() {
        const canvas = document.getElementById('gameCanvas');
        if (!document.fullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    const canvas = document.getElementById('gameCanvas');
    canvas.addEventListener('click', toggleFullScreen);
</script>
