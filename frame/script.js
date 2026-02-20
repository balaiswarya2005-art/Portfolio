
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 240;
const images = [];
const imageSeq = {
    frame: 0
};

// Generate file path
const currentFrame = (index) => {
    const frameNumber = String(index + 1).padStart(3, '0');
    return `frame/ezgif-frame-${frameNumber}.jpg`;
};

// Preload images
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Draw image
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[imageSeq.frame], 0, 0, canvas.width, canvas.height);
}

// Scroll animation
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    imageSeq.frame = frameIndex;
    requestAnimationFrame(render);
});

// Initial render when first image loads
images[0].onload = render;

// Responsive resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});
