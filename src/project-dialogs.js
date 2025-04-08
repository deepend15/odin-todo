import { projects } from "./projects";
import { loadProjectRows } from "./project-rows";
import { navButtons } from "./nav-button-fns";
import { loadProjectPage } from "./projects-pages";

export function projectDialogController() {
    const addAndRemoveProjectDiv = document.querySelector(".add-remove-project-buttons-wrapper");
    const addProjectBtn = addAndRemoveProjectDiv.firstElementChild;
    const addProjectDialog = document.querySelector("#add-project-dialog");
    const newProjectName = addProjectDialog.querySelector("#new-project-name");
    const addProjectCancelBtn = addProjectDialog.querySelector(".cancel-button");

    const removeProjectBtn = addAndRemoveProjectDiv.lastElementChild;
    const removeProjectDialog = document.querySelector("#remove-project-dialog");
    const removeProjectCancelBtn = removeProjectDialog.querySelector(".cancel-button");

    function dialogEscBtn(e) {
        if (e.key === "Escape") {
            if (addProjectDialog.open === true) {
                addProjectDialog.close("cancel");
            } else {
                removeProjectDialog.close("cancel");
            }
        }
    }

    function openAddProjectDialog() {
        addProjectDialog.returnValue = "";
        newProjectName.value = "";
        addProjectDialog.showModal();
        window.addEventListener("keydown", dialogEscBtn);
        addProjectDialog.addEventListener("close", () => window.removeEventListener("keydown", dialogEscBtn));
    }

    function openRemoveProjectDialog() {
        removeProjectDialog.returnValue = "";
        const projectList = removeProjectDialog.querySelector("ul");
        projectList.textContent = "";
        const allProjects = projects.getAllProjects();
        for (const project of allProjects) {
            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.id = project.title.toLowerCase();
            checkbox.setAttribute("name", "project");
            checkbox.setAttribute("value", project.title.toLowerCase());
            li.appendChild(checkbox);
            const label = document.createElement("label");
            label.setAttribute("for", project.title.toLowerCase());
            label.textContent = project.title;
            if (project.title === "Personal") {
                checkbox.setAttribute("disabled", "");
                label.textContent += " (cannot be removed)";
                label.classList.add("disabled");
            };
            li.appendChild(label);
            projectList.appendChild(li);
        };
        removeProjectDialog.showModal();
        window.addEventListener("keydown", dialogEscBtn);
        removeProjectDialog.addEventListener("close", () => window.removeEventListener("keydown", dialogEscBtn));
    }

    function activateAddAndRemoveProjectBtns() {
        addProjectBtn.addEventListener("click", openAddProjectDialog);
        removeProjectBtn.addEventListener("click", openRemoveProjectDialog);
    }

    function activateCancelBtns() {
        addProjectCancelBtn.addEventListener("click", () => addProjectDialog.close("cancel"));
        removeProjectCancelBtn.addEventListener("click", () => removeProjectDialog.close("cancel"));
    }

    function closeDialog(e) {
        if (e.currentTarget.returnValue === "cancel") {
            return;
        } else if (e.currentTarget.id === "add-project-dialog") {
            const allProjects = projects.getAllProjects();
            const dupeProjectArray = allProjects.filter(project => project.title === newProjectName.value);
            if (dupeProjectArray.length !== 0) {
                const dupeProjectDialog = document.createElement("dialog");
                dupeProjectDialog.id = "dupe-project-dialog";
                const warningSymbol = document.createElement("p");
                warningSymbol.textContent = `\u2757`;
                dupeProjectDialog.appendChild(warningSymbol);
                const warningText = document.createElement("p");
                warningText.textContent = `A project with this name already exists!`;
                dupeProjectDialog.appendChild(warningText);
                const ok = document.createElement("button");
                ok.setAttribute("autofocus", "");
                ok.textContent = `OK`;
                dupeProjectDialog.appendChild(ok);
                const body = document.querySelector("body");
                body.appendChild(dupeProjectDialog);
                dupeProjectDialog.showModal();
                ok.addEventListener("click", () => {
                    dupeProjectDialog.close();
                    dupeProjectDialog.remove();
                    openAddProjectDialog();
                });
            } else {
                projects.addProject(newProjectName.value);
                loadProjectRows();
                console.log(projects.getAllProjects());
                navButtons().activateProjectBtns();
                const projectRowsDiv = document.querySelector(".project-rows");
                navButtons().activateNavRowEventListener(projectRowsDiv);
                const projectRows = Array.from(projectRowsDiv.children);
                const newProjectRowArray = projectRows.filter(
                    row => row.textContent.slice(2) ===
                    newProjectName.value);
                const newProjectRow = newProjectRowArray[0];
                navButtons().unselectCurrentTab();
                newProjectRow.classList.add("project-button-selected");
                loadProjectPage();
            }
        }
    }

    function activateDialogClose() {
        addProjectDialog.addEventListener("close", closeDialog);
    }

    return {
        activateAddAndRemoveProjectBtns,
        activateCancelBtns,
        activateDialogClose
    }
}