/**
 * GhostRep Warp Effect
 * Manages the transition effect from the journey to the dashboard
 */

class WarpEffect {
    constructor() {
        this.setupWarpContainer();
        this.particlesCount = 100;
    }
    
    setupWarpContainer() {
        // Create the warp container and append it to the body
        const warpContainer = document.createElement('div');
        warpContainer.className = 'warp-container';
        
        // Create portal effect
        const warpPortal = document.createElement('div');
        warpPortal.className = 'warp-portal';
        warpContainer.appendChild(warpPortal);
        
        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'warp-particles';
        
        // Add particles
        for (let i = 0; i < this.particlesCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'warp-particle';
            
            // Set random positions
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Set random size
            const size = Math.random() * 2 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size * 10}px`;
            
            // Set random rotation
            const rotX = Math.random() * 360;
            const rotY = Math.random() * 360;
            const rotZ = Math.random() * 360;
            particle.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) translateZ(-1000px)`;
            
            particlesContainer.appendChild(particle);
        }
        
        warpContainer.appendChild(particlesContainer);
        
        // Create ghost silhouette
        const warpGhost = document.createElement('div');
        warpGhost.className = 'warp-ghost';
        const ghostImg = document.createElement('img');
        ghostImg.src = 'https://res.cloudinary.com/dolij7wjr/image/upload/v1744232341/messages_that_sound_like_hey_just_checking_in_lyyprj.png';
        ghostImg.alt = 'GhostRep Logo';
        warpGhost.appendChild(ghostImg);
        warpContainer.appendChild(warpGhost);
        
        // Create flash element
        const warpFlash = document.createElement('div');
        warpFlash.className = 'warp-flash';
        warpContainer.appendChild(warpFlash);
        
        // Append to body
        document.body.appendChild(warpContainer);
        
        // Store references
        this.warpContainer = warpContainer;
        this.warpPortal = warpPortal;
        this.warpParticles = particlesContainer.querySelectorAll('.warp-particle');
        this.warpGhost = warpGhost;
        this.warpFlash = warpFlash;
    }
    
    /**
     * Trigger the warp effect
     * @param {Function} completionCallback - Called when warp is complete
     */
    triggerWarp(completionCallback) {
        // Add warping class to body
        document.body.classList.add('warping');
        
        // Start ghost animation first - it moves from center to user
        this.warpGhost.classList.add('animating');
        
        // Animate portal with slight delay
        setTimeout(() => {
            this.warpPortal.classList.add('animating');
        }, 200);
        
        // Animate particles with staggered delay
        this.warpParticles.forEach((particle, index) => {
            const delay = Math.random() * 1.2 + 0.5; // More varied, slightly delayed
            setTimeout(() => {
                particle.classList.add('animating');
            }, delay * 1000);
        });
        
        // Flash just as ghost reaches maximum size heading toward user
        setTimeout(() => {
            this.warpFlash.classList.add('active');
            
            // Complete the warp
            setTimeout(() => {
                document.body.classList.add('warp-complete');
                document.body.classList.remove('warping');
                this.warpFlash.classList.remove('active');
                
                // Reset animations
                this.warpPortal.classList.remove('animating');
                this.warpGhost.classList.remove('animating');
                this.warpParticles.forEach(particle => {
                    particle.classList.remove('animating');
                });
                
                // Call completion callback
                if (typeof completionCallback === 'function') {
                    completionCallback();
                }
            }, 500);
        }, 2000); // Flash when ghost is at about 80% of animation (coming right at viewer)
    }
}

// Export the warp effect for use in scene controller
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WarpEffect;
} else {
    window.WarpEffect = WarpEffect;
}

