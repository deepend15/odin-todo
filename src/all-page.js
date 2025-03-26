import { showTodos } from "./display-todos.js";
import { activateAddTodoButton } from "./add-todo-btn.js";

export function loadAll() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    
    const topLine = document.createElement("div");
    topLine.classList.add("top-line");
    mainDiv.appendChild(topLine);

    const legend = document.createElement("div");
    legend.classList.add("legend");
    const legendLine1 = document.createElement("div");
    legendLine1.classList.add("legend-line");
    const legendColorWrapper1 = document.createElement("div");
    legendColorWrapper1.classList.add("overdue-color-wrapper");
    legendLine1.appendChild(legendColorWrapper1);
    const line1Text = document.createElement("p");
    line1Text.textContent = `= overdue`;
    legendLine1.appendChild(line1Text);
    legend.appendChild(legendLine1);
    const legendLine2 = document.createElement("div");
    legendLine2.classList.add("legend-line");
    const legendColorWrapper2 = document.createElement("div");
    legendColorWrapper2.classList.add("priority-color-wrapper");
    legendLine2.appendChild(legendColorWrapper2);
    const line2Text = document.createElement("p");
    line2Text.textContent = `= priority 1`;
    legendLine2.appendChild(line2Text);
    legend.appendChild(legendLine2);
    topLine.appendChild(legend);

    const title = document.createElement("h3");
    title.textContent = "All Todos";
    topLine.appendChild(title);

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);

    showTodos().showAllTodos();

    activateAddTodoButton();
}