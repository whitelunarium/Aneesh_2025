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

        this.createAttackButton();
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
        alert("NPC has been defeated. Please move on to the next level!");
        console.log("NPC has been defeated!");
    }

    showFloatingMessage(message) {
        let messageBox = document.createElement("div");
        messageBox.textContent = message;

        // Styling for the message box
        messageBox.style.position = "fixed";
        messageBox.style.top = "calc(50% + 25px)"; 
        messageBox.style.left = "calc(50% + 300px)"; 
        messageBox.style.transform = "translate(-50%, -50%)"; 
        messageBox.style.background = "rgba(0, 0, 0, 0.9)"; 
        messageBox.style.color = "white";
        messageBox.style.fontSize = "20px"; 
        messageBox.style.fontWeight = "bold"; 
        messageBox.style.padding = "15px 30px"; 
        messageBox.style.borderRadius = "10px"; 
        messageBox.style.boxShadow = "0px 0px 15px rgba(255, 255, 255, 0.3)"; 
        messageBox.style.zIndex = "1000"; 

        document.body.appendChild(messageBox);

        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 2000);
    }

    createAttackButton() {
        let attackButton = document.createElement("button");
        attackButton.textContent = "Attack";
        attackButton.style.position = "fixed";
        attackButton.style.bottom = "50px";
        attackButton.style.left = "50px";
        attackButton.style.padding = "12px 24px";
        attackButton.style.fontSize = "18px";
        attackButton.style.fontWeight = "bold";
        attackButton.style.backgroundColor = "red";
        attackButton.style.color = "white";
        attackButton.style.border = "none";
        attackButton.style.borderRadius = "8px";
        attackButton.style.cursor = "pointer";
        attackButton.style.boxShadow = "0px 0px 10px rgba(255, 0, 0, 0.5)";

        attackButton.addEventListener("click", () => this.reduceHealth());

        document.body.appendChild(attackButton);
    }
}

export default NpcForBattle;
