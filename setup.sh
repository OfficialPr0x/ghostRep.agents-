#!/bin/bash

# GhostRep DreamHost Setup Script
echo "============================================="
echo "   GhostRep DreamHost Server Setup Script"
echo "============================================="
echo ""

# Ensure we're in the right directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"
echo "Working directory: $(pwd)"
echo ""

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js using NVM."
    exit 1
fi

NODE_VERSION=$(node -v)
NODE_PATH=$(which node)
echo "✅ Node.js $NODE_VERSION found at $NODE_PATH"
echo ""

# Update .htaccess with correct Node.js path
echo "Updating .htaccess with correct Node.js path..."
if [ -f .htaccess ]; then
    # Escape the Node.js path for sed
    ESCAPED_PATH=$(echo "$NODE_PATH" | sed 's/\//\\\//g')
    sed -i "s/PassengerNodejs .*$/PassengerNodejs $ESCAPED_PATH/" .htaccess
    echo "✅ Updated .htaccess with Node.js path: $NODE_PATH"
else
    echo "❌ .htaccess file not found. Creating it..."
    cat > .htaccess << EOL
# Enable Passenger for Node.js applications
PassengerEnabled on
PassengerAppType node
PassengerStartupFile server.js

# Use the node installation from NVM
PassengerNodejs $NODE_PATH

# Set environment to production
SetEnv NODE_ENV production
EOL
    echo "✅ Created .htaccess file"
fi
echo ""

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p tmp
echo "✅ Created tmp directory"
touch tmp/restart.txt
echo "✅ Created restart.txt for Passenger"
echo ""

# Install dependencies
echo "Installing Node.js dependencies..."
if [ -f package.json ]; then
    npm install
    echo "✅ Dependencies installed"
else
    echo "❌ package.json not found. Creating a minimal package.json..."
    cat > package.json << EOL
{
  "name": "myghostrep",
  "version": "1.0.0",
  "description": "GhostRep Website",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
EOL
    npm install
    echo "✅ Created package.json and installed dependencies"
fi
echo ""

# Check if server.js exists
if [ ! -f server.js ]; then
    echo "❌ server.js not found. Creating a basic server.js file..."
    cat > server.js << 'EOL'
const express = require('express');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();

// Set port - DreamHost may provide this via environment variable
const PORT = process.env.PORT || 8080;

// Serve static files from current directory
app.use(express.static(__dirname));

// Handle routing for HTML pages
app.get('*', (req, res) => {
  const path = req.path;
  
  // If request is for a specific file with extension that isn't HTML, let express.static handle it
  if (path.includes('.') && !path.endsWith('.html')) {
    return res.status(404).send('File not found');
  }
  
  // For root path, serve index.html
  if (path === '/') {
    return res.sendFile(__dirname + '/index.html');
  }
  
  // For paths ending with .html, try to serve that file directly
  if (path.endsWith('.html')) {
    const filePath = __dirname + path;
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
  }
  
  // For paths like /pagename, check if pages/pagename.html exists
  if (!path.includes('.')) {
    const pageName = path.replace(/^\//, '');
    const possibleHtmlFile = __dirname + '/pages/' + pageName + '.html';
    
    if (fs.existsSync(possibleHtmlFile)) {
      return res.sendFile(possibleHtmlFile);
    }
  }
  
  // Default to index.html as fallback
  res.sendFile(__dirname + '/index.html');
});

// Start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Website accessible at http://localhost:${PORT}`);
  });
}
EOL
    echo "✅ Created server.js file"
fi
echo ""

# Make the server.js file executable
chmod +x server.js
echo "✅ Made server.js executable"
echo ""

# Restart Passenger
echo "Touching restart.txt to restart Passenger..."
touch tmp/restart.txt
echo "✅ Passenger restart signal sent"
echo ""

echo "============================================="
echo "   GhostRep DreamHost Setup Complete!"
echo "============================================="
echo ""
echo "To test the server manually, run:"
echo "  node server.js"
echo ""
echo "If you're still experiencing issues, check the logs at:"
echo "  ~/logs/myghostrep.com/http/error.log"
echo ""
echo "Don't forget to enable Passenger in your DreamHost panel!"
echo "============================================="
