import React from 'react';
import './Dashboard.css';  

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Você logou nesse site sem segurança!</h2>
      </div>
      <div className="dashboard-content">
        <p>Bem-vindo!</p>
      </div>
    </div>
  );
};

export default Dashboard;
