import styles from "./Todo.module.scss";
import clsx from "clsx";

interface Props {
  checked: boolean;
  content: string;
  id: string;
  checkTodo: (id: string) => void;
}

const Todo = ({ checked, content, checkTodo, id }: Props) => {
  return (
    <li
      className={clsx(styles["task-container"], checked && styles["checked"])}
    >
      <input
        type="checkbox"
        checked={checked}
        readOnly
        onClick={() => checkTodo(id)}
      />
      <span className={styles["task-text"]}>{content}</span>
    </li>
  );
};

export default Todo;
