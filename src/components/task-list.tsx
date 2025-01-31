import { TaskType } from "../types/task";

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Edit, Plus, Trash } from "lucide-react";

interface TaskListProps {
    tasks: TaskType[];
    updateStatus: (id: string, newStatus: "completed" | "pending") => void;
    deleteTask: (id: string) => void;
    setTaskToEdit: React.Dispatch<React.SetStateAction<TaskType | null>>; 
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    updateStatus,
    deleteTask,
    setTaskToEdit,
}) => {
    return (
      <div className="w-full p-4 bg-white shadow-md rounded-lg">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks yet. Add some tasks!</p>
      ) : (

        
        <div className="overflow-x-auto">
           <Table className="w-full border border-gray-200 rounded-lg">
          
            <TableHeader className="bg-gray-200 text-gray-700">
              <TableRow>
                <TableHead className="text-center p-4">To Do Task</TableHead>
                <TableHead className="text-center p-4">Priority</TableHead>
                <TableHead className="text-center p-4">Status</TableHead>
                <TableHead className="text-center p-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  className="odd:bg-gray-100 even:bg-white transition duration-200 hover:bg-gray-50"
                >
                  <TableCell className="p-4">
                    <span className={task.status === "completed" ? "line-through text-gray-500" : ""}>
                      {task.name}
                    </span>
                  </TableCell>

                  <TableCell className="p-4">
                    <span className="capitalize">{task.type}</span>
                  </TableCell>

                  <TableCell className="text-center">
                    <Button
                      className="bg-green-500 text-white rounded hover:bg-green-800 "
                      onClick={() =>
                        updateStatus(task.id, task.status === "completed" ? "pending" : "completed")
                      }
                    >
                      {task.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
                    </Button>
                  </TableCell>

                  <TableCell className="text-center">
                    <Button
                      className="mr-2  py-1  text-green-400 rounded "
                      variant="link"
                      onClick={() => setTaskToEdit(task)}
                    >
                      <Edit/>
                    </Button>

                    <Button
                      className=" py-1  text-red-400 rounded "
                      variant="link"
                      onClick={() => deleteTask(task.id)}
                    >
                       <Trash/>
                      
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
    );
};

export default TaskList;
