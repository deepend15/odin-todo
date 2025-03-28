import { showTodos } from "./display-todos.js";

export function loadProjectPage() {
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

    function getCurrentProject() {
        const selectedProject = document.querySelector(".project-button-selected");
        const selectedProjectName = selectedProject.firstElementChild.textContent.slice(2);
        return selectedProjectName;
    }
    const currentProject = getCurrentProject();

    const title = document.createElement("h3");
    title.textContent = currentProject;
    switch(currentProject) {
        case 'Personal':
            title.textContent += "\u00A0\u00A0\uD83C\uDFE1";
            break;
        case 'Work':
            title.textContent += "\u00A0\u00A0\uD83D\uDCBB";
            break;
        case 'Hobbies': 
            title.textContent += "\u00A0\uD83C\uDFC6";
            break;
        case 'Grocery':
            title.textContent += "\u00A0\uD83C\uDF4E";
            break;
    }
    topLine.appendChild(title);

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);

    const addTodoBtnContainer = document.createElement("div");
    addTodoBtnContainer.classList.add("add-todo-btn-container");
    mainDiv.appendChild(addTodoBtnContainer);

    showTodos().showProjectTodos();
}