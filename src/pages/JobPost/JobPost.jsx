import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobPost.css';

const NewJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    location: '',
    jobType: '',
    industry: '',
    status: 'active',
    createdAt: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle) {
      newErrors.jobTitle = 'Job title is required.';
    } else if (formData.jobTitle.length > 32) {
      newErrors.jobTitle = 'Job title cannot exceed 32 characters.';
    }

    if (!formData.description) {
      newErrors.description = 'Job description is required.';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required.';
    }

    if (!formData.jobType) {
      newErrors.jobType = 'Please select a job type.';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setIsLoading(true);
  
    const formDataToSend = {
      title: formData.jobTitle,
      description: formData.description,
      location: formData.location,
      job_type: formData.jobType,
      industry: formData.industry,
      post_status: formData.status,
      createdAt: formData.createdAt,
    };
  
    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem('authToken'); // Ensure the token is stored in localStorage
  
      const response = await fetch('http://127.0.0.1:8000/api/job/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // Add the token to the Authorization header
        },
        body: JSON.stringify(formDataToSend),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Job created successfully:', result);
      setSuccessMessage('Job created successfully!');
      setFormData({
        jobTitle: '',
        description: '',
        location: '',
        jobType: '',
        industry: '',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      });
  
      // Redirect to job list page after creating the job
      navigate('/jobs'); // Assuming the route for job list page is '/jobs'
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create job. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="new-job-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header text-center">
          <h2>New Job Post</h2>
        </div>

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        {/* Job Title */}
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            className="form-control"
            id="jobTitle"
            name="jobTitle"
            placeholder="Enter job title"
            value={formData.jobTitle}
            onChange={handleChange}
            maxLength="32"
            required
          />
          {errors.jobTitle && (
            <small className="form-text text-danger">{errors.jobTitle}</small>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter job description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
          {errors.description && (
            <small className="form-text text-danger">{errors.description}</small>
          )}
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            className="form-control"
            id="location"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          {errors.location && (
            <small className="form-text text-danger">{errors.location}</small>
          )}
        </div>

        {/* Job Type */}
        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <select
            className="form-control"
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Job Type</option>
            <option value="part_time">Part Time</option>
            <option value="full_time">Full Time</option>
            <option value="remote">Remote</option>
          </select>
          {errors.jobType && (
            <small className="form-text text-danger">{errors.jobType}</small>
          )}
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
            required
          />
          {errors.industry && (
            <small className="form-text text-danger">{errors.industry}</small>
          )}
        </div>

        {/* Status */}
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default NewJobForm;
