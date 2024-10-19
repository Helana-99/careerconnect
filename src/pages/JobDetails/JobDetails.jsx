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
import defaultCompanyLogo from '../../assets/com.jpg';

const JobDetails = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [cv, setCv] = useState(null); // State to store the uploaded CV
  const [message, setMessage] = useState(''); // State to store the message
  const [jobDetails, setJobDetails] = useState(null);
  const [individualId, setIndividualId] = useState(null); // State to store individual ID
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
        const response = await fetch(`http://127.0.0.1:8000/api/job/${jobId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setJobDetails(data);
        console.log('Job Details:', data);

        // Fetch individual ID (if logged-in user is an individual)
        const userResponse = await fetch('http://127.0.0.1:8000/api/individual/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setIndividualId(userData.id); // Assuming the API returns the individual's ID
        }
      } catch (error) {
        setError('Failed to load job details. Please try again later.');
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
      // Check if user has already applied to the job
      const checkResponse = await fetch(`http://127.0.0.1:8000/api/application/check/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,  // Ensure correct token scheme (Token or Bearer)
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ individual: individualId, job: jobDetails.id }),
      });
  
      if (checkResponse.ok) {
        const data = await checkResponse.json();
        if (data.exists) {
          alert('You have already applied to this job.');
          return;
        }
      } else {
        throw new Error('Failed to check application.');
      }
  
      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append('individual', individualId);
      formData.append('job', jobDetails.id);
      formData.append('message', message);
      if (cv) {
        formData.append('cv', cv);
      }
  
      // Submit application
      const response = await fetch(`http://127.0.0.1:8000/api/application/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,  // Ensure correct token scheme (Token or Bearer)
          // Do NOT set 'Content-Type' here, fetch will handle it automatically
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${JSON.stringify(errorData)}`);
        return;
      }
  
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
                to={`/company/authorprofile/${jobDetails.author_username}`}  // Link to AuthorCompanyProfile
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
