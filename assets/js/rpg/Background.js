import GameEnv from './GameEnv.js';

class Background {
    constructor(images = []) {
        this.images = images.map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });
        this.currentImageIndex = 0;
        this.loadImages();
    }

    loadImages() {
        const promises = this.images.map(img => {
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
        });

        Promise.all(promises).then(() => {
            console.log('All background images loaded successfully.');
        }).catch(() => {
            console.error('Failed to load some background images.');
        });
    }

    draw() {
        const currentImage = this.images[this.currentImageIndex];
        if (currentImage) {
            GameEnv.ctx.drawImage(
                currentImage,
                0, 0, GameEnv.innerWidth, GameEnv.innerHeight
            );
        }
    }

    changeBackground() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
}

export default Background;
