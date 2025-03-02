import GameEnv from './GameEnv.js';
import Character from './Character.js';

class PlayerForBattle extends Character {
    constructor(data = null) {
        super(data);
        this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };
        this.velocity = { x: 0, y: 0 };

        this.bindEventListeners();
    }

    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    handleKeyUp(event) {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
    
}

export default PlayerForBattle;
