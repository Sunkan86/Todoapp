/* eslint-env jest */
import { act, render, waitFor } from "@testing-library/react";
import { useEffect } from "react";

import { useTodos } from "./useTodos";

function HookHarness({
  onReady,
}: {
  onReady: (api: ReturnType<typeof useTodos>) => void;
}) {
  const api = useTodos();
  useEffect(() => {
    onReady(api);
  }, [api]);
  return null;
}

describe("useTodos (unit)", () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(jest.fn());
    // @ts-expect-error: define minimal crypto API for tests in Jest environment
    global.crypto = { randomUUID: jest.fn(() => "todo-1") };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("adds, toggles and deletes a todo", async () => {
    let hookApi: ReturnType<typeof useTodos> | null = null;
    render(<HookHarness onReady={api => (hookApi = api)} />);

    await waitFor(() => expect(hookApi).not.toBeNull());

    act(() => {
      hookApi!.addTodo({
        text: "Write unit test",
        completed: false,
        tags: ["testing"],
        dueDate: new Date().toISOString(),
      });
    });

    await waitFor(() => expect(hookApi!.todos).toHaveLength(1));
    expect(hookApi!.todos[0]).toMatchObject({
      id: "todo-1",
      text: "Write unit test",
      completed: false,
    });

    act(() => hookApi!.toggleTodo("todo-1"));
    await waitFor(() => expect(hookApi!.todos[0].completed).toBe(true));

    act(() => hookApi!.deleteTodo("todo-1"));
    await waitFor(() => expect(hookApi!.todos).toHaveLength(0));
  });

  it("filters by tag", async () => {
    let hookApi: ReturnType<typeof useTodos> | null = null;
    render(<HookHarness onReady={api => (hookApi = api)} />);
    await waitFor(() => expect(hookApi).not.toBeNull());

    // @ts-expect-error: mock randomUUID for predictable id "a"
    global.crypto.randomUUID.mockReturnValueOnce("a");
    act(() => {
      hookApi!.addTodo({
        text: "Learn CI",
        completed: false,
        tags: ["ci", "school"],
        dueDate: new Date().toISOString(),
      });
    });

    // @ts-expect-error: mock randomUUID for predictable id "b"
    global.crypto.randomUUID.mockReturnValueOnce("b");
    act(() => {
      hookApi!.addTodo({
        text: "Write docs",
        completed: false,
        tags: ["docs"],
        dueDate: new Date().toISOString(),
      });
    });

    await waitFor(() => expect(hookApi!.todos).toHaveLength(2));

    act(() => hookApi!.setFilter({ tags: ["ci"] }));
    await waitFor(() => expect(hookApi!.todos).toHaveLength(1));
    expect(hookApi!.todos[0].text).toBe("Learn CI");
  });
});
