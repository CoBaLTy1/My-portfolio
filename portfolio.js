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

const background = document.querySelector('.background');
const overlay = document.createElement('div');

// Style the overlay to match the .background element
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '300%'; // Match the background height
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Start transparent
overlay.style.pointerEvents = 'none'; // Allow clicks to pass through
background.appendChild(overlay);

function updateBackgroundOpacity() {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Calculate the scroll percentage and increase the rate of darkening
    const scrollPercent = Math.min((scrollPosition / maxScroll) * 1.2, 1); // Adjust the multiplier here

    // Update the overlay opacity (from 0 to 1)
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${scrollPercent})`;
}

// Add event listener for scroll
window.addEventListener('scroll', updateBackgroundOpacity);


const elementsToObserve = document.querySelectorAll('.downback, .proj1, .proj2, .proj3, .proj4, .proj5, .proj6, .exploration');

// Create an Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // At least 50% of the element is visible
            console.log(`Element ${entry.target.className} is at least 50% visible`);

            // Add a 'visible' class to trigger the scaling effect
            entry.target.classList.add('visible');
        } else {
            // Remove the 'visible' class when the element is out of view
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the element is visible
});

// Observe each element
elementsToObserve.forEach(element => {
    observer.observe(element);
});











