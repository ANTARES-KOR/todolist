import { useInputForm } from "../../hooks";
import styles from "./InputForm.module.css";

export const InputForm = ({ setTodos }) => {
  const { handleTodoSubmit, setInputError, setInputValue, inputError } =
    useInputForm({ setTodos });

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
