FROM node:14

# set container working directory to /app
WORKDIR /app

# Copy the package.json
COPY package.json /app/

# Copy the package-lock.json
COPY package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . /app/

# Expose port 3000 to the host
EXPOSE 3000

# Run the front end application
CMD ["npm", "start"]
