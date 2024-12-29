import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTaskContext } from "@/context/TaskContext";
import { TaskModel } from "@/models/TaskModel";
import { Clock5, Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import EditTaskComponent from "./EditTask";


interface TaskPreviewComponentProps {
  task: TaskModel;
}

const TaskPreviewComponent: React.FC<TaskPreviewComponentProps> = ({ task }) => {
  const {deleteTask} =useTaskContext();

  const [show, setShow] = useState<boolean>(false);

  const handleEditTask = () => {
    setShow(!show);
  }

  const handleDeleteTask=async()=>{
    await deleteTask(task._id);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Card key={task._id} className="w-full rounded-md">
        <CardContent className="flex flex-row w-full p-2 shadow-xl shadow-degree-blue">
          <div className="w-3/4 flex flex-col gap-2">
            <Label className="text-left text-black font-semibold tracking-wide text-[1.2rem] ">{task.title}</Label>
            <div className="inline-flex gap-2 flex-wrap">
              <Badge
                className={`inline-flex w-auto px-2 py-1 tracking-wide rounded-xl border-none ${task.completed ? "text-blue-grass bg-degree-grass hover:bg-degree-grass" : "text-orange bg-degree-orange hover:bg-degree-orange"
                  }`}
              >
                {task.completed ? "Completed" : "In Progress"}
              </Badge>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Clock5 className="h-6 w-6 text-blue" />
              <Label className="text-left text-blue text-[1.15rem] font-semibold tracking-wide opacity-85">
                {formatDate(task.createdAt)}
              </Label>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between gap-2 w-1/4">
            <Button onClick={handleEditTask} className="bg-blue border-none text-surface-neutral">
              <Edit className="h-6 w-6" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger>
              <div className="bg-red border-none text-surface-neutral w-full rounded-md py-2 px-3">
                <Trash className="h-6 w-6" />
              </div>
                </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your task
                    and remove this data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-red text-surface-neutral hover:text-red hover:bg-surface-neutral hover:border hover:border-red">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteTask} className="bg-blue text-surface-neutral hover:text-blue hover:bg-surface-neutral hover:border hover:border-blue">Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
        </CardContent>
      </Card>
      <EditTaskComponent show={show} onClose={handleEditTask} task={task} />
    </>
  );
}

export default TaskPreviewComponent;