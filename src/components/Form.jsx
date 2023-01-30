import { useContext } from "react";
import { DataContext } from "../context/dataContext";

const Form = () => {
  const { inputText, setInputText, todos, setTodos, setStatus } =
    useContext(DataContext);

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };
  const submitTodoHandler = (e) => {
    e.preventDefault();
    if (!(inputText === "")) {
      setTodos([
        ...todos,
        { text: inputText, completed: false, id: Math.random() * 1000 },
      ]);
      setInputText("");
    } else {
      return;
    }
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  return (
    <form>
      <div>
        <input
          onChange={inputTextHandler}
          value={inputText}
          type="text"
          className="todo-input"
          placeholder="Add a new task here..."
        />
        <button
          onClick={submitTodoHandler}
          className="todo-button"
          type="submit"
          name="add"
          data-testid="add-button"
        >
          <i className="fas fa-plus-square"></i>
        </button>
      </div>
      <div className="select">
        <select
          data-testid="select"
          onChange={statusHandler}
          name="todos"
          className="filter-todo"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
