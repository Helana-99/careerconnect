import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  return (
    <div className="register-container ">
      <header>Choose Your Registration Type</header>

      <div className="card-container w-75">
        {/* Card for Freelancer Registration */}
        <Link to="/Register/client" className="cardd">
          <div className="card-content">
            <h3>Individual</h3>
            <p>Sign up as an Individual and offer your services to clients.</p>
          </div>
        </Link>

        {/* Card for Company Registration */}
        <Link to="/Register/company" className="cardd">
          <div className="card-content">
            <h3>Company</h3>
            <p>Sign up as a company to hire freelancers for projects.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Register;
