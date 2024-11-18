import React from "react";

const Dashboard = ({ user }) => {
    return (
        <div className="dashboard">
            <h2>Panel de Control</h2>
            <p>Bienvenido al sistema, {user.email}.</p>
        </div>
    );
};

export default Dashboard;
