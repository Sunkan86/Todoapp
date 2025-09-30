import { useState } from "react";

import { Todo } from "../types";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onUpdate(todo.id, { text: editText.trim() });
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
      data-testid={`todo-item-${todo.id}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        className={styles.checkbox}
        data-testid={`todo-checkbox-${todo.id}`}
        onChange={() => onToggle(todo.id)}
      />

      <div className={styles.content}>
        {isEditing ? (
          <form
            className={styles.editForm}
            data-testid="edit-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={editText}
              className={styles.editInput}
              data-testid={`todo-edit-input-${todo.id}`}
              aria-label="Edit todo text"
              onChange={e => setEditText(e.target.value)}
              onBlur={handleSubmit}
            />
          </form>
        ) : (
          <span
            className={styles.text}
            data-testid={`todo-text-${todo.id}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}

        <div className={styles.metadata}>
          <span className={styles.date}>
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </span>
          <div className={styles.tags}>
            {todo.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        className={styles.deleteButton}
        data-testid={`todo-delete-${todo.id}`}
        aria-label="Delete todo"
        onClick={() => onDelete(todo.id)}
      >
        ✕
      </button>
    </div>
  );
};
