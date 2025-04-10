# GhostRep Server

A Node.js Express server to deliver the GhostRep static website with proper routing.

## Local Development

To run the server locally:

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. The site will be available at [http://localhost:3000](http://localhost:3000)

## DreamHost Deployment

### Prerequisites

- DreamHost shared hosting account with SSH access
- Node.js installed via NVM (Node Version Manager)

### Deployment Steps

1. **Upload the files to your DreamHost server**

   Use FTP, SFTP, or Git to upload all project files to your DreamHost directory.

2. **Update .htaccess file**

   Edit the `.htaccess` file to point to your actual Node.js installation:

   ```
   # Find your Node.js path by running:
   # which node
   
   # Replace this line with your actual Node.js path:
   PassengerNodejs /home/yourusername/.nvm/versions/node/vX.X.X/bin/node
   ```

3. **Install dependencies**

   SSH into your DreamHost server and run:
   ```
   cd /path/to/your/site
   npm install --production
   ```

4. **Set up environment variables**

   Update the `.env` file with your production settings.

5. **Configure DreamHost web panel**

   - Enable Passenger in your domain settings in the DreamHost panel
   - Ensure your domain points to the correct directory

6. **Restart the application**

   In some cases, you may need to restart the Passenger application:
   ```
   touch tmp/restart.txt
   ```

### Troubleshooting

- **404 Errors**: Make sure all static assets have correct paths and the server is properly routing requests.
- **Missing Dependencies**: Check if all npm packages installed correctly.
- **Permission Issues**: Ensure your files have the correct permissions (typically 644 for files, 755 for directories).

### Server Logs

Passenger logs can be found in your DreamHost account. Look for files like:
```
~/logs/yourdomainname.com/http/error.log
```

## Directory Structure

```
├── index.html          # Main entry page
├── server.js           # Express server 
├── package.json        # Dependencies
├── .env                # Environment variables
├── .htaccess           # Passenger configuration
├── dreamhost.js        # DreamHost specific setup
├── css/                # Stylesheets
├── js/                 # JavaScript files
└── pages/              # HTML page files
```

## Features

- Serves static files
- Smart routing to handle direct HTML requests
- Support for client-side routing
- Compression for improved performance
- CORS support

## License

All rights reserved.
