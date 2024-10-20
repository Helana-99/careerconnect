// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./LandingPage.css"; 
// import { useAuth } from '../../contexts/AuthContext'; // Import the Auth context
// import image1 from '../../assets/culture/1.avif'; 
// import image2 from '../../assets/culture/2.avif';
// import image3 from '../../assets/culture/3.avif';

// const LandingPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedJobType, setSelectedJobType] = useState('All Types');
//   const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
//   const [jobTypes, setJobTypes] = useState([]);
//   const [industries, setIndustries] = useState([]);
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth(); // Get authentication status from AuthContext

//   // Fetch jobs from the backend
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/job/all/');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log("Jobs from backend:", data);
//         setJobs(data);
    
//         // Extract unique industries
//         const uniqueIndustries = [...new Set(data.map(job => job.industry))];
//         setIndustries(uniqueIndustries);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   // Filter jobs based on search term, job type, and industry
//   const filteredJobs = jobs.filter((job) => {
//     return (
//       (selectedJobType === 'All Types' || job.job_type === selectedJobType) &&
//       (selectedIndustry === 'All Industries' || job.industry === selectedIndustry) &&
//       (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.location.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   });

//   console.log('Filtered jobs:', filteredJobs);

//   // Handle Apply button click
//   const handleApplyClick = (id) => {
//     console.log('Navigating to job details for ID:', id);
//     navigate(`/jobdetails/${id}`);
//   };

//   // Handle Get Started button click to navigate to the login page
//   const handleGetStarted = () => {
//     navigate('/login');
//   };

//   return (
//     <div>      
//       {/* Hero Section */}
//       <section className="hero bg-primary d-flex align-items-center justify-content-center text-center">
//         <div className="container">
//           <h1 className="display-4" style={{ color: '#324b50' }}>Welcome to Career Connect</h1>
//           <p className="lead" style={{ color: '#324b50' }}>Your gateway to amazing opportunities.</p>

//           {/* Show "Get Started" button only if the user is NOT authenticated */}
//           {!isAuthenticated && (
//             <button className="button" onClick={handleGetStarted}>
//               Get Started
//             </button>
//           )}
//         </div>
//       </section>

//       {/* Dropdown and Search Section */}
//       <section className="filter-section py-4">
//         <div className="container d-flex justify-content-between align-items-center">
//           {/* Search Bar */}
//           <div className="InputContainer">
//             <input
//               placeholder="Search.."
//               id="input"
//               className="input"
//               name="text"
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Job Type Dropdown */}
//           <div className="dropdown me-2">
//             <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Job Type</a>
//             <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
//               <li>
//                 <a className="dropdown-item" href="#" onClick={() => setSelectedJobType('All Types')}>All Types</a>
//               </li>
//               {jobTypes.map((type, index) => (
//                 <li key={index}>
//                   <a className="dropdown-item" href="#" onClick={() => setSelectedJobType(type)}>{type}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Industry Dropdown */}
//           <div className="dropdown">
//             <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Industry</a>
//             <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
//               <li>
//                 <a className="dropdown-item" href="#" onClick={() => setSelectedIndustry('All Industries')}>All Industries</a>
//               </li>
//               {industries.map((industry, index) => (
//                 <li key={index}>
//                   <a className="dropdown-item" href="#" onClick={() => setSelectedIndustry(industry)}>{industry}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Job Listings */}
//       <section className="card-section py-5">
//         <div className="container">
//           <div className="row">
//             {filteredJobs.length > 0 ? (
//               filteredJobs.map((job) => (
//                 <div key={job.id} className="col-md-4">
//                   <div className="card cards bg-light mb-4">
//                     <div className="card-body">
//                       <h6 className="card-title text-secondary">{job.industry}</h6>
//                       <h5 className="card-title fs-6">{job.title}</h5>
//                       <p className="card-text text-muted">{job.location}</p>
//                       <button
//                         type="button" 
//                         className="btn btn-outline-info"
//                         onClick={() => handleApplyClick(job.id)}
//                       >
//                         Apply &gt;
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No jobs found.</p> // Show this if no jobs match the filter
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section pt-5 mt-5 py-5">
//         <div className="container text-center">
//           <h2 className="mb-5">Explore the values that drive us to do our best work</h2>
//           <div className="row">
//             <div className="col-md-3">
//               <div className="feature-item">
//                 <i className="fa-solid fa-heart-circle-check text-dark display-4 mb-3"></i>
//                 <h5>Customer-focused</h5>
//                 <p className="text-secondary">We care about our customers</p>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="feature-item">
//                 <i className="fa-solid fa-users-between-lines text-dark display-4 mb-3"></i>
//                 <h5>Collaborative</h5>
//                 <p className="text-secondary">We work as one and win together</p>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="feature-item">
//                 <i className="fa-solid fa-lightbulb text-dark display-4 mb-3"></i>
//                 <h5>Creative</h5>
//                 <p className="text-secondary">We strive to succeed through continuous innovation</p>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="feature-item">
//                 <i className="fa-solid fa-ranking-star text-dark display-4 mb-3"></i>
//                 <h5>Committed</h5>
//                 <p className="text-secondary">We believe in ownership at all levels of the organization</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Culture Section */}
//       <section className="culture-section text-center p-5" style={{ backgroundColor: '#F2F6FA' }}>
//         <h2 className="text-center mb-5 mx-5">Everyone is welcome</h2>
//         <div className="row align-items-center mb-5">
//           <div className="col-md-6">
//             <h3>Diversity and Inclusion</h3>
//             <p className="text-secondary">
//               We believe that celebrating our differences makes us stronger. We are always ready to listen, learn, and grow together. We embrace diversity and hold a variety of events that celebrate the identities and cultures of our staff.
//             </p>
//           </div>
//           <div className="col-md-6">
//             <img src={image3} alt="Diversity and Inclusion" className="img-fluid" />
//           </div>
//         </div>
//         <div className="row align-items-center mb-5">
//           <div className="col-md-6 order-md-2">
//             <h3>Engineering</h3>
//             <p className="text-secondary">
//               Behind the scenes, we have more than 200 engineers developing the product. They are always making sure every line of code we write continues to provide superior collaborative solutions.
//             </p>
//           </div>
//           <div className="col-md-6 order-md-1">
//             <img src={image1} alt="Engineering" className="img-fluid" />
//           </div>
//         </div>
//         <div className="row align-items-center">
//           <div className="col-md-6">
//             <h3>TechClub</h3>
//             <p className="text-secondary">
//               Hungry for knowledge? You’ll fit right in! The TechClub initiative gives us a chance to connect, share what they know, learn from their peers, and inspire one another.
//             </p>
//           </div>
//           <div className="col-md-6">
//             <img src={image2} alt="TechClub" className="img-fluid" />
//           </div>
//         </div>
//       </section>

