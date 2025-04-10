const express = require('express');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();

// Export the app for potential use in other files
module.exports = { app };

// Set port - DreamHost may provide this via environment variable
const PORT = process.env.PORT || 3001;

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
