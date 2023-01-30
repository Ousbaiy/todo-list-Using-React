import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/dataContext";

const Todo = ({ todo }) => {
  const { todos, setTodos } = useContext(DataContext);
  const { id, text } = todo;

  const deleteHandler = () => {
    setTodos(todos.filter((ele) => ele.id !== todo.id));
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };
  return (
    <div className="todo">
      <li
        data-testid="todo-container"
        key={id}
        className={`todo-item ${todo.completed ? "completed" : ""}`}
      >
        {text}
      </li>
      <button
        onClick={completeHandler}
        className="complete-btn"
        data-testid="complete-btn"
      >
        <i className="fas fa-check"></i>
      </button>
      <button
        onClick={deleteHandler}
        className="trash-btn"
        data-testid="delete-btn"
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
