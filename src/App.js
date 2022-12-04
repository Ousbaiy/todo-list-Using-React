import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //run once when the app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalStorage();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  // saveLocalStorage
  const saveLocalStorage = () => {
    // with React Strict mode
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    // without the strict mode
    // localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos'));
		if (todos) {
			setTodos(todos);
		}
  };
  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
