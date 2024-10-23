// To build GameLevels, each contains GameObjects from below imports
import GameEnv from './GameEnv.js';
import Background from './Background.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';
import NpcFrog from './NpcFrog.js';
// import Maze from './Maze.js';


class GameLevelWater {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_water = path + "/images/rpg/41524.jpg";
    const image_data_water = {
        name: 'water',
        src: image_src_water,
        pixels: {height: 580, width: 1038}
    };

    // Maze data
    // const image_src_maze = path + "/images/rpg/Maze_Background.png";
    // const image_data_maze = {
        // name: 'maze',
        // src: image_src_maze,
        // pixels: {height: 277, width: 498}
    // };

    // Player 1 sprite data (turtle)
    const TURTLE_SCALE_FACTOR = 16;
    const sprite_src_turtle = path + "/images/rpg/Bunny-Sprite.png";
    const sprite_data_turtle = {
        name: 'turtle',
        src: sprite_src_turtle,
        SCALE_FACTOR: TURTLE_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/TURTLE_SCALE_FACTOR) }, 
        pixels: {height: 160, width: 120},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 2, start: 0, columns: 3 },
        right: {row: 3, start: 0, columns: 3 },
        up: {row: 1, start: 0, columns: 3 },
    };

    // Player 2 sprite data (fish)
    const sprite_src_fish = path + "/images/rpg/hunter1-removebg-preview.png";
    const sprite_data_fish = {
        name: 'fish',
        src: sprite_src_fish,
        SCALE_FACTOR: 12,
        STEP_FACTOR: 400, // 400
        ANIMATION_RATE: 50,
        pixels: {height: 471, width: 530},
        INIT_POSITION: { x: 0, y: 0 },
        orientation: {rows: 8, columns: 9 },
        down: {row: 0, start: 0, columns: 3 },  // 1st row
        left: {row: 1, start: 0, columns: 3 },  // 2nd row
        right: {row: 2, start: 0, columns: 3 }, // 3rd row
        up: {row: 3, start: 0, columns: 3 },    // 4th row
    };

    // NPC sprite data (frog)
    const sprite_src_frog = path + "/images/rpg/hunter1-removebg-preview.png";
    const sprite_data_frog = {
        name: 'npc',
        src: sprite_src_frog,
        SCALE_FACTOR: 12,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 471, width: 530},
        INIT_POSITION: { x: 0, y: (height / 2)},
        orientation: {rows: 8, columns: 9 },
        down: {row: 4, start: 6, columns: 3 },  // This is the stationary npc, down is default 
    };

    // List of objects defnitions for this level
    this.objects = [
      { class: Background, data: image_data_water },
      { class: PlayerOne, data: sprite_data_turtle },
      { class: PlayerTwo, data: sprite_data_fish },
      { class: NpcFrog, data: sprite_data_frog }
    ];
  }

}

export default GameLevelWater;