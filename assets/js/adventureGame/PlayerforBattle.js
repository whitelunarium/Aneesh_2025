import GameEnv from './GameEnv.js';
import Character from './Character.js';

class PlayerForBattle extends Character {
    constructor(data = null) {
        super(data);
        this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };
        this.health = data?.health || 100;
        this.attack = data?.attack || 10;
        this.velocity = { x: 0, y: 0 };
        this.attackInterval = null;
        this.bPressCount = 0;

        this.bindEventListeners();
        this.startAttacking();
        this.createRestButton(); // Adding the rest button on player creation
    }

    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
        this.velocity.x = 0;
        this.velocity.y = 0;

        if (event.key === "b") {
            this.bPressCount++;
            if (this.bPressCount >= 10) {
                this.stopAttacking();
                this.showFloatingMessage2("NPC has been defeated!");
                console.log("NPC has been defeated!");
            }
        }
    }

    handleKeyUp(event) {
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

        setTimeout(() => {
            this.showFloatingMessage("Player's health is lowered by 10!");
            console.log("Player's health is lowered by 10!");
        }, 1000);

        this.health -= 10;
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

        messageBox.style.position = "fixed";
        messageBox.style.top = "475px"; 
        messageBox.style.left = "95px"; 
        messageBox.style.background = "rgba(0, 0, 0, 0.9)"; 
        messageBox.style.color = "white";
        messageBox.style.fontSize = "28px"; 
        messageBox.style.fontWeight = "bold"; 
        messageBox.style.padding = "18px 36px"; 
        messageBox.style.borderRadius = "10px"; 
        messageBox.style.boxShadow = "0px 0px 15px rgba(255, 255, 255, 0.3)"; 
        messageBox.style.zIndex = "1000"; 

        document.body.appendChild(messageBox);

        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 2000);
    }

    showFloatingMessage2(message) {
        let messageBox = document.createElement("div");
        messageBox.textContent = message;

        messageBox.style.position = "fixed";
        messageBox.style.top = "50%"; 
        messageBox.style.left = "50%"; 
        messageBox.style.transform = "translate(-50%, -50%)";
        messageBox.style.background = "rgba(0, 0, 0, 0.9)"; 
        messageBox.style.color = "white";
        messageBox.style.fontSize = "24px"; 
        messageBox.style.fontWeight = "bold"; 
        messageBox.style.padding = "20px 40px"; 
        messageBox.style.borderRadius = "10px"; 
        messageBox.style.boxShadow = "0px 0px 15px rgba(255, 255, 255, 0.3)"; 
        messageBox.style.zIndex = "1000"; 

        document.body.appendChild(messageBox);

        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 3000);
    }

    createRestButton() {
        let restButton = document.createElement("button");
        restButton.textContent = "Rest";
        restButton.style.position = "fixed";
        restButton.style.bottom = "50px";
        restButton.style.left = "1200px";
        restButton.style.padding = "12px 24px";
        restButton.style.fontSize = "18px";
        restButton.style.fontWeight = "bold";
        restButton.style.backgroundColor = "green";
        restButton.style.color = "white";
        restButton.style.border = "none";
        restButton.style.borderRadius = "8px";
        restButton.style.cursor = "pointer";
        restButton.style.boxShadow = "0px 0px 10px rgba(0, 255, 0, 0.5)";

        restButton.addEventListener("click", () => this.increaseHealth());

        document.body.appendChild(restButton);
    }

    increaseHealth() {
        if (this.health < 100) {
            this.health = Math.min(100, this.health + 10);
            this.showFloatingMessage(`Player health increased by 10! Current health: ${this.health}`);
            console.log(`Player health increased by 10. Current health: ${this.health}`);
        } else {
            this.showFloatingMessage("Health is already at maximum!");
        }
    }
}

export default PlayerForBattle;
