// MINI Selection JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mini card data with detailed information for each platform
    const miniData = {
        linkedin: {
            title: "LinkedIn Closer",
            platform: "LinkedIn",
            icon: '<i class="fab fa-linkedin"></i>',
            niche: "SaaS Founders & Executives",
            tone: "Balanced",
            description: "A specialized AI agent designed to navigate the professional environment of LinkedIn, connecting with decision-makers in the SaaS industry.",
            deployTime: "72 hours",
            price: "$96",
            color: "#0077B5",
            outreachSteps: [
                "Identify and connect with relevant SaaS founders and executives",
                "Send personalized connection requests with high acceptance rates",
                "Follow up with value-first messages that don't feel salesy",
                "Qualify prospects before suggesting a call",
                "Handle objections and schedule meetings directly to your calendar"
            ],
            exampleMessage: "Hi [Name], I noticed your company's recent product launch in the [specific] space. Having worked with similar SaaS platforms facing [common challenge], I thought connecting could be valuable. No pitch, just professional networking."
        },
        instagram: {
            title: "Instagram DM Assassin",
            platform: "Instagram",
            icon: '<i class="fab fa-instagram"></i>',
            niche: "Fitness & Lifestyle Coaches",
            tone: "Aggressive",
            description: "A high-conversion Instagram DM agent that targets followers and engagers of competitor accounts to fill your coaching roster.",
            deployTime: "48 hours",
            price: "$96",
            color: "#E1306C",
            outreachSteps: [
                "Identify active commenters on competitor profiles",
                "Send pattern-interrupt DMs that stand out from typical spam",
                "Use proven psychological triggers to drive engagement",
                "Qualify leads rapidly with strategic questioning",
                "Convert qualified prospects into call bookings within 3-5 messages"
            ],
            exampleMessage: "I saw your comment on [Influencer]'s post about struggling with [specific challenge]. I help people overcome exactly that issue in 30 days without the usual [pain point]. If that sounds interesting, I have 2 questions to see if what I do could work for you."
        },
        twitter: {
            title: "X Engagement Ghost",
            platform: "X (Twitter)",
            icon: '<i class="fab fa-x-twitter"></i>',
            niche: "Tech Influencers & Creators",
            tone: "Balanced",
            description: "An X (Twitter) agent that leverages real-time conversations and trending topics to position you as a thought leader.",
            deployTime: "24 hours",
            price: "$96",
            color: "#1DA1F2",
            outreachSteps: [
                "Monitor trending topics and conversations in your niche",
                "Engage in relevant threads with insightful comments",
                "Quote tweet industry leaders with added value",
                "Move high-value connections to DMs",
                "Convert engagements to calls and partnerships"
            ],
            exampleMessage: "Your thread on [topic] was spot on. We've been solving this exact problem for [type of clients] and found that [unique insight]. Would love to share some data we've collected if you're interested."
        },
        email: {
            title: "Email Followup Pro",
            platform: "Email",
            icon: '<i class="fas fa-envelope"></i>',
            niche: "Real Estate & Financial Services",
            tone: "Soft",
            description: "A sophisticated email follow-up system that never lets a lead go cold, with perfect timing and personalization.",
            deployTime: "24 hours",
            price: "$96",
            color: "#00B2E3",
            outreachSteps: [
                "Create personalized initial contact emails",
                "Time follow-ups based on engagement metrics",
                "Vary message formats to avoid triggering spam filters",
                "Use subtle urgency and social proof",
                "Seamlessly transition from email to calendar booking"
            ],
            exampleMessage: "Following up on our conversation about [specific property/investment]. I've prepared some additional information on [relevant aspect] that might help with your decision. Would Tuesday at 3 PM work for a quick 15-minute call to discuss any questions?"
        },
        calendar: {
            title: "Calendar Filler",
            platform: "Multi-channel",
            icon: '<i class="fas fa-calendar-check"></i>',
            niche: "B2B Sales & Consulting",
            tone: "Aggressive",
            description: "An AI agent that operates across platforms to qualify leads and book them directly into your calendar.",
            deployTime: "48 hours",
            price: "$96",
            color: "#00C781",
            outreachSteps: [
                "Qualify inbound leads from multiple sources",
                "Ask targeted questions to assess fit and urgency",
                "Overcome scheduling objections",
                "Secure calendar bookings with confirmation",
                "Send pre-call preparation materials automatically"
            ],
            exampleMessage: "Based on what you've shared about [specific need], I've identified 3 key areas we should discuss. My calendar is open this Thursday at 2 PM or Friday at 11 AM. Which works better for you? (The call will be focused specifically on [value proposition])."
        },
        reddit: {
            title: "Reddit Engagement Bot",
            platform: "Reddit",
            icon: '<i class="fab fa-reddit-alien"></i>',
            niche: "Niche Communities & Startups",
            tone: "Balanced",
            description: "A Reddit-specialized agent that builds authority through valuable contributions and converts community members to clients.",
            deployTime: "72 hours",
            price: "$96",
            color: "#FF4500",
            outreachSteps: [
                "Identify relevant subreddits and monitor for support requests",
                "Provide genuinely helpful responses that showcase expertise",
                "Engage in discussions as a thought leader",
                "Transition to DMs when appropriate",
                "Convert qualified prospects to off-platform conversations"
            ],
            exampleMessage: "I noticed your post about [specific issue] in r/[subreddit]. I've helped several clients solve this exact problem. Here's what worked for them: [valuable insight]. If you'd like more details, feel free to DM me."
        }
    };

    // Get DOM elements
    const miniCards = document.querySelectorAll('.mini-card');
    const modalOverlay = document.getElementById('miniModal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');
    const deployButton = document.querySelector('.deploy-button');
    
    // Add click event listeners to all mini cards
    miniCards.forEach(card => {
        card.addEventListener('click', function() {
            const miniType = this.getAttribute('data-mini');
            openModal(miniType);
        });
    });
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        closeModalAnimation();
    });
    
    // Close modal when clicking outside the modal
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModalAnimation();
        }
    });
    
    // Handle deploy button click
    deployButton.addEventListener('click', function() {
        // In a real implementation, this would initiate the deployment process
        alert('Deployment initiated! In a real implementation, this would start the deployment process.');
        closeModalAnimation();
    });
    
    // Function to open modal with specific MINI data
    function openModal(miniType) {
        const mini = miniData[miniType];
        if (!mini) return;
        
        // Create HTML content for the modal
        let modalHTML = `
            <div class="modal-header" style="border-bottom: 2px solid ${mini.color};">
                <div class="modal-platform-icon" style="color: ${mini.color};">${mini.icon}</div>
                <h2 class="modal-title">${mini.title}</h2>
                <div class="modal-platform-badge" style="background-color: ${mini.color}20; color: ${mini.color};">${mini.platform}</div>
            </div>
            <div class="modal-description">
                <p>${mini.description}</p>
            </div>
            <div class="modal-details">
                <div class="modal-detail-item">
                    <h3>Target Audience</h3>
                    <p>${mini.niche}</p>
                </div>
                <div class="modal-detail-item">
                    <h3>Communication Style</h3>
                    <p>Tone: <span class="modal-tone" style="background-color: ${mini.color}20; color: ${mini.color};">${mini.tone}</span></p>
                </div>
                <div class="modal-detail-item">
                    <h3>Deployment Time</h3>
                    <p>${mini.deployTime}</p>
                </div>
            </div>
            <div class="modal-outreach">
                <h3>Outreach Process</h3>
                <ol class="outreach-steps">
                    ${mini.outreachSteps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
            <div class="modal-example">
                <h3>Example Message</h3>
                <div class="example-message" style="border-left: 3px solid ${mini.color};">
                    <p>${mini.exampleMessage}</p>
                </div>
            </div>
        `;
        
        // Insert HTML into modal content
        modalContent.innerHTML = modalHTML;
        
        // Add CSS for modal content
        const style = document.createElement('style');
        style.textContent = `
            .modal-header {
                display: flex;
                align-items: center;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                position: relative;
            }
            
            .modal-platform-icon {
                font-size: 1.8rem;
                margin-right: 1rem;
            }
            
            .modal-title {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 2rem;
                font-weight: 700;
                margin: 0;
                flex: 1;
            }
            
            .modal-platform-badge {
                padding: 0.3rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
            }
            
            .modal-description {
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 2rem;
                color: #d0d0e0;
            }
            
            .modal-details {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1.5rem;
                margin-bottom: 2rem;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
            }
            
            .modal-detail-item h3 {
                font-size: 1rem;
                margin-bottom: 0.5rem;
                color: #a0a0b0;
                font-weight: 600;
            }
            
            .modal-detail-item p {
                font-size: 1.1rem;
                color: white;
                font-weight: 500;
            }
            
            .modal-tone {
                padding: 0.2rem 0.75rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
            }
            
            .modal-outreach {
                margin-bottom: 2rem;
            }
            
            .modal-outreach h3, .modal-example h3 {
                font-size: 1.2rem;
                margin-bottom: 1rem;
                font-weight: 700;
            }
            
            .outreach-steps {
                padding-left: 1.5rem;
            }
            
            .outreach-steps li {
                margin-bottom: 0.8rem;
                line-height: 1.5;
                color: #d0d0e0;
            }
            
            .example-message {
                padding: 1rem 1.5rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                font-style: italic;
                color: #d0d0e0;
                line-height: 1.6;
            }
            
            @media (max-width: 768px) {
                .modal-details {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Show modal with animation
        modalOverlay.classList.add('active');
        setTimeout(() => {
            document.querySelector('.modal-container').style.opacity = '1';
            document.querySelector('.modal-container').style.transform = 'translateY(0)';
        }, 50);
    }
    
    // Function to animate modal closing
    function closeModalAnimation() {
        document.querySelector('.modal-container').style.opacity = '0';
        document.querySelector('.modal-container').style.transform = 'translateY(30px)';
        setTimeout(() => {
            modalOverlay.classList.remove('active');
        }, 300);
    }
    
    // Add subtle hover sound effect (commented out as optional per spec)
    /* 
    const miniCards = document.querySelectorAll('.mini-card');
    const hoverSound = new Audio('path/to/hover-sound.mp3');
    
    miniCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.1; // Very faint
            hoverSound.play();
        });
    });
    */
    
    // Optional: Enhance particles with random movement
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        // Add random size variation
        const size = 3 + Math.random() * 4; // Random size between 3-7px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Add random opacity
        particle.style.opacity = 0.1 + Math.random() * 0.5;
    });
    
    // Connect the "Send in the Ghosts" button from the previous page if it exists
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') === 'pressure-zone') {
        // If navigated from pressure zone, highlight the ghost animation
        const ghostAnimation = document.querySelector('.ghost-animation');
        ghostAnimation.style.filter = 'drop-shadow(0 0 40px rgba(255, 60, 80, 0.4))';
        
        setTimeout(() => {
            ghostAnimation.style.filter = '';
            ghostAnimation.style.transition = 'filter 2s ease';
        }, 2000);
    }
    
    // Update pressure-zone.js to pass the parameter when navigating
    // This would be added to the pressure-zone.js file:
    /*
    document.querySelector('.cta-button').addEventListener('click', function() {
        window.location.href = 'mini-selection.html?from=pressure-zone';
    });
    */
    
    // Connect this page to the next in the sequence
    const mainCta = document.querySelector('.cta-button');
    if (mainCta) {
        mainCta.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 800);
        });
    }
    
    // Add fade-out animation CSS
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        body.fade-out {
            animation: fade-out 0.8s forwards;
        }
    `;
    document.head.appendChild(fadeStyle);
});

