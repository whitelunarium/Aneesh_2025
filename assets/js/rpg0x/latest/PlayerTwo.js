import GameObject from './GameObject.js';
import GameEnv from "./GameEnv.js";

class PlayerTwo extends GameObject {
    constructor(imageSrc = null) {
        super(imageSrc);
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 73: // 'I' key
                this.velocity.y -= this.yVelocity;
                this.direction = 'up';
                break;
            case 74: // 'J' key
                this.velocity.x -= this.xVelocity;
                this.direction = 'left';
                break;
            case 75: // 'K' key
                this.velocity.y += this.yVelocity;
                this.direction = 'down';
                break;
            case 76: // 'L' key
                this.velocity.x += this.xVelocity;
                this.direction = 'right';
                break;
        }
        // check for promixity 
        this.checkProximityToOtherPlayer();
    }
    
    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 73: // 'I' key
                this.velocity.y = 0;
                break;
            case 74: // 'J' key
                this.velocity.x = 0;
                break;
            case 75: // 'K' key
                this.velocity.y = 0;
                break;
            case 76: // 'L' key
                this.velocity.x = 0;
                break;
        }
    }


    /**
     * Check for proximity of objects.
     * This method checks if any players are within a certain distance of the NPC.
     * If players are within the specified distance, their names are collected and a response is generated.
     */
    checkProximityToOtherPlayer() {
        // Filter all Player objects from the game environment
        var players = GameEnv.gameObjects.filter(obj => obj instanceof GameObject);
        var ply2 = this;
        var names = [];

        if (players.length > 0 && ply2) {
            players.forEach(player => {
                // The Euclidean distance between two points in a 2D space
                var distance = Math.sqrt(
                    Math.pow(player.position.x - ply2.position.x, 2) + Math.pow(player.position.y - ply2.position.y, 2)
                );
                // The distance is less than 100 pixels
                if (player != ply2 && distance <= 100) {
                    this.handleResponse(`End of Game`);
                }
            });            
        }
    }

    /**
     * Custom alert mechanism to handle responses.
     * 
     * @param {string} message - The message to be displayed in the alert.
     */
    handleResponse(message) {
        alert(message);
        setTimeout(function() {
            location.reload();
        }, 1000);  // Waits for 3 seconds before reloading        
    }

}

export default PlayerTwo;