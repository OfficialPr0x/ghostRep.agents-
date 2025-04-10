// GhostRep Nest System - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    initParticleSystem();
    
    // Initialize section navigation
    initSectionNavigation();
    
    // Initialize UI components
    initUIComponents();
    
    // Initialize Specter Mode toggle
    initSpecterMode();
    
    // Initialize form validation and preview
    initGhostBuilder();
    
    // Setup notification system
    initNotificationSystem();
    
    // Modal initialization
    initModals();
    
    // Show a welcome notification
    showNotification('Welcome to The Nest', 'Your GhostRep command center is ready.', 'info');
});

// ------- CORE FUNCTIONALITY -------

// Initialize section navigation 
function initSectionNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Remove active class from all nav items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.nest-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Add keyboard sound effect if enabled
            playUISound('nav');
        });
    });
}

// Initialize Specter Mode
function initSpecterMode() {
    const specterModeButton = document.querySelector('.toggle-specter-mode');
    
    specterModeButton.addEventListener('click', function() {
        document.body.classList.toggle('specter-mode');
        
        if (document.body.classList.contains('specter-mode')) {
            this.innerHTML = '<i class="fas fa-eye-slash"></i> Disable Specter Mode';
            showNotification('Specter Mode Enabled', 'Enhanced visibility and system monitoring activated.', 'info');
            playUISound('specter-on');
        } else {
            this.innerHTML = '<i class="fas fa-eye"></i> Specter Mode';
            showNotification('Specter Mode Disabled', 'Returning to normal interface mode.', 'info');
            playUISound('specter-off');
        }
    });
}

// Create and manage the particle system
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles-container');
    
    // Create particle elements
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size (3-8px)
    const size = 3 + Math.random() * 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random opacity
    particle.style.opacity = 0.1 + Math.random() * 0.4;
    
    // Random color (blue, purple, cyan variations)
    const colors = [
        'rgba(59, 130, 246, 0.5)',  // blue
        'rgba(139, 92, 246, 0.5)',  // purple
        'rgba(14, 165, 233, 0.5)',  // cyan
        'rgba(15, 255, 193, 0.5)'   // teal
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = `0 0 ${5 + Math.random() * 15}px ${color}`;
    
    // Animation duration and delay
    const duration = 15 + Math.random() * 30;
    const delay = Math.random() * 15;
    
    particle.style.animation = `float-particle ${duration}s ${delay}s infinite linear`;
    
    container.appendChild(particle);
    
    // Occasionally remove and recreate particles for better performance
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (duration + delay) * 1000);
}

