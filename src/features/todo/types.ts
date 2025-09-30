export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
  dueDate: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export type TodoFilter = {
  tags: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  completed?: boolean;
};

export type TodoSortKey = "dueDate" | "createdAt" | "text";
export type SortDirection = "asc" | "desc";
