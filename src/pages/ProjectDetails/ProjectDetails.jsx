// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Button, Badge, Card, Modal, Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faCalendarAlt, faMoneyBill, faClock } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// const ProjectDetails = () => {
//   const { id } = useParams(); // Project ID from URL
//   const navigate = useNavigate();
//   const [project, setProject] = useState(null);
//   const [isOwner, setIsOwner] = useState(false);  // Check if logged-in user is project owner
//   const [showModal, setShowModal] = useState(false);  // Modal state
//   const [message, setMessage] = useState('');  // Message state
//   const [cv, setCv] = useState(null);  // CV file state
//   const [individualId, setIndividualId] = useState(null);  // Store individual ID
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/project/${id}/`);
//         setProject(response.data);

//         // Check if the current user is the project author
//         const userResponse = await axios.get(`http://127.0.0.1:8000/api/profile/`, {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });

//         if (response.data.author === userResponse.data.id) {
//           setIsOwner(true);
//         }

//         // Set individual ID for the application
//         setIndividualId(userResponse.data.id);
//       } catch (error) {
//         console.error('Error fetching project details:', error);
//       }
//     };

//     fetchProjectDetails();
//   }, [id, token]);

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
//       try {
//         await axios.delete(`http://127.0.0.1:8000/api/project/${id}/delete/`, {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });
//         alert('Project deleted successfully');
//         navigate('/projects');
//       } catch (error) {
//         alert('Failed to delete project. Please try again.');
//       }
//     }
//   };

//   const handleModalClose = () => setShowModal(false);
//   const handleModalOpen = () => setShowModal(true);
//   const handleFileChange = (e) => setCv(e.target.files[0]);

//   const handleMessageSubmit = async () => {
//     if (!message) {
//       alert('Please enter a message before submitting.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('individual', individualId);
//     formData.append('project', id);
//     formData.append('message', message);
//     if (cv) {
//       formData.append('cv', cv);
//     }

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/application/create/', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 201) {
//         alert('Application submitted successfully!');
//         handleModalClose();
//       } else {
//         alert('Failed to submit application. Please try again.');
//       }
//     } catch (error) {
//       alert('Error submitting application.');
//     }
//   };

//   if (!project) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <Container className="mt-5">
//       <Row>
//         <h2>{project.title}</h2>

//         {/* Project Main Details */}
//         <Col md={8}>
//           <div className="project-header mb-4">
//             <p>
//               Author: 
//               <Link to={`/author-profile/${project.author}`}>{project.author_username}</Link>
//             </p>
//             <h6 className="text-info">{project.industry}</h6>
//           </div>

//           <h5 className="mt-4">Project Details</h5>
//           <p>{project.description}</p>

//           <div className="d-flex align-items-center mb-3">
//             <Button variant="primary" className="me-2 w-25" onClick={handleModalOpen}>
//               Apply
//             </Button>
//           </div>
//         </Col>

//         {/* Overview Section */}
//         <Col md={4}>
//           <Card className="p-3 shadow-sm overview-card mb-4">
//             <h5>Overview</h5>
//             <p><FontAwesomeIcon icon={faCalendarAlt} /> Created on {project.datePosted}</p>
//             <p><FontAwesomeIcon icon={faMoneyBill} /> Budget: {project.budget}</p>
//             <p><FontAwesomeIcon icon={faClock} /> Deadline: {project.deadline}</p>
//             <div className="mt-3">
//               <Badge bg={project.post_status === 'active' ? 'success' : 'secondary'}>
//                 {project.post_status.charAt(0).toUpperCase() + project.post_status.slice(1)}
//               </Badge>
//             </div>
//           </Card>

//           {/* Action Buttons (only show for the owner) */}
//           {isOwner && (
//             <div className="action-buttons mb-3">
//               <Button variant="outline-primary" className="me-2" onClick={() => navigate(`/project/${id}/update/`)}>
//                 <FontAwesomeIcon icon={faEdit} /> Edit
//               </Button>
//               <Button variant="outline-danger" onClick={handleDelete}>
//                 <FontAwesomeIcon icon={faTrash} /> Delete
//               </Button>
//             </div>
//           )}
//         </Col>
//       </Row>

//       {/* Modal for applying to the project */}
//       <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Apply to {project.title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="applicationMessage">
//               <Form.Label>Message</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Write your message here"
//               />
//             </Form.Group>
//             <Form.Group controlId="cvUpload" className="mt-3">
//               <Form.Label>Upload CV (optional)</Form.Label>
//               <Form.Control type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleMessageSubmit}>
//             Submit Application
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default ProjectDetails;








// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Button, Badge, Card, Modal, Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faCalendarAlt, faMoneyBill, faClock } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// const ProjectDetails = () => {
//   const { id } = useParams(); // Project ID from URL
//   const navigate = useNavigate();
//   const [project, setProject] = useState(null);
//   const [isOwner, setIsOwner] = useState(false);  // Check if logged-in user is project owner
//   const [showModal, setShowModal] = useState(false);  // Modal state
//   const [message, setMessage] = useState('');  // Message state
//   const [cv, setCv] = useState(null);  // CV file state
//   const [individualId, setIndividualId] = useState(null);  // Store individual ID
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/project/${id}/`);
//         setProject(response.data);

//         // Check if the current user is the project author
//         const userResponse = await axios.get(`http://127.0.0.1:8000/api/profile/`, {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });

//         if (response.data.author === userResponse.data.id) {
//           setIsOwner(true);
//         }

