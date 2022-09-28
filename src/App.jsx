import { useState } from "react";
import styles from "./App.module.css";
import { nanoid } from "nanoid";
import classNames from "classnames";

import { BsTrash } from "react-icons/bs";
import { useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    setTodos((prev) => {
      const newTodo = {
        id: nanoid(),
        content: inputValue,
        isDone: false,
      };

      return [...prev, newTodo];
    });
    setInputValue("");
  };

  const removeTodoById = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  const changeTodoDoneStatus = (id) => {
    setTodos((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === id);
      const newTodos = [...prev];
      const [targetTodo] = newTodos.splice(targetIndex, 1);
      return [...newTodos, { ...targetTodo, isDone: !targetTodo.isDone }];
    });
  };

  return (
    <main className={styles.main_background}>
      <section className={styles.content_section}>
        <form className={styles.todo_form} onSubmit={handleTodoSubmit}>
          <input
            placeholder="할 일을 입력하세요..."
            className={styles.todo_input}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <button type="submit" className={styles.todo_submit_button}>
            제출
          </button>
        </form>
        <article className={styles.todo_container}>
          {todos.map(({ id, content, isDone }, index) => {
            return (
              <label
                key={id}
                id={`todo-checkbox-${index}`}
                className={styles.todo}
              >
                <div className={styles.todo__label}>
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
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeTodoById(id);
                  }}
                  className={styles.todo__remove_button}
                >
                  <BsTrash />
                </button>
              </label>
            );
          })}
        </article>
      </section>
    </main>
  );
}

export default App;
