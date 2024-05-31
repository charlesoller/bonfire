# 📋 Route Planning

## 🌐 Websockets Requirement
For this project, Websockets are required. Refer to the official [Flask-SocketIO documentation](https://flask-socketio.readthedocs.io/en/latest/).

## 🌍 Base URL
All routes begin with: `/api/...`

---

## 🛠️ Servers

### 🔍 View All Publicly Created Servers
- **GET** `/servers`

### ➕ Create New Server
- **POST** `/servers`

### 📝 Update Server
- **PUT** `/servers/{id}`

### 🗑️ Delete Server
- **DELETE** `/servers/{id}`

---

## 🗂️ Channels

### 🔍 View All Public Channels in a Server
- **GET** `/servers/{server_id}/channels`

### ➕ Create New Channel in Owned Server
- **POST** `/servers/{server_id}/channels`

### 📝 Update Channel
- **PUT** `/channels/{channel_id}`

### 🗑️ Delete Channel
- **DELETE** `/channels/{channel_id}`

---

## 💬 Messages

### 🔍 View All Messages in a Channel
- **GET** `/channels/{channel_id}/messages`

### ➕ Create New Message
- **POST** `/channels/{channel_id}/messages`

### 📝 Update Message
- **PUT** `/channel_messages/{message_id}`

### 🗑️ Delete Message
- **DELETE** `/channel_messages/{message_id}`

---

## ❤️ Reactions

### 🔍 View All Reactions on a Message
- **GET** `/channel_messages/{message_id}/reactions`
- **GET** `/chat_room_messages/{message_id}/reactions`

### ➕ Add Reaction to a Message
- **POST** `/channel_messages/{message_id}/reactions`
- **POST** `/chat_room_messages/{message_id}/reactions`

### 🗑️ Remove Reaction from a Message
- **DELETE** `/reactions/{reaction_id}`

---

## 🎁 Bonus: Threads

### 🔍 View All Threads within a Channel
- **GET** `/channels/threads`

### ➕ Create a Thread off of a Message
- **POST** `/messages/{message_id}/threads`

---

## 🎁 Bonus: Direct Messages

### 🔍 View All Direct Messages between Users
- **GET** `/chat_room/{chat_room_id}/messages`

### ➕ Create New Direct Message
- **POST** `/chat_room/{chat_room_id}/messages`

### 📝 Update Direct Message
- **PUT** `/chat_room_messages/{message_id}`

### 🗑️ Delete Direct Message
- **DELETE** `/chat_room_messages/{message_id}`
