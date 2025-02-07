import { TaskType } from "../types/task";
import { Table } from "antd";

interface TaskListProps {
  tasks: TaskType[];
  updateStatus: (id: string, newStatus: "completed" | "pending") => void;
  deleteTask: (id: string) => void;
  setTaskToEdit: React.Dispatch<React.SetStateAction<TaskType | null>>;
}

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
    },
    {
      key: "4",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "5",
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: TaskType) => (
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => setTaskToEdit(record)} 
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => deleteTask(record.id)} 
          >
            Delete
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
