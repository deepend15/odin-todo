import { todos } from "./todo-objects.js";

export function loadAll() {
    const allTodos = todos.getAllTodos();
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "All Todos";
    mainDiv.appendChild(title);
    const addTodoPageBtn = document.createElement("button");
    addTodoPageBtn.classList.add("add-todo-page-button");
    addTodoPageBtn.textContent = `+ Add Todo`;
    if (allTodos[0] === undefined) {
        const todosTextDiv = document.createElement("div");
        todosTextDiv.classList.add("todos-text-div");
        const todosTextLine1 = document.createElement("p");
        todosTextLine1.textContent = "You haven't created any todos yet.";
        todosTextDiv.appendChild(todosTextLine1);
        const todosTextLine2 = document.createElement("p");
        todosTextLine2.textContent = "\uD83D\uDCDD\u00A0 Add one now to get started!";
        todosTextDiv.appendChild(todosTextLine2);
        mainDiv.appendChild(todosTextDiv);
        mainDiv.appendChild(addTodoPageBtn);
    };
}