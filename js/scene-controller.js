/**
 * GhostRep Scene Controller
 * Manages scene transitions, scroll effects, and scene-specific animations
 */

class SceneController {
    constructor() {
        this.scenes = document.querySelectorAll('.scene-container');
        this.dots = document.querySelectorAll('.scene-dot');
        this.currentScene = 0;
        this.isAnimating = false;
        this.sceneDirections = ['down', 'down', 'right', 'up', 'left', 'right', 'down'];
        
        this.init();
    }
    
    init() {
        this.setupScrollTriggers();
        this.setupNavigation();
        this.setupSceneSpecificAnimations();
        
        // Mark first scene as active initially
        this.dots[0].classList.add('active');
        this.dots[0].classList.add('visited');
        
        // Add keyboard navigation
        document.addEventListener('keydown', this.handleKeyNavigation.bind(this));
    }
    
    setupScrollTriggers() {
        // Make sure GSAP is loaded
        if (!window.gsap || !window.ScrollTrigger) {
            console.error('GSAP or ScrollTrigger not loaded');
            return;
        }
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Setup scene transitions
        this.scenes.forEach((scene, index) => {
            ScrollTrigger.create({
                trigger: scene,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => this.activateScene(index),
                onEnterBack: () => this.activateScene(index)
            });
        });
    }
    
    setupNavigation() {
        // Click on mini-map dots to navigate to scenes
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.navigateToScene(index);
            });
        });
        
        // Setup directional navigation buttons
        document.querySelectorAll('.direction-indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                const nextSceneIndex = this.getNextSceneIndex(index, this.sceneDirections[index]);
                if (nextSceneIndex !== null) {
                    this.navigateToScene(nextSceneIndex);
                }
            });
        });
        
        // Setup CTA buttons to navigate to next scene
        document.querySelectorAll('.cta-button').forEach((button, index) => {
            // Skip the last scene's CTA as it should trigger the dashboard warp
            if (index < this.scenes.length - 1) {
                button.addEventListener('click', () => {
                    const nextSceneIndex = this.getNextSceneIndex(index, this.sceneDirections[index]);
                    if (nextSceneIndex !== null) {
                        this.navigateToScene(nextSceneIndex);
                    }
                });
            } else {
                // Handle final CTA specially - e.g., warp to dashboard
                button.addEventListener('click', () => {
                    this.triggerDashboardWarp();
                });
            }
        });
    }
    
    setupSceneSpecificAnimations() {
        // Scene 1: Typewriter effect
        this.setupTypewriterEffect();
        
        // Scene 2: Pressure gauge animation
        this.setupPressureGauge();
        
        // Additional scene-specific animations can be added here
    }
    
    setupTypewriterEffect() {
        const typewriterText = document.getElementById('typewriter-text');
        const text = "Deploy an AI that never sleeps.";
        const speed = 70; // milliseconds between each character
        
        ScrollTrigger.create({
            trigger: '#scene-1',
            start: 'top center',
            onEnter: () => this.typeWriterEffect(typewriterText, text, speed)
        });
    }
    
    setupPressureGauge() {
        gsap.to('#gauge-line', {
            width: '100%',
            duration: 3,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: '#scene-2',
                start: 'top center',
                toggleActions: 'play none none reset'
            }
        });
    }
    
    typeWriterEffect(element, text, speed) {
        const cursor = document.getElementById('cursor');
        cursor.style.display = 'block';
        
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
    
    activateScene(index) {
        if (this.isAnimating) return;
        
        // Update current scene index
        this.currentScene = index;
        
        // Update mini-map
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[index].classList.add('active');
        this.dots[index].classList.add('visited');
        
        // Trigger scene-specific animations
        this.triggerSceneAnimations(index);
    }
    
    navigateToScene(index) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Smooth scroll to scene
        window.scrollTo({
            top: this.scenes[index].offsetTop,
            behavior: 'smooth'
        });
        
        // Set a timeout to prevent multiple rapid navigations
        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }
    
    getNextSceneIndex(currentIndex, direction) {
        // This maps the 'flow' of navigation based on the directional indicators
        switch (direction) {
            case 'down':
                return currentIndex + 1;
            case 'up':
                return currentIndex - 1;
            case 'right':
                // Scene 3 -> 4, Scene 6 -> 7
                if (currentIndex === 2) return 3;
                if (currentIndex === 5) return 6;
                break;
            case 'left':
                // Scene 5 -> 6
                if (currentIndex === 4) return 5;
                break;
            default:
                return null;
        }
        
        return null;
    }
    
    triggerSceneAnimations(index) {
        // Trigger animations for specific scenes
        switch(index) {
            case 0: // Scene 1
                // Animation already handled by ScrollTrigger
                break;
            case 1: // Scene 2
                // Animation already handled by ScrollTrigger
                break;
            case 2: // Scene 3
                // Fade in MINI cards sequentially
                gsap.to('#scene-3 .mini-card', {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
                break;
            case 3: // Scene 4
                // Add scene 4 specific animations
                break;
            case 4: // Scene 5
                // Add scene 5 specific animations
                break;
            case 5: // Scene 6
                // Add scene 6 specific animations
                break;
            case 6: // Scene 7
                // Add scene 7 specific animations
                break;
        }
    }
    
    handleKeyNavigation(event) {
        // Arrow key navigation
        switch(event.key) {
            case 'ArrowDown':
                if (this.sceneDirections[this.currentScene] === 'down') {
                    const nextIndex = this.getNextSceneIndex(this.currentScene, 'down');
                    if (nextIndex !== null) this.navigateToScene(nextIndex);
                }
                break;
            case 'ArrowUp':
                if (this.sceneDirections[this.currentScene] === 'up') {
                    const nextIndex = this.getNextSceneIndex(this.currentScene, 'up');
                    if (nextIndex !== null) this.navigateToScene(nextIndex);
                }
                break;
            case 'ArrowRight':
                if (this.sceneDirections[this.currentScene] === 'right') {
                    const nextIndex = this.getNextSceneIndex(this.currentScene, 'right');
                    if (nextIndex !== null) this.navigateToScene(nextIndex);
                }
                break;
            case 'ArrowLeft':
                if (this.sceneDirections[this.currentScene] === 'left') {
                    const nextIndex = this.getNextSceneIndex(this.currentScene, 'left');
                    if (nextIndex !== null) this.navigateToScene(nextIndex);
                }
                break;
        }
    }
    
    triggerDashboardWarp() {
        console.log('Warping to dashboard...');
        
        // Create the warp effect instance if it doesn't exist
        if (!this.warpEffect) {
            this.warpEffect = new WarpEffect();
        }
        
        // Trigger the warp animation
        this.warpEffect.triggerWarp(() => {
            // This callback is executed when warp animation completes
            console.log('Warp complete, redirecting to dashboard...');
            
            // For now just log a message, but in production this would redirect
            // to the dashboard or show a success message
            // window.location.href = '../pages/ghost-nest.html';
            
            // For demo purposes, add a message to the final scene
            const scene7 = document.querySelector('#scene-7 .scene-content');
            const deployedMessage = document.createElement('div');
            deployedMessage.className = 'deployed-message';
            deployedMessage.style.marginTop = '2rem';
            deployedMessage.style.color = 'var(--ghost-teal)';
            deployedMessage.style.fontWeight = 'bold';
            deployedMessage.style.fontSize = '1.5rem';
            deployedMessage.textContent = 'Ghosts successfully deployed!';
            scene7.appendChild(deployedMessage);
        });
    }
}

// Initialize controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const controller = new SceneController();
});

