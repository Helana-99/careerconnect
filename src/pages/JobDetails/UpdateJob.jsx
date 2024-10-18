import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    job_type: '',
    industry: '',
    status: 'active', // Set a default value
    createdAt: '',
  });

  useEffect(() => {
    const fetchJobDetails = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve using the correct key
      console.log('Token:', token); // Log the token for debugging
    
      if (!token) {
        alert('Unauthorized access. Please log in again.');
        navigate('/login');
        return;
      }
    
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/job/${id}/`, {
          headers: {
            'Authorization': `Token ${token}`, // Use the token in the header
          },
        });
        console.log('Job data:', response.data); // Log the response
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        if (error.response && error.response.status === 401) {
          alert('Unauthorized access. Please log in again.');
          navigate('/login'); // Redirect to login page if unauthorized
        } else {
          alert('Failed to fetch job details. Please try again later.');
        }
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/job/${id}/update/`, job, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`, // Ensure to send the token
        },
      });
      alert('Job updated successfully');
      navigate(`/jobdetails/${id}`); // Redirect to job details
    } catch (error) {
      console.error('Error updating job:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized access. Please log in again.');
        navigate('/login'); // Redirect to login if unauthorized
      } else {
        alert('Failed to update the job. Please try again.');
      }
    }
  };

  return (
    <Container className="mt-5">
      <h5>Edit Job</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={job.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Job Type</Form.Label>
          <Form.Control
            as="select"
            name="job_type"
            value={job.job_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Job Type</option>
            <option value="part_time">Part Time</option>
            <option value="full_time">Full Time</option>
            <option value="remote">Remote</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Industry</Form.Label>
          <Form.Control
            type="text"
            name="industry"
            value={job.industry}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={job.status}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="disabled">Disabled</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Job
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateJob;
