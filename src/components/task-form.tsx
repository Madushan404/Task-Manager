import { useEffect } from "react";
import { TaskType } from "../types/task";


interface TaskFormProps {
    taskName: string
    setTaskName: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: (e: React.FormEvent) => void
    taskToEdit?:TaskType;
}

const TaskForm: React.FC<TaskFormProps> = ({
    taskName,
    setTaskName,
    handleSubmit,
    taskToEdit
}) => {

    useEffect(() => {
        if (taskToEdit) {
            setTaskName(taskToEdit.name); // Populate the input with the task's name when editing
        }
    }, [taskToEdit, setTaskName]);

    return (
        <form className="flex gap-3 " onSubmit={handleSubmit}>
            <input
                required
                type="text"
                placeholder="Enter Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="max-w-[610px] w-full p-2 border border-gray-300 rounded "
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ml-auto flex gap-4"
            >
                Add Task
            </button>
        </form>
    )
}

export default TaskForm
