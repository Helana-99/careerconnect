// components/Footer/Footer.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Footer() {
  return (
    <footer className="footer bg-light text-center py-3">
      <div className="container">
        <span className="text-muted">
          &copy; {new Date().getFullYear()} JobPortal. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
