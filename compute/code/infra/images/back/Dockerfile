# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY ./dist ./

EXPOSE 7777

# Set the command to start the application
CMD ["node", "index.js"]
