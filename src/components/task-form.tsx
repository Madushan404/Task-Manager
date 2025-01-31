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


import { BellRing, Check } from "lucide-react"
 
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"



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
        
        <Card>
  <CardHeader>
    <CardDescription>Add Your Task List and Priroraty</CardDescription>
  </CardHeader>
  <CardContent>
  <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Your Task</Label>
              <Input id="name" placeholder="Name of your Task" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Priority</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
  </CardContent>
  <CardFooter>
    <Button className="w-full mr-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-800"  > <Check />Add Task</Button>
  </CardFooter>
</Card>


        
        


    )
}

export default TaskForm
