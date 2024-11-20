import React from "react";
import Task from "./Task";

const Column = ({ title, tasks, setTasks }) => {
  console.log(`Tareas en la columna "${title}":`, tasks);

  const handleDrop = async (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    console.log("Task ID recibido en handleDrop:", taskId);

    if (!taskId) {
      console.error("Error: No se recibió un taskId válido en el evento de drop.");
      return;
    }

    try {
      const response = await fetch(`/api/v1/task/update/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progresion: title }),
      });

      if (!response.ok) {
        console.error("Error al actualizar la tarea:", response.statusText);
        return;
      }

      const updatedTask = await response.json();
      console.log("Tarea actualizada:", updatedTask);

      setTasks((prev) => {
        const updatedTasks = { ...prev };
        const taskToMove = Object.values(prev)
          .flat()
          .find((task) => task._id === taskId);

        if (taskToMove) {
          updatedTasks[taskToMove.progresion] = updatedTasks[taskToMove.progresion].filter(
            (t) => t._id !== taskId
          );
          taskToMove.progresion = title;
          updatedTasks[title].push(taskToMove);
        }

        return updatedTasks;
      });
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  };

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p>No hay tareas</p>
        )}
      </div>
    </div>
  );
};

export default Column;
