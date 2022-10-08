import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useState } from "react";

const useInputForm = ({ setTodos }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState();

  const handleTodoSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (inputValue.trim() === "") {
        setInputError("공백이 아닌 내용을 입력해주세요.");
        return;
      }

      setTodos((prev) => {
        const newTodo = {
          id: nanoid(),
          content: inputValue.trim(),
          isDone: false,
        };
        return [newTodo, ...prev];
      });
      setInputValue("");
    },
    [inputValue]
  );

  return {
    inputValue,
    setInputValue,
    inputError,
    setInputError,
    handleTodoSubmit,
  };
};

export default useInputForm;
