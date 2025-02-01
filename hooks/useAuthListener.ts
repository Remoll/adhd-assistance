// TODO: handle api ??

import { useEffect } from "react";
import useUserStore from "@/stores/user";
import { supabase } from "@/utils/supabaseClient";

export const useAuthListener = () => {
  const { setAuthState } = useUserStore();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setAuthState(session.user, session);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState(session?.user || null, session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [setAuthState]);
};
