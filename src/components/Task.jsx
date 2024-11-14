import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => (
    <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
            <div
                className="task-item"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {task.content}
            </div>
        )}
    </Draggable>
);

export default Task;
