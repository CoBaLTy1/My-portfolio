let currentAnimation = 'mover';
let isAnimating = false; // Flag to track if an animation is in progress

// Function to trigger the sidebar animation
function triggerMoverAnimation() {
    if (isAnimating) return; // Prevent further clicks if animating
    isAnimating = true; // Set the flag to true when animation starts

    const sidebar = document.querySelector('.sidebar');

    // Reset and apply the current animation
    sidebar.style.animation = 'none'; // Reset the animation
    sidebar.offsetHeight; // Trigger reflow
    sidebar.style.animation = `${currentAnimation} .5s forwards`; // Apply current animation

    // Switch to the other animation for the next click
    currentAnimation = (currentAnimation === 'mover') ? 'mover1' : 'mover';

    // Listen for the animation end event to reset the flag
    sidebar.addEventListener('animationend', () => {
        isAnimating = false; // Reset the flag when animation ends
    }, { once: true }); // Use { once: true } to ensure it only runs once
}

// Event listener for sidebar click
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.addEventListener('click', triggerMoverAnimation);
});

// Any other JavaScript functionality you have can go here

// Example: Initializing other animations or effects
// anime({ ... }); // Add your anime.js initialization code here if needed
