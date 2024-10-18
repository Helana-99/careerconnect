import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCalendarAlt, faMoneyBill, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import defaultProfile from '../../assets/user.jpg'; // Default profile image

const ProjectDetails = () => {
  const { id } = useParams();  // Project ID from URL
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [author, setAuthor] = useState(null);  // Author's profile data
  const [isOwner, setIsOwner] = useState(false);  // Check if logged-in user is project owner
  const [loading, setLoading] = useState(true);  // For loading states
  const [error, setError] = useState(null);  // To capture any error

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        // Fetch project details
        const projectResponse = await axios.get(`http://127.0.0.1:8000/api/project/${id}/`);
        setProject(projectResponse.data);

        // Log the project data
        console.log('Project:', projectResponse.data);

        // Fetch author details
        const authorId = projectResponse.data.author;
        console.log('Author ID:', authorId); // Log author ID

        const authorResponse = await axios.get(`http://127.0.0.1:8000/api/individual/profile/${id}/`);
        setAuthor(authorResponse.data);

        // Check if the logged-in user is the owner of the project
        const loggedInUserId = /* Fetch the logged-in user's ID from your auth context or state */
        setIsOwner(loggedInUserId === projectResponse.data.author);
      } catch (error) {
        console.error('Error fetching project or author details:', error);
        setError('Failed to load project or author details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  // Handle delete project (you'll need to implement this function)
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/project/${id}/`);
        navigate('/projects'); // Redirect to the projects list after deletion
      } catch (error) {
        console.error("Error deleting project:", error);
        setError("Failed to delete project.");
      }
    }
  };

  // Show loading indicator
  if (loading) return <p>Loading project and author details...</p>;
  // Show error message if any
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-5">
      <Row>
        {/* Project Main Details */}
        <Col md={8}>
          <div className="project-header mb-2 d-flex align-items-center">
            {/* Author Profile Image */}
            <Image 
              src={author?.profile_image ? `http://127.0.0.1:8000${author.profile_image}` : defaultProfile} 
              alt="Profile" 
              style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '15px', border: '2px solid black' }} 
            />
          </div>

          <div>
            <p>
              <Link to={`/individual/profile/${project.author}`} 
                style={{ color: '#2c9caf', textDecoration: 'none', fontSize: '25px', fontWeight: 'bolder' }}>
                {project.author_username}
              </Link>
            </p>
          </div>

          <h5 className="mt-4">Project Details</h5>
          <p className="text-muted">{project.description}</p>

          <div className="d-flex align-items-center mb-3">
            <Button variant="primary" className="me-2 w-25">
              Contact Me
            </Button>
          </div>
        </Col>

        {/* Overview Section */}
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>Overview</h5>
            <p>
              <FontAwesomeIcon icon={faCalendarAlt} /> Created on {new Date(project.created_at).toLocaleDateString()}
            </p>
            <p>
              <FontAwesomeIcon icon={faMoneyBill} /> Budget: {project.budget}
            </p>
            <p>
              <FontAwesomeIcon icon={faClock} /> Deadline: {new Date(project.deadline).toLocaleDateString()}
            </p>
            <div className="mt-3">
              <Badge bg={project.post_status === 'active' ? 'success' : 'secondary'}>
                {project.post_status.charAt(0).toUpperCase() + project.post_status.slice(1)}
              </Badge>
            </div>
          </Card>

          {/* Edit and Delete Buttons (Visible only to the project owner) */}
          {isOwner && (
            <div className='d-flex p-2'>
              <button className="edit-button me-3" onClick={() => navigate(`/project/${id}/update/`)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="delete-button" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetails;
