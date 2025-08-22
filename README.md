# 🖥️ MatchInsights UI

A React-based frontend application.

## 🚀 Features

- ⚛️ Built with React and TypeScript
- 🐳 Dockerized for deployment

## 📦 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

## Build and Run with Docker

### 1. Build

```bash
docker build --build-arg VITE_API_HOST=https://api.example.com --build-arg VITE_USE_API_MOCK=1 -t myappimage .
```

### 2. Run locally with Docker

```bash
docker run -p 80:80 myappimage
```
