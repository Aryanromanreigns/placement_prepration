# 🎯 PrepAI+ – Placement Preparation Platform

A full-stack placement preparation platform that helps users practice **coding questions, company interviews, communication skills, and mock interviews**.

Built to simulate real interview preparation with a clean UI and backend-driven data.

---

## 🚀 Features

### 🔐 Authentication
- Backend-powered login system
- Username & password validation
- Protected dashboard access
- Ready for JWT-based authentication

### 🏢 Company-Based Preparation
- Search companies like Amazon, Google, etc.
- View company-specific interview topics
- Understand hiring and interview process
- Backend-driven data (no hardcoding)

### 💻 Coding Practice
- Difficulty-based question filtering (Easy / Medium / Hard)
- Company-tagged coding questions
- Integrated coding workspace UI
- Problem descriptions with starter code
- Simulated test case execution

### 🎤 Communication Analysis
- Voice analysis simulation
- Detection of pauses and filler words
- Speaking speed feedback
- AI-style interview feedback

### ⚡ Turbo Interview Mode
- Timed rapid-fire interview questions
- Behavioral and technical questions
- Countdown timer
- Speaking flow simulation

### 🎨 User Interface
- Modern dark theme
- Sidebar navigation
- Responsive layout
- Toast notifications
- Smooth animations

---

## 🧱 Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- REST APIs
- JSON-based mock database
- CORS enabled

---

## 📁 Project Structure

placement_preparation/
│
├── frontend/
│ ├── index.html
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── app.js
│
└── backend/
├── server.js
├── package.json
├── routes/
│ ├── auth.routes.js
│ ├── company.routes.js
│ └── question.routes.js
├── data/
│ ├── users.js
│ ├── companies.js
│ └── questions.js
└── middleware/


---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm start
Expected output:

Backend running on http://localhost:5000
2️⃣ Frontend Setup
cd frontend
npx serve
Open in browser:

http://localhost:<port>
(Port may vary if default port is in use.)

🔑 Demo Login Credentials
Username: Aryan Kumar
Password: password123
📡 API Endpoints
Authentication
POST /api/auth/login
Company Data
GET /api/company/:companyName
Coding Questions
GET /api/questions?company=&difficulty=
Backend Base URL:

http://localhost:5000
🧪 Testing Guide
Login with valid credentials

Search for a company (e.g., Amazon)

Verify interview topics and process load correctly

Practice coding questions with filters

Test Turbo Interview mode

Check toast notifications and UI flow

🔒 Security Notes
Authentication handled by backend

No credentials stored in frontend

Ready for password hashing & JWT

CORS enabled for API security

🔮 Future Enhancements
JWT authentication

MongoDB database integration

User progress tracking

Real code execution engine

System design preparation

Resume-based interview preparation

Deployment to cloud platforms

🎯 Learning Outcomes
This project demonstrates:

Full-stack architecture

Frontend–backend integration

REST API design

State management in JavaScript

UI/UX design principles

Modular backend development

Real-world interview preparation logic

👨‍💻 Author
Aryan Kumar
Placement Preparation Platform Project