//       {/* Job Scam Notice Section */}
//       <section className="job-scam-notice-section py-5">
//         <div className="container">
//             <div className="card-body text-secondary">
//               <h4 className="mb-4 text-dark">
//                 Career Connect has been made aware of ongoing job scams intended to mislead job candidates seeking legitimate employment with Career Connect.
//               </h4>
//               <p>
//                 In order to safeguard against these bad actors, please be aware that Career Connect would never ask for money for ‘equipment’ or ‘shipping cost’ and would never ask for banking information or personal information via email.
//               </p>
//               <p>Please review these tips for staying safe during your job search and recruitment process with Career Connect:</p>
//               <ul>
//                 <li>Career Connect only advertises open positions and collects applications on our career's page www.careerconnect.com/jobs and on reputable job boards like LinkedIn or Indeed.</li>
//                 <li>All emails come from a careerconnect.com email address.</li>
//                 <li>If someone contacts you via chat or text, be sure to independently verify that they are indeed a legitimate Career Connect representative.</li>
//               </ul>
//             </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="text-center py-4  text-dark">
//       <div className="container d-flex justify-content-between align-items-center">
//     <div className="logo">
//       <span>CAREER CONNECT</span>
//     </div>
//     <div className="social-icons">
//       <a href="#" className="icon-wrapper mx-2">
//         <i className="fab fa-twitter"></i>
//       </a>
//       <a href="#" className="icon-wrapper mx-2">
//         <i className="fab fa-tumblr"></i>
//       </a>
//       <a href="#" className="icon-wrapper mx-2">
//         <i className="fab fa-google-plus-g"></i>
//       </a>
//       <a href="#" className="icon-wrapper mx-2">
//         <i className="fab fa-facebook-f"></i>
//       </a>
//     </div>
//   </div>
//   <p className="mt-5 text-secondary">&copy; 2024 Career Connect. All Rights Reserved.</p>
// </footer>


//     </div>
//   );
// };

// export default LandingPage;


















import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { useAuth } from '../../contexts/AuthContext';
import image1 from '../../assets/culture/1.avif';
import image2 from '../../assets/culture/2.avif';
import image3 from '../../assets/culture/3.avif';

const LandingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('All Types');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');

  const [jobTypes, setJobTypes] = useState([]);
  const [industries, setIndustries] = useState([]);

  const [companySearch, setCompanySearch] = useState('');
  const [individualSearch, setIndividualSearch] = useState('');

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Fetch jobs and projects and extract unique industries from both
  useEffect(() => {
    const fetchJobsAndProjects = async () => {
      try {
        // Fetch jobs
        const jobResponse = await fetch('http://127.0.0.1:8000/api/job/all/');
        if (!jobResponse.ok) {
          throw new Error(`HTTP error! Status: ${jobResponse.status}`);
        }
        const jobData = await jobResponse.json();
        console.log("Jobs from backend:", jobData);
        setJobs(jobData);

        // Extract unique industries from jobs
        const jobIndustries = jobData.map(job => job.industry);

        // Fetch projects
        const projectResponse = await fetch('http://127.0.0.1:8000/api/project/all/');
        if (!projectResponse.ok) {
          throw new Error(`HTTP error! Status: ${projectResponse.status}`);
        }
        const projectData = await projectResponse.json();
        console.log("Projects from backend:", projectData);
        setProjects(projectData);

        // Extract unique industries from projects
        const projectIndustries = projectData.map(project => project.industry);

        // Combine industries from both jobs and projects and remove duplicates
        const allIndustries = [...new Set([...jobIndustries, ...projectIndustries])];
        setIndustries(allIndustries);

      } catch (error) {
        console.error('Error fetching jobs or projects:', error);
      }
    };

    fetchJobsAndProjects();
  }, []);

  // Filter jobs and projects based on search term, job type, and industry
  const filteredJobs = jobs.filter((job) => {
    return (
      (selectedJobType === 'All Types' || job.job_type === selectedJobType) &&
      (selectedIndustry === 'All Industries' || job.industry === selectedIndustry) &&
      (job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const filteredProjects = projects.filter((project) => {
    return (
      (selectedIndustry === 'All Industries' || project.industry === selectedIndustry) &&
      (project.title && project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Handle Apply button click
  const handleApplyClick = (id) => {
    navigate(`/jobdetails/${id}`);
  };

  // Handle company and individual search submission
  const handleCompanySearch = (e) => {
    e.preventDefault();
    navigate(`/company-search?query=${companySearch}`);
  };

  const handleIndividualSearch = (e) => {
    e.preventDefault();
    navigate(`/individual-search?query=${individualSearch}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-primary d-flex align-items-center justify-content-center text-center">
        <div className="container">
          <h1 className="display-4" style={{ color: '#324b50' }}>Welcome to Career Connect</h1>
          <p className="lead" style={{ color: '#324b50' }}>Your gateway to amazing opportunities.</p>

          {!isAuthenticated && (
            <button className="button" onClick={() => navigate('/login')}>
              Get Started
            </button>
          )}
        </div>
      </section>

      {/* Search Section for Jobs and Projects */}
      <section className="filter-section py-4">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="InputContainer">
            <input
              placeholder="Search for Jobs/Projects...."
              id="input"
              className="input"
              name="text"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="dropdown me-2">
            <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Job Type</a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#" onClick={() => setSelectedJobType('All Types')}>All Types</a>
              </li>
              {jobTypes.map((type, index) => (
                <li key={index}>
                  <a className="dropdown-item" href="#" onClick={() => setSelectedJobType(type)}>{type}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="dropdown">
            <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Industry</a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#" onClick={() => setSelectedIndustry('All Industries')}>All Industries</a>
              </li>
              {industries.map((industry, index) => (
                <li key={index}>
                  <a className="dropdown-item" href="#" onClick={() => setSelectedIndustry(industry)}>{industry}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="card-section py-5">
        <div className="container">
          <h2>Jobs</h2>
          <div className="row">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="col-md-4">
                  <div className="card cards bg-light mb-4">
                    <div className="card-body">
                      <h6 className="card-title text-secondary">{job.industry}</h6>
                      <h5 className="card-title fs-6">{job.title}</h5>
                      <p className="card-text text-muted">{job.location}</p>
                      <button
                        type="button" 
                        className="btn btn-outline-info"
                        onClick={() => handleApplyClick(job.id)}
                      >
                        Apply &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Project Listings */}
      <section className="card-section py-5">
        <div className="container">
          <h2>Projects</h2>
          <div className="row">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="col-md-4">
                  <div className="card cards bg-light mb-4">
                    <div className="card-body">
                      <h6 className="card-title text-secondary">{project.industry}</h6>
                      <h5 className="card-title fs-6">{project.title}</h5>
                      <p className="card-text text-muted">{project.description}</p>
                      <button
                        type="button" 
                        className="btn btn-outline-info"
                        onClick={() => handleApplyClick(project.id)}
                      >
                        Apply &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </div>
        </div>
      </section>

  {/* Features Section */}
         <section className="features-section pt-5 mt-5 py-5">
         <div className="container text-center">
           <h2 className="mb-5">Explore the values that drive us to do our best work</h2>
           <div className="row">
             <div className="col-md-3">
               <div className="feature-item">
                 <i className="fa-solid fa-heart-circle-check text-dark display-4 mb-3"></i>
                 <h5>Customer-focused</h5>
                 <p className="text-secondary">We care about our customers</p>
               </div>
             </div>
             <div className="col-md-3">
               <div className="feature-item">
                 <i className="fa-solid fa-users-between-lines text-dark display-4 mb-3"></i>
                 <h5>Collaborative</h5>
                 <p className="text-secondary">We work as one and win together</p>
               </div>
             </div>
             <div className="col-md-3">
               <div className="feature-item">
                 <i className="fa-solid fa-lightbulb text-dark display-4 mb-3"></i>
                 <h5>Creative</h5>
                 <p className="text-secondary">We strive to succeed through continuous innovation</p>
               </div>
             </div>
             <div className="col-md-3">
               <div className="feature-item">
                 <i className="fa-solid fa-ranking-star text-dark display-4 mb-3"></i>
                 <h5>Committed</h5>
                 <p className="text-secondary">We believe in ownership at all levels of the organization</p>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Culture Section */}
       <section className="culture-section text-center p-5" style={{ backgroundColor: '#F2F6FA' }}>
         <h2 className="text-center mb-5 mx-5">Everyone is welcome</h2>
         <div className="row align-items-center mb-5">
           <div className="col-md-6">
             <h3>Diversity and Inclusion</h3>
             <p className="text-secondary">
               We believe that celebrating our differences makes us stronger. We are always ready to listen, learn, and grow together. We embrace diversity and hold a variety of events that celebrate the identities and cultures of our staff.
             </p>
           </div>
           <div className="col-md-6">
             <img src={image3} alt="Diversity and Inclusion" className="img-fluid" />
           </div>
         </div>
         <div className="row align-items-center mb-5">
           <div className="col-md-6 order-md-2">
             <h3>Engineering</h3>
             <p className="text-secondary">
               Behind the scenes, we have more than 200 engineers developing the product. They are always making sure every line of code we write continues to provide superior collaborative solutions.
             </p>
           </div>
           <div className="col-md-6 order-md-1">
             <img src={image1} alt="Engineering" className="img-fluid" />
           </div>
         </div>
         <div className="row align-items-center">
           <div className="col-md-6">
             <h3>TechClub</h3>
             <p className="text-secondary">
               Hungry for knowledge? You’ll fit right in! The TechClub initiative gives us a chance to connect, share what they know, learn from their peers, and inspire one another.
             </p>
           </div>
           <div className="col-md-6">
             <img src={image2} alt="TechClub" className="img-fluid" />
           </div>
         </div>
       </section>

       {/* Job Scam Notice Section */}
       <section className="job-scam-notice-section py-5">
         <div className="container">
             <div className="card-body text-secondary">
               <h4 className="mb-4 text-dark">
                 Career Connect has been made aware of ongoing job scams intended to mislead job candidates seeking legitimate employment with Career Connect.
               </h4>
               <p>
                 In order to safeguard against these bad actors, please be aware that Career Connect would never ask for money for ‘equipment’ or ‘shipping cost’ and would never ask for banking information or personal information via email.
               </p>
               <p>Please review these tips for staying safe during your job search and recruitment process with Career Connect:</p>
               <ul>
                 <li>Career Connect only advertises open positions and collects applications on our career's page www.careerconnect.com/jobs and on reputable job boards like LinkedIn or Indeed.</li>
                 <li>All emails come from a careerconnect.com email address.</li>
                 <li>If someone contacts you via chat or text, be sure to independently verify that they are indeed a legitimate Career Connect representative.</li>
               </ul>
             </div>
         </div>
       </section>

       {/* Footer */}
       <footer className="text-center py-4  text-dark">
       <div className="container d-flex justify-content-between align-items-center">
     <div className="logo">
       <span>CAREER CONNECT</span>
     </div>
     <div className="social-icons">
       <a href="#" className="icon-wrapper mx-2">
         <i className="fab fa-twitter"></i>
       </a>
       <a href="#" className="icon-wrapper mx-2">
         <i className="fab fa-tumblr"></i>
       </a>
       <a href="#" className="icon-wrapper mx-2">
         <i className="fab fa-google-plus-g"></i>
       </a>
       <a href="#" className="icon-wrapper mx-2">
         <i className="fab fa-facebook-f"></i>
       </a>
     </div>
   </div>
   <p className="mt-5 text-secondary">&copy; 2024 Career Connect. All Rights Reserved.</p>
 </footer>

    </div>
  );
};

export default LandingPage;
