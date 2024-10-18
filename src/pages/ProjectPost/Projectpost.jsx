import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProjectPost.css';

const NewProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: '',
    post_status: 'active',
    budget: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (!formData.title || formData.title.length > 32) {
      alert('Please enter a valid project title (max 32 characters)');
      return;
    }
    if (!formData.description) {
      alert('Please enter a project description');
      return;
    }
    if (!formData.industry) {
      alert('Please select an industry');
      return;
    }
    if (!formData.deadline) {
      alert('Please select a deadline');
      return;
    }
  
    // Prepare the project data for the API request
    const projectData = { ...formData };
    console.log('Submitting project data:', projectData);
  
    try {
      // Get the authentication token from localStorage or context
      const token = localStorage.getItem('authToken');  // Assuming you're storing the token in localStorage
      console.log('Token:', token);
  
      // Make the POST request to the backend API with Token-based authentication headers
      const response = await axios.post('http://127.0.0.1:8000/api/project/create/', projectData, {
        headers: {
          'Authorization': `Token ${token}`,  // Using `Token` instead of `Bearer`
        }
      });
      console.log('Project created successfully:', response.data);
  
      // Redirect to Project List and pass the new project data
      navigate('/projects', { state: { newProject: response.data } });
    } catch (error) {
      if (error.response) {
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        console.log('Error headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };
  

  return (
    <div className="new-project-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header text-center">
          <h2>New Project</h2>
        </div>

        {/* Project Title */}
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter project title"
            value={formData.title}
            onChange={handleChange}
            maxLength="32"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter project description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        {/* Industry */}
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input 
            className="form-control"
            id="industry"
            name="industry"      
            placeholder="Enter industry"
            value={formData.industry}
            onChange={handleChange}
            maxLength="32"
            required
          />
        </div>

        {/* Post Status */}
        <div className="form-group">
          <label htmlFor="post_status">Post Status</label>
          <select
            className="form-control"
            id="post_status"
            name="post_status"
            value={formData.post_status}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        {/* Budget */}
        <div className="form-group">
          <label htmlFor="budget">Budget (Range)</label>
          <input
            type="number"
            className="form-control"
            id="budget"
            name="budget"
            placeholder="Enter budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>

        {/* Deadline */}
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            className="form-control"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Project</button>
      </form>
    </div>
  );
};

export default NewProjectForm;
