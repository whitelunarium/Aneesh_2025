function bounceOffSprites(player, sprites) {
    const TINY_BOUNCE_AMOUNT = 0.5;  // Define a small bounce-back amount
    
    // Loop through each sprite in the list to check for collision
    for (let i = 0; i < sprites.length; i++) {
        let sprite = sprites[i];
        
        // Simple AABB (Axis-Aligned Bounding Box) collision detection
        if (player.x < sprite.x + sprite.width &&
            player.x + player.width > sprite.x &&
            player.y < sprite.y + sprite.height &&
            player.y + player.height > sprite.y) {

            // Calculate the differences between the edges of the player and the sprite
            let dxLeft = player.x + player.width - sprite.x;  // Distance from player's right to sprite's left
            let dxRight = sprite.x + sprite.width - player.x; // Distance from player's left to sprite's right
            let dyTop = player.y + player.height - sprite.y;  // Distance from player's bottom to sprite's top
            let dyBottom = sprite.y + sprite.height - player.y; // Distance from player's top to sprite's bottom

            // Bounce based on which edge of the player hit the sprite
            if (dxLeft < dxRight && dxLeft < dyTop && dxLeft < dyBottom) {
                // Left side collision
                player.x -= TINY_BOUNCE_AMOUNT;  // Bounce player left
            } else if (dxRight < dxLeft && dxRight < dyTop && dxRight < dyBottom) {
                // Right side collision
                player.x += TINY_BOUNCE_AMOUNT;  // Bounce player right
            } else if (dyTop < dyBottom) {
                // Top side collision
                player.y -= TINY_BOUNCE_AMOUNT;  // Bounce player up
            } else {
                // Bottom side collision
                player.y += TINY_BOUNCE_AMOUNT;  // Bounce player down
            }
        }
    }
}

export default Maze;