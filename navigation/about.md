---
layout: page
title: About
permalink: /about/
---

Here are some places that relate to me.

<comment>
Flags are made using Wikipedia images
</comment>

<style>
    /* Style looks pretty compact, trace grid-container and grid-item in the code */
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Dynamic columns */
        gap: 10px;
    }
    .grid-item {
        text-align: center;
    }
    .grid-item img {
        width: 100%;
        height: 100px; /* Fixed height for uniformity */
        object-fit: contain; /* Ensure the image fits within the fixed height */
    }
    .grid-item p {
        margin: 5px 0; /* Add some margin for spacing */
    }
    
    .image-gallery {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        gap: 10px;
        }

    .image-gallery img {
        max-height: 150px;
        object-fit: cover;
        border-radius: 5px;
    }
</style>

<!-- This grid_container class is for the CSS styling, the id is for JavaScript connection -->
<div class="grid-container" id="grid_container">
    <!-- content will be added here by JavaScript -->
</div>

<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    var container = document.getElementById("grid_container"); // This container connects to the HTML div

    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    var http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    var living_in_the_world = [
        {"flag": "a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg", "greeting": "Hey", "description": "California - forever"},
        {"flag": "4/41/Flag_of_India.svg", "greeting": "Namaste", "description": "India - Parent's birthplace"},
        {"flag": "1/19/Flag_of_San_Diego%2C_California.svg", "greeting": "Hi", "description": "San Diego - My birthplace"},
        {"flag": "e/ef/Flag_of_Hawaii.svg", "greeting": "Aloha", "description": "Hawaii - My favorite vacation place"},
    ]; 
    
    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax

    // 3b. Build grid items inside of our container for each row of data
    for (const location of living_in_the_world) {
        // Create a "div" with "class grid-item" for each row
        var gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements
        // Add "img" HTML tag for the flag
        var img = document.createElement("img");
        img.src = http_source + location.flag; // concatenate the source and flag
        img.alt = location.flag + " Flag"; // add alt text for accessibility

        // Add "p" HTML tag for the description
        var description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Add "p" HTML tag for the greeting
        var greeting = document.createElement("p");
        greeting.textContent = location.greeting;  // extract the greeting

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(img);
        gridItem.appendChild(description);
        gridItem.appendChild(greeting);

        // Append the grid item DIV to the container DIV
        container.appendChild(gridItem);
    }
</script>

### My Life

Everything for me, as for many others, revolves around family and faith.

- My mother told me that I was Indian.
- The time I spend with my family and friends are the best, I always look forward to those moments.
- My brother is my role model.
- I love going on vacations and trying new cuisines.
- I think cars are really cool.
- Basketball is my favorite sport.
- The gallery of pics has some of my family, fun, culture and faith memories.

<comment>
Gallery of Pics, scroll to the right for more ...
</comment>
<div class="image-gallery">
  <img src="{{site.baseurl}}/images/about/IMG_0389.jpg" alt="Image 1">
  <img src="{{site.baseurl}}/images/about/IMG_0306.jpg" alt="Image 2">
  <img src="{{site.baseurl}}/images/about/IMG_0758.jpg" alt="Image 3">
  <img src="{{site.baseurl}}/images/about/IMG_0750.jpg" alt="Image 4">
  <img src="{{site.baseurl}}/images/about/IMG_0728.jpg" alt="Image 5">
  <img src="{{site.baseurl}}/images/about/IMG_0745.jpg" alt="Image 6">
  <img src="{{site.baseurl}}/images/about/IMG_0276.jpg" alt="Image 7">
  <img src="{{site.baseurl}}/images/about/basketball.jpeg" alt="Image 8">
</div>

<!-- from https://github.com/utterance/utterances -->
<script src="https://utteranc.es/client.js"
        repo="{{ site.github_username }}/{{ site.github_repo | default: site.baseurl | remove: "/" }}"
        issue-term="title"
        label="blogpost-comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
<a href = "https://whitelunarium.github.io/Aneesh_2025/interests/">
<button> Click this button to learn about my Interests</button>
</a>
