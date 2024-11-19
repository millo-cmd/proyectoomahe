import React from 'react';

const Dashboard = ({ tasks }) => {
    return (
        <div className="dashboard">
            <h2>Panel de Control - Tareas Asignadas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tarea</th>
                        <th>Usuario Asignado</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(tasks).map((task) => (
                        <tr key={task.id}>
                            <td>{task.content}</td>
                            <td>{task.assignedUser}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
