import React, { useEffect } from 'react';
import '../index.css';

const DailyReport = () => {
  useEffect(() => {
    window.open("https://doe.gov.bd/site/page/8efde0a3-392e-4a86-bac4-7149ff908be7/", "_blank");
  }, []);

  return (
    <div className="daily-report-container" style={{ textAlign: "center", padding: "20px" }}>
      <h2>Redirecting to DOE Report...</h2>
      <p>If the page does not open, <a href="https://doe.gov.bd/site/page/8efde0a3-392e-4a86-bac4-7149ff908be7/" target="_blank" rel="noopener noreferrer">click here</a>.</p>
    </div>
  );
};

export default DailyReport;
