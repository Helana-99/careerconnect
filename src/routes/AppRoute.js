import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ClientForm from '../pages/Register/ClientForm';
import CompanyForm from '../pages/Register/CompanyForm';
import AppNavbar from '../components/Navbar.jsx'; 
import Footer from '../components/Footer.jsx';  
import LandingPage from '../pages/LandingPage/LandingPage.jsx';
import Profile from '../pages/Profile/Profile.jsx'; 
import CompanyProfile from '../pages/CompanyProfile/CompanyProfile.jsx';

import JobList from '../pages/JobList/JobList.jsx';
import JobDetails from '../pages/JobDetails/JobDetails.jsx';
import ProjectDetails from '../pages/ProjectDetails/ProjectDetails.jsx';
import ProjectList from '../pages/ProjectList/ProjectList.jsx';
import ProjectPost from '../pages/ProjectPost/Projectpost.jsx';
import EditProject from '../pages/ProjectDetails/ProjectEdit.jsx'; 
import JobPost from '../pages/JobPost/JobPost.jsx';
import UpdateJob from '../pages/JobDetails/UpdateJob.jsx';
import { AuthProvider } from '../contexts/AuthContext.jsx';  // Import your AuthContext

function AppRoutes() {
  return (
    <AuthProvider> {/* Wrap the Router inside the AuthProvider */}
      <Router>
        <AppNavbar /> 
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/client" element={<ClientForm />} />
          <Route path="/register/company" element={<CompanyForm />} />
          
          {/* Profile Routes */}
          <Route path="/company/profile" element={<CompanyProfile />} />     
          <Route path="/company/:id/profile" element={<CompanyProfile />} />
  
          <Route path="/individual/profile/:id" element={<Profile />} />
          <Route path="/individual/profile" element={<Profile />} />


          

          {/* Job Routes */}
          <Route path="/jobs" element={<JobList />} />  
          <Route path="/jobpost" element={<JobPost />} />
          <Route path="/jobdetails/:id" element={<JobDetails />} />
          <Route path="/job/:id/update" element={<UpdateJob />} /> 

          {/* Project Routes */}
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projectdetails/:id" element={<ProjectDetails />} />
          <Route path="/projectpost" element={<ProjectPost />} />
          <Route path="/project/:id/update/" element={<EditProject />} />

        </Routes>
        <Footer /> 
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;
