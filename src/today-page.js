import { todos } from "./todo-objects.js";

export function loadToday() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Today's Todos";
    mainDiv.appendChild(title);
    const addTodoPageBtn = document.createElement("button");
    addTodoPageBtn.classList.add("add-todo-page-button");
    addTodoPageBtn.textContent = `+ Add Todo`;
    if (todos.getAllTodos()[0] === undefined) {
        const todosTextDiv = document.createElement("div");
        todosTextDiv.classList.add("todos-text-div");
        todosTextDiv.textContent = `\u2705\u00A0 Nice! You don't have any todos for today.`;
        mainDiv.appendChild(todosTextDiv);
        mainDiv.appendChild(addTodoPageBtn);
    };
}