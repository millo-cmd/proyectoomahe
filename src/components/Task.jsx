import React from "react";
import { useDraggable } from "@dnd-kit/core";
import "./Task.css";

const Task = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="task-item"
        >
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
    );
};

export default Task;
