import { useState } from "react";
import styles from "./App.module.css";
import { GrPowerReset } from "react-icons/gr";
import { useCallback } from "react";
import { Todo } from "./components/Todo";
import { InputForm } from "./components/InputForm";
import { useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const resetAllTodos = useCallback(() => {
    confirm("모든 내용을 리셋하시겠어요?") && setTodos([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <main className={styles.main_background}>
      <section className={styles.content_section}>
        <InputForm setTodos={setTodos} />
        <button
          type="button"
          className={styles.todo_reset_button}
          onClick={() => resetAllTodos()}
        >
          <GrPowerReset />
          reset
        </button>
        <article className={styles.todo_container}>
          <ul className={styles.todo_container__inner}>
            {todos.map((todo, index) => (
              <Todo
                key={todo.id}
                index={index}
                data={todo}
                setTodos={setTodos}
              />
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}

export default App;
