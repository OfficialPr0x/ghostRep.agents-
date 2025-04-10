/**
 * GhostRep HUD Component
 * Creates a mini-map navigation HUD in the bottom-left corner
 */

class HudComponent {
    constructor() {
        this.pagesMap = {
            'index.html': { position: 0, name: 'Intro' },
            'intro-scene.html': { position: 1, name: 'Ghost Chamber' },
            'pressure-zone.html': { position: 2, name: 'The Problem' },
            'mini-selection.html': { position: 3, name: 'MINI Selection' },
            'targeting-precision.html': { position: 4, name: 'Targeting' },
            'messaging.html': { position: 5, name: 'Messaging' },
            'launch-monitoring.html': { position: 6, name: 'Launch' },
            'ghost-nest.html': { position: 7, name: 'Deploy' }
        };
        
        this.currentPage = this.getCurrentPage();
        this.currentPosition = this.pagesMap[this.currentPage]?.position || 0;
        
        this.init();
    }
    
    init() {
        this.createHUD();
        this.highlightCurrentPosition();
        this.addHoverEffects();
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        return page || 'index.html';
    }
    
    createHUD() {
        // Remove any existing HUD
        const existingHud = document.querySelector('.mini-map-hud');
        if (existingHud) {
            existingHud.remove();
        }
        
        // Create HUD container
        const hudContainer = document.createElement('div');
        hudContainer.className = 'mini-map-hud';
        
        // Style the HUD
        Object.assign(hudContainer.style, {
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            zIndex: '1000',
            background: 'rgba(8, 8, 12, 0.7)',
            backdropFilter: 'blur(5px)',
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
        });
        
        // Create path
        const path = document.createElement('div');
        path.className = 'mini-map-path';
        
        Object.assign(path.style, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
        });
        
        // Add dots for each position
        const totalPositions = Object.keys(this.pagesMap).length;
        
        for (let i = 0; i < totalPositions; i++) {
            const dot = document.createElement('div');
            dot.className = 'scene-dot';
            dot.dataset.position = i;
            
            // Find the page name for this position
            let pageName = '';
            for (const [page, data] of Object.entries(this.pagesMap)) {
                if (data.position === i) {
                    pageName = data.name;
                    dot.dataset.page = page;
                    break;
                }
            }
            
            // Style the dot
            Object.assign(dot.style, {
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.3)',
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            });
            
            // Add connecting line (except for last dot)
            if (i < totalPositions - 1) {
                const line = document.createElement('div');
                
                Object.assign(line.style, {
                    width: '2px',
                    height: '1rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    margin: '0 auto'
                });
                
                path.appendChild(dot);
                path.appendChild(line);
            } else {
                path.appendChild(dot);
            }
            
            // Add tooltip on hover
            if (pageName) {
                dot.title = pageName;
            }
        }
        
        hudContainer.appendChild(path);
        document.body.appendChild(hudContainer);
        
        // Store references
        this.hudContainer = hudContainer;
        this.dots = hudContainer.querySelectorAll('.scene-dot');
    }
    
    highlightCurrentPosition() {
        this.dots.forEach((dot, index) => {
            if (index === this.currentPosition) {
                Object.assign(dot.style, {
                    background: '#0fffc1',
                    boxShadow: '0 0 10px #0fffc1'
                });
            }
            
            // Mark positions already visited
            if (index < this.currentPosition) {
                dot.style.background = 'rgba(255, 255, 255, 0.6)';
            }
        });
    }
    
    addHoverEffects() {
        this.dots.forEach(dot => {
            dot.addEventListener('mouseenter', () => {
                dot.style.transform = 'scale(1.2)';
            });
            
            dot.addEventListener('mouseleave', () => {
                dot.style.transform = 'scale(1)';
            });
            
            dot.addEventListener('click', () => {
                const targetPage = dot.dataset.page;
                if (targetPage) {
                    window.location.href = targetPage;
                }
            });
        });
    }
}

// Initialize HUD when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const hud = new HudComponent();
});

