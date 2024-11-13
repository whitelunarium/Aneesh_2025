---
layout: base
title: Student Home 
description: Home Page
author: Aneesh Deevi
image: /images/mario_animation.png
hide: true
---

<!-- Liquid:  statements -->

<!-- Include submenu from _includes to top of pages -->
{% include nav/home.html %}
<!--- Concatenation of site URL to frontmatter image  --->
{% assign sprite_file = site.baseurl | append: page.image %}
<!--- Has is a list variable containing mario metadata for sprite --->
{% assign hash = site.data.mario_metadata %}  
<!--- Size width/height of Sprit images --->
{% assign pixels = 256 %}

<!--- HTML for page contains <p> tag named "Mario" and class properties for a "sprite"  -->

<p id="mario" class="sprite"></p>
  
<!--- Embedded Cascading Style Sheet (CSS) rules, 
        define how HTML elements look 
--->
<style>

  /*CSS style rules for the id and class of the sprite...
  */
  .sprite {
    height: {{pixels}}px;
    width: {{pixels}}px;
    background-image: url('{{sprite_file}}');
    background-repeat: no-repeat;
  }

  /*background position of sprite element
  */
  #mario {
    background-position: calc({{animations[0].col}} * {{pixels}} * -1px) calc({{animations[0].row}} * {{pixels}}* -1px);
  }
</style>

<!--- Embedded executable code--->
<script>
  ////////// convert YML hash to javascript key:value objects /////////

  var mario_metadata = {}; //key, value object
  {% for key in hash %}  
  
  var key = "{{key | first}}"  //key
  var values = {} //values object
  values["row"] = {{key.row}}
  values["col"] = {{key.col}}
  values["frames"] = {{key.frames}}
  mario_metadata[key] = values; //key with values added

  {% endfor %}

  ////////// game object for player /////////

  class Mario {
    constructor(meta_data) {
      this.tID = null;  //capture setInterval() task ID
      this.positionX = 0;  // current position of sprite in X direction
      this.currentSpeed = 0;
      this.marioElement = document.getElementById("mario"); //HTML element of sprite
      this.pixels = {{pixels}}; //pixel offset of images in the sprite, set by liquid constant
      this.interval = 100; //animation time interval
      this.obj = meta_data;
      this.marioElement.style.position = "absolute";
    }

    animate(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.marioElement.style.left = `${this.positionX}px`;

        this.positionX += speed;
        frame = (frame + 1) % obj.frames;

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    startWalking() {
      this.stopAnimate();
      this.animate(this.obj["Walk"], 3);
    }

    startRunning() {
      this.stopAnimate();
      this.animate(this.obj["Run1"], 6);
    }

    startPuffing() {
      this.stopAnimate();
      this.animate(this.obj["Puff"], 0);
    }

    startCheering() {
      this.stopAnimate();
      this.animate(this.obj["Cheer"], 0);
    }

    startFlipping() {
      this.stopAnimate();
      this.animate(this.obj["Flip"], 0);
    }

    startResting() {
      this.stopAnimate();
      this.animate(this.obj["Rest"], 0);
    }

    stopAnimate() {
      clearInterval(this.tID);
    }
  }

  const mario = new Mario(mario_metadata);

  ////////// event control /////////

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (event.repeat) {
        mario.startCheering();
      } else {
        if (mario.currentSpeed === 0) {
          mario.startWalking();
        } else if (mario.currentSpeed === 3) {
          mario.startRunning();
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (event.repeat) {
        mario.stopAnimate();
      } else {
        mario.startPuffing();
      }
    }
  });

  //touch events that enable animations
  window.addEventListener("touchstart", (event) => {
    event.preventDefault(); // prevent default browser action
    if (event.touches[0].clientX > window.innerWidth / 2) {
      // move right
      if (currentSpeed === 0) { // if at rest, go to walking
        mario.startWalking();
      } else if (currentSpeed === 3) { // if walking, go to running
        mario.startRunning();
      }
    } else {
      // move left
      mario.startPuffing();
    }
  });

  //stop animation on window blur
  window.addEventListener("blur", () => {
    mario.stopAnimate();
  });

  //start animation on window focus
  window.addEventListener("focus", () => {
     mario.startFlipping();
  });

  //start animation on page load or page refresh
  document.addEventListener("DOMContentLoaded", () => {
    // adjust sprite size for high pixel density devices
    const scale = window.devicePixelRatio;
    const sprite = document.querySelector(".sprite");
    sprite.style.transform = `scale(${0.2 * scale})`;
    mario.startResting();
  });

</script>

# Home
This blog contains my journey into Coding.

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="{{site.baseurl}}/home" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #1abc9c, #16a085); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Student Home
        </div>
    </a>

    <a href="{{site.baseurl}}/about" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #f39c12, #e67e22); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            About Me
        </div>
    </a>

    <a href="{{site.baseurl}}/coding" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #3498db, #2980b9); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Coding
        </div>
    </a>
</div>

## Game Progress
> Here is my progress through game coding, click to see these online

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="{{site.baseurl}}/rpg" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #8e44ad, #9b59b6); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            RPG
        </div>
    </a>

    <a href="{{site.baseurl}}/snake" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #27ae60, #2ecc71); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Snake
        </div>
    </a>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="{{site.baseurl}}/rpg/latest" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #e74c3c, #c0392b); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Latest RPG
        </div>
    </a>
</div>

## Experiments
> Here are my experimental games, that I worked on for fun!

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="{{site.baseurl}}/rps" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #16a085, #1abc9c); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Rock Paper Scissors
        </div>
    </a>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="{{site.baseurl}}/tictactoe" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #f39c12, #e67e22); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Tic Tac Toe
        </div>
    </a>
</div>

## Jupyter Notebooks
> Here is my preparation for my Sprint objectives, click to review all hacks

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="https://github.com/whitelunarium/Aneesh_2025/blob/main/_notebooks/Foundation/Sprint1" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #f1c40f, #f39c12); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Sprint 1
        </div>
    </a>

    <a href="https://github.com/whitelunarium/Aneesh_2025/blob/main/_notebooks/Foundation/Sprint2" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #d35400, #e67e22); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Sprint 2
        </div>
    </a>
</div>

### Homework

> Here are my homeworks from each lesson. Click to view each notebook.

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <a href="https://github.com/whitelunarium/Aneesh_2025/tree/main/_notebooks/Foundation/Lessons" style="text-decoration: none;">
        <div class="button" style="background: linear-gradient(145deg, #3498db, #2980b9); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Lessons
        </div>
    </a>
</div>

<style>
  /* Apply hover effect on the button to scale it */
  .button:hover {
    transform: scale(1.1); /* Slight increase in size */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Slight shadow increase */
  }

  /* Ensure buttons in the Home section are aligned side by side */
  .button {
    display: inline-block; /* Make the buttons inline elements */
    font-size: 16px; /* Adjust font size for better readability */
    text-align: center; /* Ensure text is centered */
  }
</style>



<!-- from https://github.com/utterance/utterances -->
<script src="https://utteranc.es/client.js"
        repo="{{ site.github_username }}/{{ site.github_repo | default: site.baseurl | remove: "/" }}"
        issue-term="title"
        label="blogpost-comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