// Initialize UI components
function initUIComponents() {
    // Obfuscated data reveal on click
    document.querySelectorAll('.obfuscated').forEach(element => {
        const originalText = element.textContent;
        
        element.addEventListener('click', function() {
            const isRevealed = this.classList.contains('revealed');
            
            if (isRevealed) {
                this.textContent = originalText;
                this.classList.remove('revealed');
            } else {
                // In a real implementation, this would fetch the actual data
                // Here we're simulating revealed content
                const fakeReveal = {
                    'John Smith': 'john.smith@example.com',
                    'fitness_coach92': '@fitness_coach92',
                    'client@example.com': 'Mark Johnson (ABC Corp)'
                };
                
                this.textContent = fakeReveal[originalText] || originalText;
                this.classList.add('revealed');
                
                // Re-hide after 5 seconds for security
                setTimeout(() => {
                    if (this.classList.contains('revealed')) {
                        this.textContent = originalText;
                        this.classList.remove('revealed');
                    }
                }, 5000);
            }
            
            playUISound('click');
        });
    });
    
    // Action buttons in the war room
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (this.classList.contains('pause-button')) {
                const miniRow = this.closest('.mini-row');
                const miniName = miniRow.querySelector('td:nth-child(2)').textContent;
                
                showNotification('MINI Paused', `${miniName} has been paused and will stop operations.`, 'warning');
                
                // In a real implementation, this would pause the MINI via API
                const statusDot = miniRow.querySelector('.status-dot');
                statusDot.className = 'status-dot idle';
                
                // Change button to play
                this.classList.remove('pause-button');
                this.classList.add('play-button');
                this.innerHTML = '<i class="fas fa-play"></i>';
                
            } else if (this.classList.contains('play-button')) {
                const miniRow = this.closest('.mini-row');
                const miniName = miniRow.querySelector('td:nth-child(2)').textContent;
                
                // Simulate deployment modal
                showDeploymentModal(miniName, 'resume');
                
                // In a real implementation, this would activate the MINI via API
                const statusDot = miniRow.querySelector('.status-dot');
                statusDot.className = 'status-dot live';
                
                // Change button to pause
                this.classList.remove('play-button');
                this.classList.add('pause-button');
                this.innerHTML = '<i class="fas fa-pause"></i>';
                
            } else if (this.classList.contains('edit-button')) {
                const miniRow = this.closest('.mini-row');
                const miniName = miniRow.querySelector('td:nth-child(2)').textContent;
                
                // Navigate to Ghost Builder with this MINI preloaded
                document.querySelector('.nav-item[data-section="ghost-builder"]').click();
                
                // In a real implementation, this would load the MINI's config
                document.getElementById('mini-name').value = miniName;
                
                showNotification('Editing MINI', `${miniName} configuration loaded for editing.`, 'info');
                
            } else if (this.classList.contains('delete-button')) {
                const miniRow = this.closest('.mini-row');
                const miniName = miniRow.querySelector('td:nth-child(2)').textContent;
                
                if (confirm(`Are you sure you want to delete ${miniName}? This action cannot be undone.`)) {
                    // In a real implementation, this would delete the MINI via API
                    miniRow.remove();
                    
                    showNotification('MINI Deleted', `${miniName} has been permanently deleted.`, 'error');
                }
            }
            
            playUISound('button');
        });
    });
    
    // Setup other clickable elements
    document.querySelectorAll('.control-button').forEach(button => {
        // Skip the specter mode button as it has its own handler
        if (!button.classList.contains('toggle-specter-mode')) {
            button.addEventListener('click', function() {
                playUISound('button');
            });
        }
    });
}

