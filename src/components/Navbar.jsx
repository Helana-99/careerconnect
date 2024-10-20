import React, { useEffect, useState } from 'react';
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

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [setIsAuthenticated]);

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');  
    if (token) {
      try {
        await axios.post('http://127.0.0.1:8000/api/auth/logout/', {}, {
          headers: { 'Authorization': `Token ${token}` },
        });
        localStorage.removeItem('authToken');  
        Cookies.remove('authToken');  
        axios.defaults.headers.common["Authorization"] = '';  
        setIsAuthenticated(false);
        logout();  
        navigate('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        alert('Logout failed. Please try again.');
      }
    } else {
      setIsAuthenticated(false);
      logout();
      navigate('/login');
    }
  };

  const navigateToProfile = () => {
    if (!userType || !userId) {
      console.error("User type or ID is missing.");
      return;
    }
    switch (userType) {
      case 'individual':
        navigate(`/individual/profile/${userId}`);
        break;
      case 'company':
        navigate(`/company/profile/${userId}`);
        break;
      default:
        console.warn("Unknown user type or invalid data");
        break;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
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

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="d-flex">
            <div className="InputContainernav me-2">
              <input
                placeholder="Search Individuals or Companies..."
                className="input form-control"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

          </form>

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
