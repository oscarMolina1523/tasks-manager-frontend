import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTaskContext } from "@/context/TaskContext";
import CreateTaskComponent from "@/shared/CreateTask";
import TaskPreviewComponent from "@/shared/TaskPreview";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const HomePage: React.FC = () => {
  const { tasks, loading, error } = useTaskContext();
  const [show, setShow] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all"); 

  const handleCreateTask = () => {
    setShow(!show);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed === true; 
    }
    if (filter === "in progress") {
      return task.completed === false; 
    }
    return true; 
  });

  return (
    <>
      <header className="w-full h-[6rem] flex flex-row items-center justify-start p-3 ">
        <nav className="w-full h-full flex flex-row gap-2">
          <div className="flex overflow-hidden aspect-circle rounded-full h-full p-1">
            <img className="object-cover rounded-full"
              src="https://w0.peakpx.com/wallpaper/854/533/HD-wallpaper-chinese-girl-asian-flower-face-art-luminos-smile-fantasy-profile-girl-purple-peter-xiao-chinese-portrait.jpg"
              alt="img-profile" />
          </div>
          <div className="flex flex-col w-full h-full text-left">
            <Label className="text-black opacity-75 text-[1.2rem]">Hello!</Label>
            <Label className="text-black text-[1.4rem]">Hade Tiziana Romero</Label>
          </div>
        </nav>
      </header>
      <main className="flex flex-col gap-4 items-center h-full pb-4">
        <div className="flex flex-row items-center gap-2 px-2 justify-center">
          <Button onClick={() => handleFilterChange("all")} className="bg-degree-blue text-blue hover:text-surface-neutral hover:bg-blue">All</Button>
          <Button onClick={() => handleFilterChange("in progress")} className="bg-degree-blue text-blue hover:text-surface-neutral hover:bg-blue">In Progress</Button>
          <Button onClick={() => handleFilterChange("completed")} className="bg-degree-blue text-blue hover:text-surface-neutral hover:bg-blue">Completed</Button>
        </div>
        <div className="flex flex-row items-center gap-2 px-2 justify-center">
          <Button onClick={handleCreateTask} className="bg-green text-surface-neutral hover:text-green hover:bg-surface-neutral hover:border hover:border-green">
            <Plus className="h-6 w-6"/>
            New Task
          </Button>
        </div>
        <div className="flex flex-col items-center w-full px-2 gap-2">
          {filteredTasks.map((task) => (
            <div key={task._id} className="w-full h-full">
              <TaskPreviewComponent task={task}/>
            </div>
          ))}
        </div>
        <CreateTaskComponent show={show} onClose={handleCreateTask}/>
      </main>
    </>
  );
}

export default HomePage;