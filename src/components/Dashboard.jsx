import React, { useEffect, useState } from "react";
import Column from "./Column";

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    "No iniciada": [],
    "En proceso": [],
    "Finalizado": [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/v1/task");
      const data = await response.json();

      if (data.tasks) {
        const organizedTasks = {
          "No iniciada": [],
          "En proceso": [],
          "Finalizado": [],
        };

        data.tasks.forEach((task) => {
          if (organizedTasks[task.progresion]) {
            organizedTasks[task.progresion].push(task);
          } else {
            console.warn(`Progresión desconocida: ${task.progresion}`);
          }
        });

        setTasks(organizedTasks);
      } else {
        console.error("Error: No se encontraron tareas en la respuesta de la API");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      {Object.keys(tasks).map((status) => (
        <Column
          key={status}
          title={status}
          tasks={tasks[status]}
          setTasks={setTasks}
        />
      ))}
    </div>
  );
};

export default Dashboard;
