import React from "react";

const Task = ({ task }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", task.id);
  };

  return (
    <div className="task" draggable onDragStart={handleDragStart}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
