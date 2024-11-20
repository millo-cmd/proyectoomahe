import React from "react";
import Task from "./Task";


const Column = ({ columnId, title, tasks, onTaskDrop }) => {
  console.log("Props recibidas en Column:", { columnId, title, tasks, onTaskDrop });
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    console.log("handleDrop invocado:", { taskId, columnId, onTaskDrop });
    if (onTaskDrop) {
      onTaskDrop(taskId, columnId);
    } else {
      console.error("onTaskDrop no está definido");
    }
  };


  return (
    <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
