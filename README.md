
# 🗨️ Room-based Chat App

A real-time, room-based chat server built with **TypeScript** and **WebSockets**, designed to enable fast and scalable communication between clients in dedicated chat rooms. Lightweight, extensible, and perfect for integration with frontend frameworks or use in collaborative applications.

---

## 📌 Overview

This project implements a WebSocket server that handles user connections, room assignments, and scoped message broadcasting within chat rooms. Users can join any room using a unique ID and send messages visible only to others in the same room.

---

## ⚙️ Features

* ✅ Built with **TypeScript** for type safety and maintainability
* 📡 Real-time communication using the **ws** WebSocket library
* 🏘️ Room-based architecture for scoped messaging
* 🔄 Automatic user cleanup on disconnect
* 🧱 Simple, extensible codebase suitable for frontend integration

---

## 🛠️ Tech Stack

| Technology | Description                    |
| ---------- | ------------------------------ |
| TypeScript | Static typing and code clarity |
| Node.js    | Server runtime                 |
| ws         | Lightweight WebSocket library  |

---


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KrishCodesw/Room-based-ChatAPP.git
cd Room-based-ChatAPP
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Server

```bash
cd ws
npm run dev
cd ws-fe
npm run dev
```

> By default, the WebSocket server listens on `ws://localhost:8080`.

---

## 📡 WebSocket Message Format

### 🔹 Join Room

```json
{
  "type": "join",
  "payload": {
    "roomId": "room123"
  }
}
```

### 🔹 Send Message

```json
{
  "type": "chat",
  "payload": {
    "message": "Hello from room123!"
  }
}
```

---

## 🧪 Testing

You can test the WebSocket server using:

* 🔧 [Postman WebSocket Client](https://www.postman.com/)
* 🌐 [Hoppscotch.io](https://hoppscotch.io/)
* 🧑‍💻 Custom React/WebSocket frontend

Example frontend snippet:

```js
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  socket.send(JSON.stringify({
    type: "join",
    payload: { roomId: "room123" }
  }));

  socket.send(JSON.stringify({
    type: "chat",
    payload: { message: "Hello everyone!" }
  }));
};

socket.onmessage = (event) => {
  console.log("Message from server:", event.data);
};
```

---

## 📈 Future Improvements

* 🌐 Integrating timestamps
* 👥 user lists per room
* 🗃️ Message history and persistence via database
* 🔐 Authentication and secure messaging
* 📱 Audio and image messaging 

---

---

## 🙋‍♂️ Contributing

Pull requests and suggestions are welcomed ! For major changes, please open an issue first to discuss what you'd like to change.

---

