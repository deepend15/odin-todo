import { projects } from "./projects.js";

export function activateAddTodoButton() {
    const addTodoBtn = document.querySelector(".add-todo-button");
    const addTodoDialog = document.querySelector("#add-todo-dialog");
    const dialogTodoName = addTodoDialog.querySelector("#todoName");
    const dialogDescription = addTodoDialog.querySelector("#description");
    const dialogDueDate = addTodoDialog.querySelector("#dueDate");
    const dialogPriority = addTodoDialog.querySelector("#priority");
    const dialogProject = addTodoDialog.querySelector("#project");

    function addProjectSelections() {
        function getCurrentProject() {
            const projectNav = document.querySelector(".project-nav");
            const projectNavChildren = Array.from(projectNav.children);
            const selectedProjectRow = 
                projectNavChildren
                .filter(div => div.classList.contains("project-button-selected"));
            if (selectedProjectRow.length !== 0) {
                const selectedProject = document.querySelector(".project-button-selected");
                const selectedProjectName = 
                    selectedProject.firstElementChild.textContent.slice(2);
                return selectedProjectName;
            } else {
                return false;
            }
        }
        const currentProject = getCurrentProject();

        const allProjects = projects.getAllProjects();

        for (const project of allProjects) {
            const projectOption = document.createElement("option");
            if (currentProject) {
                if (project.title === currentProject) {
                    projectOption.setAttribute("selected", "");
                }
            } else {
                if (project.title === 'personal') {
                    projectOption.setAttribute("selected", "");
                };
            }
            projectOption.textContent = project.title;
            dialogProject.appendChild(projectOption);
        }
    }

    addTodoBtn.addEventListener("click", () => {
        dialogTodoName.value = "";
        dialogDescription.value = "";
        dialogDueDate.value = "";
        dialogPriority.value = "2 - Normal";
        addTodoDialog.returnValue = "";
        dialogProject.textContent = "";
        addProjectSelections();
        addTodoDialog.showModal();
    })
}