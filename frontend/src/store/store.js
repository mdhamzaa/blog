import { create } from "zustand";
import { getUser } from "../cookie";

const newUser = getUser();
export const useOwnStore = create((set) => ({
  user: newUser,
  setUser: (e) =>
    set((state) => ({
      user: e,
    })),
}));
