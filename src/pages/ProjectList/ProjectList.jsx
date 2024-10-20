import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css'; // Ensure you have relevant styles
import defaultProfile from '../../assets/user.jpg'; // Default profile image

function ProjectListComponent() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [industries, setIndustries] = useState([]); // State to store unique industries
  const [error, setError] = useState(null); // State to handle fetch errors
  const navigate = useNavigate();

  // Fetch project list from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/project/all/');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setProjects(data);

        // Extract unique industries from the project data
        const uniqueIndustries = [...new Set(data.map((project) => project.industry))];
        setIndustries(uniqueIndustries);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on search term, industry, and status
  const filteredProjects = projects.filter((project) => {
    return (
      (selectedIndustry === 'All Industries' || project.industry === selectedIndustry) &&
      (selectedStatus === 'All Status' || project.post_status === selectedStatus) &&
      (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.industry.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleProjectClick = (id) => {
    // Store the project ID in localStorage
    localStorage.setItem('projectId', id);

    // Navigate to the project details page
    navigate(`/projectdetails/${id}`);
  };

  const handleCreateNewProject = () => {
    navigate('/projectpost');
  };

  return (
    <Container className="mt-5">
      {/* Display error message if fetching projects fails */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* New Project Button */}
      <div className="text-center">
        <h2 className="text-center">WE HAVE {projects.length} PROJECTS AVAILABLE</h2>
        <p className="text-center">Join us in bringing innovative projects to life!</p>
      </div>

      <Row className="mb-3 w-25">
        <Col className="text-end">
          <Button variant="primary" onClick={handleCreateNewProject} aria-label="Create a new project">
            + New Project
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Filters Section */}
        <Col md={3}>
          <Form.Group controlId="industry" className="mb-3">
            <Form.Label>Industry</Form.Label>
            <Form.Select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="All Industries">All Industries</option>
              {industries.map((industry, index) => (
                <option key={index} value={industry}>
                  {industry}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="status" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Project Listings Section */}
        <Col md={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search projects"
              aria-label="Project search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {/* Project List */}
          <Row>
            {filteredProjects.map((project) => (
              <Col md={12} key={project.id} className="mb-3">
                <Card className="d-flex flex-row align-items-center justify-content-between p-3 shadow-sm hover-effect">
                  <div className="d-flex align-items-center">
                    {/* Profile Image */}
                    <div className="me-3 text-center mt-2">
                      <img
                        src={
                          project.author_profile_image
                            ? `http://127.0.0.1:8000${project.author_profile_image}`
                            : defaultProfile // Use default image if no profile image exists
                        }
                        alt="Profile"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                        }}
                        loading="lazy" // Lazy loading for optimization
                      />
                      <p>{project.author_username || 'Unknown'}</p>
                    </div>
                    {/* Project Details */}
                    <div>
                      <Card.Title className="mb-2" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                        <a
                          href="#"
                          className="jobtitle fs-6"
                          onClick={() => handleProjectClick(project.id)}
                          style={{ textDecoration: 'none' }}
                        >
                          {project.title}
                        </a>
                      </Card.Title>
                      <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                        <span>&bull; {project.industry}</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                        <span>&bull; {project.budget} <i className="fa-solid fa-dollar-sign text-muted ps-1"></i></span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectListComponent;
