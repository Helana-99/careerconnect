import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar as BootstrapNavbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { faHome, faBriefcase, faProjectDiagram, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import './style.css';
import Logo from '../../src/assets/logo3.jpg';

function AppNavbar() {
  const { isAuthenticated, logout, setIsAuthenticated, userType, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [setIsAuthenticated]);

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');  // Get token from localStorage
  
    if (token) {
      try {
        // Send the logout request to the backend with the Authorization header
        await axios.post(`http://127.0.0.1:8000/api/auth/logout/`, {}, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
  
        // Clear token and reset authentication state
        localStorage.removeItem('authToken');  // Remove the token from localStorage
        Cookies.remove('authToken');  // Remove the token from cookies
        axios.defaults.headers.common["Authorization"] = '';  // Clear the Axios default token header
  
        // Reset authentication state in React (set isAuthenticated to false)
        setIsAuthenticated(false);
        logout();  // This could be a context method to reset user session info
  
        // Redirect to the login page after successful logout
        navigate('/login');
  
      } catch (error) {
        console.error('Error during logout:', error);
        alert('Logout failed. Please try again.');
      }
    } else {
      // If no token is found, proceed with logout and redirect
      setIsAuthenticated(false);
      logout();
      navigate('/login');
    }
  };
  
  
  
  console.log('IsAuthenticated:', isAuthenticated);
console.log('AuthToken in LocalStorage:', localStorage.getItem('authToken'));


  const navigateToProfile = () => {
    if (!userType || !userId) {
      console.error("User type or ID is missing.");
      return;
    }
  
    console.log("Navigating for userType:", userType);
    console.log("Navigating for userId:", userId);
  
    // Navigate based on user role
    switch (userType) {
      case 'individual':
        navigate(`/individual/profile/${userId}`);
        break;
      case 'company':
        navigate(`/company/profile/`);
        break;
      default:
        console.warn("Unknown user type or invalid data");
        break;
    }
  };
  

  return (
    <BootstrapNavbar className="navbar navbar-expand-lg" style={{ padding: '0' }}>
      <Container>
        <Link className="navbar-brand d-flex align-items-center me-auto" to="/" style={{ fontWeight: 'bold', color: '#2c9caf' }}>
          <img
            src={Logo}
            width="50"
            height="35"
            className="d-inline-block align-top me-2"
            alt="Career Connect Logo"
          />
          Career Connect
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <Nav className="mx-auto">
            <Nav.Item className="nav-item">
              <Link className="nav-link underlineHover" to="/" style={{ color: '#2c9caf', fontSize: '16px' }}>
                <FontAwesomeIcon icon={faHome} className="me-1" /> Home
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
              <Link className="nav-link underlineHover" to="/jobs" style={{ color: '#2c9caf', fontSize: '16px' }}>
                <FontAwesomeIcon icon={faBriefcase} className="me-1" /> Find Jobs
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
              <Link className="nav-link underlineHover" to="/projects" style={{ color: '#2c9caf', fontSize: '16px' }}>
                <FontAwesomeIcon icon={faProjectDiagram} className="me-1" /> Projects
              </Link>
            </Nav.Item>
          </Nav>

          <Nav className="ms-auto">
            {isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-profile"
                  style={{ textDecoration: 'none', color: '#2c9caf', fontSize: '16px' }}
                >
                  <FontAwesomeIcon icon={faUser} size="md" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={navigateToProfile}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Item className="nav-item">
                <Link className="nav-link underlineHover" to="/login" style={{ color: '#2c9caf', fontSize: '16px' }}>
                  Login
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </div>
      </Container>
    </BootstrapNavbar>
  );
}

export default AppNavbar;
