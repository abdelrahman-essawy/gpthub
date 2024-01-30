<div align="center">
  <img src="LOGO_URL" width="200" alt="Project Logo" />
</div>

<div  align="center"><strong>Language Processing Model Platform</strong></div>

##

![Nx](https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Dependabot](https://img.shields.io/badge/dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

## Description

This project is designed to empower users in effortlessly creating and training new language processing models. Users can contribute content to train a new Language Processing Model (LPM) instance, and the platform automatically generates a dedicated room for the user, appointing them as the room manager. In these rooms, users can participate in conversations with the LPM, either in group chat or privately. Room owners have the flexibility to modify the content fed to the model and can designate room moderators for assistance. Users can also establish new rooms without initially providing content, with the option to merge or combine existing rooms into a new one.

## Core Features

- **User-Friendly LPM Creation:** Easily create new instances of language processing models.
- **Content Training:** Effortlessly scrape content from various sources and feed it to train the LPM.
- **Personalized Rooms:** Once an LPM instance is ready, the platform opens a dedicated room with the user as the room manager.
- **Interactive Conversations:** Engage in discussions with the LPM within the room, either in group chats or privately.
- **Content Control:** Room owners can modify the content being fed to the model.
- **Room Moderation:** Ability to add room moderators for assistance and management.
- **Room Creation Without Content:** Users can create new rooms without initially providing content.
- **Room Combination:** Merge or combine multiple rooms into a new one for flexible interactions.

## Architecture

The project adheres to a microservices architecture within a monorepo setup, following clean architecture principles.

## Tech Stack
### Shared
- **Repository Management:**
  - Nx for professional monorepo setup between frontend, mobile, and backend
    
- **Testing:**
  - Jest for automated unit and end-to-end tests

### Backend
- **Database:**
  - MongoDB
  - Postgres
  - Redis

- **ORMs:**
  - Mongoose
  - Prisma
 
- **Logging and Monitoring:**
  - Prometheus for logging
  - Grafana for creating dashboards to view logs and statistics

- **Authentication:**
  - Passport
  
- **Communication:**
  - gRPC for communication between backend and clients and between microservices

- **Messaging:**
  - Kafka (as a fallback queue when GRPC fails)

- **Security:**
  - Bcrypt

- **Monorepo Management:**
  - Nx for professional monorepo setup between frontend, mobile, and backend 

- **Containerization and Deployment:**
  - Docker
  - Docker Compose
  - Kubernetes
 
### Frontend

### Mobile

## Installation

