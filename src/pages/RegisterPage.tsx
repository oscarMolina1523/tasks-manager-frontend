import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/AuthService";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [failed, setFailed] = useState<string | null>(null);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setFailed("Passwords do not match");
        return;
      }

      if (!validateEmail(email)) {
        setFailed("Please enter a valid email.");
        return;
      }

      await AuthService.register(email, password);

      navigate("/home");
    } catch {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-4 px-2">
      <div className="flex flex-col gap-2">
        <Label className="text-[2rem] font-semibold tracking-wide text-surface-neutral">Welcome</Label>
        <Label className="text-[1.5rem] font-semibold tracking-wide text-opacity-85 text-surface-neutral">Sign Up</Label>
      </div>
      {error && (<Label className="text-red">Error when registering</Label>)}
      {failed && (<Label>{failed}</Label>)}
      <div className="flex flex-col gap-6 w-full md:w-1/2 text-dark-ocean-blue">
        <Input
          onChange={(event) => setEmail(event.target.value)}
          className="px-2 py-2 h-[3rem]"
          placeholder="Email..."
        />
        <Input
          onChange={(event) => setPassword(event.target.value)}
          className="px-2 py-2 h-[3rem]"
          type="password"
          placeholder="Password"
        />
        <Input
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="px-2 py-2 h-[3rem]"
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/2 text-surface-neutral">
        <Button
          onClick={handleRegister}
          className="h-[3rem] px-2 py-2 bg-blue text-surface-neutral font-semibold tracking-wide hover:bg-surface-neutral hover:text-blue"
        >
          Register
        </Button>
      </div>
      <div className="flex flex-row gap-2 w-full md:w-1/2 text-surface-neutral items-center justify-center">
        <Label>Already have an account?</Label>
        <Link to="/login" className="text-blue hover:underline">Sign In</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