// Initialize the Ghost Builder
function initGhostBuilder() {
    // Only run if Ghost Builder section exists
    if (!document.getElementById('ghost-builder')) return;
    
    const miniNameInput = document.getElementById('mini-name');
    const platformSelect = document.getElementById('platform-select');
    const targetAudienceInput = document.getElementById('target-audience');
    const toneSlider = document.getElementById('tone-slider');
    const dailyLimitInput = document.getElementById('daily-limit');
    const initialMessageInput = document.getElementById('initial-message');
    const followUpTemplateSelect = document.getElementById('follow-up-template-select');
    const followUpMessageInput = document.getElementById('follow-up-message');
    const cooldownPeriodInput = document.getElementById('cooldown-period');
    const followUpDaysInput = document.getElementById('follow-up-days');
    const autoRespondCheckbox = document.getElementById('auto-respond');
    const calendarBookingCheckbox = document.getElementById('calendar-booking');
    const undeadModeCheckbox = document.getElementById('undead-mode');
    const templateDescription = document.getElementById('template-description');
    
    // Preview elements
    const previewIcon = document.querySelector('.preview-icon i');
    const previewName = document.querySelector('.preview-name');
    const previewBadge = document.querySelector('.preview-badge');
    const previewTargetValue = document.querySelector('.preview-item:nth-child(1) .preview-value');
    const previewDailyLimitValue = document.querySelector('.preview-item:nth-child(2) .preview-value');
    const previewFollowUpValue = document.querySelector('.preview-item:nth-child(3) .preview-value');
    const previewSampleMessage = document.querySelector('.sample-message p');
    const jsonPreview = document.querySelector('.json-preview pre code');
    
    // Default values
    const defaultName = 'LinkedIn Lead Generator';
    const defaultPlatform = 'linkedin';
    const defaultTarget = 'SaaS Founders';
    const defaultTone = 'balanced';
    const defaultDailyLimit = 100;
    const defaultFollowUpDays = 3;
    
    // Tone slider setup
    toneSlider.addEventListener('input', updateToneIndicator);
    updateToneIndicator();
    
    // Initialize follow-up templates
    if (window.GhostRepTemplates && platformSelect) {
        // Load initial templates for the default platform
        window.GhostRepTemplates.loadTemplates(platformSelect.value);
        
        // Add event listener for platform changes
        platformSelect.addEventListener('change', function() {
            window.GhostRepTemplates.loadTemplates(this.value);
        });
        
        // Add event listener for template selection
        followUpTemplateSelect.addEventListener('change', function() {
            if (this.value) {
                window.GhostRepTemplates.populateTemplate(platformSelect.value, this.value);
            }
        });
    }
    
    // Form field change handlers
    miniNameInput.addEventListener('input', updatePreview);
    platformSelect.addEventListener('change', updatePreview);
    targetAudienceInput.addEventListener('input', updatePreview);
    toneSlider.addEventListener('input', updatePreview);
    dailyLimitInput.addEventListener('input', updatePreview);
    initialMessageInput.addEventListener('input', updatePreview);
    followUpMessageInput.addEventListener('input', updatePreview);
    followUpDaysInput.addEventListener('input', updatePreview);
    
    // Checkboxes
    autoRespondCheckbox.addEventListener('change', updatePreview);
    calendarBookingCheckbox.addEventListener('change', updatePreview);
    undeadModeCheckbox.addEventListener('change', updatePreview);
    
    // Initial preview update
    updatePreview();
    
    // Form buttons
    const resetButton = document.getElementById('reset-form');
    const deployButton = document.getElementById('deploy-ghost');
    
    resetButton.addEventListener('click', function() {
        // Reset form to defaults
        miniNameInput.value = '';
        platformSelect.value = 'linkedin';
        targetAudienceInput.value = '';
        toneSlider.value = 2;
        dailyLimitInput.value = 100;
        initialMessageInput.value = 'Hi {{firstName}}, I noticed your recent post about {{topic}} and thought I\'d reach out. I\'ve been helping {{targetAudience}} with {{valueProp}} and thought you might be interested. Would you be open to a quick chat?';
        followUpMessageInput.value = 'Just following up on my previous message. I\'d love to share how we\'ve helped other {{targetAudience}} achieve {{benefit}}. Are you available for a 15-minute call this week?';
        cooldownPeriodInput.value = 24;
        followUpDaysInput.value = 3;
        autoRespondCheckbox.checked = true;
        calendarBookingCheckbox.checked = true;
        undeadModeCheckbox.checked = true;
        
        updateToneIndicator();
        updatePreview();
        
        showNotification('Form Reset', 'Ghost Builder form has been reset to default values.', 'info');
    });
    
    deployButton.addEventListener('click', function() {
        // Validate form
        if (!miniNameInput.value) {
            showNotification('Validation Error', 'Please enter a name for your MINI.', 'error');
            miniNameInput.focus();
            return;
        }
        
        if (!targetAudienceInput.value) {
            showNotification('Validation Error', 'Please enter a target audience.', 'error');
            targetAudienceInput.focus();
            return;
        }
        
        // Show deployment modal
        showDeploymentModal(miniNameInput.value, 'deploy');
    });
    
    // Helper functions
    function updateToneIndicator() {
        const value = toneSlider.value;
        let toneName;
        
        // Update tone name
        if (value == 1) {
            toneName = 'aggressive';
        } else if (value == 2) {
            toneName = 'balanced';
        } else {
            toneName = 'soft';
        }
        
        // Update preview badge
        if (previewBadge) {
            previewBadge.className = `preview-badge ${toneName}`;
            previewBadge.textContent = toneName.charAt(0).toUpperCase() + toneName.slice(1);
        }
    }
    
    function updatePreview() {
        // Get current values
        const name = miniNameInput.value || defaultName;
        const platform = platformSelect.value || defaultPlatform;
        const target = targetAudienceInput.value || defaultTarget;
        const dailyLimit = dailyLimitInput.value || defaultDailyLimit;
        const followUpDays = followUpDaysInput.value || defaultFollowUpDays;
        
        // Get tone name
        let toneName;
        if (toneSlider.value == 1) {
            toneName = 'aggressive';
        } else if (toneSlider.value == 2) {
            toneName = 'balanced';
        } else {
            toneName = 'soft';
        }
        
        // Update preview card
        if (previewName) previewName.textContent = name;
        
        // Update platform icon
        if (previewIcon) {
            const iconClass = getPlatformIcon(platform);
            previewIcon.className = iconClass;
        }
        
        // Update preview values
        if (previewTargetValue) previewTargetValue.textContent = target;
        if (previewDailyLimitValue) previewDailyLimitValue.textContent = `${dailyLimit} messages`;
        if (previewFollowUpValue) previewFollowUpValue.textContent = `After ${followUpDays} days`;
        
        // Update sample message
        if (previewSampleMessage) {
            let sampleMessage = initialMessageInput.value;
            // Replace variables with sample values
            sampleMessage = sampleMessage.replace(/{{firstName}}/g, 'John');
            sampleMessage = sampleMessage.replace(/{{topic}}/g, 'scaling SaaS companies');
            sampleMessage = sampleMessage.replace(/{{targetAudience}}/g, target);
            sampleMessage = sampleMessage.replace(/{{valueProp}}/g, 'lead generation');
            sampleMessage = sampleMessage.replace(/{{benefit}}/g, 'scale their business');
            
            previewSampleMessage.textContent = sampleMessage;
        }
        
        // Update JSON preview
        if (jsonPreview) {
            const config = {
                name: name,
                platform: platform,
                target: target,
                tone: toneName,
                dailyLimit: parseInt(dailyLimit),
                messages: {
                    initial: initialMessageInput.value.substring(0, 20) + "...",
                    followUp: followUpMessageInput.value.substring(0, 20) + "..."
                },
                settings: {
                    cooldown: parseInt(cooldownPeriodInput.value),
                    followUpDays: parseInt(followUpDays),
                    autoRespond: autoRespondCheckbox.checked,
                    calendarBooking: calendarBookingCheckbox.checked,
                    undeadMode: undeadModeCheckbox.checked
                }
            };
            
            jsonPreview.textContent = JSON.stringify(config, null, 2);
        }
    }
    
    function getPlatformIcon(platform) {
        switch (platform) {
            case 'linkedin': return 'fab fa-linkedin';
            case 'instagram': return 'fab fa-instagram';
            case 'twitter': return 'fab fa-x-twitter';
            case 'email': return 'fas fa-envelope';
            case 'reddit': return 'fab fa-reddit-alien';
            default: return 'fas fa-ghost';
        }
    }
}

