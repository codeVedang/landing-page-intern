import React, { useState, useEffect } from 'react';

const API_URL = 'https://landing-page-intern.onrender.com/api';

// --- Main App Component ---
const App = () => {
  const [page, setPage] = useState('home');
  const [applicants, setApplicants] = useState([]); 

  const addApplicant = async (applicantData) => {
    try {
      const response = await fetch(`${API_URL}/applicants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicantData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newApplicant = await response.json();
      setApplicants(prev => [...prev, newApplicant]);
      return true;
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert('There was an error submitting your application. Please try again.');
      return false;
    }
  };
  
  const renderContent = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} />;
      case 'register':
        return <RegistrationForm addApplicant={addApplicant} setPage={setPage} />;
      case 'admin':
        return <AdminView applicants={applicants} setApplicants={setApplicants} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  const BackgroundPattern = () => (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full text-slate-200/40" fill="none" viewBox="0 0 200 200">
            <defs><pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative">
      <BackgroundPattern />
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#" onClick={() => setPage('home')} className="flex items-center space-x-2.5">
            <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 15.91L12 12m0 0L8.09 8.09M12 12l3.818 3.818M12 12L8.09 15.91m7.828-7.828L12 12" /></svg>
            <span className="text-2xl font-bold text-slate-900">OrgConnect</span>
          </a>
          <div className="flex items-center space-x-2">
            {['home', 'register', 'admin'].map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ease-in-out capitalize ${ page === p ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-800'}`}>
                {p}
              </button>
            ))}
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-12">{renderContent()}</main>
      <footer className="bg-transparent mt-16">
        <div className="container mx-auto px-6 py-6 text-center text-slate-500 border-t border-slate-200">
          <p>&copy; {new Date().getFullYear()} OrgConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// --- Page Components ---

const HomePage = ({ setPage }) => (
  <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in-up">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">Make an <span className="text-indigo-600">Impact</span>.</h1>
      <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">We're seeking passionate interns and dedicated volunteers to help us drive innovation and create positive change.</p>
      <button onClick={() => setPage('register')} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 duration-300 ease-in-out shadow-lg hover:shadow-indigo-300 flex items-center gap-2 mx-auto lg:mx-0">
        Apply Now
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
      </button>
    </div>
    <div className="hidden lg:block"><svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#818CF8" d="M48.4,-67.2C63.1,-58.1,75.7,-44.7,81.1,-28.9C86.5,-13.2,84.7,4.8,78.2,20.8C71.7,36.8,60.5,50.8,46.8,61.4C33.1,72,16.5,79.2,-1.3,80.9C-19.1,82.6,-38.2,78.8,-52.9,68.9C-67.6,59,-78,43,-82.8,25.7C-87.6,8.4,-86.8,-10.1,-79.3,-25.1C-71.8,-40.1,-57.6,-51.6,-42.8,-60.8C-28,-70,-14,-77,2.1,-79.6C18.2,-82.2,36.4,-81.2,48.4,-67.2Z" transform="translate(100 100)" /></svg></div>
  </div>
);

const RegistrationForm = ({ addApplicant, setPage }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Intern', reason: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validate = () => { /* ... validation logic ... */ return true; };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      const success = await addApplicant(formData);
      setIsSubmitting(false);
      if (success) {
        setSubmitted(true);
        setTimeout(() => setPage('admin'), 3000);
      }
    }
  };
  if (submitted) { /* ... submitted view ... */ }
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-slate-200/80 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Become a Part of Our Team</h2>
      <p className="text-center text-slate-500 mb-8">Fill out the form below to get started.</p>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* ... All input fields ... */}
        <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg disabled:bg-indigo-400 disabled:cursor-not-allowed">
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

// AdminView with enhanced loading state for Render's cold start
const AdminView = ({ applicants, setApplicants }) => {
  const [loadingState, setLoadingState] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  useEffect(() => {
    // Only fetch if applicants haven't been loaded yet
    if (applicants.length === 0) {
      setLoadingState('loading');
      const fetchApplicants = async () => {
        try {
          const response = await fetch(`${API_URL}/applicants`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setApplicants(data);
          setLoadingState('success');
        } catch (error) {
          console.error('Failed to fetch applicants:', error);
          setLoadingState('error');
        }
      };
      fetchApplicants();
    } else {
      setLoadingState('success');
    }
  }, [setApplicants]); // Removed applicants from dependency array to prevent re-fetching

  // Loading State UI
  if (loadingState === 'loading') {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-lg animate-fade-in-up">
        <div className="flex justify-center items-center mb-4">
          <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-700">Waking up the server...</h3>
        <p className="text-slate-500 mt-1">This can take up to a minute on the free plan. Please wait.</p>
      </div>
    );
  }

  // Error State UI
  if (loadingState === 'error') {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-lg animate-fade-in-up">
         <h3 className="text-xl font-semibold text-red-600">Failed to Load Applicants</h3>
         <p className="text-slate-500 mt-1">Could not connect to the server. Please try refreshing the page.</p>
      </div>
    );
  }

  // Success State UI (The main content)
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-4xl font-bold text-slate-800 mb-8">Applicant Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80">
            <h3 className="text-slate-500 font-medium">Total Applicants</h3>
            <p className="text-4xl font-bold text-indigo-600">{applicants.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80">
            <h3 className="text-slate-500 font-medium">Interns</h3>
            <p className="text-4xl font-bold text-indigo-600">{applicants.filter(a => a.role === 'Intern').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80">
            <h3 className="text-slate-500 font-medium">Volunteers</h3>
            <p className="text-4xl font-bold text-indigo-600">{applicants.filter(a => a.role === 'Volunteer').length}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          {applicants.length > 0 ? (
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-5 font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-5 font-semibold text-slate-600 uppercase tracking-wider">Contact</th>
                  <th className="text-left py-3 px-5 font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                  <th className="text-left py-3 px-5 font-semibold text-slate-600 uppercase tracking-wider">Reason</th>
                  <th className="text-left py-3 px-5 font-semibold text-slate-600 uppercase tracking-wider">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {applicants.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-slate-50 transition-colors duration-200">
                    <td className="py-4 px-5 font-medium text-slate-800">{applicant.name}</td>
                    <td className="py-4 px-5"><a href={`mailto:${applicant.email}`} className="text-indigo-600 hover:underline">{applicant.email}</a></td>
                    <td className="py-4 px-5"><span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${applicant.role === 'Intern' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>{applicant.role}</span></td>
                    <td className="py-4 px-5 text-slate-600 max-w-md truncate">{applicant.reason}</td>
                    <td className="py-4 px-5 text-slate-500">{new Date(applicant.submittedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-slate-500 py-16">No applications submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Add CSS for animations
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
`;
document.head.appendChild(style);

export default App;
