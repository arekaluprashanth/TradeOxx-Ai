# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app

# Copy everything
COPY . .

# Install ALL dependencies
RUN npm install

# Generate Prisma Client
RUN cd packages/database && npx prisma generate

# Build Backend
RUN npm run build --workspace=apps/backend

# Set production environment for runtime
ENV NODE_ENV production
EXPOSE 3001

# Start the backend
CMD ["npm", "run", "start:prod", "--workspace=apps/backend"]
