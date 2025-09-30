import { useEffect, useState } from "react";

import { SortDirection, Todo, TodoFilter, TodoSortKey } from "./types";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<TodoFilter>({ tags: [] });
  const [sortKey, setSortKey] = useState<TodoSortKey>("dueDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Omit<Todo, "id" | "createdAt">) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos
    .filter(todo => {
      if (
        filter.completed !== undefined &&
        todo.completed !== filter.completed
      ) {
        return false;
      }

      if (
        filter.tags.length > 0 &&
        !filter.tags.some(tag => todo.tags.includes(tag))
      ) {
        return false;
      }

      if (filter.dateRange) {
        const todoDate = new Date(todo.dueDate);
        const start = new Date(filter.dateRange.start);
        const end = new Date(filter.dateRange.end);
        if (todoDate < start || todoDate > end) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case "dueDate":
          comparison =
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "text":
          comparison = a.text.localeCompare(b.text);
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  return {
    todos: filteredTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    filter,
    setFilter,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
  };
};
