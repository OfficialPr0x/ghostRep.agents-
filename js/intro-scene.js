// Main text to type out
const textToType = "Deploy an AI that never sleeps.";
const typingSpeed = 80; // milliseconds per character
const cursorElement = document.getElementById('cursor');
const typewriterElement = document.getElementById('typewriter-text');
const ctaContainer = document.getElementById('cta-container');
const ctaButton = document.getElementById('cta-button');

// Initialize the scene when window loads
window.addEventListener('load', () => {
    // Start the typewriter effect with a slight delay
    setTimeout(() => {
        startTypewriter();
    }, 1000);
    
    // Add click listener for CTA button
    ctaButton.addEventListener('click', () => {
        // Add transition effect
        document.body.classList.add('transition-out');
        
        // Wait for transition to complete before navigating to Scene 2
        setTimeout(() => {
            // Navigate to The Pressure Zone (Scene 2)
            window.location.href = '../pages/pressure-zone.html';
        }, 1000);
    });
});

// Typewriter effect function
function startTypewriter() {
    let charIndex = 0;
    
    // Show cursor before typing begins
    cursorElement.style.display = 'block';
    
    // Type one character at a time
    const typingInterval = setInterval(() => {
        if (charIndex < textToType.length) {
            typewriterElement.textContent += textToType.charAt(charIndex);
            charIndex++;
        } else {
            // Typing complete, clear the interval
            clearInterval(typingInterval);
            
            // Wait 2 seconds, then show CTA
            setTimeout(() => {
                showCTA();
            }, 2000);
        }
    }, typingSpeed);
}

// Function to show the CTA button
function showCTA() {
    ctaContainer.style.opacity = '1';
}

// Additional ambient effects
function createAmbientEffects() {
    // This function could be expanded to add additional dynamic effects
    // For example: subtle background audio, particle effects, etc.
    
    // Add pulse effect to smoke layers
    const smokeLayerElements = document.querySelectorAll('.smoke-layer');
    smokeLayerElements.forEach(layer => {
        // Add random subtle variations to each layer's animation
        const randomScale = 1 + (Math.random() * 0.2);
        layer.style.animationDuration = `${30 + (Math.random() * 30)}s`;
        layer.style.transform = `scale(${randomScale}) rotate(${Math.random() * 10 - 5}deg)`;
    });
}

// Initialize ambient effects
createAmbientEffects();

