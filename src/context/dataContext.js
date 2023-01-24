import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const todosLocalStorage = JSON.parse(localStorage.getItem("todos"));

const DataProvider = ({ children }) => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState(todosLocalStorage || []);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    filterHandler();
  }, [status, todos]);

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

  return (
    <DataContext.Provider
      value={{
        inputText,
        setInputText,
        todos,
        setTodos,
        status,
        setStatus,
        filteredTodos,
        setFilteredTodos,
        filterHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
