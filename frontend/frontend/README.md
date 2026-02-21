# MERN Stack Real-time Chat Application

A simple, clean real-time chat application built with MongoDB, Express, React, and Node.js using Socket.io for real-time communication.

## Features

- User registration and login
- Real-time messaging
- Message persistence
- Typing indicators
- Clean, responsive UI
- Global chat room

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone and Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and add your configuration
cp .env.example .env
# Edit .env with your settings

# Start the backend server
npm run dev