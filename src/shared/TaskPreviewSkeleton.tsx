import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TaskPreviewSkeleton: React.FC = () => {
  return (
    <div className="w-full rounded-md flex flex-row p-2 bg-degree-gray mb-2">
      <div className="w-3/4 flex flex-col gap-2">
        <Skeleton className="w-3/4 h-full" />
        <Skeleton className="w-2/4 h-full" />
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex flex-col items-end justify-between gap-2 w-1/4">
        <Skeleton className="h-[3rem] w-1/2"/>
        <Skeleton className="h-[3rem] w-1/2"/>
      </div>
    </div>
  );
}

export default TaskPreviewSkeleton;