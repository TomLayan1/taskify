import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type TaskType = {
  id: number;
  task: string;
  time: string;
  category: string;
};

type CategoryCount = {
  id: number;
  taskCount: number;
  categoryName: string;
};


type TaskifyStore = {
  username: string;
  setUsername: (name: string) => void;

  tasks: TaskType[];
  addTask: (task: TaskType) => void;

  checkedItems: { [key: string]: boolean };
  toggleCheckbox: (id: string | number, value: boolean) => void;

  deleteTask: (id: number) => void;

  getCategoryCounts: () => CategoryCount[];
};

export const useTaskifyStore = create<TaskifyStore>()(
  persist(
    (set, get) => ({
      username: "",
      setUsername: (name) => set({ username: name }),
    
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
          checkedItems: {
            ...state.checkedItems,
            [task.id]: false
          }
        })),
    
      checkedItems: {},
      toggleCheckbox: (id, value) =>
        set((state) => ({
          checkedItems: {
            ...state.checkedItems,
            [id]: value,
          },
        })),
      
      deleteTask: (id) => 
        set((state) => ({
          tasks: state.tasks.filter(task => task?.id !== id)
        })),
      getCategoryCounts: () => {
        const { tasks } = get();
        const categoryMap: Record<string, number> = {};

        tasks.forEach((task) => {
          categoryMap[task.category] = (categoryMap[task.category] || 0) + 1;
        });

        return Object.entries(categoryMap).map(([categoryName, count], index) => ({
          id: index + 1,
          taskCount: count,
          categoryName,
        }));
      },
    }),
    {
      name: "taskify-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
