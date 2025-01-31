import { useEffect, useState } from "react";
import TaskList from "../components/task-list";
import { TaskType } from "../types/task";

const TaskPage = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null); 
    const [taskName, setTaskName] = useState<string>(""); // Input for editing task

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as TaskType[];
        setTasks(savedTasks);
    }, []);

    // Update task status
    const updateTaskStatus = (id: string, newStatus: "completed" | "pending") => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    // Delete task
    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    // Handle edit task submission
    const handleEditTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskToEdit) {
            const updatedTasks = tasks.map((task) =>
                task.id === taskToEdit.id ? { ...task, name: taskName } : task
            );
            setTasks(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setTaskToEdit(null); 
            setTaskName(""); 
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Task List</h2>
         

            {taskToEdit && (
                <form onSubmit={handleEditTask} className="mb-4">
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Edit task..."
                        className="border p-2 mr-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
                        Update Task
                    </button>
                    <button
                        type="button"
                        className="ml-2 bg-gray-500 text-white px-3 py-2 rounded"
                        onClick={() => setTaskToEdit(null)} 
                    >
                        Cancel
                    </button>
                </form>
            )}

            <TaskList
                tasks={tasks}
                updateStatus={updateTaskStatus}
                deleteTask={deleteTask}
                setTaskToEdit={setTaskToEdit} 
            />
        </div>
    );
};

export default TaskPage;
