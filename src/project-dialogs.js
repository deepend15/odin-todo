import { projects } from "./projects";
import { loadProjectRows } from "./project-rows";
import { navButtons } from "./nav-button-fns";
import { loadProjectPage } from "./projects-pages";

export function projectDialogController() {
    const addAndRemoveProjectDiv = document.querySelector(".add-remove-project-buttons-wrapper");
    const addProjectBtn = addAndRemoveProjectDiv.firstElementChild;
    const removeProjectBtn = addAndRemoveProjectDiv.lastElementChild;
    const addProjectDialog = document.querySelector("#add-project-dialog");
    const newProjectName = addProjectDialog.querySelector("#new-project-name");
    const cancelBtn = addProjectDialog.querySelector(".cancel-button");

    function dialogEscBtn(e) {
        if (e.key === "Escape") {
            addProjectDialog.close("cancel");
        }
    };

    function openAddProjectDialog() {
        addProjectDialog.returnValue = "";
        newProjectName.value = "";
        addProjectDialog.showModal();
        window.addEventListener("keydown", dialogEscBtn);
        addProjectDialog.addEventListener("close", () => window.removeEventListener("keydown", dialogEscBtn));
    }

    function activateAddProjectBtn() {
        addProjectBtn.addEventListener("click", openAddProjectDialog);
    };

    function activateCancelBtn() {
        cancelBtn.addEventListener("click", () => addProjectDialog.close("cancel"));
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
        activateAddProjectBtn,
        activateCancelBtn,
        activateDialogClose
    }
}