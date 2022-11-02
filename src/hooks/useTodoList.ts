import { useEffect, useState } from "react";

type Todo = {
  id: string;
  content: string;
  checked: boolean;
};

const getLocalStorageTodos = () => {
  const todos = localStorage.getItem("todos");
  if (todos) {
    return JSON.parse(todos);
  }
  return [];
};

const useTodoList = () => {
  const [todos, setTodos] = useState<Array<Todo>>(getLocalStorageTodos());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const appendTodo = (content: string) => {
    const newTodo = {
      id: Math.random().toString(36).substring(2, 9),
      content,
      checked: false,
    };
    setTodos([...todos, newTodo]);
  };

  const checkTodo = (id: string) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
    });
  };

  const resetTodos = () => {
    setTodos([]);
  };

  return { todos, methods: { appendTodo, checkTodo, resetTodos } };
};

export default useTodoList;
