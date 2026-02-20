
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    height: 500vh; /* Controls scroll length */
    background: #000;
    overflow-x: hidden;
}

.scroll-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
}

canvas {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
