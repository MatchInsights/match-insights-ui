FROM node:20 AS builder

RUN npm install -g n && n 23.8.0
ENV PATH="/usr/local/n/versions/node/23.8.0/bin:$PATH"

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN rm -f .env

ARG VITE_API_HOST
ARG VITE_USE_API_MOCK

ENV VITE_API_HOST=$VITE_API_HOST
ENV VITE_USE_API_MOCK=$VITE_USE_API_MOCK

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
