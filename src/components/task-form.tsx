import { useEffect } from "react";
import { TaskType } from "../types/task";
import { Check } from "lucide-react";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface TaskFormProps {
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  setTaskType: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  taskToEdit?: TaskType;
  taskToType?: TaskType;
  taskType: string;
}

// Menu items for dropdown
const items: MenuProps["items"] = [
  { label: "High", key: "High" },
  { label: "Medium", key: "Medium" },
  { label: "Low", key: "Low" },
];

const TaskForm: React.FC<TaskFormProps> = ({
  taskName,
  taskType,
  setTaskName,
  handleSubmit,
  setTaskType,
  taskToEdit,
  taskToType,
}) => {
  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name); // Populate input with task name
    }
  }, [taskToEdit, setTaskName]);

  useEffect(() => {
    if (taskToType) {
      setTaskType(taskToType.type); // Populate dropdown with task type
    }
  }, [taskToType, setTaskType]);

  // Handle dropdown item selection
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setTaskType(e.key);
  };

  return (
    <div className="w-3/4 justify-center items-center mx-auto">
      <p className="text-lg font-semibold mb-4" >Add Your Task List and Priority</p>

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
            <Dropdown  menu={{ items, onClick: handleMenuClick  }}>
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
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
