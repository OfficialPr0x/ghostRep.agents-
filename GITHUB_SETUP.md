# Setting Up GitHub Repository for Coolify Deployment

## Step 1: Create a New GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Repository name: `myghostrep`
4. Description (optional): "GhostRep website for Coolify deployment"
5. Set visibility: Public or Private as preferred
6. **Important:** Do NOT initialize with README, .gitignore, or license files
7. Click "Create repository"

## Step 2: Connect Your Local Repository

After creating the repository, GitHub will display commands to connect your existing repository. 
Use the following commands in your terminal:

```bash
# Make sure you're in your project directory
cd C:\Users\jaryd\OneDrive\Desktop\myghostrep

# Add the new remote
git remote add origin https://github.com/YourUsername/myghostrep.git

# Push your existing commits
git push -u origin master
```

Replace `YourUsername` with your actual GitHub username.

## Step 3: Verify the Push

Check your GitHub repository in your browser to verify that all files have been pushed successfully.

## Step 4: Deploy to Coolify

1. Log in to Coolify at https://coolify.vibefrenz.online/
2. Go to "Projects" and click "+"
3. Select "Docker Based" → "Dockerfile"
4. Choose the appropriate repository source type:
   - If you made your repo public: Select "Public Repository"
   - If you made your repo private: Select "Private Repository (with GitHub App)"
5. Enter your repository URL: `https://github.com/YourUsername/myghostrep`
6. Configure deployment settings:
   - Port: 8080
   - Other settings as needed
7. Click "Deploy"

## Troubleshooting

- **Authentication Issues**: You may need to authenticate with GitHub. Follow GitHub's prompts if you're asked for credentials.
- **Push Errors**: Make sure you have proper permissions for the repository.
- **Coolify Connection Issues**: Ensure you've properly connected Coolify to GitHub if using private repositories.
