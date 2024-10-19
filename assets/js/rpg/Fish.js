import GameEnv from './GameEnv.js';
import Player from './Player.js';

class Fish extends Player {
    constructor(sprite = null) {
        super(sprite);
        this.position = { x: GameEnv.innerWidth - this.size, y: GameEnv.innerHeight - this.size };
        this.direction = 'left';
    }

    reset() {
        this.position = { x: GameEnv.innerWidth - this.size, y: GameEnv.innerHeight - this.size };
        this.resize();
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 38: // 'Arrow up' key
                this.velocity.y -= this.yVelocity;
                this.direction = 'up';
                break;
            case 37: // 'Arrow left' key
                this.velocity.x -= this.xVelocity;
                this.direction = 'left';
                break;
            case 40: // 'Arrow down' key
                this.velocity.y += this.yVelocity;
                this.direction = 'down';
                break;
            case 39: // 'Arrow right' key
                this.velocity.x += this.xVelocity;
                this.direction = 'right';
                break;
        }
    }

    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 38: // 'Arrow up' key
                this.velocity.y = 0;
                break;
            case 37: // 'Arrow left' key
                this.velocity.x = 0;
                break;
            case 40: // 'Arrow down' key
                this.velocity.y = 0;
                break;
            case 39: // 'Arrow right' key
                this.velocity.x = 0;
                break;
        }
    }
}

export default Fish;
