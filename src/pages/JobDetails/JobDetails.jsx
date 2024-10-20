// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Container, Row, Col, Badge, Button, Image, Card } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faUsers, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// import Cookies from 'js-cookie';
// import defaultCompanyLogo from '../../assets/com.jpg'; // Default company logo

// const JobDetails = () => {
//   const navigate = useNavigate(); // Hook to navigate
//   const [jobDetails, setJobDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const jobId = localStorage.getItem('jobId');
    
//     if (!jobId) {
//       setError('Job ID not found. Please try again.');
//       return;
//     }
  
//     const fetchJobDetails = async () => {
//       const token = Cookies.get('authToken') || localStorage.getItem('authToken');
  
//       if (!token) {
//         alert('Unauthorized access. Please log in again.');
//         navigate('/login');
//         return;
//       }
  
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/job/${jobId}/`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
  
//         const data = await response.json();
//         console.log('Job Details:', data); // Log the entire jobDetails object for debugging
//         setJobDetails(data);
  
//         // Check if company ID exists in the job details
//         if (data.company && data.company.id) {
//           localStorage.setItem('companyId', data.company.id); // Store companyId in localStorage
//           console.log('Company ID stored:', data.company.id);  // Debugging
//         } else {
//           console.error('No Company ID found in job details.');
//         }
//       } catch (error) {
//         setError('Failed to load job details. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
  
//     fetchJobDetails();
//   }, [navigate]);
  
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Container className="mt-5">
//       <Row>
//         <Col md={8}>
//           <div className="d-flex my-3">
//             <Image 
//               src={jobDetails?.company?.logo ? `http://127.0.0.1:8000${jobDetails.company.logo}` : defaultCompanyLogo} 
//               style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '15px', border: '2px solid black' }}
//             />
//             <h5>{jobDetails?.title}</h5>
//           </div>
//           <p className="text-muted">{jobDetails?.industry}</p>
//           <p>
// {
//   jobDetails?.author_username ? (
//     <Link
//       to={`/company/authorprofile/${jobDetails.author}`}
//       onClick={() => localStorage.setItem('companyId', jobDetails.author_username)}
//       style={{ color: '#2c9caf', textDecoration: 'none', fontSize: '25px', fontWeight: 'bolder' }}
//     >
//       {jobDetails.author_username}
//     </Link>
//   ) : (
//     <p>Loading company details...</p>
//   )
// }
//           </p>
//           <h5>ABOUT THE JOB</h5>
//           <p className="text-muted">{jobDetails?.description}</p>
//           <Button variant="primary" className="me-2 w-25">
//             Apply
//           </Button>
//         </Col>

//         <Col md={4}>
//           <Card className="p-3 shadow-sm">
//             <h5>Overview</h5>
//             <p><FontAwesomeIcon icon={faCalendarAlt} /> Posted {jobDetails?.posted_days_ago} days ago</p>
//             <p><FontAwesomeIcon icon={faUsers} /> {jobDetails?.company_size} Employees</p>
//             <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {jobDetails?.location}</p>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default JobDetails;












// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faUsers, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// import Cookies from 'js-cookie';
// import defaultCompanyLogo from '../../assets/com.jpg';

// const JobDetails = () => {
//   const navigate = useNavigate();
//   const [jobDetails, setJobDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const jobId = localStorage.getItem('jobId');

//     if (!jobId) {
//       setError('Job ID not found. Please try again.');
//       setIsLoading(false);
//       return;
//     }

//     const fetchJobDetails = async () => {
//       const token = Cookies.get('authToken') || localStorage.getItem('authToken');

//       if (!token) {
//         alert('Unauthorized access. Please log in again.');
//         navigate('/login');
//         return;
//       }

//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/job/${jobId}/`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setJobDetails(data);
//         console.log('Job Details:', data); // Log the entire jobDetails object for debugging

