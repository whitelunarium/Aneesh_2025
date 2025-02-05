---
layout: blogs 
title: Blogs
search_exclude: true
permalink: /blogs/
---

## Integration Issue [ [Link] ](https://github.com/whitelunarium/Aneesh_2025/issues/6)

<table style="width:100%; border: 1px solid black;">
  <tr>
    <th style="text-align:left">Hack</th>
    <th style="text-align:center">Skill</th>
    <th style="text-align:right">Notes</th>
  </tr>
  <tr>
    <td>JSON Object</td>
    <td>rpg.md</td>
    <td>Defines the data for game assets (like images and sprites) and starts the game.</td>
  </tr>
  <tr>
    <td>JSON Object</td>
    <td>GameControl.js</td>
    <td>Manages the overall game logic.</td>
  </tr>
  <tr>
    <td>JSON Object</td>
    <td>GameEnv.js</td>
    <td>Defines the game environment by managing the size, and its dimensions.</td>
  </tr>
  <tr>
    <td>JSON Object</td>
    <td>Background.js</td>
    <td>Handles the background of the game.</td>
  </tr>
  <tr>
    <td>JSON Object</td>
    <td>Player.js</td>
    <td>Handles the sprite's appearance and movement.</td>
  </tr>
  <tr>
    <td>Background</td>
    <td>Background!</td>
    <td>![41524](https://github.com/user-attachments/assets/c51d6d9e-bb68-4912-905f-a9bc2ca82a88)</td>
  </tr>
  <tr>
    <td>Player</td>
    <td>Dependencies</td>
    <td>Both Player.js and Background.js import GameEnv.</td>
  </tr>
  <tr>
    <td>Player</td>
    <td>Constructor</td>
    <td>Makes an image.</td>
  </tr>
  <tr>
    <td>Player</td>
    <td>Attributes</td>
    <td>Includes sprite, position, current animation frame, and movement direction.</td>
  </tr>
  <tr>
    <td>Player</td>
    <td>Methods</td>
    <td>The draw() method in both files uses GameEnv.ctx.drawImage() to render the image on the canvas.</td>
  </tr>
  <tr>
    <td>Player</td>
    <td>Exports</td>
    <td>Both export the class (Player or Background) as default.</td>
  </tr>
</table>


## Personalization

### Background I used:
![41524](https://github.com/user-attachments/assets/a4a667e2-1f93-411a-83a9-d630120b9a85)

### Player I used:
![Bunny-Sprite](https://github.com/user-attachments/assets/68e6c293-48fa-4ba5-b2ed-a992150c652d)


## Ideation Hacks
- include levels, each level has a different task/objective the player must complete.
- incorporate sound effects for the player to have a more intense gaming experience. 
- should have multiple sprites, some for specific levels. 
- sprite speed should be customizable (monster sprite speed: easy, medium, or hard)

- create a puzzle with an obstacle to overcome
- have sprites that correspond to the backgrounds environment
- along the puzzle I want to have a trap like one that shows up out of nowhere when you get close enough to it
- I also want to create a two player game using WASD and the arrow keys, where one is the one trying to overcome the puzzle and the other trying to stop the one tryping to overcome the puzzle

---

# Overall Game Changes: 
- Code to make 2D movement better

## Game Idea
I want to add on to the learning adventure theme.

The player (dog) will live start in a land filled with lush vegetation with GitHub and Linux and progress to Jupyter and JavaScript land world. There will be NPC characters in the each world that will help the turtle solve CompSci problems until he is able to leave the world. There could be a second player, that you can compete against.

Interaction will require proximety and will stop game from time/destruction. There will need to be input support for game intractions and game results. Results will be stored in local storage and there will be a time based history for user(s). Solve all the problems from the NPCs and you can leave the world and progress until Game Over.

# Github Checklist
## Week #22
---
- [x] Create a new level consisting of the sprites and backgrounds used
   - [x] Create an NPC sprite with an interaction zone
- [ ] Implement event handling for player interaction with the NPC.
   - [ ] Define the destination where the player will be teleported upon interaction.
   - [ ] Implement a teleportation function that moves the player to the battle location.
   - [ ] Load the battle scene upon teleportation.
- [ ] Spawn the NPC as a battle opponent.
- [ ] Set up the battle UI and mechanics (health bars, attack options, etc.).
## Week #23
---
- [ ] Implement a turn-based or real-time battle system.
- [ ] Add an NPC attack animation
- [ ] Implement player attack options (basic attacks, abilities, items, etc. FOR NOW IT JUST ONE ATTACK)
- [ ] Implement win/loss conditions (e.g., if player/NPC HP reaches 0, trigger victory or defeat event).
## Week #24 (Ski Week)
---
- [ ] Create a final level to show the aftermath of the battle
   - [ ] If NPC is defeated then show an evolved form of the player
   - [ ] If the player is defeated show NPC dialogue (preferably "Better luck next time")

   # Current Changes Made:
- Created new movement to make players move more realistically. The movement was modified to match the side view instead of the top view of a 2D game.
![Image](https://github.com/user-attachments/assets/c93a90b3-6e39-48c8-b200-44b4764564ad)
- Created a new level file (Following the theme of GameLevelWater/Desert, but the characters will have different purposes. A dog will learn about its ancestors by meeting a wolf, the wolf teaches the dog how to survive by fighting.)
![Image](https://github.com/user-attachments/assets/431559d3-740a-45ff-a0e3-3c95d66a9c7e)

<!-- from https://github.com/utterance/utterances -->
<script src="https://utteranc.es/client.js"
        repo="{{ site.github_username }}/{{ site.github_repo | default: site.baseurl | remove: "/" }}"
        issue-term="title"
        label="blogpost-comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
