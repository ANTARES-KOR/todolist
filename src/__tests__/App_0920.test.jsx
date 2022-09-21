import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

export const addTask = (task) => {
  // 할 일을 입력할 수 있는 input을 찾는다.
  const todoInput = screen.getByPlaceholderText("할 일을 입력하세요...");
  // 할 일 작성 이후 누를 버튼을 찾는다.
  const todoSubmit = screen.getByText("제출");

  // 할 일을 입력한다.
  fireEvent.change(todoInput, { target: { value: task } });
  // 제출 버튼을 누른다.
  fireEvent.click(todoSubmit);
};

test("투두리스트 앱 로딩하기", async () => {
  // App 컴포넌트를 JSDOM에 렌더링한다.
  const { getByPlaceholderText } = render(<App />);
  // 투두리스트 앱이 로딩되면, 할 일을 입력할 수 있는 input이 화면에 나타나야 한다.
  expect(getByPlaceholderText("할 일을 입력하세요...")).toBeInTheDocument();
});

test("투두리스트 작성하기", () => {
  // App 컴포넌트를 JSDOM에 렌더링한다.
  const { getByText, getByPlaceholderText, getAllByText } = render(<App />);

  // 할 일을 입력하고, 제출을 누른다.
  const tasks = ["김소정 짱이야"];
  tasks.map(addTask);

  // TODO 제출 이후 입력창은 비어있어야 한다
  expect(getByPlaceholderText("할 일을 입력하세요...")).toHaveValue("");
  // TODO 제출 이후 할 일이 화면에 나타나야 한다
  expect(getByText("김소정 짱이야")).toBeInTheDocument();
  expect(getAllByText("김소정 짱이야")).toHaveLength(tasks.length);
});
