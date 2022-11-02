import { useState } from "react";
import Navbar from "./components/Navbar";
import { Todo } from "./components/Todo";
import useTodoList from "./hooks/useTodoList";
import styles from "./styles/App.module.scss";

const App = () => {
  const { todos, methods } = useTodoList();

  return (
    <div className={styles["page-background"]}>
      <div className={styles["app-container"]}>
        <header className={styles["app-header"]}>
          <h2 className={styles["title"]}>Hi, Hyeokjun Seo.</h2>
          <desc className={styles["task-summary"]}>
            {`You have ${
              todos.filter((todo) => !todo.checked).length
            } tasks left.`}
          </desc>
        </header>
        <main className={styles["app-main"]}>
          <div className={styles["contents"]}>
            <section className={styles["header-section"]}>
              <h2 className={styles["title"]}>Your Tasks</h2>
            </section>
            <section className={styles["tasks-section"]}>
              <ul className={styles["tasks-list"]}>
                {todos
                  .filter((todo) => !todo.checked)
                  .map((todo) => (
                    <Todo
                      key={todo.id}
                      content={todo.content}
                      checked={todo.checked}
                      id={todo.id}
                      checkTodo={methods.checkTodo}
                    />
                  ))}
                {todos
                  .filter((todo) => todo.checked)
                  .map((todo) => (
                    <Todo
                      key={todo.id}
                      content={todo.content}
                      checked={todo.checked}
                      id={todo.id}
                      checkTodo={methods.checkTodo}
                    />
                  ))}
              </ul>
            </section>
          </div>
        </main>
        <Navbar appendTodo={methods.appendTodo} />
      </div>
    </div>
  );
};

export default App;
