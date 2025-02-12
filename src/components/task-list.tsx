import { Trash,Edit } from "lucide-react";

import { TaskType } from "../types/task";
import { Button, Table, Modal } from "antd";
import { Tag } from "antd" ;
import { Plus } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TaskForm from "../components/task-form"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


interface TaskListProps {
  tasks: TaskType[];
  updateStatus: (id: string, newStatus: "completed" | "pending") => void;
  deleteTask: (id: string) => void;
  setTaskToEdit: React.Dispatch<React.SetStateAction<TaskType | null>>;
}

//tag color
const getPriorityColor = (priority: string) => {
    if (priority === "High") {
        return "red";
      } else if (priority === "Low") { 
        return "purple";
      } else {
        return "gold"; 
      }
};


const TaskList: React.FC<TaskListProps> = ({ tasks, updateStatus, deleteTask, setTaskToEdit }) => {

//this is model part

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  //this is add task function
 
  const [taskName, setTaskName] = useState<string>("")
    const [taskType, setTaskType] =useState<string>("")
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newTask: TaskType = {
            id: Date.now().toString(),
            name: taskName,
            status: "pending",
            type: taskType
        }

        const savedTasks = JSON.parse(
            localStorage.getItem("tasks") || "[]"
        ) as TaskType[]
        savedTasks.push(newTask)
        localStorage.setItem("tasks", JSON.stringify(savedTasks))
        navigate("/tasks")
    }


  const columns = [
    {
      key: "1",
      title: "NO",
      dataIndex: "no",
      render: (_: any, __: any, index: number) => index + 1, // Auto-generate row number
    },
    {
      key: "2",
      title: "Task",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Priority",
      dataIndex: "type",
      render: (_: any, record: TaskType) => (
        <Tag  color={getPriorityColor(record.type)}  style={{borderRadius:10}}>
        <span className="uppercase " >{record.type}</span> 
        </Tag>)
    },
    {
      key: "4",
      title: "Status",
      dataIndex: "status",
      render: (_: any, record: TaskType) => (
        <Tag
        className="px-3 py-1 rounded cursor-pointer"
        onClick={() => updateStatus(record.id, record.status === "completed" ? "pending" : "completed")}
        color={record.status === "completed" ? "purple" : "success"} 
        style={{ borderRadius: 10 }}
      >
        {record.status === "completed" ? "Completed" : "Pending"}
      </Tag>
      ),
    },
    {
      key: "5",
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: TaskType) => (
        <div className="flex gap-2">
          <button
            className="mr-2  py-1  text-green-400 rounded"
            onClick={() => setTaskToEdit(record)}
          >
            <EditOutlined></EditOutlined>
          </button>
          <button
            className="py-1  text-red-400 rounded"
            onClick={() => deleteTask(record.id)}
          >
             <DeleteOutlined></DeleteOutlined>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks yet. Add some tasks!</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-end">
          <Button type="primary" className="bg-blue-700 " onClick={showModal}>
              <Plus/>                
              Add New Task           
          </Button>


          {/* this is model handle part*/}
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
          <div>
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <TaskForm
                taskType={taskType}
                setTaskType={setTaskType}
                taskName={taskName}
                setTaskName={setTaskName}
                handleSubmit={handleSubmit}
               />
          </div>    
          </Modal>

          </div>
          <Table
            dataSource={tasks.map((task, index) => ({ ...task, key: task.id, no: index + 1 }))}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
