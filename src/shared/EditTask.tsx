import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTaskContext } from "@/context/TaskContext";
import { TaskModel } from "@/models/TaskModel";
import { X } from "lucide-react";
import React, { useState } from "react";

interface EditTaskComponentProps {
  show: boolean;
  onClose: () => void;
  task:TaskModel;
}

const EditTaskComponent: React.FC<EditTaskComponentProps> = ({ show, onClose, task }) => {
  const { updateTask} =useTaskContext();
  const [selectedState, setSelectedState] = useState<string>(task.completed ? "Completed" : "In Progress");
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);


  if (!show) return null;

  const handleUpdateTask=async()=>{
    await updateTask(task._id, {
      title,
      description,
      completed: selectedState==="true"
    })
    onClose();
  }

  const cleanForm=()=>{
    setTitle(task.title);
    setDescription(task.description);
    setSelectedState(task.completed ? "Completed" : "In Progress");
    onClose();
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-y-auto bg-black bg-opacity-70 z-50">
      <Card className="w-full md:w-1/2 mt-20 bg-surface-neutral border-none">
        <CardTitle className="flex flex-row items-center justify-between px-4 py-4 border-b-2 border-black text-black">
          <Label className="text-[1.2rem] tracking-wide">Edit Task</Label>
          <X onClick={cleanForm} />
        </CardTitle>
        <CardContent className="p-2">
          <div className="flex flex-col px-4 py-2 gap-2">
            <Label className="text-black text-[1.2rem] tracking-wide text-opacity-75 text-left">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-degree-grass border border-black h-[3rem] text-black"
              placeholder="Task title..."
            />
          </div>
          <div className="flex flex-col px-4 py-2 gap-2">
            <Label className="text-black text-[1.2rem] tracking-wide text-opacity-75 text-left">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-degree-grass border border-black h-[3rem] text-black"
              placeholder="Task description..."
            />
          </div>
          <div className="flex flex-col px-4 py-2 gap-2">
            <Label className="text-black text-[1.2rem] tracking-wide text-opacity-75 text-left">State</Label>
            <Select onValueChange={setSelectedState}>
              <SelectTrigger className="w-full h-[3rem] border border-black bg-degree-grass">
                <SelectValue placeholder={selectedState ? selectedState : "select a state" } />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Options</SelectLabel>
                  <SelectItem value="false">In Progress</SelectItem>
                  <SelectItem value="true">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <div className="flex flex-row gap-2 w-full items-center justify-end px-4 py-2">
          <Button
          onClick={handleUpdateTask}
            className="bg-blue h-[3rem] text-[1.2rem] text-surface-neutral font-semibold hover:text-blue hover:border-blue hover:bg-surface-neutral"
          >
            Save
          </Button>
          <Button className="text-surface-neutral h-[3rem] text-[1.2rem] bg-red font-semibold hover:text-red hover:bg-surface-neutral"
            onClick={cleanForm}>Cancel</Button>
        </div>
      </Card>
    </div>
  );
}

export default EditTaskComponent;