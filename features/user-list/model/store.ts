import { create } from "zustand";

interface UserListState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/**
 * User list feature state using Zustand
 */
export const useUserListStore = create<UserListState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
