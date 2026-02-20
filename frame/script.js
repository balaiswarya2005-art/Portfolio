const frameCount = 240; // Total number of frames
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const currentFrame = index => {
    const paddedIndex = String(index + 1).padStart(3, '0');
    return `frames/ezgif-frame-${paddedIndex}.jpg`;
};

const images = [];
const imageSeq = {
    frame: 0
};

// Preload images
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Draw first frame when loaded
images[0].onload = function () {
    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScrollTop = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    if (images[frameIndex]) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
    }
});

// Resize handling
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
