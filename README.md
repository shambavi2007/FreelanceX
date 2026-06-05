# FreelanceX – Professional Freelancer Marketplace

A full-stack MERN-based freelancing platform that connects clients with talented freelancers. FreelanceX enables businesses to post projects, hire skilled professionals, and manage freelance work efficiently, while freelancers can discover opportunities, submit proposals, and grow their careers.

## 🌟 Overview

FreelanceX is designed to simplify the hiring process by providing a secure, scalable, and user-friendly marketplace. The platform offers role-based experiences for clients and freelancers, real-time communication, secure authentication, and a professional dashboard for managing activities.

---

## Screenshots

### SignUp Page
<img width="1919" height="1034" alt="Screenshot 2026-05-05 141853" src="https://github.com/user-attachments/assets/6fc6b4ff-375c-4691-9628-c4e1ae020f31" />

### Home Page
<img width="1913" height="1034" alt="Screenshot 2026-05-05 141734" src="https://github.com/user-attachments/assets/e21fe598-5f4f-4aa8-94e2-c3c7e1ea7f19" />

### Find Work
<img width="1919" height="1029" alt="Screenshot 2026-05-05 141753" src="https://github.com/user-attachments/assets/7ee822ef-50ef-40a4-af2f-93bc8af614bf" />

## ✨ Key Features

### 🔐 Authentication & Security

* JWT-based Authentication
* Secure Password Hashing with bcrypt
* Protected Routes and API Authorization
* Role-Based Access Control (Client / Freelancer)

### 👨‍💼 Client Features

* Post and Manage Jobs
* View and Review Freelancer Proposals
* Browse Freelancer Profiles
* Hire Freelancers Directly
* Track Posted Jobs from Dashboard

### 👨‍💻 Freelancer Features

* Browse Available Jobs
* Submit Job Proposals
* Manage Profile and Skills
* Track Proposal Status
* View Earnings Dashboard

### 💬 Communication & Collaboration

* Real-Time Messaging using Socket.io
* Proposal-Based Hiring Workflow
* File Sharing Support

### 📂 File Management

* Secure File Uploads with Multer
* Cloud Storage Integration using Cloudinary
* Profile Image and Attachment Support

### 📊 Professional Dashboard

* Personalized User Dashboard
* Activity Tracking
* Job and Proposal Statistics
* Responsive and Modern UI

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### File Storage

* Multer
* Cloudinary

### Real-Time Features

* Socket.io

### Development Tools

* Git & GitHub
* Postman
* VS Code

---

## 🏗️ Project Architecture

```text
React Frontend
       │
       ▼
 Express.js API
       │
       ▼
 MongoDB Database
       │
       ▼
 Cloudinary Storage

Socket.io handles real-time messaging
```

---

## 📁 Project Structure

```text
FreelanceX/
├── client/          # React Frontend
├── server/          # Node.js Backend
├── shared/          # Shared Utilities
└── docs/            # Project Documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/FreelanceX.git
cd FreelanceX
```

### 2. Install Dependencies

```bash
npm run install-all
```

### 3. Configure Environment Variables

Create a `.env` file inside the server directory and configure:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the Application

```bash
npm run dev
```

Frontend: http://localhost:3000

Backend: http://localhost:5000

---

## 🔒 Security Features

* JWT Authentication
* Password Hashing with bcrypt
* Role-Based Authorization
* Input Validation
* Protected API Endpoints
* Secure File Upload Handling

---

## 📈 Future Enhancements

* AI-Based Job Recommendations
* Integrated Payment Gateway
* Video Interview Support
* Freelancer Rating & Review System
* Mobile Application
* Admin Dashboard
* Milestone-Based Payments
* Notification System

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository, create a feature branch, and submit a pull request.

---

## 💡 Project Vision

FreelanceX aims to create a transparent, efficient, and accessible freelancing ecosystem where clients can find the right talent and freelancers can discover meaningful opportunities without unnecessary complexity.
