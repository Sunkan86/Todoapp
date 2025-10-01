import { fireEvent, render, screen, within } from "@testing-library/react";

import { Todo } from "../todo/types";
import { Calendar } from "./Calendar";

const mockTodo: Todo = {
  id: "1",
  text: "Test todo",
  completed: true,
  dueDate: new Date(2024, 5, 15).toISOString(),
  tags: [],
  createdAt: new Date(2024, 5, 1).toISOString(),
};

describe("Calendar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2024, 5, 1));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders calendar with correct structure and navigation", () => {
    render(<Calendar todos={[mockTodo]} />);

    expect(screen.getByText("June 2024")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("next-month"));
    expect(screen.getByText("July 2024")).toBeInTheDocument();

    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("displays todos correctly", () => {
    render(<Calendar todos={[mockTodo]} />);
    const dayWithTodo = screen.getByTestId("calendar-day-15");
    expect(dayWithTodo).toHaveTextContent("Test todo");
    expect(dayWithTodo).toHaveTextContent("1 todo");
    expect(screen.getByText("Test todo")).toHaveClass("completed");
  });

  it("handles empty state correctly", () => {
    render(<Calendar todos={[]} />);
    const days = screen.getAllByRole("cell");
    days.forEach(day => {
      expect(within(day).queryByText(/todo/i)).not.toBeInTheDocument();
    });
  });
});
