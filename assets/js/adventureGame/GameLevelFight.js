import GameEnv from './GameEnv.js';
import Background from './Background.js';
import PlayerForBattle from './PlayerforBattle.js';
import NpcForBattle from './NpcforBattle.js';

class GameLevelFight {
    constructor(path) {
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      // Values dependent on GameEnv.create()
      let width = GameEnv.innerWidth;
      let height = GameEnv.innerHeight;
  
  
      // Background data
      const image_src_fightbackground = path + "/images/gamify/figtbackground.png"; // be sure to include the path
      const image_data_fightbackground = {
          name: 'fightbackground',
          greeting: "Fight!",
          src: image_src_fightbackground,
          pixels: {height: 316, width: 476}
      };
  
  
      // Player data for Learning Dog
      const sprite_src_learningdog = path + "/images/gamify/Download10477.png"; // be sure to include the path
      const learningdog_SCALE_FACTOR = 5;
      const sprite_data_learningdog = {
          id: 'Learning Dog',
          greeting: "I'm going to beat you!",
          src: sprite_src_learningdog,
          SCALE_FACTOR: learningdog_SCALE_FACTOR,
          STEP_FACTOR: 1000,
          ANIMATION_RATE: 50,
          INIT_POSITION: { x: 300, y: 350 }, 
          pixels: {height: 254, width: 568},
          orientation: {rows: 4, columns: 9 },
          down: {row: 2, start: 0, columns: 9 },
          left: {row: 1, start: 0, columns: 9 },
          right: {row: 3, start: 0, columns: 9 },
          up: {row: 0, start: 0, columns: 9 },
          hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
          keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
      };
  
  
      // NPC data for Tux 
      const sprite_src_TeachingWolf = path + "/images/gamify/Download87405.png"; // be sure to include the path
      const sprite_data_TeachingWolf = {
          id: 'TeachingWolf',
          greeting: "What are you looking at, do you wanna fight? Press ESC to fight me!",
          src: sprite_src_TeachingWolf,
          SCALE_FACTOR: 3,  // Adjust this based on your scaling needs
          ANIMATION_RATE: 50,
          pixels: {height: 257, width: 577},
          INIT_POSITION: { x: 1000, y: 120},
          orientation: {rows: 4, columns: 9 },
          down: {row: 2, start: 0, columns: 9 },  // This is the stationary npc, down is default 
          hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
          // Linux command quiz
          quiz: { 
            title: "Wolf Quiz",
            questions: [
              "Which command is used to list files in a directory?\n1. ls\n2. dir\n3. list\n4. show",
              "Which command is used to change directories?\n1. cd\n2. chdir\n3. changedir\n4. changedirectory",
              "Which command is used to create a new directory?\n1. mkdir\n2. newdir\n3. createdir\n4. makedir",
              "Which command is used to remove a file?\n1. rm\n2. remove\n3. delete\n4. erase",
              "Which command is used to remove a directory?\n1. rmdir\n2. removedir\n3. deletedir\n4. erasedir",
              "Which command is used to copy files?\n1. cp\n2. copy\n3. duplicate\n4. xerox",
              "Which command is used to move files?\n1. mv\n2. move\n3. transfer\n4. relocate",
              "Which command is used to view a file?\n1. cat\n2. view\n3. show\n4. display",
              "Which command is used to search for text in a file?\n1. grep\n2. search\n3. find\n4. locate",
              "Which command is used to view the contents of a file?\n1. less\n2. more\n3. view\n4. cat" 
            ] 
          }
        };
      
        
   
  
  
  
    /*  // NPC data for HTML Hank
  const sprite_src_htmlhank = path + "/images/gamify/htmlhank.png"; // be sure to include the path
  const sprite_data_htmlhank = {
      id: 'HTML Hank',
      greeting: "Hey there! I'm HTML Hank, the web architect. Let's build some awesome webpages together!",
      src: sprite_src_html_hank,
      SCALE_FACTOR: 8,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 60,
      pixels: { height: 350, width: 550 },
      INIT_POSITION: { x: (width / 2), y: (height / 2) },
      orientation: { rows: 2, columns: 4 },
      down: { row: 0, start: 0, columns: 3 },  // This is the stationary NPC, down is default
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
  
      // HTML & CSS quiz
      quiz: { 
          title: "HTML & CSS Mastery Quiz",
          questions: [
              "What does HTML stand for?\n1. HyperText Markup Language\n2. HighText Machine Learning\n3. Hyper Transfer Markup Language\n4. Hyper Tool Markup Language",
              "Which HTML tag is used to define the largest heading?\n1. <h1>\n2. <h6>\n3. <header>\n4. <h0>",
              "Which tag is used to create a hyperlink in HTML?\n1. <a>\n2. <link>\n3. <href>\n4. <url>",
              "Which CSS property is used to change text color?\n1. color\n2. text-color\n3. font-color\n4. bgcolor",
              "Which unit is relative to the font size of the root element in CSS?\n1. rem\n2. em\n3. px\n4. vh",
              "What is the correct way to reference an external CSS file?\n1. <link rel='stylesheet' href='styles.css'>\n2. <style src='styles.css'>\n3. <css file='styles.css'>\n4. <script href='styles.css'>",
              "How do you center an element horizontally using CSS?\n1. margin: auto;\n2. align: center;\n3. text-align: middle;\n4. float: center;",
              "Which HTML tag is used for creating an unordered list?\n1. <ul>\n2. <ol>\n3. <list>\n4. <li>",
              "What is the purpose of the <meta> tag in HTML?\n1. To provide metadata about the document\n2. To create a navigation menu\n3. To define the main content area\n4. To embed images"
          ]
      }
  }; */
  
      // List of objects defnitions for this level
      this.objects = [
        { class: Background, data: image_data_fightbackground },
        { class: PlayerForBattle, data: sprite_data_learningdog },
        { class: NpcForBattle, data: sprite_data_TeachingWolf },
       // { class: Npc, data: sprite_data_htmlhank }, 
      ];
    }
  
  }
  
  export default GameLevelFight;