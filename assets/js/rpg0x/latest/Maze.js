import GameEnv from "./GameEnv.js";
import GameObject from "./GameObject.js";

class Maze extends GameObject {
    constructor(data = null) {
        super(data);
        this.alertTimeout = null;
    }
  
    /**
     * Check for proximity of objects.
     * This method checks if any players are within a certain distance of the NPC.
     * If players are within the specified distance, their names are collected and a response is generated.
     */
    checkProximityToNPC() {
        // Filter all Player objects from the game environment
        var players = GameEnv.gameObjects.filter(obj => obj instanceof GameObject);
        var maze = this;
        var names = [];

        if (players.length > 0 && maze) {
            players.forEach(player => {
                // The Euclidean distance between two points in a 2D space
                var distance = Math.sqrt(
                    Math.pow(player.position.x - maze.position.x, 2) + Math.pow(player.position.y - maze.position.y, 2)
                );
                // The distance is less than 100 pixels
                if (player != maze && distance <= 100) {
                  player.position.x += 1;
                  player.position.y += 1;
                }
            });
        }
    }
}

export default Maze;