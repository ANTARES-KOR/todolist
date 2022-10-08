import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const useTodoList = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const resetAllTodos = useCallback(() => {
    confirm("모든 내용을 리셋하시겠어요?") && setTodos([]);
  }, []);

  return { todos, setTodos, resetAllTodos };
};

export default useTodoList;
