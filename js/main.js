document.addEventListener("DOMContentLoaded", function () {
    const playBtn = document.getElementById("play-btn");
    const gameContainer = document.getElementById("game-container");
    const gameImage = document.getElementById("game-image");
    const fullscreenBtn = document.getElementById("fullscreen-btn");

    function startGame() {
        console.log("Game Started");
        // Remove image & button
        playBtn.style.display = "none";
        gameImage.style.display = "none";
        // Create iframe on demand
        const iframe = document.createElement("iframe");
        iframe.src = "https://ludoking.com/play/";
        iframe.id = "game-frame";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.allowFullscreen = true;
        iframe.setAttribute("allow", "fullscreen; autoplay; clipboard-write");
        iframe.setAttribute("referrerpolicy", "no-referrer");

        iframe.addEventListener('error', function() {
            // Fallback if blocked
            window.open('https://ludoking.com/play/', '_blank', 'noopener');
        });

        gameContainer.appendChild(iframe);
        fullscreenBtn.style.display = "block";
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
