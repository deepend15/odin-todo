import { todos } from "./todo-objects.js";

export function loadGrocery() {
    const allTodos = todos.getAllTodos();
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Grocery \u00A0\uD83C\uDF4E";
    mainDiv.appendChild(title);
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);
    const groceryTodos = allTodos.filter(todo => todo.project === 'grocery');
    const addTodoPageBtn = document.createElement("button");
    addTodoPageBtn.classList.add("add-todo-page-button");
    addTodoPageBtn.textContent = `+ Add Todo`;
    if (groceryTodos.length === 0) {
        const todosTextDiv = document.createElement("div");
        todosTextDiv.classList.add("todos-text-div");
        todosTextDiv.textContent = `No todos for this project.`;
        todoContainer.appendChild(todosTextDiv);
        mainDiv.appendChild(addTodoPageBtn);
    };
}