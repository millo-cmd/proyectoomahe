import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";
import "./Column.css";

const Column = ({ title, tasks }) => {
    const { setNodeRef } = useDroppable({ id: title }); // Configura el área droppable

    return (
        <div className="task-column">
            <h4>{title}</h4>
            <div ref={setNodeRef} className="task-list">
                {tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Column;
