import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TaskType } from "../types/task"
import TaskForm from "../components/task-form"

const AddTask = () => {
    const [taskName, setTaskName] = useState<string>("")
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newTask: TaskType = {
            id: Date.now().toString(),
            name: taskName,
            status: "pending"
        }

        const savedTasks = JSON.parse(
            localStorage.getItem("tasks") || "[]"
        ) as TaskType[]
        savedTasks.push(newTask)
        localStorage.setItem("tasks", JSON.stringify(savedTasks))
        navigate("/tasks")
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <TaskForm
                taskName={taskName}
                setTaskName={setTaskName}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default AddTask
