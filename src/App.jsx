import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const initialData = {
    tasks: {
        "task-1": { id: "task-1", content: "Task 1" },
        "task-2": { id: "task-2", content: "Task 2" },
        "task-3": { id: "task-3", content: "Task 3" },
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "Pending",
            taskIds: ["task-1"],
        },
        "column-2": {
            id: "column-2",
            title: "In Progress",
            taskIds: ["task-2"],
        },
        "column-3": {
            id: "column-3",
            title: "Completed",
            taskIds: ["task-3"],
        },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
};

const App = () => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState(initialData);

    const handleLogin = (credentials) => {
        console.log("Usuario autenticado con:", credentials);
        setUser({ email: credentials.email });
    };

    const handleLogout = () => {
        setUser(null);
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setData(newData);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newData = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setData(newData);
    };

    return (
        <div className="App">
            {user ? (
                <>
                    <header>
                        <h1>Task Manager</h1>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </header>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="columns">
                            {data.columnOrder.map((columnId) => {
                                const column = data.columns[columnId];
                                const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                                return <Column key={column.id} column={column} tasks={tasks} />;
                            })}
                        </div>
                    </DragDropContext>
                </>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
};

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            onLogin({ email, password });
        } else {
            alert("Por favor, completa todos los campos");
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

const Column = ({ column, tasks }) => {
    return (
        <div className="column">
            <h2>{column.title}</h2>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        className="taskList"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

const Task = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    className="task"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {task.content}
                </div>
            )}
        </Draggable>
    );
};

export default App;
