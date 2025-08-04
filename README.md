Intern/Volunteer Application Portal
A full-stack MERN application that provides a simple and clean interface for organizations to accept applications from potential interns and volunteers. It features a home page, a registration form, and an admin dashboard to view all submissions.

✨ Features
Modern UI: A clean, responsive, and user-friendly interface built with React and Tailwind CSS.

Home Page: A welcoming landing page to introduce the organization.

Registration Form: An intuitive form for applicants to submit their details, including real-time validation.

Admin Dashboard: A private view to see all submitted applications in a clear, organized table with key statistics.

RESTful API: A backend built with Node.js and Express that handles data persistence (simulated in-memory for this demo).

🚀 Tech Stack
Frontend:

React.js

Tailwind CSS

Vite

Backend:

Node.js

Express.js

Database:

In-memory array to simulate MongoDB for easy setup.

🛠️ Local Development Setup
To run this project on your local machine, you will need to have Node.js installed.

1. Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Set Up the Backend
Open a terminal window and navigate to the backend directory.

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

 # Vercel (Deployment on Vercel)
To deploy this MERN stack application to Vercel, you need to configure it to handle both the frontend and the backend API as a single project.

Push to GitHub: Ensure your project is pushed to a GitHub repository.

Import to Vercel: Import the repository into your Vercel account.

Configure Project Settings:

Build Command: cd frontend && npm install && npm run build

Output Directory: frontend/dist

Install Command: npm install

Root Directory: Leave as is (root of the project).

Handle API Rewrites: To make the backend API accessible, create a vercel.json file in the root directory of your project with the following content. This tells Vercel to route any requests to /api/... to your backend server file.

{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/backend/server.js"
    },
    {
      "source": "/(.*)",
      "destination": "/frontend/dist/index.html"
    }
  ]
}

Update API URL: In your frontend/src/App.jsx file, change the API_URL to use a relative path so it works in production:

// Change this:
// const API_URL = 'http://localhost:5001/api';

// To this:
const API_URL = '/api';

Deploy: Commit and push these changes. Vercel will automatically trigger a new deployment with the correct settings.
