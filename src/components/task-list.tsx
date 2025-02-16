import { Button, Table, Modal, Drawer, Input, Tag } from "antd";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addTask, editTask, deleteTask, updateStatus } from "../slices/tasksSlice";
import TaskForm from "../components/task-form";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const getPriorityColor = (priority: string) => {
  if (priority === "High") return "red";
  if (priority === "Low") return "purple";
  return "gold";
};

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [taskToEdit, setTaskToEdit] = useState<any>(null);
  const [taskName, setTaskName] = useState<string>("");
  const [taskType, setTaskType] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDrawer = (task: any) => {
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
      dispatch(editTask({ id: taskToEdit.id, name: taskName, type: taskToEdit.type, status: taskToEdit.status }));
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask({ id: Date.now().toString(), name: taskName, status: "pending", type: taskType || "Medium" }));
    setIsModalOpen(false);
  };

  const columns = [
    { key: "1", title: "NO", dataIndex: "no", render: (_: any, __: any, index: number) => index + 1 },
    { key: "2", title: "Task", dataIndex: "name" },
    { key: "3", title: "Priority", dataIndex: "type", render: (_: any, record: any) => <Tag color={getPriorityColor(record.type)}>{record.type}</Tag> },
    { key: "4", title: "Status", dataIndex: "status", render: (_: any, record: any) => (
      <Tag onClick={() => dispatch(updateStatus({ id: record.id, status: record.status === "completed" ? "pending" : "completed" }))} color={record.status === "completed" ? "purple" : "success"}>
        {record.status === "completed" ? "Completed" : "Pending"}
      </Tag>
    )},
    { key: "5", title: "Actions", dataIndex: "actions", render: (_: any, record: any) => (
      <div className="flex gap-2">
        <button className="mr-2 text-green-400" onClick={() => showDrawer(record)}>
          <EditOutlined />
        </button>
        <button className="text-red-400" onClick={() => dispatch(deleteTask(record.id))}>
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
              <Button color="primary" variant="outlined" htmlType="submit">Update Task</Button>
              <Button danger onClick={onClose}>Cancel</Button>
            </div>
          </form>
        )}
      </Drawer>
    </div>
  );
};

export default TaskList;
