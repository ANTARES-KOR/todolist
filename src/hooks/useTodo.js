const useTodo = ({ setTodos }) => {
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

  return { removeTodoById, changeTodoDoneStatus, changeTodoText };
};

export default useTodo;
