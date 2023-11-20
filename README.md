<p align="center">
  <img src="LOGO_URL" width="200" alt="Project Logo" />
</p>

<p align="center">Language Processing Model Platform</p>

## Description

This project aims to empower users to effortlessly create and train new language processing models. Users can provide content to train a new LPM instance, and the platform opens a dedicated room for the user, appointing them as the room manager. In these rooms, users can engage in conversations with the LPM, either in group chat or privately. Room owners have the flexibility to modify the content fed to the model and can designate room moderators for assistance. Users can also establish new rooms without initially providing content, with the option to merge or combine existing rooms into a new one.

## Core Features

- **User-Friendly LPM Creation:** Effortlessly create new instances of language processing models.
- **Content Training:** Easily scrape content from other websites and feed it to train the LPM.
- **Personalized Rooms:** When an LPM instance is ready, the platform opens a dedicated room, with the user as the room manager.
- **Interactive Conversations:** Engage in discussions with the LPM within the room, either in group chats or privately.
- **Content Control:** Room owners can modify the content being fed to the model.
- **Room Moderation:** Ability to add room moderators for assistance and management.
- **Room Creation Without Content:** Users can create new rooms without initially providing content.
- **Room Combination:** Merge or combine multiple rooms into a new one for flexible interactions.

## Architecture

The project follows a microservices architecture in a monorepo setup, adhering to clean architecture principles.

## Tech Stack
- **Database:**
  - MongoDB
  - Postgres
  - Redis

- **ORMs:**
  - Mongoose
  - Prisma

- **Containerization:**
  - Docker
  - Docker Compose

- **Authentication:**
  - Passport

- **Messaging:**
  - Kafka

- **Security:**
  - Bcrypt

## Installation

```bash
$ git clone git@github.com:Code-Crusaders-EG/backend.git && cd ./backend && docker-compose up
