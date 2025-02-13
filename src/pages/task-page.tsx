import { useEffect, useState } from "react";
import TaskList from "../components/task-list";
import { TaskType } from "../types/task";

const TaskPage = () => {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const updateTaskStatus = (id: string, newStatus: "completed" | "pending") => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <TaskList tasks={tasks} updateStatus={updateTaskStatus} deleteTask={deleteTask} setTasks={setTasks} />
    </div>
  );
};

export default TaskPage;
