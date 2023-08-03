# One-stage version

# Stage 1: Build the React Vite app
FROM node:14

WORKDIR /app

# Copy package.json and package-lock.json or yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN npm run build

# Install a simple http server to serve the static files
RUN npm install -g serve

# Expose the port that the server will use (adjust if needed)
EXPOSE 9000

# Command to start the server
CMD ["serve", "-s", "dist", "-l", "9000"]


## Multi-stage version

# Stage 1: Build the React Vite app
# FROM node:14 as builder

# WORKDIR /app

# # Copy package.json and package-lock.json or yarn.lock
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the app's source code
# COPY . .

# # Build the app
# RUN npm run build

# Stage 2: Create a production-ready image
# FROM node:14-alpine

# WORKDIR /app

# # Copy the built files from the previous stage
# COPY --from=builder /app/build ./build

# # Install a simple http server to serve the static files
# RUN npm install -g serve

# # Expose the port that the server will use (adjust if needed)
# EXPOSE 5000

# # Command to start the server
# CMD ["serve", "-s", "build", "-l", "5000"]

