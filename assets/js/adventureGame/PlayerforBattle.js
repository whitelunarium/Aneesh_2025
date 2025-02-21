import GameEnv from './GameEnv.js';
import Character from './Character.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate
const INIT_POSITION = { x: 0, y: 0 }

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
        this.attackInterval = null;
        this.bPressCount = 0; // Counter for "b" key presses

        this.bindEventListeners();
        this.startAttacking();
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

        // Check if "b" is pressed
        if (event.key === "b") {
            this.bPressCount++;

            if (this.bPressCount >= 10) {
                this.stopAttacking();
                this.showFloatingMessage2("NPC has been defeated!");
                console.log("NPC has been defeated!");
            }
        }
    }

    /**
     * Handles key up events but ensures the player remains stationary.
     */
    handleKeyUp(event) {
        // Ensure velocity stays at zero
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    startAttacking() {
        this.attackInterval = setInterval(() => {
            this.attackPlayer();
        }, 5000);
    }

    attackPlayer() {
        this.showFloatingMessage("NPC is attacking!");
        console.log("NPC is attacking!");
        
        // Adding a brief pause before showing health-lowering message
        setTimeout(() => {
            this.showFloatingMessage("Player's health is lowered by 10!");
            console.log("Player's health is lowered by 10!");
        }, 1000);  // Waits for 1 second before showing the health decrease message

        this.health -= 10; // Reduce player's health when attacked

        if (this.health <= 0) {
            this.onPlayerDefeat();
        }
    }

    stopAttacking() {
        clearInterval(this.attackInterval);
        console.log("Attacks stopped after 10 presses of 'b'.");
    }

    onPlayerDefeat() {
        alert("Player has been defeated. Please move on to the next level!");
        this.showFloatingMessage("Game Over");
        console.log("Player defeated. Moving to next level.");
    }

    showFloatingMessage(message) {
        let messageBox = document.createElement("div");
        messageBox.textContent = message;

        // Styling for the message box
        messageBox.style.position = "fixed";
        messageBox.style.top = "475px"; // Move down by 100px from the previous 375px
        messageBox.style.left = "95px"; // Keeps the left position the same
        messageBox.style.transform = "translate(0%, 0%)"; // No translation needed for new position
        messageBox.style.background = "rgba(0, 0, 0, 0.9)"; 
        messageBox.style.color = "white";
        messageBox.style.fontSize = "28px"; // Slightly smaller font size
        messageBox.style.fontWeight = "bold"; 
        messageBox.style.padding = "18px 36px"; // Slightly smaller padding
        messageBox.style.borderRadius = "10px"; 
        messageBox.style.boxShadow = "0px 0px 15px rgba(255, 255, 255, 0.3)"; // Soft glow effect
        messageBox.style.zIndex = "1000"; 

        document.body.appendChild(messageBox);

        // Auto-remove after 3 seconds for better visibility
        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 3000);
    }

    showFloatingMessage2(message) {
        let messageBox = document.createElement("div");
        messageBox.textContent = message;

        // Styling for a bigger and centered message box
        messageBox.style.position = "fixed";
        messageBox.style.top = "50%"; 
        messageBox.style.left = "50%"; 
        messageBox.style.transform = "translate(-50%, -50%)"; // Centers it
        messageBox.style.background = "rgba(0, 0, 0, 0.9)"; 
        messageBox.style.color = "white";
        messageBox.style.fontSize = "24px"; // Increased font size
        messageBox.style.fontWeight = "bold"; 
        messageBox.style.padding = "20px 40px"; // Bigger padding for a larger box
        messageBox.style.borderRadius = "10px"; 
        messageBox.style.boxShadow = "0px 0px 15px rgba(255, 255, 255, 0.3)"; // Soft glow effect
        messageBox.style.zIndex = "1000"; 

        document.body.appendChild(messageBox);

        // Auto-remove after 3 seconds for better visibility
        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 3000);
    }
}

export default PlayerForBattle;
