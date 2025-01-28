import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Login from "@/components/user/Login";
import Register from "@/components/user/Register";
import { useAuthListener } from "@/hooks/useAuthListener";
import useUserStore from "@/stores/user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useAuthListener();

  const { user } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);

  return user ? (
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
  );
}
