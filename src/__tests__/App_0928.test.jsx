import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";

const addTask = (task) => {
  const todoInput = screen.getByPlaceholderText("할 일을 입력하세요...");
  const todoSubmit = screen.getByText("제출");

  fireEvent.change(todoInput, { target: { value: task } });
  fireEvent.click(todoSubmit);
};

test("투두 체크하기", () => {
  const { getByText } = render(<App />);

  const tasks = ["김소정 짱이야", "김재도 짱이야", "DE팀 짱이야"];
  tasks.map(addTask);

  const sojeongTodo = getByText("김소정 짱이야");

  userEvent.click(sojeongTodo);
  expect(sojeongTodo).toHaveStyle("text-decoration: line-through;");
});
