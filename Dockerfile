FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port the app runs on
EXPOSE 8080

# Command to run the app
CMD ["node", "server.js"]
