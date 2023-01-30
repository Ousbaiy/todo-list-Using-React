import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import DataProvider from "../context/dataContext";

describe("Header", () => {
  it("should render heading element", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    const headingElement = screen.getByText(/todo list/i);
    expect(headingElement).toBeInTheDocument();
  });
});

describe("Input", () => {
  it("should render input element", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should be able to type into input", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    // fireEvent.click(inputElement);
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });
    expect(inputElement.value).toBe("Go Grocery Shopping");
  });

  it("should be able to display the added todo", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });
    const buttonElement = screen.getByTestId(/add-button/i);
    fireEvent.click(buttonElement);
    const todoElement = screen.getByTestId(/todo/i);
    expect(todoElement).toBeInTheDocument();
  });

  it("should have empty input when new todo is added", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });
    const buttonElement = screen.getByTestId(/add-button/i);
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("");
  });
});

const addTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByTestId(/add-button/i);
  tasks.forEach((task) => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.click(buttonElement);
  });
};

describe("Todo", () => {
  it("should render a single todo ", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    addTask(["Go Grocery Shopping"]);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should render multiple todos ", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    addTask(["Go Grocery Shopping", "do the laundry", "finish homework"]);
    const divElement = screen.getAllByTestId("todo-container");
    expect(divElement.length).toBe(3);
  });

  it("when task initally rendered should not have a completed class", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    addTask(["Go Grocery Shopping"]);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).not.toHaveClass("todo-item completed");
  });

  it("task should have completed class when clicked", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    addTask(["Go Grocery Shopping"]);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    const buttonElement = screen.getByTestId("complete-btn");
    fireEvent.click(buttonElement);
    expect(divElement).toHaveClass("todo-item completed");
  });

  it("should delete a todo when delete button clicked", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    addTask(["Go Grocery Shopping"]);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    const buttonElement = screen.getByTestId("delete-btn");
    fireEvent.click(buttonElement);
    expect(divElement).not.toBeInTheDocument();
  });
});

const filterTask = (event) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByTestId(/add-button/i);
  tasks.forEach((task) => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.click(buttonElement);
  });
};

describe("Filter", () => {
  it("it should render all elements intially", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    addTask(["Go Grocery Shopping"]);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).toBeInTheDocument();
  });

  it("it should render only the completed elements when completed clicked", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    addTask(["Go Grocery Shopping"]);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    const selectElemet = screen.getByTestId("select");
    fireEvent.change(selectElemet, {
      target: { value: "completed" },
    });
    expect(divElement).not.toBeInTheDocument();
  });

  it("it should render only the uncompleted elements when uncompleted clicked", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    addTask(["Go Grocery Shopping"]);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    const selectElemet = screen.getByTestId("select");
    fireEvent.change(selectElemet, {
      target: { value: "uncompleted" },
    });
    expect(divElement).toBeInTheDocument();
  });

  it("it should render only the uncompleted elements when uncompleted is selected", () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    addTask(["Go Grocery Shopping", "do the laundry", "finish homework"]);
    const divElement = screen.getAllByTestId("todo-container");
    const selectElemet = screen.getByTestId("select");
    fireEvent.change(selectElemet, {
      target: { value: "uncompleted" },
    });
    expect(divElement.length).toBe(3);
  });
});
