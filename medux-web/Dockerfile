# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn

# Copy the entire project to the working directory
COPY . .

# Build the Angular project
RUN yarn build

# Expose the port on which the Angular app will run
EXPOSE 4200

# Start the Angular app
CMD ["yarn", "start:prod"]