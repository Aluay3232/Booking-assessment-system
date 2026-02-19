FROM node:18-bullseye

WORKDIR /app

RUN apt-get update \
  && apt-get install -y python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY src ./src

ENV PORT=5000

EXPOSE 5000

CMD ["node", "src/index.js"]
