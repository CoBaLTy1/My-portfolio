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
const elementsToObserve = document.querySelectorAll('.proj1, .proj2, .proj3, .proj4, .proj5, .proj6, .exploration');

// Create an Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the element enters the viewport, scale up to 1
            console.log(`Element: ${entry.target.className}, Is Intersecting: ${entry.isIntersecting}`);
            entry.target.classList.add('visible');
            entry.target.style.transition = 'transform 0.5s ease';
            entry.target.style.transform = 'scale(1)';
        } else {
            // When the element exits the viewport, remove the visible class
            console.log(`Element: ${entry.target.className}, Has Left the Viewport`);
            entry.target.classList.remove('visible');
            entry.target.style.transition = 'transform 0.5s ease';
            entry.target.style.transform = 'scale(0.9)'; // Scale down to 0.9 for a smoother transition
        }
    });
}, {
    threshold: [0], // Trigger when any part of the element is visible
    rootMargin: '-10% 0px 0px 0px' // Same rootMargin as before
});

// Observe each element
elementsToObserve.forEach(element => {
    observer.observe(element);
});

// Define limits at the top of your script
let limits = 15.0;

// Event listener for multiple project elements
document.addEventListener('DOMContentLoaded', () => {
    // Select all project elements
    const projectElements = document.querySelectorAll('.proj1, .proj2, .proj3, .proj4, .proj5, .proj6');

    projectElements.forEach(proj => {
        // Mouse move event
        proj.addEventListener('mousemove', function (e) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top; // y position within the element.
            const offsetX = x / rect.width;
            const offsetY = y / rect.height;

            const rotateY = (offsetX) * (limits * 2) - limits;
            const rotateX = (offsetY) * (limits * 2) - limits;

            const shadowOffsetX = (offsetX) * 32 - 16;
            const shadowOffsetY = (offsetY) * 32 - 16;

            proj.style.boxShadow = `
                ${-shadowOffsetX / 6}px ${-shadowOffsetY / 6}px 3px rgba(255, 255, 255, 0.051),
                ${-shadowOffsetX / 3}px ${-shadowOffsetY / 3}px 7.2px rgba(255, 255, 255, 0.073),
                ${-shadowOffsetX / 2}px ${-shadowOffsetY / 2}px 13.6px rgba(255, 255, 255, 0.09),
                ${-shadowOffsetX * (2 / 3)}px ${-shadowOffsetY * (2 / 3)}px 24.3px rgba(255, 255, 255, 0.107),
                ${-shadowOffsetX * (5 / 6)}px ${-shadowOffsetY * (5 / 6)}px 45.5px rgba(255, 255, 255, 0.129),
                ${-shadowOffsetX}px ${-shadowOffsetY}px 109px rgba(255, 255, 255, 0.18)`;
            
            proj.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;

            // Define glare variable within the event
            const glare = proj.querySelector('.glare');
            if (glare) {
                const glarePos = rotateX + rotateY + 90;
                glare.style.left = glarePos + "%";
            }
        });

        // Mouse leave event
        proj.addEventListener('mouseleave', function () {
            // Reset the box shadow and transformation for all project elements
            projectElements.forEach(element => {
                element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"; // Reset transformation
                element.style.boxShadow = 'none'; // Reset the box shadow
                const glare = element.querySelector('.glare'); // Ensure glare is defined here too
                if (glare) {
                    glare.style.left = "100%"; // Reset glare position
                }
            });
        });
    });
});
