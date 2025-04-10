Collecting workspace informationFiltering to most relevant information# GhostReps Platform Specification Sheet

## Overview
GhostReps is an AI-powered platform that enables automated outreach and communication across multiple channels through configurable "ghost agents". The system provides a dashboard interface for monitoring agent performance, configuring agent behavior, and analyzing engagement metrics.

## Key Components

### Frontend
- **Dashboard UI**: Modern, dark-themed interface with metrics, charts, and agent management
- **Monaco Editor Integration**: Advanced code editor with AI-powered suggestions for configuring agents
- **Visualization**: Interactive charts for activity tracking, platform breakdown, and response rates

### Backend
- **Agent Management System**: Core system for creating, deploying, and monitoring ghost agents
- **Multi-Agent Composer**: Tools for creating complex agent workflows and interactions
- **OpenRouter Connector**: Integration with AI services for agent intelligence

## UI Elements
- **Dashboard Layout**: Split view with sidebar navigation and main content area
- **Metrics Cards**: Display key performance indicators (active agents, messages, response rate, conversions)
- **Agent Table**: List of active agents with status, metrics, and action buttons
- **Configuration Editor**: Monaco-powered code editor for JSON/JavaScript configuration
- **Charts**: Activity timeline, platform breakdown, response rate visualization

## Technical Implementation
- **Frontend Framework**: Vanilla JavaScript with modular components
- **Editor**: Monaco Editor (VS Code's editor) for agent configuration
- **Styling**: Custom CSS with CSS variables for themeing
- **Icons**: Material Design Icons (MDI)
- **Charts**: Chart.js integration for metrics visualization

## Agent Configuration
Agents are configured with JavaScript/JSON including:
- Basic settings (name, description)
- Messaging templates and timing
- AI personalization settings
- Targeting criteria (roles, industries, company size)
- Platform-specific settings

## User Flow
1. Navigate dashboard to view agent performance
2. Deploy new ghost agents via wizard or configuration
3. Monitor activity and response rates
4. View and edit agent configurations through Monaco editor
5. Analyze performance across different platforms

## Integration Points
- OpenRouter API for AI capabilities
- Email platforms for outreach
- LinkedIn integration for social outreach
- Analytics data visualization

## File Structure
Key files include:
- dashboard.html: Main dashboard interface
- monaco-integration.js: Code editor implementation
- `agent-management.js`: Agent lifecycle management
- dashboard-controller.js: Main controller connecting components
