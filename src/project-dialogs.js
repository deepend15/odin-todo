import { projects } from "./projects";
import { loadProjectRows } from "./project-rows";
import { navButtons } from "./nav-button-fns";
import { loadProjectPage } from "./projects-pages";
import { todos } from "./todo-objects.js";
import { loadToday } from "./today-page";
import { loadUpcoming } from "./upcoming-page.js";
import { loadAll } from "./all-page";
import { loadCompleted } from "./completed-page";

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

    function capitalizeString(string) {
        function capitalize(str) {
            const firstLetter = str.charAt(0).toUpperCase();
            const rest = str.slice(1);
            return firstLetter + rest;
        }
        const strArray = string.split(" ");
        const strArrayCapitals = strArray.map(
            word => capitalize(word)
        );
        const capitalizedString = strArrayCapitals.join(" ");
        return capitalizedString;
    }

    // https://stackoverflow.com/questions/16974664/how-to-remove-the-extra-spaces-in-a-string

    function removeWhiteSpaces(str) {
        let newString = str.replace(/\s+/g,' ').trim();
        return newString;
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
                const newProjectNameNoExtraWhiteSpace = 
                removeWhiteSpaces(newProjectName.value);
                const capitalizedProjectName = capitalizeString(newProjectNameNoExtraWhiteSpace);
                projects.addProject(capitalizedProjectName);
                loadProjectRows();
                console.log(projects.getAllProjects());
                navButtons().activateProjectBtns();
                const projectRowsDiv = document.querySelector(".project-rows");
                navButtons().activateNavRowEventListener(projectRowsDiv);
                const projectRows = Array.from(projectRowsDiv.children);
                const newProjectRowArray = projectRows.filter(
                    row => row.textContent.slice(2) ===
                    capitalizedProjectName);
                const newProjectRow = newProjectRowArray[0];
                navButtons().unselectCurrentTab();
                newProjectRow.classList.add("project-button-selected");
                loadProjectPage();
            }
        } else {
            const projectSelections = Array.from(removeProjectDialog.querySelectorAll("input[name=project]"));
            const checkedProjectArr = projectSelections.filter(
                selection => selection.checked === true
            );
            if (checkedProjectArr.length === 0) {
                return;
            } else {
                const checkedProject = removeProjectDialog.
                querySelector("input[name=project]:checked");
                const checkedProjectName = 
                    checkedProject.nextElementSibling.textContent;

                const allTodos = todos.getAllTodos();
                const checkedProjectTodos = allTodos.filter(
                    todo => todo.project === checkedProjectName);
                for (const todo of checkedProjectTodos) {
                    const personalTodos = allTodos.filter(
                        todo => todo.project === "Personal"
                    );
                    const numberOfPersonalTodos = personalTodos.length;
                    const newID = numberOfPersonalTodos + 1;
                    todo.project = "Personal";
                    todo.todoID = "personal-" + newID.toString();
                    console.log(todo);
                };

                const allProjects = projects.getAllProjects();
                const matchingProjectArr = allProjects.filter(
                    project => project.title === checkedProjectName);
                const matchingProject = matchingProjectArr[0];
                allProjects.splice(
                    allProjects.indexOf(matchingProject), 1);
                console.log(projects.getAllProjects());

                const navRows = Array.from(
                    document.querySelectorAll(
                        ".nav-list-button-wrapper"));
                const currentRowArray = navRows
                    .filter(row =>
                    row.classList.contains("todo-button-selected") ||
                    row.classList.contains(
                        "project-button-selected"));
                const currentRow = currentRowArray[0];
                const currentRowName = 
                    currentRow.firstElementChild.textContent.slice(2);

                loadProjectRows();
                navButtons().activateProjectBtns();
                const projectRowsDiv = document.querySelector(
                    ".project-rows");
                const projectRows = Array.from(projectRowsDiv.children);
                navButtons().activateNavRowEventListener(
                    projectRowsDiv);
                if (currentRowName === checkedProjectName) {
                    const personalRowArray = projectRows.filter(
                        row => row.firstElementChild.textContent
                        .slice(2) === "Personal"
                    );
                    const personalRow = personalRowArray[0];
                    let clickEvent = new Event("click");
                    personalRow.dispatchEvent(clickEvent);
                } else {
                    if (currentRow.classList.contains(
                        "project-button-selected")) {
                            const matchingRowArray = projectRows.filter(
                                row => row.firstElementChild.textContent.slice(2) === currentRowName
                            );
                            const matchingRow = matchingRowArray[0];
                            let clickEvent = new Event("click");
                            matchingRow.dispatchEvent(clickEvent);
                    } else {
                        switch (currentRowName) {
                            case 'Today':
                                loadToday();
                                break;
                            case 'Upcoming':
                                loadUpcoming();
                                break;
                            case 'All':
                                loadAll();
                                break;
                            case 'Completed':
                                loadCompleted();
                                break;
                        }
                    }
                }
            }
        }
    }

    function activateDialogClose() {
        addProjectDialog.addEventListener("close", closeDialog);
        removeProjectDialog.addEventListener("close", closeDialog);
    }

    return {
        activateAddAndRemoveProjectBtns,
        activateCancelBtns,
        activateDialogClose
    }
}