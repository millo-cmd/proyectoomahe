import React from "react";

const Task = ({ task }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task._id); // Configura el ID de la tarea
    console.log("Task ID en DragStart:", task._id); // Verifica el ID configurado
  };

  return (
    <div
      className="task"
      draggable
      onDragStart={handleDragStart}
    >
      <h3>{task.nombre || "Sin nombre"}</h3>
      <p>{task.descripcion || "Sin descripción"}</p>
    </div>
  );
};

export default Task;
