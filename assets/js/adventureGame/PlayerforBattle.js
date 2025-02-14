import GameEnv from './GameEnv.js';
import Character from './Character.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate
const INIT_POSITION = { x: 0, y: 0 };

/**
 * Player is a dynamic class that manages the data and events for objects like a player.
 */
class PlayerForBattle extends Character {
    /**
     * The constructor method is called when a new Player object is created.
     * 
     * @param {Object|null} data - The sprite data for the object. If null, a default red square is used.
     */
    constructor(data = null) {
        super(data);
        this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };
        this.health = data?.health || 100; // Default health value
        this.attack = data?.attack || 10; // Default attack value
        this.velocity = { x: 0, y: 0 }; // Ensure velocity is set to zero
        this.bindEventListeners();
    }

    /**
     * Binds key event listeners, but movement is disabled.
     */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    /**
     * Handles key down events but prevents movement.
     */
    handleKeyDown(event) {
        // Prevent movement by doing nothing
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    /**
     * Handles key up events but ensures the player remains stationary.
     */
    handleKeyUp(event) {
        // Ensure velocity stays at zero
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
}

export default PlayerForBattle;