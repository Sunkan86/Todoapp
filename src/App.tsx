import { Calendar } from "@/features/calendar/Calendar";
import { TodoList } from "@/features/todo/components/TodoList";
import { TodoProvider, useTodoContext } from "@/features/todo/TodoContext";

import styles from "./App.module.css";

const CalendarWithTodos = () => {
  const { todos } = useTodoContext();
  return <Calendar todos={todos} />;
};

export default function App() {
  return (
    <TodoProvider>
      <main className={styles.main}>
        <h1>Todo & Calendar App</h1>
        <div className={styles.container}>
          <section className={styles.todoSection}>
            <h2>Todo List</h2>
            <TodoList />
          </section>
          <section className={styles.calendarSection}>
            <h2>Calendar View</h2>
            <CalendarWithTodos />
          </section>
        </div>
      </main>
    </TodoProvider>
  );
}
