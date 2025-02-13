import { Trash, Edit } from "lucide-react";
import { TaskType } from "../types/task";
import { Button, Table, Modal, Drawer, Input, Tag } from "antd";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/task-form";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface TaskListProps {
  tasks: TaskType[];
  updateStatus: (id: string, newStatus: "completed" | "pending") => void;
  deleteTask: (id: string) => void;
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

const getPriorityColor = (priority: string) => {
  if (priority === "High") return "red";
  if (priority === "Low") return "purple";
  return "gold";
};

const TaskList: React.FC<TaskListProps> = ({ tasks, updateStatus, deleteTask, setTasks }) => {
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);
  const [taskName, setTaskName] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskType, setTaskType] = useState<string>("");
  const navigate = useNavigate();

  const showDrawer = (task: TaskType) => {
    setTaskToEdit(task);
    setTaskName(task.name);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setTaskToEdit(null);
    setTaskName("");
  };

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskToEdit) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, name: taskName } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: TaskType = {
      id: Date.now().toString(),
      name: taskName,
      status: "pending",
      type: taskType,
    };
    const savedTasks = [...tasks, newTask];
    setTasks(savedTasks);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    setIsModalOpen(false);
    navigate(0);
  };

  const columns = [
    { key: "1", title: "NO", dataIndex: "no", render: (_: any, __: any, index: number) => index + 1 },
    { key: "2", title: "Task", dataIndex: "name" },
    { key: "3", title: "Priority", dataIndex: "type", render: (_: any, record: TaskType) => <Tag color={getPriorityColor(record.type)}>{record.type}</Tag> },
    { key: "4", title: "Status", dataIndex: "status", render: (_: any, record: TaskType) => (
      <Tag onClick={() => updateStatus(record.id, record.status === "completed" ? "pending" : "completed")} color={record.status === "completed" ? "purple" : "success"}>{record.status === "completed" ? "Completed" : "Pending"}</Tag>
    )},
    { key: "5", title: "Actions", dataIndex: "actions", render: (_: any, record: TaskType) => (
      <div className="flex gap-2">
        <button className="mr-2 text-green-400" onClick={() => showDrawer(record)}>
          <EditOutlined />
        </button>
        <button className="text-red-400" onClick={() => deleteTask(record.id)}>
          <DeleteOutlined />
        </button>
      </div>
    )},
  ];

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-end mb-4">
        <Button type="primary" className="bg-blue-700" onClick={() => setIsModalOpen(true)}>
          <Plus /> Add New Task
        </Button>
      </div>
      <Table dataSource={tasks.map((task, index) => ({ ...task, key: task.id, no: index + 1 }))} columns={columns} pagination={{ pageSize: 5 }} />
      <Modal title="Add New Task" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <TaskForm taskType={taskType} setTaskType={setTaskType} taskName={taskName} setTaskName={setTaskName} handleSubmit={handleSubmit} />
      </Modal>
      <Drawer title="Edit Task" onClose={onClose} open={open}>
        {taskToEdit && (
          <form onSubmit={handleEditTask} className="flex flex-col gap-4">
            <Input required type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Edit Task..." />
            <div className="flex justify-end gap-2">
              <Button type="primary" htmlType="submit">Update Task</Button>
              <Button danger onClick={onClose}>Cancel</Button>
            </div>
          </form>
        )}
      </Drawer>
    </div>
  );
};

export default TaskList;
