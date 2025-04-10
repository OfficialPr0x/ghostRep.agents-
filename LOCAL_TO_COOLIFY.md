# Deploying from Local Folder to Coolify

This guide will walk you through the process of deploying your local GhostRep website folder to Coolify using Docker.

## Option 1: Using Git Repository (Recommended)

### Step 1: Initialize Git Repository (if not already done)

```bash
# Navigate to your project directory
cd ~/myghostrep

# Initialize a git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit for Coolify deployment"
```

### Step 2: Create Repository on GitHub/GitLab/etc.

1. Go to GitHub.com (or your preferred Git platform)
2. Create a new repository named "myghostrep"
3. Follow the instructions to push an existing repository

```bash
# Add the remote repository
git remote add origin https://github.com/OfficialPr0x/myghostrep.git

# Push your code
git push -u origin main
```

### Step 3: Deploy on Coolify

1. Log in to Coolify (https://coolify.vibefrenz.online/)
2. Go to "Projects" and click "+"
3. Select "Docker Based" → "Dockerfile"
4. Choose your repository source type (Public or Private)
5. Enter your repository URL
6. Configure deployment settings:
   - Port: 8080
   - Environment variables (if needed)
7. Click "Deploy"

## Option 2: Direct Upload to Coolify

If you don't want to use Git, you can upload your files directly to Coolify's server:

### Step 1: Prepare Your Zip File

```bash
# Navigate to your project directory
cd ~/myghostrep

# Create a zip file
zip -r myghostrep.zip .
```

### Step 2: Upload to Coolify Server

1. Log in to your Coolify server via SSH:
   ```bash
   ssh user@your-coolify-server
   ```

2. Create a directory for your project:
   ```bash
   mkdir -p /srv/coolify/applications/myghostrep
   ```

3. Upload your zip file using SCP (from your local machine):
   ```bash
   scp myghostrep.zip user@your-coolify-server:/srv/coolify/applications/myghostrep/
   ```

4. Extract the zip file on the server:
   ```bash
   cd /srv/coolify/applications/myghostrep/
   unzip myghostrep.zip
   ```

### Step 3: Deploy on Coolify

1. Log in to Coolify web interface
2. Go to "Projects" and click "+"
3. Select "Docker Based" → "Dockerfile"
4. Choose "Private Repository (with Deploy Key)"
5. Specify the path on your server:
   ```
   /srv/coolify/applications/myghostrep
   ```
6. Configure the deployment settings
7. Click "Deploy"

## Option 3: Using Coolify CLI (Advanced)

If you have access to install the Coolify CLI:

### Step 1: Install Coolify CLI

```bash
npm install -g @coolify/cli
```

### Step 2: Login to Coolify

```bash
coolify login
```

### Step 3: Deploy Project

```bash
# Navigate to your project
cd ~/myghostrep

# Deploy using the CLI
coolify deploy
```

Follow the interactive prompts to configure your deployment.

## Troubleshooting

- **Connection Issues**: Make sure you have the correct URL and credentials for Coolify
- **Upload Errors**: Check file permissions and disk space on the Coolify server
- **Deployment Failures**: Check the Dockerfile for errors and ensure all dependencies are properly defined
- **Port Conflicts**: Ensure port 8080 is available or change to another port in your Dockerfile and Coolify configuration

## Additional Resources

- [Coolify Documentation](https://coolify.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Express.js Documentation](https://expressjs.com/)
