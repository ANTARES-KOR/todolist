import { useCallback } from "react";
import { BsTrash } from "react-icons/bs";
import classNames from "classnames";
import styles from "./Todo.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const TodoMode = {
  EDIT: "EDIT",
  VIEW: "VIEW",
};

export const Todo = ({ data, index, setTodos }) => {
  const { id, content, isDone } = data;

  const removeTodoById = useCallback((id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  }, []);

  const changeTodoDoneStatus = useCallback(
    (id) => {
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
    },
    [setTodos]
  );

  const changeTodoText = useCallback(
    (id, text) => {
      setTodos((prev) => {
        const targetIndex = prev.findIndex((todo) => todo.id === id);
        const newTodos = [...prev];
        const todosBeforeTarget = newTodos.slice(0, targetIndex);
        const todosAfterTarget = newTodos.slice(targetIndex + 1);
        const [targetTodo] = newTodos.splice(targetIndex, 1);

        return [
          ...todosBeforeTarget,
          { ...targetTodo, content: text },
          ...todosAfterTarget,
        ];
      });
    },
    [setTodos]
  );

  const [todoMode, setTodoMode] = useState(TodoMode.VIEW);

  const todoEditInputRef = useRef();

  return (
    <li className={styles.todo}>
      {todoMode === TodoMode.VIEW && (
        <>
          <div
            id={`todo-checkbox-${index}`}
            className={styles.todo__label}
            onDoubleClick={() => setTodoMode(TodoMode.EDIT)}
          >
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
        </>
      )}
      {todoMode === TodoMode.EDIT && (
        <form
          className={styles["todo__edit-form"]}
          onSubmit={(e) => {
            e.preventDefault();
            changeTodoText(id, todoEditInputRef.current?.value);
            setTodoMode(TodoMode.VIEW);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setTodoMode(TodoMode.VIEW);
              e.stopPropagation();
            }
          }}
        >
          <input
            ref={todoEditInputRef}
            type="text"
            defaultValue={content}
            autoFocus="autoFocus"
            required
            placeholder={content}
            className={styles["todo__edit-form__input"]}
          />
          <button
            onClick={() => {
              setTodoMode(TodoMode.VIEW);
            }}
            type="button"
            className={styles["todo__edit-form__cancel"]}
          >
            취소
          </button>
          <button type="submit" className={styles["todo__edit-form__submit"]}>
            저장
          </button>
        </form>
      )}
    </li>
  );
};
