import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/AuthService";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await AuthService.login(inputEmail, inputPassword);
      navigate("/home");
    } catch {
      setError(true);
    }
  }

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-4 px-2">
      <div className="flex flex-col gap-2">
        <Label className="text-[2rem] font-semibold tracking-wide text-surface-neutral">Welcome</Label>
        <Label className="text-[1.5rem] font-semibold tracking-wide text-opacity-85 text-surface-neutral">Sign In</Label>
      </div>
      {error && (<Label className="text-red">wrong email or password</Label>)}
      <div className="flex flex-col gap-6 w-full md:w-1/2 text-dark-ocean-blue">
        <Input onChange={(event) => setInputEmail(event.target.value)} className="px-2 py2 h-[3rem]" placeholder="Email..." />
        <Input onChange={(event) => setInputPassword(event.target.value)} className="px-2 py2 h-[3rem]" type="password" placeholder="******" />
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/2 text-surface-neutral">
        <Label className="text-right text-red text-opacity-85">Forgot your password?</Label>
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/2 text-surface-neutral">
        <Button onClick={handleLogin} className="h-[3rem] px-2 py-2 bg-blue text-surface-neutral font-semibold tracking-wide hover:bg-surface-neutral hover:text-blue ">
          Continue
        </Button>
      </div>
      <div className="flex flex-row gap-2 w-full md:w-1/2 text-surface-neutral items-center">
        <div className="w-1/2 h-[1px] bg-surface-neutral"></div>
        <Label className="text-surface-neutral">or</Label>
        <div className="w-1/2 h-[1px] bg-surface-neutral"></div>
      </div>
      <div className="flex flex-row gap-2 w-full md:w-1/2 text-surface-neutral items-center justify-center">
        <Label>Don't have an account?</Label>
        <Link to="/register" className="text-blue hover:underline">Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;