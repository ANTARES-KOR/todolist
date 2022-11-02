import { useState } from "react";
import styles from "./TodoForm.module.scss";

interface Props {
  appendTodo: (content: string) => void;
  toggleForm: () => void;
}

const TodoForm = ({ appendTodo, toggleForm }: Props) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles["todoform-container"]}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputValue.trim().length > 0) {
            appendTodo(inputValue);
            setInputValue("");
            toggleForm();
          }
        }}
        className={styles.todoform}
      >
        <label className={styles["todo-input"]}>
          <input
            type="text"
            placeholder="Write Todo"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </label>
        <button type="submit" className={styles["form-submit-btn"]}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
