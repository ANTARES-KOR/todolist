import { nanoid } from "nanoid";
import { useState, useCallback } from "react";
import styles from "./InputForm.module.css";

export const InputForm = ({ setTodos }) => {
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

  return (
    <form className={styles.todo_form} onSubmit={handleTodoSubmit}>
      <div className={styles.todo_form__input_container}>
        <input
          placeholder="할 일을 입력하세요..."
          className={styles.todo_input}
          onChange={(e) => {
            setInputError();
            setInputValue(e.target.value);
          }}
          value={inputValue}
        />
        <button type="submit" className={styles.todo_submit_button}>
          <span>제출</span>
        </button>
      </div>
      {inputError && (
        <p className={styles.todo_form__error_message}>{inputError}</p>
      )}
    </form>
  );
};
