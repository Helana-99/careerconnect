import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './JobList.css';
import defaultProfile from '../../assets/com.jpg'; // Ensure you have a default profile image

function JobListComponent() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [selectedJobType, setSelectedJobType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [industries, setIndustries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/job/all/');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setJobs(data);

        const uniqueIndustries = [...new Set(data.map(job => job.industry))];
        setIndustries(uniqueIndustries);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    return (
      (selectedLocation === 'All Locations' || job.location.includes(selectedLocation)) &&
      (selectedTeam === 'All Teams' || job.industry === selectedTeam) &&
      (selectedJobType === 'All Types' || job.job_type === selectedJobType) &&
      (selectedStatus === 'All Status' || job.post_status === selectedStatus) &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleJobClick = id => navigate(`/jobdetails/${id}`);

  return (
    <Container className="mt-5">
    <div className="text-center"> 
       <h2 className="text-center">WE HAVE {jobs.length} OPEN POSITIONS</h2>
      <p className="text-center">Join us in building the first truly global financial SuperApp</p>
</div>
      <Row className="mt-4">
        {/* Filters Section */}
        <Col md={3}>
          <div className="filter-section">
            <div className="filter-header mb-2">Job Type</div>
            <Form.Group controlId="jobType" className="mb-3">
              <Form.Select value={selectedJobType} onChange={e => setSelectedJobType(e.target.value)}>
                <option value="All Types">All Types</option>
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="remote">Remote</option>
              </Form.Select>
            </Form.Group>

            <div className="filter-header mb-2">Industry</div>
            <Form.Group controlId="industry" className="mb-3">
              <Form.Select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
                <option value="All Teams">All Teams</option>
                {industries.map((industry, index) => (
                  <option key={index} value={industry}>{industry}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </Col>

        {/* Job Listings Section */}
        <Col md={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search open positions"
              aria-label="Job search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {/* Job List */}
          <Row>
            {filteredJobs.map((job) => (
        <Col md={12} key={job.id} className="mb-3">
          <Card className="d-flex flex-row align-items-center justify-content-between p-3 shadow-sm hover-effect">
            <div className="d-flex align-items-center">
          {/* Company Logo */}
          <div className="me-3 text-center mt-2">
            <img
              src={job.company_logo ? `http://127.0.0.1:8000${job.company_logo}` : defaultProfile}
              alt="Company Logo"
              className="company-logo-small"
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
              }}
            />
                 <p>{job.author_username}</p>
          </div>
          {/* Job Details */}
          <div>
            <Card.Title className="mb-2" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
              <a
                href="#"
                className="jobtitle fs-6"
                onClick={() => handleJobClick(job.id)}
                style={{ textDecoration: 'none' }}
              >
                {job.title}
              </a>
            </Card.Title>
            <div className="text-muted" style={{ fontSize: '0.9rem' }}>
            <span>&bull; {job.industry}</span>
            </div>
            <div className="text-muted" style={{ fontSize: '0.9rem' }}>
              <span>&bull; {job.location}</span>  <span>{job.budget}</span>
            </div>
          </div>
        </div>
        {/* Job Type on the Right */}
        <div>
          <span className={`${job.job_type.toLowerCase()} text-success`} style={{
            padding: '0.5em 1em',
            fontSize: '0.9rem',
          }}>
            {job.job_type.replace('_', ' ')}
          </span>
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

export default JobListComponent;
