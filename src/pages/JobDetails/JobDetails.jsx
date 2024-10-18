import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Image, Card, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUsers, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import defaultCompanyLogo from '../../assets/com.jpg'; // Default company logo

const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate(); // Hook to navigate
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [message, setMessage] = useState(''); // State to store the message
  const [cv, setCv] = useState(null); // State to store the uploaded CV

  useEffect(() => {
    const fetchJobDetails = async () => {
      const token = Cookies.get('authToken') || localStorage.getItem('authToken');

      if (!token) {
        alert('Unauthorized access. Please log in again.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/job/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        setError('Failed to load job details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleMessageSubmit = () => {
    // Submit the message and CV
    // You can implement the API request here
    alert('Application submitted!');
    handleModalClose();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job? This action cannot be undone.");
    if (!confirmDelete) return;

    const token = Cookies.get('authToken') || localStorage.getItem('authToken');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/job/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        alert('Job deleted successfully');
        navigate('/jobs');
      } else {
        alert('Error deleting the job');
      }
    } catch (error) {
      console.error('Error deleting the job:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="d-flex my-3">
            <Image 
              src={jobDetails.company_logo ? `http://127.0.0.1:8000${jobDetails.company_logo}` : defaultCompanyLogo} 
              style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '15px', border: '2px solid black' }}
            />
            <h5>{jobDetails.title}</h5>
          </div>
          <p className="text-muted">{jobDetails.industry}</p>
          <p>
            <Link to={`/company/${jobDetails.author}/profile`} style={{ color: '#2c9caf', textDecoration: 'none', fontSize: '25px', fontWeight: 'bolder' }}>
              {jobDetails.author_username}
            </Link>
          </p>
          <h5>ABOUT THE JOB</h5>
          <p className="text-muted">{jobDetails.description}</p>
          <Button variant="primary" className="me-2 w-25" onClick={handleModalOpen}>
            Apply
          </Button>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>Overview</h5>
            <p><FontAwesomeIcon icon={faCalendarAlt} /> Posted {jobDetails.posted_days_ago} days ago</p>
            <p><FontAwesomeIcon icon={faUsers} /> {jobDetails.company_size} Employees</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {jobDetails.location}</p>
          </Card>

          <div className='d-flex p-2 '>
            <button class="edit-button me-3"  onClick={() => navigate(`/job/${id}/update/`)}>
           <svg class="edit-svgIcon" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
          </button>

          <button class="delete-button"  onClick={handleDelete}>
            <svg class="delete-svgIcon" viewBox="0 0 448 512">
               <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
          </button>
        </div>


        </Col>
      </Row>

      {/* Modal for applying to the job */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply to {jobDetails.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="applicationMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here"
              />
            </Form.Group>
            <Form.Group controlId="cvUpload" className="mt-3">
              <Form.Label>Upload CV (optional)</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleMessageSubmit}>
            Submit Application
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default JobDetails;
