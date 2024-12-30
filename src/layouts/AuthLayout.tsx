import { Card } from "@/components/ui/card";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center">
      <Card className="h-4/5 w-full md:w-1/2 bg-dark-ocean-blue border-dark-ocean-blue md:bg-ligth-ocean-blue md:border-ligth-ocean-blue">
        <Outlet />
      </Card>
    </div>
  );
}

export default AuthLayout;