//         // Set individual ID for the application
//         setIndividualId(userResponse.data.id);
//       } catch (error) {
//         console.error('Error fetching project details:', error);
//       }
//     };

//     fetchProjectDetails();
//   }, [id, token]);

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
//       try {
//         await axios.delete(`http://127.0.0.1:8000/api/project/${id}/delete/`, {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });
//         alert('Project deleted successfully');
//         navigate('/projects');
//       } catch (error) {
//         alert('Failed to delete project. Please try again.');
//       }
//     }
//   };

//   const handleModalClose = () => setShowModal(false);
//   const handleModalOpen = () => setShowModal(true);
//   const handleFileChange = (e) => setCv(e.target.files[0]);

//   const handleMessageSubmit = async () => {
//     if (!message) {
//         alert('Please enter a message before submitting.');
//         return;
//     }

//     const formData = new FormData();
    
//     // Ensure the IDs are converted to integers (if they aren't already)
//     const individualIdInt = parseInt(individualId, 10); // Ensure this is an integer
//     const projectIdInt = parseInt(id, 10); // Ensure this is an integer

//     // Check for valid IDs before sending
//     if (isNaN(individualIdInt) || isNaN(projectIdInt)) {
//         alert('Invalid individual or project ID.');
//         return;
//     }

//     formData.append('individual', individualIdInt); // Append individual ID
//     formData.append('project', projectIdInt); // Append project ID
//     formData.append('message', message);
//     if (cv) {
//         formData.append('cv', cv);
//     }

//     try {
//         const response = await axios.post('http://127.0.0.1:8000/api/application/create/', formData, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'multipart/form-data',
//             },
//         });

//         if (response.status === 201) {
//             alert('Application submitted successfully!');
//             handleModalClose();
//         } else {
//             alert('Failed to submit application. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error submitting application:', error);
//         alert('Error submitting application. Please try again.');
//     }
// };


//   if (!project) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <Container className="mt-5">
//       <Row>
//         <h2>{project.title}</h2>

//         {/* Project Main Details */}
//         <Col md={8}>
//           <div className="project-header mb-4">
//             <p>
//               Author: 
//               <Link to={`/author-profile/${project.author}`}>{project.author_username}</Link>
//             </p>
//             <h6 className="text-info">{project.industry}</h6>
//           </div>

//           <h5 className="mt-4">Project Details</h5>
//           <p>{project.description}</p>

//           <div className="d-flex align-items-center mb-3">
//             <Button variant="primary" className="me-2 w-25" onClick={handleModalOpen}>
//               Apply
//             </Button>
//           </div>
//         </Col>

//         {/* Overview Section */}
//         <Col md={4}>
//           <Card className="p-3 shadow-sm overview-card mb-4">
//             <h5>Overview</h5>
//             <p><FontAwesomeIcon icon={faCalendarAlt} /> Created on {project.datePosted}</p>
//             <p><FontAwesomeIcon icon={faMoneyBill} /> Budget: {project.budget}</p>
//             <p><FontAwesomeIcon icon={faClock} /> Deadline: {project.deadline}</p>
//             <div className="mt-3">
//               <Badge bg={project.post_status === 'active' ? 'success' : 'secondary'}>
//                 {project.post_status.charAt(0).toUpperCase() + project.post_status.slice(1)}
//               </Badge>
//             </div>
//           </Card>

//           {/* Action Buttons (only show for the owner) */}
//           {isOwner && (
//             <div className="action-buttons mb-3">
//               <Button variant="outline-primary" className="me-2" onClick={() => navigate(`/project/${id}/update/`)}>
//                 <FontAwesomeIcon icon={faEdit} /> Edit
//               </Button>
//               <Button variant="outline-danger" onClick={handleDelete}>
//                 <FontAwesomeIcon icon={faTrash} /> Delete
//               </Button>
//             </div>
//           )}
//         </Col>
//       </Row>

//       {/* Modal for applying to the project */}
//       <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Apply to {project.title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="applicationMessage">
//               <Form.Label>Message</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Write your message here"
//               />
//             </Form.Group>
//             <Form.Group controlId="cvUpload" className="mt-3">
//               <Form.Label>Upload CV (optional)</Form.Label>
//               <Form.Control type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleMessageSubmit}>
//             Submit Application
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default ProjectDetails;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams(); // Extract the project ID from the URL
  const [project, setProject] = useState(null); // State to hold project details
  const [error, setError] = useState(null); // State to hold error message

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/project/${id}/`);
        setProject(response.data);
        setError(null); // Clear error state if request succeeds
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (Project not found)
          setError('Project not found. Please check the project ID.');
        } else {
          // Handle other errors
          setError('An error occurred while fetching project details.');
          console.error('Error fetching project details:', error);
        }
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!project) {
    return <div>Loading...</div>; // Show loading state until project data is fetched
  }

  return (
    <div>
      <h1>Project Details</h1>
      <h2>{project.title}</h2>
      <p>Description: {project.description}</p>
      <p>Industry: {project.industry}</p>
      <p>Status: {project.post_status}</p>
      <p>Budget: ${project.budget}</p>
      <p>Deadline: {project.deadline}</p>
      <p>Created At: {new Date(project.created_at).toLocaleDateString()}</p>
      {/* Link to author's profile using author_username */}
      <p>
        Author: 
        <Link to={`/authorprofile/${project.author_username}/`}>{project.author_username}</Link>
      </p>
    </div>
  );
};

export default ProjectDetails;
