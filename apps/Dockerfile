# Use the base image
FROM base-image as builder

# Run any additional build steps if needed

# Create a final stage with a lightweight image
FROM node:lts-alpine as final

# Set the work directory
WORKDIR /app

# Copy only the necessary files from the base stage
COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/dist ./dist

# Expose the port your app runs on
#EXPOSE 3000

# Command to run your application
#CMD ["npx", "nx", "run", "gateway:serve:development"]
