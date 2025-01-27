import { useEffect } from "react";
import useUserStore from "@/stores/user";
import { supabase } from "@/utils/supabaseClient";

export const useAuthListener = () => {
  const { setAuthState } = useUserStore();

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthState(session?.user || null, session);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [setAuthState]);
};
