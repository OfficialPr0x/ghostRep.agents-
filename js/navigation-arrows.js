/**
 * Navigation Arrows Component
 * Adds animated navigation arrows to select scenes in the user journey
 * Avoids adding arrows where existing navigation/progress indicators exist
 */

document.addEventListener('DOMContentLoaded', function() {
    // Insert the navigation arrow into the page if appropriate
    function addNavigationArrow() {
        // Determine the current page more robustly
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop();
        
        // Stop immediately if we're on pressure-zone.html
        if (currentPath.includes('pressure-zone.html') || currentPage === 'pressure-zone.html') {
            return;
        }
        
        // Skip adding arrows on pages that already have navigation elements
        const pagesWithExistingNavigation = [
            'intro-scene.html',     // Has CTA button as navigation
            'ghost-nest.html'       // Has dashboard navigation
        ];
        
        // If current page has its own navigation, don't add an arrow
        if (pagesWithExistingNavigation.includes(currentPage)) {
            return;
        }
        
        // Create the arrow container
        const arrowContainer = document.createElement('div');
        arrowContainer.className = 'nav-arrow';
        
        // Add the SVG arrow
        arrowContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 20.5a1 1 0 0 1-.71-.29l-8-8a1 1 0 0 1 1.42-1.42L12 18.08l7.29-7.29a1 1 0 0 1 1.42 1.42l-8 8a1 1 0 0 1-.71.29z"/>
            </svg>
        `;
        
        // Define the journey sequence
        const journeySequence = [
            'index.html',
            'intro-scene.html',
            'pressure-zone.html',
            'mini-selection.html',
            'targeting-precision.html',
            'messaging.html',
            'launch-monitoring.html',
            'ghost-nest.html',
            'dashboard.html'
        ];
        
        // Find the current page in the sequence and determine the next page
        let nextPage = 'dashboard.html'; // Default
        const currentIndex = journeySequence.indexOf(currentPage);
        
        if (currentIndex !== -1 && currentIndex < journeySequence.length - 1) {
            nextPage = journeySequence[currentIndex + 1];
        } else if (currentPage === '') {
            // If we're at the root, the next page is the first in the sequence
            nextPage = journeySequence[0];
        }
        
        // Add click event to navigate to the next page
        arrowContainer.addEventListener('click', function() {
            // Check if we're in a subdirectory (for the deployed version)
            let basePath = '';
            if (window.location.pathname.includes('/pages/')) {
                // We're in the deployed structure
                basePath = window.location.pathname.includes('index.html') ? 'pages/' : '';
            }
            
            window.location.href = basePath + nextPage;
        });
        
        // Add the arrow to the page
        document.body.appendChild(arrowContainer);
    }
    
    // Initialize the navigation arrow
    addNavigationArrow();
});

