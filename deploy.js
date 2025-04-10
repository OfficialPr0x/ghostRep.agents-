#!/usr/bin/env node

/**
 * GhostRep Deployment Helper
 * 
 * This script helps prepare the application for deployment on DreamHost
 * It performs a series of checks and setup tasks to ensure smooth deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 GhostRep Deployment Helper\n');

// Check for required files
const requiredFiles = ['package.json', 'server.js', '.htaccess', '.env'];
const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(__dirname, file)));

if (missingFiles.length > 0) {
  console.error('❌ Missing required files:', missingFiles.join(', '));
  process.exit(1);
}

console.log('✅ All required files present');

// Check Node.js version
try {
  const nodeVersion = execSync('node -v').toString().trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);

  // Update .htaccess with correct Node.js path
  try {
    const nodePath = execSync('which node').toString().trim();
    console.log(`✅ Node.js path detected: ${nodePath}`);
    
    let htaccessContent = fs.readFileSync(path.join(__dirname, '.htaccess'), 'utf8');
    htaccessContent = htaccessContent.replace(
      /PassengerNodejs .+/,
      `PassengerNodejs ${nodePath}`
    );
    
    fs.writeFileSync(path.join(__dirname, '.htaccess'), htaccessContent);
    console.log('✅ Updated .htaccess with correct Node.js path');
  } catch (error) {
    console.warn('⚠️ Could not automatically update Node.js path in .htaccess');
    console.warn('⚠️ Please manually set the correct path from "which node" output');
  }
} catch (error) {
  console.warn('⚠️ Could not detect Node.js version');
}

// Create necessary directories
const dirs = ['logs', 'tmp'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created ${dir} directory`);
  }
});

// Create restart.txt in the tmp directory for passenger
const restartPath = path.join(__dirname, 'tmp', 'restart.txt');
fs.writeFileSync(restartPath, '');
console.log('✅ Created tmp/restart.txt for Passenger');

// Check package installation
try {
  if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.log('📦 Installing dependencies...');
    execSync('npm install --production', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  } else {
    console.log('✅ Dependencies already installed');
  }
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
}

// Test the server
try {
  console.log('🔍 Testing server...');
  const serverModule = require('./server');
  console.log('✅ Server loaded successfully');
} catch (error) {
  console.error('❌ Server test failed:', error.message);
}

// Final deployment instructions
console.log('\n🚀 Deployment Preparation Complete!\n');
console.log('Next steps:');
console.log('1. Upload all files to your DreamHost directory');
console.log('2. Ensure Passenger is enabled in the DreamHost panel');
console.log('3. SSH to your server and run:');
console.log('   cd /path/to/your/site && node deploy.js');
console.log('4. Visit your website to verify it\'s working');
console.log('\nIf you encounter issues, check the error logs at:');
console.log('~/logs/yourdomainname.com/http/error.log\n');

console.log('✨ Good luck with your deployment! ✨\n');
