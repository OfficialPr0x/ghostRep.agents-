# DreamHost Setup Instructions

Follow these steps to set up your Node.js server on DreamHost:

## 1. Install Dependencies

SSH into your DreamHost account and run these commands:

```bash
# Go to your website directory
cd ~/myghostrep

# Install Express
npm install
```

## 2. Verify Node.js Path

Check your actual Node.js path:

```bash
which node
```

If the output is different from `/home/dh_rtrb66/.nvm/versions/node/v16.19.1/bin/node`, update the `.htaccess` file with the correct path.

## 3. Create tmp Directory for Passenger

```bash
mkdir -p ~/myghostrep/tmp
touch ~/myghostrep/tmp/restart.txt
```

## 4. Enable Passenger in DreamHost Panel

1. Log in to DreamHost Panel
2. Go to Domains → Manage Domains
3. Find your domain and click "Edit"
4. Under "Web Options", check "Passenger (Ruby/NodeJS/Python apps only)"
5. Save changes

## 5. Test the Server

You can manually start the server to test it:

```bash
node server.js
```

You should see a message that the server is running.

## 6. Restart Passenger

Touch the restart.txt file to tell Passenger to restart your application:

```bash
touch ~/myghostrep/tmp/restart.txt
```

## 7. Check Logs if Issues Persist

If you still have issues, check the error logs:

```bash
cat ~/logs/myghostrep.com/http/error.log
```

## Common Issues

### "Module not found" errors

Make sure Express is installed:

```bash
cd ~/myghostrep
npm install express
```

### Wrong Node.js version

Update the .htaccess file with your correct Node.js path.

### Passenger not recognizing your app

Ensure you have the correct directory structure and valid package.json.
