import { create } from "zustand";

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

export const useTaskifyStore = create<TaskifyStore>((set) => ({
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
}));
