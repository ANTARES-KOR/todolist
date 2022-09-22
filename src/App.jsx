import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    setTodos((prev) => {
      return [...prev, inputValue];
    });
    setInputValue("");
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
          {todos.map((todo, index) => {
            return (
              <label key={index} id={`todo-checkbox-${index}`} className={styles.todo}>
                <input type="checkbox" id={`todo-checkbox-${index}`} />
                <span>{todo}</span>
              </label>
            );
          })}
        </article>
      </section>
    </main>
  );
}

export default App;
