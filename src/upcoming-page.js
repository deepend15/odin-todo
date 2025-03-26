import { showTodos } from "./display-todos.js";
import { activateAddTodoButton } from "./add-todo-btn.js";

export function loadUpcoming() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";

    const topLine = document.createElement("div");
    topLine.classList.add("top-line");
    mainDiv.appendChild(topLine);

    const legend = document.createElement("div");
    legend.classList.add("legend");
    const legendLine = document.createElement("div");
    legendLine.classList.add("legend-line");
    const legendColorWrapper = document.createElement("div");
    legendColorWrapper.classList.add("priority-color-wrapper");
    legendLine.appendChild(legendColorWrapper);
    const legendLineText = document.createElement("p");
    legendLineText.textContent = `= priority 1`;
    legendLine.appendChild(legendLineText);
    legend.appendChild(legendLine);
    topLine.appendChild(legend);

    const title = document.createElement("h3");
    title.textContent = "Upcoming Todos";
    topLine.appendChild(title);

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);

    showTodos().showUpcomingTodos();

    activateAddTodoButton();
}