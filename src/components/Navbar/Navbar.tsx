import styles from "./Navbar.module.scss";
import { FaPlus } from "react-icons/fa";
import { TodoForm } from "../TodoForm";
import useToggle from "../../hooks/useToggle";
import clsx from "clsx";

interface Props {
  appendTodo: (content: string) => void;
}

const Navbar = ({ appendTodo }: Props) => {
  const [isFormOpen, toggleForm] = useToggle(false);

  return (
    <>
      <nav className={styles["app-navbar"]}>
        <button
          type="button"
          className={clsx(
            styles["add-task-btn"],
            isFormOpen && styles["form_open"]
          )}
          onClick={() => toggleForm()}
        >
          <FaPlus />
        </button>
      </nav>
      {isFormOpen && (
        <TodoForm appendTodo={appendTodo} toggleForm={toggleForm} />
      )}
    </>
  );
};

export default Navbar;
