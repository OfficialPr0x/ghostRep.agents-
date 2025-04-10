// GhostRep Intro Scene - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // References to DOM elements
    const typewriterText = document.querySelector('.typewriter-text');
    const typewriterCursor = document.querySelector('.typewriter-cursor');
    const ctaButton = document.querySelector('.cta-button');
    
    // Text for the typewriter effect is in the HTML
    const text = typewriterText.textContent;
    
    // Animation timings (match with CSS)
    const typingDelay = 2000; // Delay before typing starts (2s in CSS)
    const typingDuration = 3000; // Duration of typing animation (3s in CSS)
    const ctaDelay = 5000; // Delay before CTA appears (5s in CSS)
    
    // Initialize
    initIntroScene();
    
    // Main initialization function
    function initIntroScene() {
        // Set up the cursor position during typing
        animateCursor();
        
        // Add event listener to CTA button
        ctaButton.addEventListener('click', transitionToMainApp);
        
        // Sync the JavaScript animations with CSS animations
        setTimeout(() => {
            // Cursor becomes visible now (matches CSS animation-delay for cursor)
            typewriterCursor.style.opacity = '1';
        }, typingDelay);
    }
    
    // Animate the cursor position as text is being typed
    function animateCursor() {
        // Start the animation after the typing delay
        setTimeout(() => {
            // Calculate how long each character takes to type
            const charDuration = typingDuration / text.length;
            
            // Track cursor position during typing
            let cursorPos = 0;
            
            // Start the cursor animation interval
            const cursorInterval = setInterval(() => {
                if (cursorPos >= text.length) {
                    // Typing is complete, keep cursor at the end
                    typewriterCursor.style.left = 'calc(100% + 4px)';
                    clearInterval(cursorInterval);
                    return;
                }
                
                // Calculate width of the text up to the current position
                const textToMeasure = text.substring(0, cursorPos + 1);
                const textWidth = getTextWidth(textToMeasure, getComputedStyle(typewriterText).font);
                
                // Position the cursor
                typewriterCursor.style.left = `${textWidth}px`;
                
                // Move to next character
                cursorPos++;
            }, charDuration);
        }, typingDelay);
    }
    
    // Helper function to measure text width accurately
    function getTextWidth(text, font) {
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        const context = canvas.getContext("2d");
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }
    
    // Transition to the main application
    function transitionToMainApp() {
        // Add a fade-out effect to the entire scene
        document.querySelector('.smoke-chamber').style.transition = 'opacity 0.8s ease-in-out';
        document.querySelector('.smoke-chamber').style.opacity = '0';
        
        // Navigate to the main application after fade-out completes
        setTimeout(() => {
            window.location.href = '../pages/ghost-nest.html';
        }, 800);
    }
    
    // Add a 'click anywhere' listener if user clicks outside the button
    document.addEventListener('click', function(event) {
        // Only trigger if the intro animations have completed (CTA is visible)
        if (event.target !== ctaButton && Date.now() > ctaDelay) {
            transitionToMainApp();
        }
    });
});

