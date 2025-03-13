import { todos } from "./todo-objects.js";

export function loadCompleted() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Completed Todos";
    mainDiv.appendChild(title);
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);
    if (todos.getAllTodos()[0] === undefined) {
        const todosTextDiv = document.createElement("div");
        todosTextDiv.classList.add("todos-text-div");
        const todosTextLine1 = document.createElement("p");
        todosTextLine1.textContent = "You haven't completed any todos yet.";
        todosTextDiv.appendChild(todosTextLine1);
        const todosTextLine2 = document.createElement("p");
        todosTextLine2.textContent = "But we believe in you! \u00A0\uD83D\uDCAB";
        todosTextDiv.appendChild(todosTextLine2);
        todoContainer.appendChild(todosTextDiv);
    };
}