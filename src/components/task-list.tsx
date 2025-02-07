import { Trash,Edit } from "lucide-react";
import { TaskType } from "../types/task";
import { Table } from "antd";
import { Tag } from "antd" ;

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
            <Edit/>
          </button>
          <button
            className="py-1  text-red-400 rounded"
            onClick={() => deleteTask(record.id)}
          >
            <Trash/>
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
