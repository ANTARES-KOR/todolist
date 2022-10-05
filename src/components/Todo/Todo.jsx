import { useCallback } from "react";
import { BsTrash } from "react-icons/bs";
import classNames from "classnames";
import styles from "./Todo.module.css";

export const Todo = ({ data, index, setTodos }) => {
  const { id, content, isDone } = data;

  const removeTodoById = useCallback((id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  }, []);

  const changeTodoDoneStatus = useCallback((id) => {
    setTodos((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === id);
      const newTodos = [...prev];
      const todosBeforeTarget = newTodos.slice(0, targetIndex);
      const todosAfterTarget = newTodos.slice(targetIndex + 1);
      const [targetTodo] = newTodos.splice(targetIndex, 1);

      return [
        ...todosBeforeTarget,
        { ...targetTodo, isDone: !targetTodo.isDone },
        ...todosAfterTarget,
      ];
    });
  }, []);

  return (
    <li className={styles.todo}>
      <div id={`todo-checkbox-${index}`} className={styles.todo__label}>
        <input
          className={styles.todo__label__checkbox}
          type="checkbox"
          id={`todo-checkbox-${index}`}
          onChange={() => changeTodoDoneStatus(id)}
          checked={isDone}
        />
        <span
          className={classNames(styles.prevent_select, {
            [styles.todo__done]: isDone,
          })}
        >
          {content}
        </span>
      </div>
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
};
