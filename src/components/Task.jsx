import React from 'react';

function Task({ task }) {
  const handleDragStart = (event) => {
    console.log(`Arrastrando tarea con id: ${task.id}`);
    event.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div className="task" draggable onDragStart={handleDragStart}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
}

export default Task;
