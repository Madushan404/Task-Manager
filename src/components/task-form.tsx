import { useEffect } from "react";
import { TaskType } from "../types/task";
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input";

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {  Check } from "lucide-react"
 

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  
} from "@/components/ui/card"




const notifications = [
    {
      title: "Your call has been confirmed.",
      description: "1 hour ago",
    },
    {
      title: "You have a new message!",
      description: "1 hour ago",
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago",
    },
  ]



interface TaskFormProps {
    taskName: string
    setTaskName: React.Dispatch<React.SetStateAction<string>>
    setTaskType: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: (e: React.FormEvent) => void
    taskToEdit?:TaskType;
    taskToType?:TaskType;
    taskType:string
}



const TaskForm: React.FC<TaskFormProps> = ({
    taskName,
    taskType,
    setTaskName,
    handleSubmit,
    setTaskType,
    taskToEdit,
    taskToType
}) => {

    useEffect(() => {
        if (taskToEdit) {
            setTaskName(taskToEdit.name); // Populate the input with the task's name when editing
        }
    }, [taskToEdit, setTaskName]);

    useEffect(() => {
        if (taskToType) {
            setTaskType(taskToType?.type); // Populate the input with the task's name when editing
        }
    }, [taskToEdit, setTaskName]);

   

    return (
        
        <div  className="w-1/2 justify-center items-center mx-auto max-w-200">
        <Card>
  <CardHeader>
    <CardDescription>Add Your Task List and Priroraty</CardDescription>
  </CardHeader>
  <CardContent>
  <form className="flex gap-3 " onSubmit={handleSubmit} id="taskForm">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Your Task</Label>
              <Input id="name" required placeholder="Name of your Task" value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Priority</Label>
              <Select value={taskType} required onValueChange={setTaskType}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
    </form>
  </CardContent>
  <CardFooter>
    <Button className="w-full mr-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-800" id="taskForm" type="submit" onClick={() => document.getElementById("taskForm")?.requestSubmit()} > <Check />Add Task</Button>
  </CardFooter>
</Card>

</div>
        
        


    )
}

export default TaskForm
