import useUserStore from "@/stores/user";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Name is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { loginUser } = useUserStore();

  const onSubmit = async ({ email, password }) => {
    loginUser(email, password);
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="email" />
        {errors.email && <span>{errors.email.message}</span>}

        <input {...register("password")} placeholder="password" />
        {errors.password && <span>{errors.password.message}</span>}

        <Button type="submit">Login</Button>
      </form>
    </>
  );
};

export default Login;
