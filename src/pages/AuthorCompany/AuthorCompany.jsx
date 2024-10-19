// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useParams } from 'react-router-dom';
// import { Card, Button } from 'react-bootstrap';
// import '../CompanyProfile/CompanyProfile.css'; // Assuming the same CSS file for styling
// import cover from "../../assets/images/company/cover.jpg";
// import defaultProfile from "../../assets/c1.png";

// const AuthorCompanyProfile = () => {
//   const { username } = useParams(); // Get username from the URL parameters
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch company profile on mount
//   useEffect(() => {
//     const fetchCompanyProfile = async () => {
//       try {
//         const token = Cookies.get('authToken');
//         if (!token) {
//           setError('No authentication token found.');
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`http://127.0.0.1:8000/api/company/authorprofile/${username}`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setCompany(response.data);
//       } catch (error) {
//         console.error('Error fetching company profile:', error);
//         setError('Error fetching company profile.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCompanyProfile();
//   }, [username]);

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
//           <h6 className="company-name">{company?.user.username || "Company Name"}</h6>
//           <p className="company-bio text-muted">{company?.bio || "No bio available"}</p>
//           <p className="company-details text-muted">{company?.industry || "No industry specified"}</p>
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
//                 <Button variant="primary">View Job</Button>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AuthorCompanyProfile;







// AuthorCompanyProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import '../CompanyProfile/CompanyProfile.css'; // Ensure this path is correct
import cover from "../../assets/images/company/cover.jpg"; 
import defaultProfile from "../../assets/c1.png";

const AuthorCompanyProfile = () => {
  const { username } = useParams(); // Get username from the URL parameters
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

        const response = await axios.get(`http://127.0.0.1:8000/api/company/authorprofile/${username}`, {
          headers: { Authorization: `Token ${token}` },
        });
        setCompany(response.data);
      } catch (error) {
        console.error('Error fetching company profile:', error);
        setError('Error fetching company profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyProfile();
  }, [username]);

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
          <h6 className="company-name">{company?.user.username || "Company Name"}</h6>
          <p className="company-bio text-muted">{company?.bio || "No bio available"}</p>
          <p className="company-details text-muted">{company?.industry || "No industry specified"}</p>
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

export default AuthorCompanyProfile;
