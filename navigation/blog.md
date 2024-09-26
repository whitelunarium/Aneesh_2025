---
layout: blogs 
title: Blogs
search_exclude: true
permalink: /blogs/
---

Hi

|Hack | Skill   | Notes |
|---------|---------|-------|
|  JSON Object | rpg.md          |Defines the data for game assets (like images and sprites) and starts the game.|
| JSON Object  | GameControl.js              |Manages the overall game logic.       |
|  JSON Object |  GameEnv.js              |Defines the game environment by managing the size, and its dimensions.       |
|  JSON Object | Background.js             | Handles the background of the game.      |
| JSON Object  | Player.js              |Handles the sprite's appearance and movement.|
|  Background  | Background!       |  ![41524](https://github.com/user-attachments/assets/1b36835c-d803-4a9d-bb73-4c8bea241adc)|
| Player  | Dependencies        | Both Player.js and Background.js import GameEnv.      |
|  Player | Constructor            | Makes an image      |
|  Player  |Attributes              | Includes sprite, position, current animation frame, and movement direction.      |
|  Player | Methods             | The draw() method in both files uses GameEnv.ctx.drawImage() to render the image on the canvas.|
|  Player | Exports | Both export the class (Player or Background) as default. |

<!-- from https://github.com/utterance/utterances -->
<script src="https://utteranc.es/client.js"
        repo="{{ site.github_username }}/{{ site.github_repo | default: site.baseurl | remove: "/" }}"
        issue-term="title"
        label="blogpost-comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
