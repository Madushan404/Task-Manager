import { useEffect, useState } from "react";
import TaskList from "../components/task-list";
import { TaskType } from "../types/task";
import { Card, Input, Button } from "antd";

const TaskPage = () => {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  });
    const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null); 
    const [taskName, setTaskName] = useState<string>(""); // Input for editing task

    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

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
               
                    
                      <Card title="Edit Task" className="w-full max-w-md mx-auto shadow-md">
                        <form onSubmit={handleEditTask} className="flex flex-col gap-4">
                          {/* Task Name Input */}
                          <Input 
                            required
                            type="text" 
                            value={taskName} 
                            onChange={(e) => setTaskName(e.target.value)} 
                            placeholder="Edit Task..."                       />
                  
                          {/* Action Buttons */}
                          <div className="flex justify-end gap-2">
                            <Button color="cyan" variant="outlined"  htmlType="submit" >
                              Update Task
                            </Button>
                            <Button danger onClick={() => setTaskToEdit(null)}>
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </Card>
                 
                  
                 
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
