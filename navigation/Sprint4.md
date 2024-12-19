---
layout: page
title: Sprint4
permalink: /Sprint4/
---

# Final Review
**Level 9 (Skibidi)**

---

**Changes I made!**

- I changed the image to look better and relate to the theme. It is a human because nowadays, people are always talking about it.
---
**Sprite Image:**
Before:
![image](https://github.com/user-attachments/assets/3c300ddb-fc31-47c5-a2ac-12f945e4f587)

After:
![image](https://github.com/user-attachments/assets/2bba9694-897d-48e9-9ac3-a44b1e58cb88)

---
**Changes to Code!**
- Due to the image of the main sprite being changed, I was forced to change the animations as well as the size and speed of the sprite's animations.
---
**Animation Code:**
Before:
```
        idle: {row: 0, frames: 3 },
        walk: {  row: 2, frames: 3 },
        run: {  row: 2, frames: 3 },
        jump: {row: 3, frames: 3 },
````

After:
```     
        idle: {row: 0, frames: 3 },
        walk: {  row: 2, frames: 3 },
        run: {  row: 2, frames: 3 },
        jump: {row: 3, frames: 3 },
```

---

**Explanation of Code**
- The sprite sheet had a specific number of animations, so I had to calculate the rows and frames based on the image.
- For changing the image, all I had to do was import the image file, and then change the image source.

---

**Challenges**
- One of my challenges was the images not linking properly, so I had to delete the image files and reimport it, then relink the image source.
- Another challenge was not knowing the exact size of each animation in the sprite, which led to the sprite looking like it's body parts got cut off

---
