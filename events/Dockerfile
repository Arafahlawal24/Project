# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Make port 5000 available
EXPOSE 5000

# Serve the app
CMD ["serve", "-s", "build", "-l", "5000"]
