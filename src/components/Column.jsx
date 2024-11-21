import React from 'react';
import Task from './Task';

function Column({ columnId, title, tasks, onTaskDrop }) {
  const handleDrop = (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('taskId');
    console.log(`Tarea dropeada con id: ${taskId} en columna: ${columnId}`); // Verifica que columnId no sea undefined
    if (onTaskDrop) {
      onTaskDrop(taskId, columnId);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="column" onDrop={handleDrop} onDragOver={handleDragOver}>
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;
