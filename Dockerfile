# Use an official Node.js image
FROM node:20-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN npm run build

# Use a smaller image for production
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3000

# Comando para rodar a aplicação
CMD cd "/app" &&\
  if [ "$WATCH_MODE" == "1" ];\
  then npm run watch;\
  else npm run build && npm run start; fi
