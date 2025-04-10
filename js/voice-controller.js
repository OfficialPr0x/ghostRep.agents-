/**
 * GhostRep Ultra-Realistic Voice Controller
 * Manages human-like voice narration across all scenes with enhanced realism
 * Features:
 * - Scene-based narration that stops and starts with page transitions
 * - Ultra-realistic voice settings for more natural sound
 * - Conversational narration scripts with natural speech patterns
 * - Proper audio state management during navigation
 */

class VoiceController {
    constructor() {
        console.log('Initializing Enhanced Voice Controller');
        
        // Ultra-realistic voice settings
        this.voiceSettings = {
            rate: 0.85,     // Slower rate for more natural human rhythm
            pitch: 1.0,     // Natural pitch
            volume: 1.0,    // Full volume
            voice: null,    // Will be set to most human-like voice available
        };

        // More conversational, human-like narration scripts
        this.narrationScripts = {
            'index.html': "Hey there! Welcome to GhostRep. Stick with me through this journey, and I'll give you access to our Starter Pack worth $139.99 — completely free.",
            
            'intro-scene.html': "This is where your journey begins — the Ghost Chamber. Think of it as mission control for your digital outreach team. From here, you'll deploy AI agents that work while you sleep. No more late nights sending messages that never get replies.",
            
            'pressure-zone.html': "Let's be honest. You're spending hours each day on outreach that's going nowhere. Crafting messages, following up, checking responses... for what? Maybe one meeting? Your time is too valuable for that. Your GhostRep agents take over the tedious work so you can focus on closing deals.",
            
            'mini-selection.html': "Here's where it gets interesting. Each of these digital ghosts has unique abilities. Some are conversation starters, others are follow-up specialists. Choose the ones that match your business needs. They'll become your 24/7 outreach team.",
            
            'targeting-precision.html': "Precision is everything in outreach. Set your targeting parameters once, and your ghosts will find exactly the right prospects to engage with. No more spray-and-pray approaches that waste your time and damage your reputation.",
            
            'messaging.html': "Words matter. Your ghosts will use these messaging templates to engage prospects in natural, compelling conversations. The best part? They learn what works and improve over time. It's like having a sales team that gets better every day without training.",
            
            'launch-monitoring.html': "Once your ghosts are deployed, you can track everything from this dashboard. See who they're talking to, what responses they're getting, and which conversations are ready for you to step in and close. Full visibility with none of the grunt work.",
            
            'ghost-nest.html': "Congratulations! Your GhostRep system is ready for action. Your digital workforce will operate around the clock, ensuring your business never misses an opportunity. While you're sleeping, they're connecting. While you're closing deals, they're finding the next one."
        };

        // Track playback state
        this.isPlaying = false;
        this.currentPage = this.getPageName();
        this.utterance = null;
        this.synth = window.speechSynthesis;
        
        // Initialize and start speaking
        this.init();
    }

