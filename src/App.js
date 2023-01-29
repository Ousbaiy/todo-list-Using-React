import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  
  return (
    <div className="App">
      <Header title="Todo List"/>
      <Form />
      <TodoList />
    </div>
  );
}

export default App;
