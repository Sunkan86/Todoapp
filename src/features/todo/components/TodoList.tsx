import { useState } from "react";

import { useTodoContext } from "../TodoContext";
import { TodoFilter, TodoSortKey } from "../types";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";

export const TodoList = () => {
  const {
    todos,
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
  } = useTodoContext();

  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoDate, setNewTodoDate] = useState("");
  const [newTodoTags, setNewTodoTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo({
        text: newTodoText.trim(),
        completed: false,
        tags: newTodoTags
          .split(",")
          .map(tag => tag.trim())
          .filter(Boolean),
        dueDate: newTodoDate || new Date().toISOString(),
      });
      setNewTodoText("");
      setNewTodoDate("");
      setNewTodoTags("");
    }
  };

  const handleFilterChange = (updates: Partial<TodoFilter>) => {
    setFilter(prev => ({ ...prev, ...updates }));
  };

  const handleSort = (key: TodoSortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.addForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodoText}
          placeholder="What needs to be done?"
          className={styles.input}
          data-testid="new-todo-input"
          onChange={e => setNewTodoText(e.target.value)}
        />
        <input
          type="date"
          value={newTodoDate}
          className={styles.input}
          data-testid="new-todo-date"
          onChange={e => setNewTodoDate(e.target.value)}
        />
        <input
          type="text"
          value={newTodoTags}
          placeholder="Tags (comma-separated)"
          className={styles.input}
          data-testid="new-todo-tags"
          onChange={e => setNewTodoTags(e.target.value)}
        />
        <button
          type="submit"
          className={styles.addButton}
          data-testid="add-todo-button"
        >
          Add Todo
        </button>
      </form>

      <div className={styles.filters}>
        <label>
          <input
            type="checkbox"
            checked={filter.completed}
            data-testid="filter-completed"
            onChange={e => handleFilterChange({ completed: e.target.checked })}
          />
          Show completed
        </label>

        <div className={styles.sort}>
          <span>Sort by:</span>
          <button
            className={sortKey === "dueDate" ? styles.active : ""}
            data-testid="sort-by-date"
            onClick={() => handleSort("dueDate")}
          >
            Due Date{" "}
            {sortKey === "dueDate" && (sortDirection === "asc" ? "↑" : "↓")}
          </button>
          <button
            className={sortKey === "text" ? styles.active : ""}
            data-testid="sort-by-text"
            onClick={() => handleSort("text")}
          >
            Text {sortKey === "text" && (sortDirection === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      <div className={styles.list} data-testid="todo-list">
        {todos.length === 0 ? (
          <p className={styles.empty}>No todos found</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};
