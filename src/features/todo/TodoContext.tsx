import { createContext, ReactNode, useContext } from "react";

import { useTodos } from "./useTodos";

const TodoContext = createContext<ReturnType<typeof useTodos> | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const todos = useTodos();
  return <TodoContext.Provider value={todos}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
