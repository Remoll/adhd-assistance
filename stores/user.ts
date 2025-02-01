import { Session, User } from "@supabase/supabase-js";
import axios from "axios";
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
    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });

      return set({ user: data.user, session: data.session });
    } catch (error) {
      console.error(error);
    }
  },

  logoutUser: async () => {
    try {
      await axios.post("/api/user/logout");
      return set({ user: null, session: null });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useUserStore;
