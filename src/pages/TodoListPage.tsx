import React, { FormEvent, useState } from "react";

function TodoListPage() {
  const [todoInput, setTodoInput] = useState("");

  const addTodoHandler = (event: FormEvent) => {
    event.preventDefault();
    alert("ss");
  };

  return (
    <>
      <form onSubmit={addTodoHandler}>
        <>
          <label htmlFor="todo-input">Title</label>
          <input
            id="todo-input"
            placeholder="enter todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
        </>
        <button type="submit">Add todo</button>
      </form>
    </>
  );
}

export default TodoListPage;
