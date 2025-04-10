# Deploying GhostRep on Coolify

This guide explains how to deploy the GhostRep website on Coolify using Docker-based deployment.

## Prerequisites

- Access to a Coolify instance (as shown at https://coolify.vibefrenz.online/)
- Your GhostRep codebase with the Docker configuration files

## Step 1: Prepare Your Repository

Ensure your repository includes these files (already created):

- `Dockerfile` - Configuration for building the Docker image
- `.dockerignore` - Files to exclude from the Docker build
- `docker-compose.yml` - Service configuration (optional, but useful for local testing)
- `server.js` - Your Express server
- `package.json` - Node.js dependencies

## Step 2: Log in to Coolify

1. Navigate to your Coolify instance
2. Log in with your credentials

## Step 3: Create a New Deployment

1. Navigate to the "Projects" section in the sidebar
2. Click the "+" button to add a new resource
3. Select "Docker Based" deployment section

## Step 4: Choose Deployment Method

From the Docker-based options shown in the screenshot, select one of the following:

### Option A: Dockerfile (Recommended)
1. Click on the "Dockerfile" option
2. This will deploy using your project's Dockerfile

### Option B: Docker Image
1. Click on the "Docker Image" option if you have a pre-built image
2. Specify the image URL from your registry

### Option C: Docker Compose
1. Click on "Docker Compose Empty" if you want to use your docker-compose.yml file

## Step 5: Configure Repository Source

1. Choose your repository source:
   - "Public Repository" for public repos
   - "Private Repository (with GitHub App)" for private GitHub repos
   - "Private Repository (with Deploy Key)" for other private repos

2. Enter your repository information or connect to GitHub

## Step 6: Configure Deployment Settings

1. Set the build and deployment configuration:
   - **Name**: GhostRep
   - **Port**: 8080 (as specified in your Dockerfile)
   - **Build Command**: Leave default (uses Dockerfile)
   - **Environment Variables**: Add any necessary environment variables

2. Configure network settings:
   - Set domain name if you have one
   - Configure SSL/TLS settings if needed

## Step 7: Deploy Your Application

1. Click "Deploy" or "Save & Deploy"
2. Coolify will pull your code, build your Docker image, and start your container

## Step 8: Monitor Deployment

1. Check the build and deployment logs
2. Verify the application is running correctly
3. Access your application via the provided URL

## Troubleshooting

- **Build Failures**: Check the build logs for errors
- **Container Crashes**: Inspect the container logs
- **Networking Issues**: Verify port configurations in Dockerfile and Coolify

## Updating Your Application

When you need to update your application:

1. Push changes to your repository
2. In Coolify, navigate to your deployment
3. Click "Redeploy" or set up auto-deployment
