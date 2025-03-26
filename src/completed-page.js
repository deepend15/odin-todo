import { showTodos } from "./display-todos";

export function loadCompleted() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("completed-title-wrapper");
    const title = document.createElement("h3");
    title.textContent = "Completed Todos";
    titleWrapper.appendChild(title);
    mainDiv.appendChild(titleWrapper);

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);

    showTodos().showCompletedTodos();
}