    init() {
        console.log('Voice Controller Initializing for: ' + this.currentPage);
        
        // First, stop any existing speech synthesis that might be running
        this.stopAllSpeech();
        
        // Load the best voice available
        this.loadOptimalVoice(() => {
            console.log('Voice loaded, speaking narration');
            this.speakPageNarration();
        });
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.pause();
            } else if (document.visibilityState === 'visible') {
                if (this.isPlaying) {
                    this.resume();
                }
            }
        });
        
        // Handle page transitions to ensure speech stops when leaving the page
        this.setupPageTransitionHandling();
    }
    
    setupPageTransitionHandling() {
        // Stop speech when navigating away from the page
        window.addEventListener('beforeunload', () => {
            console.log('Page unloading, stopping speech');
            this.stopAllSpeech();
        });
        
        // Handle clicks on navigation links
        document.addEventListener('click', (event) => {
            const isLink = event.target.tagName === 'A' || 
                           event.target.closest('a') ||
                           event.target.classList.contains('cta-button');
            
            if (isLink) {
                console.log('Navigation link clicked, stopping speech');
                this.stopAllSpeech();
            }
        });
    }
    
    stopAllSpeech() {
        // Force cancel all speech synthesis
        if (window.speechSynthesis) {
            console.log('Stopping all speech synthesis');
            window.speechSynthesis.cancel();
            this.isPlaying = false;
        }
    }
    
    getPageName() {
        const path = window.location.pathname;
        let pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        
        // Fix for root index
        if (pageName === '' || pageName === '/') {
            pageName = 'index.html';
        }
        
        console.log('Current page detected as: ' + pageName);
        return pageName;
    }
    
    loadOptimalVoice(callback) {
        // Get available voices
        let voices = this.synth.getVoices();
        
        if (voices.length === 0) {
            // Voices might not be loaded yet
            this.synth.onvoiceschanged = () => {
                voices = this.synth.getVoices();
                this.selectMostHumanVoice(voices);
                if (callback) callback();
            };
        } else {
            this.selectMostHumanVoice(voices);
            if (callback) callback();
        }
    }
    
    selectMostHumanVoice(voices) {
        // Log available voices for debugging
        console.log('Available voices: ', voices.map(v => v.name).join(', '));
        
        // Prioritized list for selecting the most human-like voices
        const voicePriorities = [
            // Premium voices with lifelike qualities
            { name: 'Premium', lang: 'en' },
            { name: 'Enhanced', lang: 'en' },
            { name: 'Natural', lang: 'en' },
            { name: 'Neural', lang: 'en' },
            
            // Specific high-quality voices by name
            { name: 'Samantha', lang: 'en-US' },  // macOS/iOS premium voice
            { name: 'Daniel', lang: 'en-GB' },    // macOS/iOS premium voice
            { name: 'Karen', lang: 'en-AU' },     // macOS/iOS premium voice
            { name: 'Moira', lang: 'en-IE' },     // macOS/iOS premium voice
            { name: 'Aaron', lang: 'en-US' },     // macOS/iOS premium voice
            { name: 'Alex', lang: 'en-US' },      // macOS/iOS premium voice
            
            // Microsoft and Google neural voices
            { name: 'Microsoft Aria', lang: 'en-US' },
            { name: 'Microsoft Guy', lang: 'en-US' },
            { name: 'Google UK English Female', lang: 'en-GB' },
            { name: 'Google US English', lang: 'en-US' },
            
            // Then any English female voice (often perceived as more natural)
            { gender: 'female', lang: 'en-US' },
            { gender: 'female', lang: 'en-GB' },
            { gender: 'female', lang: 'en' },
            
            // Then any English voice
            { lang: 'en-US' },
            { lang: 'en-GB' },
            { lang: 'en' }
        ];
        
        // Try to find a voice matching our priorities
        for (const priority of voicePriorities) {
            let matchedVoice = null;
            
            // Check for name-based priorities (exact or containing)
            if (priority.name) {
                matchedVoice = voices.find(voice => {
                    const voiceName = voice.name.toLowerCase();
                    const priorityName = priority.name.toLowerCase();
                    
                    return (
                        voiceName.includes(priorityName) && 
                        (!priority.lang || voice.lang.includes(priority.lang.split('-')[0]))
                    );
                });
            } 
            // Check for gender-based priorities
            else if (priority.gender) {
                matchedVoice = voices.find(voice => 
                    voice.gender === priority.gender && 
                    voice.lang.includes(priority.lang.split('-')[0])
                );
            } 
            // Check for language-based priorities
            else if (priority.lang) {
                matchedVoice = voices.find(voice => 
                    voice.lang.includes(priority.lang)
                );
            }
            
            if (matchedVoice) {
                this.voiceSettings.voice = matchedVoice;
                console.log(`Selected voice: ${matchedVoice.name} (${matchedVoice.lang})`);
                return;
            }
        }
        
        // Fallback to first available voice if no matches
        if (voices.length > 0) {
            this.voiceSettings.voice = voices[0];
            console.log(`Fallback voice: ${voices[0].name}`);
        }
    }
    
    speakPageNarration() {
        const text = this.narrationScripts[this.currentPage];
        if (!text) {
            console.warn(`No narration found for page: ${this.currentPage}`);
            return;
        }
        
        // Apply human-like enhancements to the text
        const enhancedText = this.enhanceVoiceRealism(text);
        console.log(`Speaking enhanced text for ${this.currentPage}`, enhancedText);
        
        this.speak(enhancedText);
    }
    
    speak(text) {
        // Cancel any ongoing speech first
        this.stop();
        
        // Create a new utterance with the enhanced text
        this.utterance = new SpeechSynthesisUtterance(text);
        
        // Apply ultra-realistic voice settings
        this.utterance.rate = this.voiceSettings.rate;
        this.utterance.pitch = this.voiceSettings.pitch;
        this.utterance.volume = this.voiceSettings.volume;
        
        // Set the selected voice if available
        if (this.voiceSettings.voice) {
            this.utterance.voice = this.voiceSettings.voice;
            console.log(`Using voice: ${this.voiceSettings.voice.name}`);
        } else {
            console.warn('No premium voice available, using default');
        }
        
        // Add event listeners to track speech state
        this.utterance.onstart = () => {
            this.isPlaying = true;
            console.log('Voice narration started');
        };
        
        this.utterance.onend = () => {
            this.isPlaying = false;
            console.log('Voice narration ended naturally');
        };
        
        this.utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            this.isPlaying = false;
        };
        
        // Start speaking
        this.synth.speak(this.utterance);
    }
    
    pause() {
        if (this.isPlaying && this.synth) {
            console.log('Pausing speech');
            this.synth.pause();
        }
    }
    
    resume() {
        if (this.synth && this.synth.paused) {
            console.log('Resuming speech');
            this.synth.resume();
        }
    }
    
    stop() {
        if (this.synth) {
            console.log('Stopping speech');
            this.synth.cancel();
            this.isPlaying = false;
        }
    }
    
    // Enhanced text processing for ultra-realistic speech patterns
    enhanceVoiceRealism(text) {
        // 1. Add natural breathing pauses
        let enhancedText = text;
        
        // Make sure sentences and clauses have proper spacing
        enhancedText = enhancedText.replace(/(\w)\.(\w)/g, '$1. $2');   // Fix periods without spaces
        enhancedText = enhancedText.replace(/(\w),(\w)/g, '$1, $2');    // Fix commas without spaces
        
        // Add subtle pauses with SSML-like syntax (works in some browsers)
        // After periods, add a longer pause
        enhancedText = enhancedText.replace(/([.!?]) /g, '$1... ');
        
        // After commas, add a shorter pause
        enhancedText = enhancedText.replace(/([,;:]) /g, '$1.. ');
        
        // 2. Add emphasis to important terms using spacing
        const keyTerms = [
            'GhostRep', 'AI', 'digital ghosts', 'never sleeps', '24/7', 
            'Starter Pack', 'automated outreach', 'free', '$139.99'
        ];
        
        keyTerms.forEach(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'gi');
            enhancedText = enhancedText.replace(regex, ' $& ');
        });
        
        // 3. Add human-like filler words and hesitations for realism
        // The browser will typically ignore excessive whitespace and render it naturally
        enhancedText = enhancedText
            .replace(/\. /g, '. ')                    // Slight pause after periods
            .replace(/\? /g, '? ')                    // Slight pause after questions
            .replace(/! /g, '! ')                     // Slight emphasis after exclamations
            .replace(/\.$/, '')                       // Remove trailing period for more natural ending
            .replace(/^/, '');                        // Clean start
        
        return enhancedText;
    }
}

// Initialize voice controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing voice controller');
    new VoiceController();
});

// When navigating between pages, ensure speech stops
window.addEventListener('beforeunload', () => {
    console.log('Page unloading, canceling all speech');
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
});
