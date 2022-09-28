import { useState } from "react";
import styles from "./App.module.css";
import { nanoid } from "nanoid";
import classNames from "classnames";

import { BsTrash } from "react-icons/bs";
import { useEffect } from "react";
import { useCallback } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
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

  const removeTodoById = useCallback((id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  }, []);

  const changeTodoDoneStatus = useCallback((id) => {
    setTodos((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === id);
      const newTodos = [...prev];
      const [targetTodo] = newTodos.splice(targetIndex, 1);

      if (targetTodo.isDone) {
        // 완료된 상태에서 미완료로 변경할 경우 맨 앞으로 이동
        return [{ ...targetTodo, isDone: !targetTodo.isDone }, ...newTodos];
      } else {
        // 미완료 상태에서 완료로 변경할 경우 맨 뒤로 이동
        return [...newTodos, { ...targetTodo, isDone: !targetTodo.isDone }];
      }
    });
  }, []);

  return (
    <main className={styles.main_background}>
      <section className={styles.content_section}>
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
              제출
            </button>
          </div>
          {inputError && (
            <p className={styles.todo_form__error_message}>{inputError}</p>
          )}
        </form>
        <article className={styles.todo_container}>
          <ul className={styles.todo_container__inner}>
            {todos.map(({ id, content, isDone }, index) => {
              return (
                <li key={id} className={styles.todo}>
                  <label
                    id={`todo-checkbox-${index}`}
                    className={styles.todo__label}
                  >
                    <input
                      className={styles.todo__label__checkbox}
                      type="checkbox"
                      id={`todo-checkbox-${index}`}
                      onChange={() => {
                        changeTodoDoneStatus(id);
                      }}
                      value={isDone}
                    />
                    <span className={isDone ? styles.todo__done : undefined}>
                      {content}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      confirm("정말 삭제하시겠습니까?") && removeTodoById(id);
                    }}
                    className={styles.todo__remove_button}
                  >
                    <BsTrash />
                  </button>
                </li>
              );
            })}
          </ul>
        </article>
      </section>
    </main>
  );
}

export default App;
