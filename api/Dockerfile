# Use an official Node runtime as a parent image
FROM node

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install --force

# Bundle app source
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3500

# Run the app when the container launches
CMD ["npm", "start"]
