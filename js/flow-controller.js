/**
 * GhostRep Flow Controller
 * Manages navigation between separate pages in the specified flow direction
 */

class FlowController {
    constructor() {
        this.pagesMap = {
            'index.html': { next: 'intro-scene.html', direction: 'down' },
            'intro-scene.html': { next: 'pressure-zone.html', direction: 'down' },
            'pressure-zone.html': { next: 'mini-selection.html', direction: 'right' },
            'mini-selection.html': { next: 'targeting-precision.html', direction: 'up' }, // Assuming this page exists
            'targeting-precision.html': { next: 'messaging.html', direction: 'left' }, // Assuming this page exists
            'messaging.html': { next: 'launch-monitoring.html', direction: 'right' }, // Assuming this page exists
            'launch-monitoring.html': { next: 'ghost-nest.html', direction: 'down' } // Final deployment page
        };
        
        this.currentPage = this.getCurrentPage();
        
        this.init();
    }
    
    init() {
        // Set up directional indicator
        this.setupDirectionalIndicator();
        
        // Set up click events for CTA buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', this.handleCTAClick.bind(this));
        });
        
        // Setup keyboard navigation
        document.addEventListener('keydown', this.handleKeyNavigation.bind(this));
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        return page || 'index.html';
    }
    
    setupDirectionalIndicator() {
        // Remove any existing indicators
        document.querySelectorAll('.direction-indicator').forEach(el => el.remove());
        
        // Don't add indicator to final page
        if (this.currentPage === 'ghost-nest.html') return;
        
        const direction = this.pagesMap[this.currentPage]?.direction;
        if (!direction) return;
        
        const indicator = document.createElement('div');
        indicator.className = `direction-indicator direction-${direction}`;
        indicator.textContent = this.getDirectionSymbol(direction);
        indicator.style.position = 'fixed';
        indicator.style.fontSize = '2rem';
        indicator.style.color = '#0fffc1';
        indicator.style.cursor = 'pointer';
        indicator.style.zIndex = '1000';
        
        // Position based on direction
        switch (direction) {
            case 'down':
                indicator.style.bottom = '2rem';
                indicator.style.left = '50%';
                indicator.style.transform = 'translateX(-50%)';
                indicator.style.animation = 'pulse 2s infinite ease-in-out';
                break;
            case 'up':
                indicator.style.top = '2rem';
                indicator.style.left = '50%';
                indicator.style.transform = 'translateX(-50%)';
                indicator.style.animation = 'pulse-up 2s infinite ease-in-out';
                break;
            case 'right':
                indicator.style.right = '2rem';
                indicator.style.top = '50%';
                indicator.style.transform = 'translateY(-50%)';
                indicator.style.animation = 'pulse-right 2s infinite ease-in-out';
                break;
            case 'left':
                indicator.style.left = '2rem';
                indicator.style.top = '50%';
                indicator.style.transform = 'translateY(-50%)';
                indicator.style.animation = 'pulse-left 2s infinite ease-in-out';
                break;
        }
        
        // Add to document
        document.body.appendChild(indicator);
        
        // Add click event
        indicator.addEventListener('click', () => {
            this.navigateToNextPage();
        });
        
        // Add animation keyframes if not already defined
        this.addAnimationKeyframes();
    }
    
    addAnimationKeyframes() {
        // Check if animations already exist
        if (document.getElementById('flow-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'flow-animations';
        style.textContent = `
            @keyframes pulse {
                0%, 100% {
                    opacity: 0.7;
                    transform: translateY(0) scale(1) translateX(-50%);
                }
                50% {
                    opacity: 1;
                    transform: translateY(10px) scale(1.1) translateX(-50%);
                }
            }
            
            @keyframes pulse-up {
                0%, 100% {
                    opacity: 0.7;
                    transform: translateY(0) scale(1) translateX(-50%);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-10px) scale(1.1) translateX(-50%);
                }
            }
            
            @keyframes pulse-right {
                0%, 100% {
                    opacity: 0.7;
                    transform: translateX(0) scale(1) translateY(-50%);
                }
                50% {
                    opacity: 1;
                    transform: translateX(10px) scale(1.1) translateY(-50%);
                }
            }
            
            @keyframes pulse-left {
                0%, 100% {
                    opacity: 0.7;
                    transform: translateX(0) scale(1) translateY(-50%);
                }
                50% {
                    opacity: 1;
                    transform: translateX(-10px) scale(1.1) translateY(-50%);
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    getDirectionSymbol(direction) {
        switch (direction) {
            case 'down': return '↓';
            case 'up': return '↑';
            case 'right': return '→';
            case 'left': return '←';
            default: return '•';
        }
    }
    
    handleCTAClick(event) {
        // If we're on the last page and this is the deploy button,
        // trigger the warp effect if available
        if (this.currentPage === 'ghost-nest.html') {
            // Check if WarpEffect is available
            if (window.WarpEffect) {
                const warpEffect = new WarpEffect();
                warpEffect.triggerWarp(() => {
                    console.log('Deployment complete!');
                    
                    // Show success message
                    const deployMessage = document.createElement('div');
                    deployMessage.textContent = 'Ghosts Successfully Deployed!';
                    deployMessage.style.color = '#0fffc1';
                    deployMessage.style.fontSize = '2rem';
                    deployMessage.style.fontWeight = 'bold';
                    deployMessage.style.textAlign = 'center';
                    deployMessage.style.marginTop = '2rem';
                    document.querySelector('.content-container').appendChild(deployMessage);
                });
                return;
            }
        }
        
        // Otherwise navigate to the next page
        this.navigateToNextPage();
    }
    
    navigateToNextPage() {
        const nextPage = this.pagesMap[this.currentPage]?.next;
        if (nextPage) {
            const direction = this.pagesMap[this.currentPage]?.direction;
            
            // Add directional exit animation
            if (direction) {
                document.body.classList.add(`exit-${direction}`);
            } else {
                document.body.classList.add('transition-out');
            }
            
            // Store direction in session storage for entry animation
            sessionStorage.setItem('lastDirection', direction);
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = nextPage;
            }, 500);
        }
    }
    
    handleKeyNavigation(event) {
        const direction = this.pagesMap[this.currentPage]?.direction;
        if (!direction) return;
        
        switch (event.key) {
            case 'ArrowDown':
                if (direction === 'down') this.navigateToNextPage();
                break;
            case 'ArrowUp':
                if (direction === 'up') this.navigateToNextPage();
                break;
            case 'ArrowRight':
                if (direction === 'right') this.navigateToNextPage();
                break;
            case 'ArrowLeft':
                if (direction === 'left') this.navigateToNextPage();
                break;
        }
    }
}

// Initialize controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const flowController = new FlowController();
});

