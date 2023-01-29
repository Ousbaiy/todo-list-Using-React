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
