// DOM elements
const ctaButton = document.querySelector('.cta-button');
const pressureContainer = document.querySelector('.pressure-container');

// Initialize the scene when window loads
window.addEventListener('load', () => {
    // Add listener for CTA button
    ctaButton.addEventListener('click', () => {
        // Add transition effect
        document.body.classList.add('transition-out');
        
        // Wait for transition to complete before either:
        // 1. Scrolling to next section if it exists
        // 2. Navigating to next page
        setTimeout(() => {
            const nextScene = document.querySelector('.scene-3');
            
            if (nextScene) {
                // If there's a next scene, scroll to it smoothly
                nextScene.scrollIntoView({ behavior: 'smooth' });
            } else {
            // If no next scene, navigate to the mini selection page
            window.location.href = 'mini-selection.html?from=pressure-zone';
            }
        }, 800);
    });
    
    // Initialize pressure gauge animation
    initializePressureGauge();
});

// Set up the pressure gauge animation with pulses
function initializePressureGauge() {
    const gaugeLine = document.querySelector('.gauge-line');
    
    // The base animation is done with CSS, this just adds random pulses
    // to simulate pressure building irregularly
    setInterval(() => {
        // Only add pulses after the gauge starts filling
        if (document.timeline.currentTime > 500) {
            const randomPulse = Math.random() * 5;
            gaugeLine.style.filter = `brightness(${1 + randomPulse})`; 
            
            // Reset after brief pulse
            setTimeout(() => {
                gaugeLine.style.filter = 'brightness(1)';
            }, 150);
        }
    }, 800);
}

// Add special transition-out class to handle page transition
document.documentElement.style.setProperty('--transition-time', '0.8s');
const style = document.createElement('style');
style.textContent = `
    body.transition-out {
        animation: fade-out var(--transition-time) forwards;
    }
    
    @keyframes fade-out {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Optional: Enhance scroll behavior
window.addEventListener('wheel', (e) => {
    // After all animations are complete (>6s) enhance scroll behavior
    if (document.timeline.currentTime > 6000) {
        if (e.deltaY > 0) {
            // Scrolling down
            ctaButton.click();
        }
    }
}, { passive: true });

