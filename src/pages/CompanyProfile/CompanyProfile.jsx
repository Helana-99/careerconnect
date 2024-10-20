// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Card, Button } from 'react-bootstrap';
// import './CompanyProfile.css'; // Assuming the same CSS file for styling
// import cover from "../../assets/images/company/cover.jpg"; 
// import defaultProfile from "../../assets/c1.png";

// const CompanyProfile = () => {
//   const { username } = useParams(); // Get username from the URL parameters
//   const navigate = useNavigate();
  
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     bio: '',
//     logo: null,
//     industry: '',
//   });

//   // Fetch company profile on mount or when username changes
//   useEffect(() => {
//     const fetchCompanyProfile = async () => {
//       try {
//         const token = Cookies.get('authToken');
//         if (!token) {
//           setError('No authentication token found.');
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`http://127.0.0.1:8000/api/company/${username ? `authorprofile/${username}` : 'loggedin-profile/'}`, {
//           headers: { Authorization: `Token ${token}` },
//         });

//         setCompany(response.data);
//         setFormData({
//           bio: response.data.bio || '',
//           industry: response.data.industry || '',
//         });
//       } catch (error) {
//         console.error('Error fetching company profile:', error);
//         setError('Error fetching company profile.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCompanyProfile();
//   }, [username]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle file change
//   const handleFileChange = (e) => {
//     setFormData({ ...formData, logo: e.target.files[0] });
//   };

//   // Handle profile update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = Cookies.get('authToken');
//     const formDataToSend = new FormData();
//     formDataToSend.append('bio', formData.bio);
//     if (formData.logo) formDataToSend.append('logo', formData.logo);
//     formDataToSend.append('industry', formData.industry);

//     try {
//       const response = await axios.put('http://127.0.0.1:8000/api/company/update/', formDataToSend, {
//         headers: {
//           Authorization: `Token ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setCompany(response.data); // Update the company profile after save
//       setIsEditing(false); // Exit editing mode
//     } catch (error) {
//       console.error('Error updating company profile:', error);
//     }
//   };

//   // Handle job click navigation
//   const handleJobClick = (jobId) => navigate(`/jobdetails/${jobId}`);

//   // Render early if loading or error
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-sm pb-4">
//         {/* Cover Photo */}
//         <div className="cover-photo position-relative">
//           <img src={cover} alt="Company Cover" className="w-100 rounded-top" />
//           <div className="profile-img-container position-absolute">
//             <img
//               src={company?.logo ? `http://127.0.0.1:8000${company.logo}` : defaultProfile}
//               alt="Company Logo"
//               className="profile-img"
//             />
//           </div>
//         </div>

//         <div className="card-body">
//           {!isEditing ? (
//             <div>
//               <h6 className="company-name">{company?.user.username || "Company Name"}</h6>
//               <p className="company-bio text-muted">{company?.bio || "No bio available"}</p>
//               <p className="company-details text-muted">{company?.industry || "No industry specified"}</p>
//               <button className="btn btn-primary w-25" onClick={() => setIsEditing(true)}>
//                 Edit Profile
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="form-group mb-3">
//                 <label>Bio:</label>
//                 <textarea
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleInputChange}
//                   className="form-control"
//                   rows="3"
//                 />
//               </div>
//               <div className="form-group mb-3">
//                 <label>Industry:</label>
//                 <input
//                   type="text"
//                   name="industry"
//                   value={formData.industry}
//                   onChange={handleInputChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="form-group mb-3">
//                 <label>Upload Logo:</label>
//                 <input
//                   type="file"
//                   name="logo"
//                   onChange={handleFileChange}
//                   className="form-control"
//                 />
//               </div>
//               <button type="submit" className="btn btn-success w-25">Save</button>
//               <button type="button" className="btn btn-secondary w-25 ms-2" onClick={() => setIsEditing(false)}>
//                 Cancel
//               </button>
//             </form>
//           )}
//         </div>
//       </div>

//       {/* Jobs posted by the company */}
//       <h4 className="mt-5">Jobs Posted by {company?.user.username}</h4>
//       <div className="row">
//         {company?.jobs?.map((job) => (
//           <div className="col-md-4" key={job.id}>
//             <Card className="mb-4">
//               <Card.Body>
//                 <Card.Title>{job.title}</Card.Title>
//                 <Card.Text>{job.location}</Card.Text>
//                 <Button onClick={() => handleJobClick(job.id)} variant="primary">View Job</Button>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CompanyProfile;























import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './CompanyProfile.css'; // Ensure this path is correct
import cover from "../../assets/images/company/cover.jpg"; 
import defaultProfile from "../../assets/c1.png";

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    logo: null,
    industry: '',
  });

  const navigate = useNavigate(); // Add this line to define navigate

  // Fetch company profile on mount
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          setError('No authentication token found.');
          setLoading(false);
          return;
        }
  
        const response = await axios.get('http://127.0.0.1:8000/api/company/loggedin-profile/', {
          headers: { Authorization: `Token ${token}` },
        });
        setCompany(response.data);
        setFormData({
          bio: response.data.bio || '',
          industry: response.data.industry || '',
        });
      } catch (error) {
        console.error('Error fetching company profile:', error);
        setError('Error fetching company profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyProfile();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('authToken');
    const formDataToSend = new FormData();
    formDataToSend.append('bio', formData.bio);
    if (formData.logo) formDataToSend.append('logo', formData.logo);
    formDataToSend.append('industry', formData.industry);

    try {
      const response = await axios.put('http://127.0.0.1:8000/api/company/update/', formDataToSend, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setCompany(response.data); // Update the company profile after save
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating company profile:', error);
    }
  };

  // Render early if loading or error
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm pb-4">
        {/* Cover Photo */}
        <div className="cover-photo position-relative">
          <img src={cover} alt="Company Cover" className="w-100 rounded-top" />
          <div className="profile-img-container position-absolute">
            <img
              src={company?.logo ? `http://127.0.0.1:8000${company.logo}` : defaultProfile}
              alt="Company Logo"
              className="profile-img"
            />
          </div>
        </div>

        <div className="card-body">
          {!isEditing ? (
            <div>
              <h6 className="company-name">{company?.user.username || "Company Name"}</h6>
              <p className="company-bio text-muted">{company?.bio || "No bio available"}</p>
              <p className="company-details text-muted">{company?.industry || "No industry specified"}</p>
              <button className="btn btn-primary w-25" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Bio:</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                />
              </div>
              <div className="form-group mb-3">
                <label>Industry:</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Upload Logo:</label>
                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success w-25">Save</button>
              <button type="button" className="btn btn-secondary w-25 ms-2" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Jobs posted by the company */}
      <h4 className="mt-5">Jobs Posted by {company?.user.username}</h4>
      <div className="row">
        {company?.jobs?.map((job) => (
          <div className="col-md-4" key={job.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Text>{job.location}</Card.Text>
                <Button variant="primary" onClick={() => navigate(`/jobdetails/${job.id}`)}>View Job</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProfile;
