# Use an official Node.js image
FROM node:20-bullseye as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && rm -rf node_modules && npm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Comando para rodar a aplicação e aplicar as migrations
CMD npx prisma migrate deploy ; npm start