//         // You can store the author_username directly since company ID is not present
//         localStorage.setItem('authorUsername', data.author_username);
//       } catch (error) {
//         setError('Failed to load job details. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchJobDetails();
//   }, [navigate]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Container className="mt-5">
//       <Row>
//         <Col md={8}>
//           <div className="d-flex my-3">
//             <Image 
//               src={jobDetails?.company_logo ? `http://127.0.0.1:8000${jobDetails.company_logo}` : defaultCompanyLogo} 
//               style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '15px', border: '2px solid black' }}
//             />
//             <h5>{jobDetails?.title || 'Job Title Not Available'}</h5>
//           </div>
//           <p className="text-muted">{jobDetails?.industry || 'Industry Not Specified'}</p>
//           <p>
//             <Link
//               to={`/authorcompanyprofile/${jobDetails?.author_username}`}  // Redirect using author_username
//               style={{ color: '#2c9caf', textDecoration: 'none', fontSize: '25px', fontWeight: 'bolder' }}
//             >
//               {jobDetails.author_username || 'Author Not Specified'}
//             </Link>
//           </p>
//           <h5>ABOUT THE JOB</h5>
//           <p className="text-muted">{jobDetails?.description || 'Description Not Available'}</p>
//           <Button variant="primary" className="me-2 w-25">
//             Apply
//           </Button>
//         </Col>
//         <Col md={4}>
//           <Card className="p-3 shadow-sm">
//             <h5>Overview</h5>
//             <p><FontAwesomeIcon icon={faCalendarAlt} /> Posted {jobDetails?.created_at.split('T')[0]} days ago</p>
//             <p><FontAwesomeIcon icon={faUsers} /> {jobDetails?.company_size || 'Company Size Not Specified'}</p>
//             <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {jobDetails?.location || 'Location Not Specified'}</p>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default JobDetails;
















import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Card, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUsers, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import axios from 'axios';
import defaultCompanyLogo from '../../assets/com.jpg';

const JobDetails = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [cv, setCv] = useState(null);
  const [message, setMessage] = useState('');
  const [jobDetails, setJobDetails] = useState(null);
  const [individualId, setIndividualId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jobId = localStorage.getItem('jobId');

    if (!jobId) {
      setError('Job ID not found. Please try again.');
      setIsLoading(false);
      return;
    }

    const fetchJobDetails = async () => {
      const token = Cookies.get('authToken') || localStorage.getItem('authToken');

      if (!token) {
        alert('Unauthorized access. Please log in again.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/job/${jobId}/`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        setJobDetails(response.data);

        const userResponse = await axios.get('http://127.0.0.1:8000/api/individual/profile/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        setIndividualId(userResponse.data.id);
      } catch (error) {
        setError('Failed to load job details. Please try again later.');
        console.error('Error fetching job details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);
  const handleFileChange = (e) => setCv(e.target.files[0]);
  
  const handleMessageSubmit = async () => {
    if (!message) {
      alert('Please enter a message before submitting.');
      return;
    }
  
    const token = Cookies.get('authToken') || localStorage.getItem('authToken');
    if (!token) {
      alert('You are not authorized. Please log in again.');
      return;
    }
  
    try {
      const checkResponse = await axios.post(`http://127.0.0.1:8000/api/application/check/`, {
        // individual: individualId,
        method: 'POST',
        // job: jobDetails.id,
      }, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });

      if (checkResponse.data.exists) {
        alert('You have already applied to this job.');
        return;
      }

      const formData = new FormData();
      formData.append('individual', (individualId));
      formData.append('job', jobDetails.id);
      formData.append('company', '');
      formData.append('project','' );
      formData.append('message', message);

      if (cv) {
        formData.append('cv', cv);
      }

      const response = await axios.post(`http://127.0.0.1:8000/api/application/create/`, formData, {
        headers: {
          'Authorization': `Token ${token}`,
          // Do not set 'Content-Type' here, Axios will handle it
        },
      });

      alert('Application submitted successfully!');
      handleModalClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="d-flex my-3">
            <Image 
              src={jobDetails?.company_logo ? `http://127.0.0.1:8000${jobDetails.company_logo}` : defaultCompanyLogo} 
              style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '15px', border: '2px solid black' }}
            />
            <h5>{jobDetails?.title || 'Job Title Not Available'}</h5>
          </div>
          <p className="text-muted">{jobDetails?.industry || 'Industry Not Specified'}</p>
          <p>
            {jobDetails?.author_username ? (
              <Link
                to={`/company/authorprofile/${jobDetails.author_username}`}
                style={{ color: '#2c9caf', textDecoration: 'none', fontSize: '25px', fontWeight: 'bolder' }}
              >
                {jobDetails.author_username || 'Author Not Specified'}
              </Link>
            ) : (
              <p>Loading company details...</p>
            )}
          </p>
          <h5>ABOUT THE JOB</h5>
          <p className="text-muted">{jobDetails?.description || 'Description Not Available'}</p>
          <Button variant="primary" className="me-2 w-25" onClick={handleModalOpen}>
            Apply
          </Button>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>Overview</h5>
            <p><FontAwesomeIcon icon={faCalendarAlt} /> Posted {jobDetails?.created_at} days ago</p>
            <p><FontAwesomeIcon icon={faUsers} /> {jobDetails?.company_size || 'Company Size Not Specified'}</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {jobDetails?.location || 'Location Not Specified'}</p>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {jobDetails?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMessage">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCV">
              <Form.Label>Upload Your CV</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleMessageSubmit}>
            Submit Application
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default JobDetails;
