# Intern/Volunteer Application Portal

A full-stack MERN application that provides a simple and clean interface for organizations to accept applications from potential interns and volunteers. It features a home page, a registration form, and an admin dashboard to view all submissions.

## 🚀 Live Demo

This project is deployed on Vercel. You can view the live application here:

**[https://your-project-name.vercel.app](https://your-project-name.vercel.app)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fyour-repo-name)

---

![Application Screenshot](https://placehold.co/800x450/6366f1/ffffff?text=Application+Preview)

## ✨ Features

* **Modern UI:** A clean, responsive, and user-friendly interface built with React and Tailwind CSS.
* **Home Page:** A welcoming landing page to introduce the organization.
* **Registration Form:** An intuitive form for applicants to submit their details, including real-time validation.
* **Admin Dashboard:** A private view to see all submitted applications in a clear, organized table with key statistics.
* **RESTful API:** A backend built with Node.js and Express that handles data persistence (simulated in-memory for this demo).

## 🚀 Tech Stack

* **Frontend:**
    * [React.js](https://reactjs.org/)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [Vite](https://vitejs.dev/)
* **Backend:**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
* **Database:**
    * In-memory array to simulate [MongoDB](https://www.mongodb.com/) for easy setup.

## 🛠️ Local Development Setup

To run this project on your local machine, you will need to have [Node.js](https://nodejs.org/en/download/) installed.

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
2. Set Up the Backend
Open a terminal window and navigate to the backend directory.

Bash

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Start the server
node server.js
The backend server will start on http://localhost:5001. Keep this terminal running.

3. Set Up the Frontend
Open a second terminal window and navigate to the frontend directory.

# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
The frontend React application will start, typically on http://localhost:5173. Open this URL in your browser to use the application.
```

📁 Project Structure
The project is organized as a monorepo with two main directories:

fullstack-app/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   └── server.js        # Express API server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx      # Main React component
│   │   └── index.css    # Tailwind CSS directives
│   ├── package.json
│   └── ...              # Other frontend files
├── .gitignore
└── README.md
