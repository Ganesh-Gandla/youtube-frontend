Got it — you want **the entire README inside a single Markdown code block**, with **all text included inside the code block**, so you can copy–paste directly.

Here is the complete README **fully inside a code block**, in **pure `.md` format**.

---

```markdown
# 📺 YouTube Clone – Frontend (React.js)

A complete YouTube-style frontend built using **React**, **Redux Toolkit**, **Axios**, and **React Router**, designed to work with a custom backend API.  
This project includes authentication, video management, channels, comments, likes, responsive UI, and more.

---

## 🚀 Features

### 🔐 Authentication
- Login & Register (JWT-based)
- Auto-load user using token
- Protected pages
- Logout (token + redux state clear)

### 🎥 Video System
- Upload video
- Auto thumbnail display
- Watch page with:
  - Video player  
  - Likes / Dislikes  
  - Views  
  - Description  
  - Comments  
  - Suggested videos  
  - Channel summary box

### 📡 Channels
- Create channel
- Edit channel
- Channel page view
- Show channel logo, banner, subs
- Channel’s video list

### 💬 Comments
- Add comments
- Fetch username from backend
- Live update after posting

### 🎛 UI / UX Features
- Sidebar expand/collapse
- Sidebar auto-hide on mobile
- Navbar search functionality
- Responsive layout
- Smooth fade animation
- User dropdown menu
- Reusable loader

---

## 🛠️ Tech Stack

| Category | Technology |
|---------|------------|
| Frontend Library | React.js |
| State Management | Redux Toolkit |
| HTTP Client | Axios |
| Routing | React Router DOM |
| Styling | CSS |
| Icons | react-icons |
| Auth | JWT + localStorage |

---

## 📁 Project Structure

```

frontend/
│── public/
│── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── VideoGrid.jsx
│   │   ├── VideoItem.jsx
│   │   ├── CommentSection.jsx
│   │   ├── Loader.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── VideoPage.jsx
│   │   ├── ChannelPage.jsx
│   │   ├── CreateChannelPage.jsx
│   │   ├── EditChannelPage.jsx
│   │   ├── AddVideoPage.jsx
│   │
│   ├── redux/
│   │   ├── store.js
│   │   └── authSlice.js
│   │
│   ├── utils/
│   │   └── axios.js
│   │
│   ├── styles/
│   │   └── *.css
│   │
│   ├── App.jsx
│   └── index.js
│
└── package.json

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the project
```bash
git clone https://github.com/your-username/youtube-frontend.git
cd youtube-frontend
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create an `.env` file

```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4️⃣ Start the development server

```bash
npm start
```

Runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 🔗 API Integration (Axios Setup)

`src/utils/axios.js`

```js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

## 🧭 Routes Overview

| Route               | Page              | Description      |
| ------------------- | ----------------- | ---------------- |
| `/`                 | HomePage          | All videos       |
| `/login`            | LoginPage         | Login            |
| `/register`         | RegisterPage      | Create account   |
| `/video/:id`        | VideoPage         | Watch video      |
| `/channel`          | CreateChannelPage | Create channel   |
| `/channel/:id`      | ChannelPage       | View channel     |
| `/channel/edit/:id` | EditChannelPage   | Update channel   |
| `/addvideo`         | AddVideoPage      | Upload new video |

---

## 🧪 Application Flow

### ✔ Auth Flow

1. User logs in → backend returns token
2. Token stored in `localStorage`
3. Redux loads user using token
4. Protected routes redirect if not logged in

### ✔ Video Page Flow

* GET `/videos/:id` → returns video + channel
* GET `/videos` → suggested videos
* Likes/dislikes update instantly
* Comments update without reloading

### ✔ Channel Flow

* Create once per user
* Channel ID saved under user's `channels` array
* Edit name, logo, banner, description
* Show all videos uploaded by that channel

---

## 📱 Responsive Design

* Sidebar collapses on small screens
* Sidebar closes on outside click
* Search bar adapts to mobile
* Video layout switches to column on small screens
* Suggested videos shrink for smaller widths

---

## 🛡 Protected Route Example

```
{user ? <AddVideoPage /> : <Navigate to="/login" />}
```

---

## 🏗 Build for Production

```bash
npm run build
```

Deploy `/build` folder on:

* Netlify
* Vercel
* Render
* Firebase Hosting
* GitHub Pages

---

## 🤝 How to Contribute

```bash
git checkout -b feature-branch
git commit -m "Added new feature"
git push origin feature-branch
```

---