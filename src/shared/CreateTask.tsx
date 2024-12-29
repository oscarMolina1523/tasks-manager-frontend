import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTaskContext } from "@/context/TaskContext";
import { X } from "lucide-react";
import React, { useState } from "react";

interface CreateTaskComponentProps {
  show: boolean;
  onClose: () => void;
}

const CreateTaskComponent: React.FC<CreateTaskComponentProps> = ({ show, onClose }) => {
  const { createTask} = useTaskContext();
  const [selectedState] = useState<string>( "false");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const date = new Date().toISOString();


  if (!show) return null;

  const handleCreateTask = async () => {
    await createTask({
      title,
      description,
      createdAt: date,
      completed: selectedState === "true",
    })

    onClose();
  }

  const isSaveDisabled = title.trim() === "" || description.trim() === "";

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-y-auto bg-gray bg-opacity-40 z-50">
      <Card className="w-full md:w-1/2 mt-20 bg-surface-neutral border-none">
        <CardTitle className="flex flex-row items-center justify-between px-4 py-4 border-b-2 border-black text-black">
          <Label className="text-[1.2rem]">Create Task</Label>
          <X onClick={onClose} />
        </CardTitle>
        <CardContent className="p-2">
          <div className="flex flex-col px-4 py-4 gap-2">
            <Label className="text-black text-[1.2rem] tracking-wide text-opacity-75 text-left">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className=" border border-black h-[3rem] text-black"
              placeholder="Task title..."
            />
          </div>
          <div className="flex flex-col px-4 py-4 gap-2">
            <Label className="text-black text-[1.2rem] tracking-wide text-opacity-75 text-left">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" border border-black h-[3rem] text-black"
              placeholder="Task description..."
            />
          </div>
        </CardContent>
        <div className="flex flex-row gap-2 w-full items-center justify-end px-4 py-4">
          <Button
            onClick={handleCreateTask}
            disabled={isSaveDisabled}
            className={`bg-blue h-[3rem] text-[1.2rem] text-surface-neutral font-semibold hover:text-blue hover:border-blue hover:bg-surface-neutral ${isSaveDisabled ? "opacity-50 " : ""}`}
          >
            Save
          </Button>
          <Button className="text-surface-neutral h-[3rem] text-[1.2rem] bg-red font-semibold hover:text-red hover:bg-surface-neutral"
            onClick={onClose}>Cancel</Button>
        </div>
      </Card>
    </div>
  );
}

export default CreateTaskComponent;