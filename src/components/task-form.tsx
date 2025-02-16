import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../slices/tasksSlice";
import { RootState } from "../store/store";
import { TaskType } from "../types/task";
import { Check } from "lucide-react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface TaskFormProps {
  taskToEdit?: TaskType;
  taskType:string;
  setTaskType:(type : string)=>void;
  taskName:string;
  setTaskName:(name: string) => void
  handleSubmit:(e:React.FormEvent)=>void;
}


const items: MenuProps["items"] = [
  { label: "High", key: "High" },
  { label: "Medium", key: "Medium" },
  { label: "Low", key: "Low" },
];

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit }) => {
  const dispatch = useDispatch();


  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskType(taskToEdit.type);
    }
  }, [taskToEdit]);

  // Dropdown selection handle function
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setTaskType(e.key);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: TaskType = {
      id: taskToEdit ? taskToEdit.id : crypto.randomUUID(),
      name: taskName,
      type: taskType,
      status: taskToEdit ? taskToEdit.status : "pending", // Ensure status is included
    };

    if (taskToEdit) {
      dispatch(editTask(newTask)); // update task in redux store
    } else {
      dispatch(addTask(newTask)); // add new task in Redux store
    }

    setTaskName("");
    setTaskType("");
  };

  return (
    <div className="w-3/4 justify-center items-center mx-auto">
      <p className="text-lg font-semibold mb-4">
        Add Your Task List and Priority
      </p>

      <form className="flex gap-3" onSubmit={handleSubmit} id="taskForm">
        <div className="grid w-full items-center gap-4">
          {/* Task Name Input */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="name">Your Task</label>
            <input
              id="name"
              required
              placeholder="Name of your Task"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          {/* Priority Dropdown */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="priority">Priority</label>
            <Dropdown menu={{ items, onClick: handleMenuClick }}>
              <div className="cursor-pointer p-2 border rounded flex items-center justify-between w-full">
                <span>{taskType || "Select Priority"}</span>
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
        </div>
      </form>

      {/* Submit Button */}
      <button
        className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-800"
        type="submit"
        form="taskForm"
      >
        <Check className="inline-block mr-2" />
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
};

export default TaskForm;