// Initialize modals
function initModals() {
    // Get all modal close buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            // Find the closest modal overlay and hide it
            const modalOverlay = this.closest('.modal-overlay');
            closeModal(modalOverlay);
        });
    });
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Cancel button in deployment modal
    const cancelButton = document.querySelector('#deployment-modal .cancel-button');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            closeModal(document.getElementById('deployment-modal'));
            showNotification('Deployment Cancelled', 'The ghost deployment process has been aborted.', 'warning');
        });
    }
}

// Function to close any modal
function closeModal(modalElement) {
    if (!modalElement) return;
    
    // Animate out
    const modalContainer = modalElement.querySelector('.modal-container');
    modalContainer.style.opacity = '0';
    modalContainer.style.transform = 'translateY(20px)';
    
    // After animation, hide the modal
    setTimeout(() => {
        modalElement.classList.remove('active');
    }, 300);
    
    playUISound('modal-close');
}

// Function to show the deployment modal and simulate deployment
function showDeploymentModal(miniName, mode = 'deploy') {
    const modal = document.getElementById('deployment-modal');
    
    // Update modal title
    const modalTitle = modal.querySelector('.modal-header h3');
    modalTitle.textContent = mode === 'deploy' ? 'Deploying Ghost' : 'Resuming Ghost';
    
    // Show the modal
    modal.classList.add('active');
    
    // Animate in
    setTimeout(() => {
        const modalContainer = modal.querySelector('.modal-container');
        modalContainer.style.opacity = '1';
        modalContainer.style.transform = 'translateY(0)';
    }, 50);
    
    playUISound('modal-open');
    
    // Simulate deployment steps
    simulateDeployment(miniName, mode);
}

