import { projects } from "./projects.js";

export function loadProjectRows() {
    const allProjects = projects.getAllProjects();
    const projectRowsDiv = document.querySelector(".project-rows");

    projectRowsDiv.textContent = "";

    for (const project of allProjects) {
        const projectRow = document.createElement("li");
        projectRow.classList.add("nav-list-button-wrapper");
        const projectBtn = document.createElement("button");
        projectBtn.textContent = `- ` + project.title;
        projectRow.appendChild(projectBtn);
        projectRowsDiv.appendChild(projectRow);
    }
}