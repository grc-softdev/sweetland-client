# 🎂 Sweetland

**Sweetland** is a full-stack application designed to manage product registration and order flow in a bakery shop. It allows an **admin** to log in, register product **categories** (like cakes, cupcakes, sandwiches, drinks, etc.), and create products with images.

The system also integrates with a **React Native mobile app**, enabling waiters and waitresses to view registered products and send customer orders directly to the **kitchen**. The backend is built with **Node.js, Express, Prisma, and PostgreSQL** for handling data and authentication.

## 🌐 Tech Stack

- **Frontend:** React, SASS/CSS, Axios, React Router, Context API
- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Mobile:** React Native (Expo)

## ✨ Features

- Secure admin login and authentication
- Category and product management
- Photo upload for each product
- Product listing organized by category
- Mobile app integration for real-time order flow
- Kitchen receives customer selections instantly

## 🔗 Live Demo

👉 [Try Sweetland Live](https://sweetland-grcn-projects.vercel.app/)

## 🧱 Architecture

Sweetland is a modular full-stack application composed of three main parts:

| Layer       | Description                                                                |
|-------------|----------------------------------------------------------------------------|
| 🌐 Frontend | Admin dashboard to manage categories and products                          |
| 🔧 Backend  | Handles API requests, authentication, and database operations              |
| 📱 Mobile   | React Native app used by waiters to select items and send them to kitchen  |

### 📚 Related Repositories

- 📦 [Backend (Node + Express + Prisma + PostgreSQL)](../backend/README.md)
- 📱 [Mobile App (React Native)](../mobile/README.md)


<h2 id="layout">🎨 Layout</h2>

<p align="center">
    <img src="../.github/example.png" alt="Login" width="400px">
    <img src="../.github/example.png" alt="Category" width="400px">
  <img src="../.github/example.png" alt="mobile" width="400px"> 
</p>


## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/confectionery-app.git
cd confectionery-app/frontend
Install dependencies
bash

npm install
Start the development server
bash

npm run dev
```

⚠️ Note: Ensure the backend server is running and accessible.

🧾 License
This project is licensed under the MIT License.