// Simulate deployment process
function simulateDeployment(miniName, mode) {
    const steps = document.querySelectorAll('#deployment-modal .status-step');
    const progressFill = document.querySelector('#deployment-modal .progress-fill');
    const progressText = document.querySelector('#deployment-modal .progress-text');
    
    // Reset steps
    steps.forEach(step => {
        step.classList.remove('active', 'complete');
    });
    
    // Set first step as active
    steps[0].classList.add('active');
    
    // Update progress
    progressFill.style.width = '25%';
    progressText.textContent = '25% Complete';
    
    // Play sound
    playUISound('deploy-start');
    
    // Step 1: Validating configuration
    setTimeout(() => {
        steps[0].classList.remove('active');
        steps[0].classList.add('complete');
        steps[1].classList.add('active');
        
        progressFill.style.width = '50%';
        progressText.textContent = '50% Complete';
        
        playUISound('deploy-step');
        
        // Step 2: Initializing ghost agent
        setTimeout(() => {
            steps[1].classList.remove('active');
            steps[1].classList.add('complete');
            steps[2].classList.add('active');
            
            progressFill.style.width = '75%';
            progressText.textContent = '75% Complete';
            
            playUISound('deploy-step');
            
            // Step 3: Connecting to platform API
            setTimeout(() => {
                steps[2].classList.remove('active');
                steps[2].classList.add('complete');
                steps[3].classList.add('active');
                
                progressFill.style.width = '100%';
                progressText.textContent = '100% Complete';
                
                playUISound('deploy-step');
                
                // Step 4: Activating ghost
                setTimeout(() => {
                    steps[3].classList.remove('active');
                    steps[3].classList.add('complete');
                    
                    // Close modal
                    setTimeout(() => {
                        closeModal(document.getElementById('deployment-modal'));
                        
                        // Show success notification
                        if (mode === 'deploy') {
                            showNotification('Deployment Successful', `${miniName} ghost has been successfully deployed and is now active.`, 'success');
                            
                            // Add to war room
                            addToWarRoom(miniName);
                        } else {
                            showNotification('Ghost Resumed', `${miniName} has been successfully resumed and is now active.`, 'success');
                        }
                        
                        // Add log entry
                        addLogEntry(`${miniName}`, 'Agent started - Ready to engage targets', 'info');
                        
                        playUISound('deploy-complete');
                    }, 1000);
                }, 1000);
            }, 1500);
        }, 1500);
    }, 1500);
}

