import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProject = () => {
  const { id } = useParams(); // Extract project ID from the URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const [project, setProject] = useState({
    title: '',
    description: '',
    industry: '',
    post_status: 'active', // Set default post status
    budget: '',
    deadline: '',
  });

  // Fetch project details when the component mounts
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/project/${id}/`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
        alert('Failed to fetch project details.'); // Notify the user of the error
      }
    };

    fetchProjectDetails();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken'); // Retrieve the token using the correct key

    if (!token) {
      alert('No authentication token found. Please login again.');
      navigate('/login'); // Redirect the user to the login page if the token is missing
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/project/${id}/update/`, project, {
        headers: {
          Authorization: `Token ${token}`, // Include the token in headers
        },
      });
      alert('Project updated successfully');
      navigate(`/projectdetails/${id}`); // Navigate to the project details page
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // Invalid or expired token
          alert('Session expired. Please login again.');
          localStorage.removeItem('authToken'); // Remove the invalid token
          navigate('/login'); // Redirect to login page
        } else {
          alert('Failed to update project: ' + (error.response?.data?.detail || 'An error occurred'));
        }
      } else {
        alert('Failed to update project: An unexpected error occurred.');
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Edit Project</h2>
      <form className="form" onSubmit={handleSubmit}>
        {/* Project Title */}
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter project title"
            value={project.title}
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
            value={project.description}
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
            value={project.industry}
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
            value={project.post_status}
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
          <label htmlFor="budget">Budget</label>
          <input
            className="form-control"
            id="budget"
            name="budget"
            placeholder="Enter budget"
            value={project.budget}
            onChange={handleChange}
            required
          />
        </div>

        {/* Deadline */}
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            className="form-control"
            id="deadline"
            name="deadline"
            type="date"
            value={project.deadline}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Update Project
        </button>
      </form>
    </Container>
  );
};

export default EditProject;
