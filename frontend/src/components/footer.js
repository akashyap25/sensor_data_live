import React from 'react';
import './footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const githubUrl = 'https://github.com/akashyap25/sensor_data_live';
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
        <a className="github-link" href={githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <div className="footer-right">
          <span className="copyright">
            &copy; {currentYear} Anurag. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
