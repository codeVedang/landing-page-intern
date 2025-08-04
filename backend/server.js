const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001; // Backend will run on this port

// --- Middleware ---
app.use(cors()); // Allows the frontend to make requests to this backend
app.use(express.json()); // Allows server to accept JSON in request bodies

// --- In-Memory Database (to simulate MongoDB) ---
// In a real MERN app, you would connect to MongoDB here and use a model.
let applicants = [
  { id: 1, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Intern', reason: 'Passionate about web development and eager to learn from experienced professionals.', submittedAt: new Date('2025-07-15T10:30:00Z').toISOString() },
  { id: 2, name: 'John Smith', email: 'john.smith@example.com', role: 'Volunteer', reason: 'I want to contribute my project management skills to a good cause and help the community.', submittedAt: new Date('2025-07-16T14:00:00Z').toISOString() },
];
let currentId = 3;

// --- API Routes ---

// GET /api/applicants - Fetches all applicants
app.get('/api/applicants', (req, res) => {
  console.log('GET /api/applicants - Returning all applicants');
  // In a real app: const applicants = await ApplicantModel.find();
  res.json(applicants);
});

// POST /api/applicants - Adds a new applicant
app.post('/api/applicants', (req, res) => {
  const { name, email, role, reason } = req.body;

  if (!name || !email || !role || !reason) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newApplicant = {
    id: currentId++,
    name,
    email,
    role,
    reason,
    submittedAt: new Date().toISOString(),
  };
  
  // In a real app: await new ApplicantModel(newApplicant).save();
  applicants.push(newApplicant);
  
  console.log('POST /api/applicants - Added new applicant:', newApplicant);
  res.status(201).json(newApplicant);
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

module.exports = app;