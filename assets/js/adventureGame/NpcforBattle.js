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
        switch (key) {
            case "e":
            case "u":
                this.shareQuizQuestion();
                break;
            case "b":
                this.reduceHealth();
                break;
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

    getNextQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length;
        return question;
    }

    shareQuizQuestion() {
        const players = GameEnv.gameObjects.filter((obj) =>
            obj.state.collisionEvents.includes(this.spriteData.id)
        );
        if (players.length > 0 && this.questions.length > 0) {
            players.forEach((player) => {
                if (!Prompt.isOpen) {
                    Prompt.currentNpc = this;
                    Prompt.openPromptPanel(this);
                }
            });
        }
    }

    reduceHealth() {
        if (this.health !== undefined) {
            this.health = Math.max(0, this.health - 10);
            this.showFloatingMessage(`NPC health lowered by 10! Current health: ${this.health}`);
            console.log(`NPC Health lowered by 10. Current health: ${this.health}`);
            if (this.health === 0) {
                this.onDefeat();
            }
        } else {
            console.warn("Health property is missing on NPC.");
        }
    }

    onDefeat() {
        alert("Npc has been defeated. Please move on to the next level!")
        console.log("NPC has been defeated!");
        clearInterval(this.attackInterval);
    }

    showFloatingMessage(message) {
        let messageBox = document.createElement("div");
        messageBox.textContent = message;
    
        // Styling for the message box, moved slightly right and up
        messageBox.style.position = "fixed";
        messageBox.style.top = "calc(50% + 25px)"; // Moves it 25px higher
        messageBox.style.left = "calc(50% + 300px)"; // Moves it 25px more to the right
        messageBox.style.transform = "translate(-50%, -50%)"; // Centers it based on new position
        messageBox.style.background = "rgba(0, 0, 0, 0.9)"; 
        messageBox.style.color = "white";
        messageBox.style.fontSize = "20px"; // Slightly smaller font size
        messageBox.style.fontWeight = "bold"; 
        messageBox.style.padding = "15px 30px"; // Smaller padding for a smaller box
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

export default NpcForBattle;
