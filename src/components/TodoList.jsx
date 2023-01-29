import { useContext } from "react";
import { DataContext } from "../context/dataContext";
import Todo from "./Todo";

const TodoList = () => {
  const { filteredTodos } = useContext(DataContext);
  
  return (
    <div className="todo-container">
      <ul title="list" className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo text={todo.text} key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
