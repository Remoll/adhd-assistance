import { supabase } from "@/utils/supabaseClient";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserStoreType = {
  user: User | null;
  session: Session | null;
  setAuthState: (user: User | null, session: Session | null) => void;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
};

const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  session: null,

  setAuthState: async (user: User | null, session: Session | null) =>
    set({ user, session }),

  loginUser: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Błąd logowania:", error.message);
      return;
    } else {
      console.log("Użytkownik zalogowany");
    }

    return set({ user: data.user, session: data.session });
  },

  logoutUser: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Błąd wylogowania:", error.message);
    } else {
      console.log("Użytkownik wylogowany.");
    }
    return set({ user: null, session: null });
  },
}));

export default useUserStore;
