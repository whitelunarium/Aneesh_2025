import GameEnv from './GameEnv.js';
import GameLevelWater from './GameLevelWater.js';
import GameLevelDesert from './GameLevelDesert.js';
import { getStats } from "./StatsManager.js";
import GameLevelGrassland from './GameLevelGrassland.js';
import GameLevelFight from './GameLevelFight.js';
import GameLevelAftermath from './GameLevelAftermath.js';

const createStatsUI = () => {
    const statsContainer = document.createElement('div');
    statsContainer.id = 'stats-container';
    statsContainer.style.position = 'fixed';
    statsContainer.style.top = '10px';
    statsContainer.style.right = '10px';
    statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    statsContainer.style.color = 'white';
    statsContainer.style.padding = '10px';
    statsContainer.style.borderRadius = '5px';
    statsContainer.innerHTML = `
        <div>Balance: <span id="balance">0</span></div>
        <div>Chat Score: <span id="chatScore">0</span></div>
        <div>Questions Answered: <span id="questionsAnswered">0</span></div>
    `;
    document.body.appendChild(statsContainer);

    this.bindEventListeners();
};

const GameControl = {
    intervalID: null,
    localStorageTimeKey: "localTimes",
    currentPass: 0,
    currentLevelIndex: 0,
    levelClasses: [],
    path: '',
    bPressCount: 0,

    start: function(path) {
        GameEnv.create();
        this.levelClasses = [GameLevelDesert, GameLevelWater, GameLevelGrassland, GameLevelFight, GameLevelAftermath];
        this.currentLevelIndex = 0;
        this.path = path;
        this.addExitKeyListener();
        this.loadLevel();
        this.bindEventListeners();
    },
    
    loadLevel: function() {
        if (this.currentLevelIndex >= this.levelClasses.length) {
            this.stopTimer();
            return;
        }
        GameEnv.continueLevel = true;
        GameEnv.gameObjects = [];
        this.currentPass = 0;
        const LevelClass = this.levelClasses[this.currentLevelIndex];
        const levelInstance = new LevelClass(this.path);
        this.loadLevelObjects(levelInstance);
    },

    bindEventListeners() {
        addEventListener("keydown", this.handleKeyDown.bind(this));
        addEventListener("keyup", this.handleKeyUp.bind(this));
    },

    handleKeyDown({ key }) {
            switch (key) {
                case "e":
                case "u":
                    this.handleLevelEnd();
                    break;
                case "b":
                    this.bPressCount++;
                    if (this.bPressCount >= 10) {
                        console.log("Level ending");
                        this.handleLevelEnd();
                        this.bPressCount = 0; // Reset the counter if needed
                        }
                        break;
                case "k":
                    console.log("Level ending");
                    this.handleLevelEnd();
                    break;
        }
    },

    handleKeyUp({ key }) {
        if (key === "e" || key === "u") {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    },
    
    loadLevelObjects: function(gameInstance) {
        this.initStatsUI();
        for (let object of gameInstance.objects) {
            if (!object.data) object.data = {};
            new object.class(object.data);
        }
        this.gameLoop();    
        getStats();
    },

    gameLoop: function() {
        if (!GameEnv.continueLevel) {
            this.handleLevelEnd();
            return;
        }
        GameEnv.clear();
        for (let object of GameEnv.gameObjects) {
            object.update();
        }
        this.handleLevelStart();
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    handleLevelStart: function() {
        if (this.currentLevelIndex === 0 && this.currentPass === 10) {
            alert("Start Level.");
        }
        this.currentPass++;
    },

    handleLevelEnd: function() {
        if (this.currentLevelIndex < this.levelClasses.length - 1) {
            alert("Level ended.");
        } else {
            alert("Game over. All levels completed.");
        }
        for (let index = GameEnv.gameObjects.length - 1; index >= 0; index--) {
            GameEnv.gameObjects[index].destroy();
        }
        this.currentLevelIndex++;
        this.loadLevel();
    },
    
    resize: function() {
        GameEnv.resize();
        for (let object of GameEnv.gameObjects) {
            object.resize();
        }
    },

    addExitKeyListener: function() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                GameEnv.continueLevel = false;
            }
        });
    },

    saveTime(time, score) {
        if (time == 0) return;
        const userID = GameEnv.userID;
        const oldTable = this.getAllTimes();

        const data = {
            userID: userID,
            time: time,
            score: score
        };

        if (!oldTable) {
            localStorage.setItem(this.localStorageTimeKey, JSON.stringify([data]));
            return;
        }

        oldTable.push(data);
        localStorage.setItem(this.localStorageTimeKey, JSON.stringify(oldTable));
    },

    getAllTimes() {
        let timeTable = null;
        try {
            timeTable = localStorage.getItem(this.localStorageTimeKey);
        } catch (e) {
            return e;
        }
        return JSON.parse(timeTable);
    },

    updateTimer() {
        const time = GameEnv.time;
        if (GameEnv.timerActive) {
            const newTime = time + GameEnv.timerInterval;
            GameEnv.time = newTime;
            if (document.getElementById('timeScore')) {
                document.getElementById('timeScore').textContent = (time / 1000).toFixed(2);
            }
            return newTime;
        }
        if (document.getElementById('timeScore')) {
            document.getElementById('timeScore').textContent = (time / 1000).toFixed(2);
        }
    },

    startTimer() {
        if (GameEnv.timerActive) {
            console.warn("TIMER ACTIVE: TRUE, TIMER NOT STARTED");
            return;
        }
        this.intervalId = setInterval(() => this.updateTimer(), GameEnv.timerInterval);
        GameEnv.timerActive = true;
    },

    stopTimer() {   
        if (!GameEnv.timerActive) return;
        this.saveTime(GameEnv.time, GameEnv.coinScore);
        GameEnv.timerActive = false;
        GameEnv.time = 0;
        GameEnv.coinScore = 0;
        this.updateCoinDisplay();
        clearInterval(this.intervalID);
    },

    checkDefeat() {
        if (GameLevelFight.playerhealth <= 0) {
            console.log("Player defeat");
            this.handleLevelEnd();
        } else if (GameLevelFight.health <= 0) {  // Use 'else if' for checking NPC health
            console.log("Npc defeat");
            this.handleLevelEnd();
        }
    },

    initStatsUI: function() {
        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.style.position = 'fixed';
        statsContainer.style.top = '75px';
        statsContainer.style.right = '10px';
        statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        statsContainer.style.color = 'white';
        statsContainer.style.padding = '10px';
        statsContainer.style.borderRadius = '5px';
        statsContainer.innerHTML = `
            <div>Balance: <span id="balance">0</span></div>
            <div>Chat Score: <span id="chatScore">0</span></div>
            <div>Questions Answered: <span id="questionsAnswered">0</span></div>
        `;
        document.body.appendChild(statsContainer);
    },
};

window.addEventListener('resize', GameControl.resize.bind(GameControl));

export default GameControl;