// Add a new MINI to the war room table
function addToWarRoom(miniName) {
    // Only if we're on the war room page
    const warRoomSection = document.getElementById('war-room');
    if (!warRoomSection || !warRoomSection.classList.contains('active')) return;
    
    const minisTable = document.querySelector('.minis-table tbody');
    if (!minisTable) return;
    
    // Create a new row
    const newRow = document.createElement('tr');
    newRow.classList.add('mini-row');
    newRow.setAttribute('data-id', `mini-${Date.now()}`);
    
    // Set platform based on name
    let platform, icon, tone, target;
    if (miniName.toLowerCase().includes('linkedin')) {
        platform = 'LinkedIn';
        icon = 'linkedin';
        tone = 'balanced';
        target = 'SaaS Founders';
    } else if (miniName.toLowerCase().includes('instagram')) {
        platform = 'Instagram';
        icon = 'instagram';
        tone = 'aggressive';
        target = 'Fitness Coaches';
    } else if (miniName.toLowerCase().includes('email')) {
        platform = 'Email';
        icon = 'envelope';
        tone = 'soft';
        target = 'Real Estate Agents';
    } else if (miniName.toLowerCase().includes('twitter') || miniName.toLowerCase().includes('x')) {
        platform = 'Twitter/X';
        icon = 'x-twitter';
        tone = 'balanced';
        target = 'Tech Influencers';
    } else if (miniName.toLowerCase().includes('reddit')) {
        platform = 'Reddit';
        icon = 'reddit-alien';
        tone = 'balanced';
        target = 'Niche Communities';
    } else {
        platform = 'Multi-channel';
        icon = 'globe';
        tone = 'balanced';
        target = 'General Audience';
    }
    
    // Generate HTML
    newRow.innerHTML = `
        <td><span class="status-dot live"></span></td>
        <td>${miniName}</td>
        <td><i class="fab fa-${icon}"></i> ${platform}</td>
        <td>${target}</td>
        <td><span class="tone ${tone}">${tone.charAt(0).toUpperCase() + tone.slice(1)}</span></td>
        <td>
            <div class="mini-metrics">
                <div class="metric">
                    <i class="fas fa-paper-plane"></i> 0
                </div>
                <div class="metric">
                    <i class="fas fa-reply"></i> 0
                </div>
                <div class="metric">
                    <i class="fas fa-calendar-check"></i> 0
                </div>
            </div>
        </td>
        <td>
            <div class="action-buttons">
                <button class="action-button pause-button">
                    <i class="fas fa-pause"></i>
                </button>
                <button class="action-button edit-button">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-button delete-button">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </td>
    `;
    
    // Add event listeners to the action buttons
    const actionButtons = newRow.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (this.classList.contains('pause-button')) {
                const miniRow = this.closest('.mini-row');
                const miniName = miniRow.querySelector('td:nth-child(2)').textContent;
                
                showNotification('MINI Paused', `${miniName} has been paused and will stop operations.`, 'warning');
                
                // In a real implementation, this would pause the MINI via API
                const statusDot = miniRow.querySelector('.status-dot');
                statusDot.className = 'status-dot idle';
                
                // Change button to play
                this.classList.remove('pause-button');
                this.classList.add('play-button');
                this.innerHTML = '<i class="fas fa-play"></i>';
                
            } else if (this.classList.contains('play-button')) {
                const miniRow = this.closest('.mini-row');
                const miniName = miniRow.querySelector('td:nth-child(2)').textContent;
                
                // Simulate deployment modal
                showDeploymentModal(miniName, 'resume');
                
                // In a real implementation, this would activate the MINI via API
                const statusDot = miniRow.querySelector('.status-dot');
                statusDot.className = 'status-dot live';
                
                // Change button to pause
                this.classList.remove('play-button');
                this.classList.add('pause-button');
                this.innerHTML = '<i class="fas fa-pause"></i>';
                
            } else if (this.classList.contains('edit-button')) {
                const miniRow = this.closest('.mini-row');
                const miniName = miniRow.querySelector('td:nth-child(2)').textContent;
                
                // Navigate to Ghost Builder with this MINI preloaded
                document.querySelector('.nav-item[data-section="ghost-builder"]').click();
                
                // In a real implementation, this would load the MINI's config
                document.getElementById('mini-name').value = miniName;
                
                showNotification('Editing MINI', `${miniName} configuration loaded for editing.`, 'info');
                
            } else if (this.classList.contains('delete-button')) {
                const miniRow = this.closest('.mini-row');
                const miniName = miniRow.querySelector('td:nth-child(2)').textContent;
                
                if (confirm(`Are you sure you want to delete ${miniName}? This action cannot be undone.`)) {
                    // In a real implementation, this would delete the MINI via API
                    miniRow.remove();
                    
                    showNotification('MINI Deleted', `${miniName} has been permanently deleted.`, 'error');
                }
            }
            
            playUISound('button');
        });
    });
    
    // Add to table
    minisTable.appendChild(newRow);
}

