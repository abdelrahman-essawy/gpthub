FROM node:18.15-slim AS development
RUN apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

RUN  npm i -g pnpm

COPY ./package.json .
RUN pnpm i

# COPY ./prisma .

COPY . .

# RUN pnpx prisma generate
# RUN pnpm build

# CMD ["npm", "run" ,"start:dev"]
CMD ["./bootstrap.dev.sh"]
