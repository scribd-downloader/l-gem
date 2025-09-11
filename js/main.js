document.addEventListener("DOMContentLoaded", function () {
    const playBtn = document.getElementById("play-btn");
    const gameContainer = document.getElementById("game-container");
    const gameImage = document.getElementById("game-image");
    const fullscreenBtn = document.getElementById("fullscreen-btn");

    // Preload existing iframe
    const preloadedFrame = document.getElementById("game-frame");
    const gameLoader = document.getElementById("game-loader");
    let frameReady = false;

    if (preloadedFrame) {
        // Start loading immediately
        preloadedFrame.addEventListener('load', function() {
            frameReady = true;
            if (gameLoader) gameLoader.style.display = 'none';
        });
    }

    function startGame() {
        console.log("Game Started");
        // Remove image & button
        playBtn.style.display = "none";
        gameImage.style.display = "none";

        // Show loader until ready
        if (gameLoader) gameLoader.style.display = 'flex';

        // If preloaded iframe exists and is ready, just show it
        if (preloadedFrame) {
            // Show regardless; onload will hide loader
            preloadedFrame.style.display = 'block';
            fullscreenBtn.style.display = "block";

            // Fallback: if still not loaded after 2s (likely blocked), open new tab
            setTimeout(() => {
                if (!frameReady) {
                    if (gameLoader) gameLoader.style.display = 'none';
                    window.open('https://ludoking.com/play/', '_blank', 'noopener');
                }
            }, 2000);
            return;
        }
    }

    // Click events for button & image
    playBtn.addEventListener("click", startGame);
    gameImage.addEventListener("click", startGame);

    // Fullscreen functionality
    fullscreenBtn.addEventListener("click", function () {
        let gameFrame = document.getElementById("game-frame");

        if (gameFrame.requestFullscreen) {
            gameFrame.requestFullscreen();
        } else if (gameFrame.mozRequestFullScreen) {
            gameFrame.mozRequestFullScreen();
        } else if (gameFrame.webkitRequestFullscreen) {
            gameFrame.webkitRequestFullscreen();
        } else if (gameFrame.msRequestFullscreen) {
            gameFrame.msRequestFullscreen();
        }
    });
});
