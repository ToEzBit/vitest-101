import { render, screen } from "../../utils/test-utils";

import TodoListPage from "@pages/TodoListPage";

const renderApp = () => {
  render(<TodoListPage />);
  const getTodoInput = screen.getByLabelText(/title/i);
  const getAddTodoButton = screen.getByRole("button", { name: /Add todo/i });

  return {
    getTodoInput,
    getAddTodoButton,
  };
};

describe("TodoListPage", () => {
  it("should display enter todo input & add to do button", () => {
    const { getTodoInput, getAddTodoButton } = renderApp();

    expect(getTodoInput).toBeInTheDocument();
    expect(getAddTodoButton).toBeInTheDocument();
  });
});
