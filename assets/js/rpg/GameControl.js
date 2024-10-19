import GameEnv from './GameEnv.js';
import Player from './Player.js';
import Fish from './Fish.js';

class GameControl {
    constructor() {
        // Initialization code if needed
    }

    start(assets = {}) {
        GameEnv.create(); // Create the Game World
        this.player = new Player(assets.sprite || null);
        this.fish = new Fish(assets.sprite2 || null);
        this.gameLoop();
    }

    gameLoop() {
        GameEnv.clear(); // Clear the canvas
        this.player.update(); // Update the player
        this.fish.update(); // Update the fish
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    resize() {
        GameEnv.resize(); // Resize the canvas and player
        this.player.resize();
        this.fish.resize();
    }
}

export default GameControl;
