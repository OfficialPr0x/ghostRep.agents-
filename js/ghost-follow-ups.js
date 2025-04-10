// GhostRep Advanced Follow-up Message Templates
// This module enhances the Ghost Builder with sophisticated follow-up sequences

const FollowUpTemplates = {
    // Templates for different platforms and use cases
    linkedin: {
        valueAdd: {
            title: "Value-Add Follow-up",
            template: `Hi {{firstName}}, 

Just came across this article about {{topicOfInterest}} that immediately made me think of our conversation. The section about {{specificPoint}} might be particularly relevant to what you mentioned about {{painPoint}}.

No pressure to respond - just thought you'd find it valuable.

{{senderName}}`,
            description: "Shares a relevant resource without asking for anything in return"
        },
        timedInsight: {
            title: "Timed Insight Follow-up",
            template: `Hi {{firstName}},

Just a quick note - I was reviewing some data from our {{relevantProject}} yesterday, and we discovered that {{interestingDataPoint}}. 

Given your focus on {{theirFocus}}, I thought this might be valuable context for your upcoming {{upcomingEvent}}.

Let me know if you'd like more details.`,
            description: "Offers timely information that creates subtle urgency"
        },
        socialProof: {
            title: "Social Proof Follow-up",
            template: `Hi {{firstName}},

We just wrapped up a project with {{knownCompanyInTheirIndustry}} where we helped them {{accomplishment}} resulting in {{impressiveMetric}}.

I noticed from your recent post about {{theirChallenge}} that you might be tackling similar obstacles. Happy to share how we approached it if helpful.`,
            description: "Leverages success with similar companies without direct selling"
        }
    },
    email: {
        scarcity: {
            title: "Scarcity-Based Follow-up",
            template: `Subject: Quick update re: {{topic}}

Hi {{firstName}},

Just wanted to give you a heads-up that we're opening our {{offerName}} to just 5 companies in {{industry}} this quarter.

Given our conversation about {{painPoint}}, I thought you might want to know before we finalize selections next week.

No pressure at all - just didn't want you to miss the window if it's still relevant.

Best,
{{senderName}}`,
            description: "Creates natural scarcity without being pushy"
        },
        questionBased: {
            title: "Question-Based Follow-up",
            template: `Subject: Question about your approach to {{topic}}

Hi {{firstName}},

I've been thinking about what you mentioned regarding {{previousTopic}} and had a quick question:

Have you considered {{alternativeApproach}} as a way to address {{specificChallenge}}?

We've seen several companies in {{industry}} have success with this recently, and it made me think of your situation.

Curious to hear your thoughts when you have a moment.

Regards,
{{senderName}}`,
            description: "Uses a thoughtful question to restart the conversation"
        },
        caseStudy: {
            title: "Case Study Follow-up",
            template: `Subject: Case study I thought you'd find interesting

Hi {{firstName}},

Hope you're doing well. I just wanted to share this quick case study about how {{similarCompany}} overcame their {{challenge}} and achieved {{result}}.

I remembered our conversation about {{relatedTopic}} and thought the section about {{specificDetail}} might give you some ideas for your own approach.

It's a 3-minute read, no strings attached: {{linkPlaceholder}}

Thought you might find it valuable.

Best,
{{senderName}}`,
            description: "Provides valuable industry insights through relevant case study"
        }
    },
    instagram: {
        engagementBased: {
            title: "Engagement-Based Follow-up",
            template: `Hey {{firstName}} 👋

I noticed you engaged with the content on {{topic}} – thought you might like to check out this exclusive resource we just created: {{resourceName}}.

It covers the {{specificBenefit}} you mentioned you were looking for.

Let me know if this helps!`,
            description: "Responds to specific user engagement behaviors"
        },
        communityInvitation: {
            title: "Community Invitation Follow-up",
            template: `Hey {{firstName}}!

Just wanted to let you know we're hosting a private session on {{topic}} for a small group next {{day}} at {{time}}.

Given your interest in {{relatedInterest}}, I thought you might want to join. Only sharing with a few people who I think would add valuable perspective.

Let me know if you'd like the details!`,
            description: "Offers exclusive access to community-based value"
        }
    },
    twitter: {
        trendJacking: {
            title: "Trend-Jacking Follow-up",
            template: `Saw your thoughts on the {{currentTrend}} conversation happening today.

I just published some data that adds context to what you were saying about {{specificPoint}}.

Might be worth adding to your thread if it's helpful: {{linkPlaceholder}}`,
            description: "Connects with the prospect around current industry trends"
        },
        contentExpansion: {
            title: "Content Expansion Follow-up",
            template: `Your thread on {{threadTopic}} was fantastic.

We actually explored the {{specificAngle}} you mentioned in a recent analysis and found that {{interestingFinding}}.

Thought this might add some interesting depth to your perspective. Happy to share more context if useful.`,
            description: "Expands on prospect's existing content in a valuable way"
        }
    }
};

// Integration functions for Ghost Builder
function loadFollowUpTemplates(platform) {
    // Get templates for the selected platform
    const templates = FollowUpTemplates[platform] || FollowUpTemplates.email;
    
    // Clear existing template options
    const templateSelect = document.getElementById('follow-up-template-select');
    if (!templateSelect) return;
    
    templateSelect.innerHTML = '<option value="">Select a template type...</option>';
    
    // Add template options
    for (const [key, template] of Object.entries(templates)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = template.title;
        templateSelect.appendChild(option);
    }
}

function populateSelectedTemplate(platform, templateKey) {
    // Get the selected template
    const templates = FollowUpTemplates[platform] || FollowUpTemplates.email;
    const template = templates[templateKey];
    
    if (!template) return;
    
    // Set template in the text area
    const followUpMessageInput = document.getElementById('follow-up-message');
    if (followUpMessageInput) {
        followUpMessageInput.value = template.template;
    }
    
    // Show template description
    const templateDescription = document.getElementById('template-description');
    if (templateDescription) {
        templateDescription.textContent = template.description;
        templateDescription.style.display = 'block';
    }
}

// Add these templates to window for access from other scripts
window.GhostRepTemplates = {
    followUps: FollowUpTemplates,
    loadTemplates: loadFollowUpTemplates,
    populateTemplate: populateSelectedTemplate
};

