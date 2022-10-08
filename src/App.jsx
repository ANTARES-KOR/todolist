import styles from "./App.module.css";
import { GrPowerReset } from "react-icons/gr";
import { Todo } from "./components/Todo";
import { InputForm } from "./components/InputForm";
import { useTodoList } from "./hooks";

function App() {
  const { todos, setTodos, resetAllTodos } = useTodoList();

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
            {todos
              .filter((todo) => !todo.isDone)
              .map((todo, index) => (
                <Todo
                  key={todo.id}
                  index={index}
                  data={todo}
                  setTodos={setTodos}
                />
              ))}
            {todos
              .filter((todo) => todo.isDone)
              .map((todo, index) => (
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
