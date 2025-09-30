import { useState } from "react";

import { Todo } from "../todo/types";
import styles from "./Calendar.module.css";

interface CalendarProps {
  todos: Todo[];
}

export const Calendar = ({ todos }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const getTodosForDay = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return todos.filter(todo => {
      const todoDate = new Date(todo.dueDate);
      return (
        todoDate.getDate() === day &&
        todoDate.getMonth() === date.getMonth() &&
        todoDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className={styles.calendar} data-testid="calendar">
      <div className={styles.header}>
        <button
          className={styles.navButton}
          data-testid="prev-month"
          onClick={prevMonth}
        >
          ←
        </button>
        <h2>{monthYear}</h2>
        <button
          className={styles.navButton}
          data-testid="next-month"
          onClick={nextMonth}
        >
          →
        </button>
      </div>

      <div className={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`empty-${index}`} className={styles.emptyDay} />
        ))}

        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const dayTodos = getTodosForDay(day);

          return (
            <div
              key={day}
              className={`${styles.day} ${
                dayTodos.length > 0 ? styles.hasEvents : ""
              }`}
              data-testid={`calendar-day-${day}`}
            >
              <span className={styles.dayNumber}>{day}</span>
              {dayTodos.length > 0 && (
                <div className={styles.todoCount}>
                  {dayTodos.length} todo{dayTodos.length !== 1 ? "s" : ""}
                </div>
              )}
              <div className={styles.todoList}>
                {dayTodos.map(todo => (
                  <div
                    key={todo.id}
                    className={`${styles.todo} ${
                      todo.completed ? styles.completed : ""
                    }`}
                    title={todo.text}
                  >
                    {todo.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
