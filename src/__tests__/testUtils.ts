import { fireEvent, screen } from "@testing-library/react";

export const addTask = (task) => {
  const todoInput = screen.getByPlaceholderText("할 일을 입력하세요...");
  const todoSubmit = screen.getByText("제출");

  fireEvent.change(todoInput, { target: { value: task } });
  fireEvent.click(todoSubmit);
};
