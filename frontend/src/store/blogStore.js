import { create } from "zustand";

const useBlogStore = create((set) => ({
  blogs: [],
  setBlogs: (e) =>
    set((state) => ({
      blogs: e,
    })),
}));

export default useBlogStore;