// Add a log entry to the terminal
function addLogEntry(source, message, type = 'info', obfuscateData = true) {
    const terminalWindow = document.querySelector('.terminal-window');
    if (!terminalWindow) return;
    
    // Create the log entry
    const logEntry = document.createElement('div');
    logEntry.classList.add('log-entry', `${type}-log`);
    
    // Get current time
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    // Create badge based on type
    let badgeText;
    switch (type) {
        case 'dm': badgeText = 'DM'; break;
        case 'reply': badgeText = 'REPLY'; break;
        case 'error': badgeText = 'ERROR'; break;
        case 'booking': badgeText = 'BOOKING'; break;
        default: badgeText = 'INFO';
    }
    
    // Process message for obfuscation if needed
    let processedMessage = message;
    if (obfuscateData) {
        // These would be patterns to match personal data like emails, names, etc.
        // In a real implementation, this would use regex to find and obfuscate PII
        // For this demo we'll just fake it
        if (message.includes('@')) {
            processedMessage = message.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '<span class="obfuscated">$&</span>');
        }
        
        // Check for possible names (words that start with capital letters)
        processedMessage = processedMessage.replace(/\b([A-Z][a-z]+\s[A-Z][a-z]+)\b/g, '<span class="obfuscated">$1</span>');
    }
    
    // Build the log entry HTML
    logEntry.innerHTML = `
        <span class="log-time">${timeString}</span>
        <span class="log-badge ${type}">${badgeText}</span>
        <span class="log-source">${source}</span>
        <span class="log-message">${processedMessage}</span>
    `;
    
    // Add to terminal and scroll to bottom
    terminalWindow.appendChild(logEntry);
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
    
    // Add click handlers for any obfuscated data
    logEntry.querySelectorAll('.obfuscated').forEach(element => {
        const originalText = element.textContent;
        
        element.addEventListener('click', function() {
            const isRevealed = this.classList.contains('revealed');
            
            if (isRevealed) {
                this.textContent = originalText;
                this.classList.remove('revealed');
            } else {
                // Simulate revealed data
                this.classList.add('revealed');
                
                // Re-hide after 5 seconds for security
                setTimeout(() => {
                    if (this.classList.contains('revealed')) {
                        this.textContent = originalText;
                        this.classList.remove('revealed');
                    }
                }, 5000);
            }
            
            playUISound('click');
        });
    });
    
    // Play appropriate sound effect
    playUISound(`log-${type}`);
    
    // If in Specter Mode and the log is important, flash the screen
    if (document.body.classList.contains('specter-mode') && (type === 'error' || type === 'booking')) {
        const glitchOverlay = document.createElement('div');
        glitchOverlay.classList.add('glitch-overlay');
        document.body.appendChild(glitchOverlay);
        
        // Remove after animation
        setTimeout(() => {
            glitchOverlay.remove();
        }, 300);
    }
}

// Initialize notification system
function initNotificationSystem() {
    // Create container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.id = 'notification-container';
        document.body.appendChild(container);
    }
}

