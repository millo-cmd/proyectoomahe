import React, { useState, useEffect } from "react";
import Column from "./Column";

const Dashboard = () => {
  const [tasks, setTasks] = useState({});
  const [columns, setColumns] = useState({
    todo: { title: "No Iniciada", taskIds: [] },
    inProgress: { title: "En Proceso", taskIds: [] },
    done: { title: "Finalizado", taskIds: [] },
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:4000/api/v1/task");
      const { tasks: fetchedTasks } = await response.json();

      const taskMap = {};
      const columnMap = { todo: [], inProgress: [], done: [] };

      fetchedTasks.forEach((task) => {
        const id = task._id;
        taskMap[id] = {
          id,
          title: task.nombre,
          description: task.descripcion,
        };

        switch (task.progresion) {
          case "No Iniciada":
            columnMap.todo.push(id);
            break;
          case "En Progreso":
            columnMap.inProgress.push(id);
            break;
          case "Finalizada":
            columnMap.done.push(id);
            break;
          default:
            break;
        }
      });

      setTasks(taskMap);
      setColumns((prevColumns) => ({
        ...prevColumns,
        todo: { ...prevColumns.todo, taskIds: columnMap.todo },
        inProgress: { ...prevColumns.inProgress, taskIds: columnMap.inProgress },
        done: { ...prevColumns.done, taskIds: columnMap.done },
      }));
    };

    fetchTasks();
  }, []);

  const handleTaskDrop = async (taskId, columnId) => {
    console.log("handleTaskDrop invocado con:", taskId, columnId);
    const endpointMap = {
      todo: "updateStatusToDo",
      inProgress: "updateStatusInProgress",
      done: "updateStatusFinished",
    };

    const endpoint = endpointMap[columnId];
    if (!endpoint) return;

    try {
      await fetch(`http://localhost:4000/api/v1/task/${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId }),
      });

      setColumns((prevColumns) => {
        const sourceColumnId = Object.keys(prevColumns).find((key) =>
          prevColumns[key].taskIds.includes(taskId)
        );

        if (!sourceColumnId) return prevColumns;

        const sourceTaskIds = [...prevColumns[sourceColumnId].taskIds];
        const destinationTaskIds = [...prevColumns[columnId].taskIds];

        sourceTaskIds.splice(sourceTaskIds.indexOf(taskId), 1);
        destinationTaskIds.push(taskId);

        return {
          ...prevColumns,
          [sourceColumnId]: { ...prevColumns[sourceColumnId], taskIds: sourceTaskIds },
          [columnId]: { ...prevColumns[columnId], taskIds: destinationTaskIds },
        };
      });
    } catch (error) {
      console.error("Error al actualizar la progresión:", error);
    }
  };

  return (
    <div className="dashboard">
      {Object.entries(columns).map(([columnId, column]) => (
        <Column
          key={columnId}
          columnId={columnId}
          title={column.title}
          tasks={column.taskIds.map((taskId) => tasks[taskId])}
          onTaskDrop={handleTaskDrop}
        />
      ))}
    </div>
  );
};

export default Dashboard;
