# Use an official Node runtime as a base image
FROM node:lts-alpine as base

# Set the NODE_ENV argument
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Set the work directory
WORKDIR /app

# Copy only the package files first for caching
COPY package.json .
COPY pnpm-lock.yaml .

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .
