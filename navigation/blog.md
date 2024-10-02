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
![catbus-removebg-preview](https://github.com/user-attachments/assets/848814c8-40c1-428e-a6c2-f45b59ca57a6)

## Ideation Hacks
- include levels, each level has a different task/objective the player must complete.
- incorporate sound effects for the player to have a more intense gaming experience. 
- should have multiple sprites, some for specific levels. 
- sprite speed should be customizable (monster sprite speed: easy, medium, or hard)

- create a puzzle with an obstacle to overcome
- have sprites that correspond to the backgrounds environment
- along the puzzle I want to have a trap like one that shows up out of nowhere when you get close enough to it
- I also want to create a two player game using WASD and the arrow keys, where one is the one trying to overcome the puzzle and the other trying to stop the one tryping to overcome the puzzle


<!-- from https://github.com/utterance/utterances -->
<script src="https://utteranc.es/client.js"
        repo="{{ site.github_username }}/{{ site.github_repo | default: site.baseurl | remove: "/" }}"
        issue-term="title"
        label="blogpost-comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