// Show a notification
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Icon based on type
    let icon;
    switch (type) {
        case 'success': icon = 'fa-check-circle'; break;
        case 'error': icon = 'fa-exclamation-circle'; break;
        case 'warning': icon = 'fa-exclamation-triangle'; break;
        default: icon = 'fa-info-circle';
    }
    
    // Add content
    notification.innerHTML = `
        <div class="notification-icon"><i class="fas ${icon}"></i></div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Click handler for close button
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        // Remove after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Play sound
    playUISound('notification');
    
    // Show notification with animation after a small delay to ensure proper stacking
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode === container) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            // Remove after animation
            setTimeout(() => {
                if (notification.parentNode === container) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Play UI sound effects 
function playUISound(soundType) {
    // In a real implementation, this would play actual sounds
    // For this demo, we're not implementing actual sound effects
    // but the hooks are here for you to add them later
    
    // Sound types:
    // - click: Simple UI click
    // - button: Button press
    // - nav: Navigation sound
    // - notification: Notification appears
    // - modal-open: Modal opening
    // - modal-close: Modal closing
    // - deploy-start: Deployment started
    // - deploy-step: Deployment step completed
    // - deploy-complete: Deployment completed
    // - log-info: Info log
    // - log-error: Error log
    // - log-dm: DM log
    // - log-reply: Reply log
    // - log-booking: Booking log
    // - specter-on: Specter mode activated
    // - specter-off: Specter mode deactivated
    
    // Web Audio API could be used here, but that's outside the scope of this demo
    // console.log(`Playing sound: ${soundType}`);
}

// Resurrect buttons in the graveyard
document.addEventListener('DOMContentLoaded', function() {
    // Setup resurrect buttons
    const resurrectButtons = document.querySelectorAll('.resurrect-button');
    
    resurrectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tombstone = this.closest('.ghost-tombstone');
            const ghostName = tombstone.querySelector('h3').textContent;
            
            // Show deployment modal
            showDeploymentModal(ghostName, 'resurrect');
            
            // Remove from graveyard
            tombstone.classList.add('resurrecting');
            
            // Animate removal
            setTimeout(() => {
                tombstone.remove();
                
                // Navigate to war room
                document.querySelector('.nav-item[data-section="war-room"]').click();
            }, 1000);
        });
    });
    
    // Setup Resurrect All button
    const resurrectAllButton = document.getElementById('resurrect-all');
    if (resurrectAllButton) {
        resurrectAllButton.addEventListener('click', function() {
            const tombstones = document.querySelectorAll('.ghost-tombstone');
            
            if (tombstones.length === 0) {
                showNotification('No Ghosts to Resurrect', 'The graveyard is empty.', 'info');
                return;
            }
            
            const ghostNames = [];
            tombstones.forEach(tombstone => {
                ghostNames.push(tombstone.querySelector('h3').textContent);
                tombstone.classList.add('resurrecting');
            });
            
            // Show notification
            showNotification('Mass Resurrection', `Resurrecting ${ghostNames.length} ghosts...`, 'info');
            
            // Remove all tombstones
            setTimeout(() => {
                tombstones.forEach(tombstone => tombstone.remove());
                
                // Navigate to war room
                document.querySelector('.nav-item[data-section="war-room"]').click();
                
                // Show success notification
                showNotification('Resurrection Complete', `${ghostNames.length} ghosts have been resurrected and are now active.`, 'success');
            }, 1000);
        });
    }
    
    // Setup Clear All button
    const clearGraveyardButton = document.getElementById('clear-graveyard');
    if (clearGraveyardButton) {
        clearGraveyardButton.addEventListener('click', function() {
            const tombstones = document.querySelectorAll('.ghost-tombstone');
            
            if (tombstones.length === 0) {
                showNotification('Nothing to Clear', 'The graveyard is already empty.', 'info');
                return;
            }
            
            if (confirm(`Are you sure you want to permanently delete ${tombstones.length} failed ghosts? This action cannot be undone.`)) {
                // Add fade-out animation
                tombstones.forEach(tombstone => {
                    tombstone.style.opacity = '0';
                    tombstone.style.transform = 'scale(0.8)';
                });
                
                // Remove after animation
                setTimeout(() => {
                    tombstones.forEach(tombstone => tombstone.remove());
                    
                    // Show notification
                    showNotification('Graveyard Cleared', 'All failed ghosts have been permanently deleted.', 'warning');
                }, 300);
            }
        });
    }
});

