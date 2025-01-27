import Layout from "@/components/Layout";
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
  ) : isLogin ? (
    <>
      <Login />
      <button onClick={() => setIsLogin(false)}>go to register</button>
    </>
  ) : (
    <>
      <Register />
      <button onClick={() => setIsLogin(true)}>go to login</button>
    </>
  );
}
