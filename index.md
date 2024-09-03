---
layout: base
title: Student Home 
description: Home Page
author: Aneesh Deevi
image: /images/mario_animation (1).png
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

My journey starts here. - Aneesh Deevi

## Markdown samples markdown cheatsheet

Using markdown form index.md. We are learning markdown.

This text below is something called Markdown. This is a heading, inside of code scaffolding.

## Investing in Your Technical Future XXXYYY

This is emphasis

Explore the Computer Science Pathway at Del Norte High School and invest in your technical skills. All Del Norte CompSci classes are designed to provide a real-world development experience. Class time includes tech talks (lectures), peer collaboration, communication with teachers, critical thinking while coding, and creativity in projects. Grading is focused on time invested, participation with peers, and engagement in learning.
Sample of bullets

Introduction to concepts and requirements by the teacher
Project-based learning with teacher support, performing Agile/Scrum development
Coding, frontend, backend, devops, version control and algorithmic thinking
Creativity, research, design, data structures, and utilizing ChatGPT
Performing team work, team communication and collaboration, peer reviews/grading
Focus on tehnical communications through project presentations and student led teaching
Grades are on projects, learnt concepts, and live reviews between student(s) and teacher
Jelly Fish Fun
<img src="data:image/jpeg;base64,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"
