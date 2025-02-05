import supabase from "@/utils/supabase/supabaseClient";

const login = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Błąd logowania: ", error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Błąd logowania: ", error);
    return null;
  }
};

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(`Błąd wylogowania: ${error}`);
    }
  } catch (error) {
    console.error(`Błąd wylogowania: ${error}`);
  }
};

export { login, logout };
