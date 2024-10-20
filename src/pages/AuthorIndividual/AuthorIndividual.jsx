import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './AuthorIndividual.css'; // Ensure this path is correct
import cover from "../../assets/hand2.jpg"; 
import defaultProfile from "../../assets/user.jpg"; // Default profile picture for individuals

const AuthorIndividualProfile = () => {
  const { username } = useParams(); // Get username from the URL parameters
  const [individual, setIndividual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch individual profile on mount
  useEffect(() => {
    const fetchIndividualProfile = async () => {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          setError('No authentication token found.');
          setLoading(false);
          return;
        }

        // Make sure the backend endpoint uses the username for fetching
        const response = await axios.get(`http://127.0.0.1:8000/api/individual/authorprofile/${username}`, {
          headers: { Authorization: `Token ${token}` },
        });
        setIndividual(response.data); // Set the individual profile data
      } catch (error) {
        console.error('Error fetching individual profile:', error);
        setError('Error fetching individual profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchIndividualProfile();
  }, [username]);

  // Render early if loading or error
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm pb-4">
        {/* Cover Photo */}
        <div className="cover-photo position-relative">
          <img src={cover} alt="Individual Cover" className="w-100 rounded-top" />
          <div className="profile-img-container position-absolute">
            <img
              src={individual?.profile_image ? `http://127.0.0.1:8000${individual.profile_image}` : defaultProfile}
              alt="Profile"
              className="profile-img"
            />
          </div>
        </div>

        <div className="card-body">
          {/* Use the username as a fallback for the individual's name */}
          <h5>{individual?.user?.username}</h5>
          <p>Email: {individual?.user?.email}</p>
          <p>About: {individual?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorIndividualProfile;
