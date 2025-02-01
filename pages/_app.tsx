import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Login from "@/components/user/login/Login";
import Register from "@/components/user/register/Register";
import { useAuthListener } from "@/hooks/auth/useAuthListener";
import useUserStore from "@/stores/user/user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  useAuthListener();

  const { user } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {user ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <>
          {isLogin ? <Login /> : <Register />}
          <Button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "go to register" : "go to login"}
          </Button>
        </>
      )}
      <Toaster />
    </>
  );
}
