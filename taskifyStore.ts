import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type TaskType = {
  id: number;
  task: string;
  time: string;
  category: string;
};

type TaskifyStore = {
  username: string;
  setUsername: (name: string) => void;

  tasks: TaskType[];
  addTask: (task: TaskType) => void;

  checkedItems: { [key: string]: boolean };
  toggleCheckbox: (id: string | number, value: boolean) => void;
};

export const useTaskifyStore = create<TaskifyStore>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (name) => set({ username: name }),
    
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
    
      checkedItems: {},
      toggleCheckbox: (id, value) =>
        set((state) => ({
          checkedItems: {
            ...state.checkedItems,
            [id]: value,
          },
        })),
    }),
    {
      name: "taskify-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
