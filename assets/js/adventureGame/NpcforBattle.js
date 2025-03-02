import GameEnv from "./GameEnv.js";
import Character from "./Character.js";
import Prompt from "./Prompt.js";

class NpcForBattle extends Character {
    constructor(data = null) {
        super(data);
        this.quiz = data?.quiz?.title;
        this.questions = Prompt.shuffleArray(data?.quiz?.questions || []);
        this.currentQuestionIndex = 0;
        this.health = data?.health || 100;
        this.playerhealth = data?.playerhealth || 100;
        this.playerattack = data?.playerattack || 10;
        this.attackInterval = null;
        this.bPressCount = 0;
        this.isPlayerTurn = true;  // Turn flag to control whose turn it is
        this.turnMessageBox = null; // New message box for turn indication

        this.startTurnBasedBattle();
        this.createAttackButton();  
        this.createRestButton();   
        this.bindEventListeners();
    }

    update() {
        this.draw();
    }

    bindEventListeners() {
        addEventListener("keydown", this.handleKeyDown.bind(this));
        addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyDown({ key }) {
        if (this.isPlayerTurn && this.health > 0) {
            switch (key) {
                case "e":
                case "u":
                    this.shareQuizQuestion();
                    break;
                case "b":
                    this.attackNpc();
                    break;
            }
        }
    }

    handleKeyUp({ key }) {
        if (key === "e" || key === "u") {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    startTurnBasedBattle() {
        this.startPlayerTurn();
    }

    startPlayerTurn() {
        this.isPlayerTurn = true;
        this.showTurnMessage("Your turn to attack!", "player");
        console.log("Player's turn.");
    }

    startNpcTurn() {
        this.isPlayerTurn = false;
        this.showTurnMessage("NPC's turn to attack!", "npc");
        console.log("NPC's turn.");
        
        // Wait for 5 seconds before the NPC attacks
        setTimeout(() => {
            this.attackPlayer();  // NPC attacks after the delay
            this.startPlayerTurn();  // Start player's turn after NPC's action
        }, 5000);
    }

    attackNpc() {
        if (this.isPlayerTurn) {
            this.showFloatingMessage2("Player attacks NPC!", "player");
            console.log("Player attacks NPC!");
            this.reduceNpcHealth();
            if (this.health <= 0) {
                this.onNpcDefeat();
            } else {
                this.startNpcTurn();  // NPC's turn after player attack
            }
        }
    }

    attackPlayer() {
        if (!this.isPlayerTurn) {
            this.showFloatingMessage2("NPC attacks player!", "npc");
            console.log("NPC attacks player!");
            this.reducePlayerHealth();
            if (this.playerhealth <= 0) {
                this.onPlayerDefeat();
            }
        }
    }

    reduceNpcHealth() {
        if (this.health > 0) {
            this.health = Math.max(0, this.health - 10);
            this.showFloatingMessage2(`NPC health lowered by 10! Current health: ${this.health}`, "npc");
            console.log(`NPC Health lowered by 10. Current health: ${this.health}`);
        }
    }

    reducePlayerHealth() {
        if (this.playerhealth > 0) {
            this.playerhealth = Math.max(0, this.playerhealth - 10);
            this.showFloatingMessage2(`Player's health lowered by 10! Current health: ${this.playerhealth}`, "player");
            console.log(`Player's Health lowered by 10. Current health: ${this.playerhealth}`);
        }
    }

    onPlayerDefeat() {
        this.showGameOverMessage();
        console.log("Player defeated. Moving to next level.");
    }

    onNpcDefeat() {
        alert("NPC has been defeated! You win this round.");
        console.log("NPC has been defeated!");
        this.stopAttacking();
        this.hideButtons(); // Hide buttons after the NPC is defeated
    }

    showGameOverMessage() {
        let messageBox = document.createElement("div");
        messageBox.textContent = "GAME OVER";

        messageBox.style.position = "fixed";
        messageBox.style.top = "50%";
        messageBox.style.left = "50%";
        messageBox.style.transform = "translate(-50%, -50%)";
        messageBox.style.fontSize = "48px";
        messageBox.style.fontWeight = "bold";
        messageBox.style.padding = "40px 80px";
        messageBox.style.background = "rgba(255, 0, 0, 0.9)";
        messageBox.style.color = "white";
        messageBox.style.borderRadius = "20px";
        messageBox.style.boxShadow = "0px 0px 20px rgba(255, 255, 255, 0.6)";
        messageBox.style.zIndex = "1000";

        document.body.appendChild(messageBox);

        setTimeout(() => {
            messageBox.style.transition = "opacity 0.5s ease-out";
            messageBox.style.opacity = "0";  // Fade out effect
            setTimeout(() => {
                document.body.removeChild(messageBox);
            }, 500);
        }, 3000);
    }

    showFloatingMessage2(message, type) {
        let messageBox = document.createElement("div");
        messageBox.textContent = message;

        messageBox.style.position = "fixed";
        messageBox.style.fontSize = "18px"; // Slightly smaller font size for better visibility
        messageBox.style.fontWeight = "bold"; 
        messageBox.style.padding = "12px 25px"; 
        messageBox.style.borderRadius = "10px"; 
        messageBox.style.boxShadow = "0px 0px 15px rgba(255, 255, 255, 0.3)"; 
        messageBox.style.zIndex = "1000"; 

        // Positioning and color settings based on the message type
        if (type === "player") {
            messageBox.style.background = "rgba(0, 123, 255, 0.8)"; // Blue background for player messages
            messageBox.style.left = "20px"; // Positioned on the left
            messageBox.style.bottom = "100px"; // Adjust the bottom to give space between messages
        } else if (type === "npc") {
            messageBox.style.background = "rgba(255, 69, 0, 0.8)"; // Red background for NPC messages
            messageBox.style.right = "20px"; // Positioned on the right
            messageBox.style.bottom = "100px"; // Same bottom position as player messages
        }

        // Adding message to the body
        document.body.appendChild(messageBox);

        // Remove the message after 3 seconds with a fade-out effect
        setTimeout(() => {
            messageBox.style.transition = "opacity 0.5s ease-out";
            messageBox.style.opacity = "0";  // Fade out effect
            setTimeout(() => {
                document.body.removeChild(messageBox); // Remove after fade-out completes
            }, 500);
        }, 3000);
    }

    // Separate method to show the turn notification message
    showTurnMessage(message, type) {
        if (this.turnMessageBox) {
            // Ensure the turnMessageBox exists before trying to remove it
            if (this.turnMessageBox.parentElement) {
                document.body.removeChild(this.turnMessageBox); // Remove the existing turn message
            }
        }
        this.turnMessageBox = document.createElement("div");
        this.turnMessageBox.textContent = message;

        this.turnMessageBox.style.position = "fixed";
        this.turnMessageBox.style.top = "20%";
        this.turnMessageBox.style.left = "50%";
        this.turnMessageBox.style.transform = "translateX(-50%)";
        this.turnMessageBox.style.fontSize = "24px";
        this.turnMessageBox.style.fontWeight = "bold";
        this.turnMessageBox.style.padding = "20px 40px";
        this.turnMessageBox.style.background = type === "player" ? "rgba(0, 123, 255, 0.8)" : "rgba(255, 69, 0, 0.8)";
        this.turnMessageBox.style.color = "white";
        this.turnMessageBox.style.borderRadius = "20px";
        this.turnMessageBox.style.boxShadow = "0px 0px 20px rgba(255, 255, 255, 0.6)";
        this.turnMessageBox.style.zIndex = "1000";

        document.body.appendChild(this.turnMessageBox);

        // Remove turn message after 3 seconds
        setTimeout(() => {
            this.turnMessageBox.style.transition = "opacity 0.5s ease-out";
            this.turnMessageBox.style.opacity = "0";  // Fade out effect
            setTimeout(() => {
                document.body.removeChild(this.turnMessageBox); // Remove after fade-out completes
            }, 500);
        }, 2000);
    }

    hideButtons() {
        // Check for the buttons' existence before attempting to hide them
        setTimeout(() => {
            const attackBtn = document.querySelector("button[data-action='attack']");
            const restBtn = document.querySelector("button[data-action='rest']");
            
            console.log("Hiding buttons...");
            if (attackBtn) {
                console.log("Hiding Attack button");
                attackBtn.style.display = "none";
            }
            if (restBtn) {
                console.log("Hiding Rest button");
                restBtn.style.display = "none";
            }
        }, 5000); // Hide buttons after 5 seconds
    }

    createAttackButton() {
        let attackBtn = document.createElement("button");
        attackBtn.innerText = "Attack NPC";
        attackBtn.setAttribute("data-action", "attack");
        attackBtn.style.position = "fixed"; // Keep it fixed for visibility
        attackBtn.style.bottom = "20px";
        attackBtn.style.left = "20px"; // Move it closer to the left
        attackBtn.style.padding = "15px 30px";
        attackBtn.style.fontSize = "18px";
        attackBtn.style.fontWeight = "bold";
        attackBtn.style.backgroundColor = "#d9534f"; // Bootstrap-like red
        attackBtn.style.color = "white";
        attackBtn.style.border = "none";
        attackBtn.style.borderRadius = "8px";
        attackBtn.style.cursor = "pointer";
        attackBtn.style.transition = "background-color 0.3s ease";

        // Add hover effect
        attackBtn.addEventListener("mouseover", () => {
            attackBtn.style.backgroundColor = "#c9302c";
        });

        attackBtn.addEventListener("mouseout", () => {
            attackBtn.style.backgroundColor = "#d9534f";
        });

        attackBtn.addEventListener("click", () => {
            this.attackNpc();  // Attack when button is clicked
        });

        document.body.appendChild(attackBtn);
    }

    createRestButton() {
        let restBtn = document.createElement("button");
        restBtn.innerText = "Rest & Heal";
        restBtn.setAttribute("data-action", "rest");
        restBtn.style.position = "fixed"; // Keep it fixed for visibility
        restBtn.style.bottom = "20px";
        restBtn.style.left = "170px"; // Move it closer to the Attack button
        restBtn.style.padding = "15px 30px";
        restBtn.style.fontSize = "18px";
        restBtn.style.fontWeight = "bold";
        restBtn.style.backgroundColor = "#0275d8"; // Bootstrap-like blue
        restBtn.style.color = "white";
        restBtn.style.border = "none";
        restBtn.style.borderRadius = "8px";
        restBtn.style.cursor = "pointer";
        restBtn.style.transition = "background-color 0.3s ease";

        // Add hover effect
        restBtn.addEventListener("mouseover", () => {
            restBtn.style.backgroundColor = "#025aa5";
        });

        restBtn.addEventListener("mouseout", () => {
            restBtn.style.backgroundColor = "#0275d8";
        });

        // Implement the rest action
        restBtn.addEventListener("click", () => {
            if (this.isPlayerTurn) {
                this.increasePlayerHealth();
                this.showFloatingMessage2(`Player rested and healed. Health increased by 10! Current health: ${this.playerhealth}`, "player");
                this.startNpcTurn(); // Switch to NPC's turn
            }
        });

        document.body.appendChild(restBtn);
    }

    increasePlayerHealth() {
        this.playerhealth = Math.min(this.playerhealth + 10, 100); // Increase health by 10, but max at 100
    }
}

export default NpcForBattle;
