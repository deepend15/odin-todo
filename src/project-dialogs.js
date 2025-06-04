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
    const removeProjectOKBTn = removeProjectDialog.querySelector(".ok-button");

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

    function activateRemoveProjectOKBtn() {
        removeProjectOKBTn.addEventListener("click", () => {
            const checkedProjectArr = Array.from(
                removeProjectDialog.querySelectorAll(
                "input[name=project]:checked"));
            if (checkedProjectArr.length === 0) {
                removeProjectDialog.close("cancel");
            } else {
                function showDeleteConfirmation() {
                    const deleteConfirmationDialog = document.createElement("dialog");
                    deleteConfirmationDialog.id = "delete-confirmation-dialog";
                    const deleteConfirmationTxt = document.createElement("p");
                    if (checkedProjectArr.length > 1) {
                        deleteConfirmationTxt.textContent = "Projects deleted.";
                    } else {
                        deleteConfirmationTxt.textContent = "Project deleted.";
                    }
                    deleteConfirmationDialog.appendChild(deleteConfirmationTxt);
                    const deleteConfirmationOKBtn = document.createElement("button");
                    deleteConfirmationOKBtn.classList.add("delete-confirmation-ok-btn");
                    deleteConfirmationOKBtn.setAttribute("autofocus", "");
                    deleteConfirmationOKBtn.textContent = "OK";
                    deleteConfirmationDialog.appendChild(deleteConfirmationOKBtn);
                    const body = document.querySelector("body");
                    body.appendChild(deleteConfirmationDialog);
                    deleteConfirmationDialog.showModal();
                    deleteConfirmationOKBtn.addEventListener("click", () => {
                        deleteConfirmationDialog.close();
                    });
                    deleteConfirmationDialog.addEventListener("close", () => deleteConfirmationDialog.remove());
                }

                function getSelectedProjectTodos() {
                    const allTodos = todos.getAllTodos();
                    const selectedProjectTodos = [];
                    for (const checkbox of checkedProjectArr) {
                        const projectName = checkbox.nextElementSibling.textContent;
                        const projectTodos = allTodos.filter(todo => todo.project === projectName);
                        for (const todo of projectTodos) {
                            selectedProjectTodos.push(todo);
                        };
                    }
                    return selectedProjectTodos;
                }
                const selectedProjectTodos = getSelectedProjectTodos();
                if (selectedProjectTodos.length === 0) {
                    removeProjectDialog.close();
                    showDeleteConfirmation();
                } else {
                    const confirmProjectRemoveDialog = document.createElement("dialog");
                    confirmProjectRemoveDialog.id = "user-confirm-remove-project-dialog";
                    const warningSymbol = document.createElement("p");
                    warningSymbol.textContent = `\u2757`;
                    confirmProjectRemoveDialog.appendChild(warningSymbol);
                    const warningText = document.createElement("p");
                    let projectSpan;
                    if (checkedProjectArr.length > 1) {
                        projectSpan = ` these projects `;
                    } else {
                        projectSpan = ` this project `;
                    }
                    warningText.textContent = `All todos currently under` + projectSpan + `will be moved to the 'Personal' project. Do you wish to proceed?`;
                    confirmProjectRemoveDialog.appendChild(warningText);
                    const confirmProjectRemoveDialogBtnsDiv = document.createElement("div");
                    confirmProjectRemoveDialogBtnsDiv.classList.add("confirmation-dialog-buttons");
                    const confirmProjectRemoveNoBtn = document.createElement("button");
                    confirmProjectRemoveNoBtn.classList.add("confirm-project-remove-no");
                    confirmProjectRemoveNoBtn.textContent = "No";
                    confirmProjectRemoveDialogBtnsDiv.appendChild(confirmProjectRemoveNoBtn);
                    const confirmProjectRemoveYesBtn = document.createElement("button");
                    confirmProjectRemoveYesBtn.classList.add("confirm-project-remove-yes");
                    confirmProjectRemoveYesBtn.textContent = "Yes";
                    confirmProjectRemoveDialogBtnsDiv.appendChild(confirmProjectRemoveYesBtn);
                    confirmProjectRemoveDialog.appendChild(confirmProjectRemoveDialogBtnsDiv);
                    const body = document.querySelector("body");
                    body.appendChild(confirmProjectRemoveDialog);
                    confirmProjectRemoveDialog.showModal();
                    confirmProjectRemoveNoBtn.addEventListener("click", () => {
                        confirmProjectRemoveDialog.close();
                    });
                    confirmProjectRemoveYesBtn.addEventListener("click", () => {
                        confirmProjectRemoveDialog.close();
                        removeProjectDialog.close();
                        showDeleteConfirmation();
                    });
                    confirmProjectRemoveDialog.addEventListener("close", () => confirmProjectRemoveDialog.remove());
                };
            };
        });
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
            const dupeProjectArray = allProjects.filter(project => project.title === capitalizeString(newProjectName.value));
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
                let projectsJSON = JSON.stringify(projects.getAllProjects());
                localStorage.setItem("projects", projectsJSON);
                loadProjectRows();
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
            const checkedProjectArr = Array.from(
                removeProjectDialog.querySelectorAll(
                "input[name=project]:checked"));        

            function getSelectedProjectTodos() {
                const allTodos = todos.getAllTodos();
                const selectedProjectTodos = [];
                for (const checkbox of checkedProjectArr) {
                    const projectName = checkbox.nextElementSibling.textContent;
                    const projectTodos = allTodos.filter(todo => todo.project === projectName);
                    for (const todo of projectTodos) {
                        selectedProjectTodos.push(todo);
                    };
                }
                return selectedProjectTodos;
            }
            const checkedProjectTodos = getSelectedProjectTodos();
            
            function changeProjectTodoIds() {
                const allTodos = todos.getAllTodos();
                for (const todo of checkedProjectTodos) {
                    const personalTodos = allTodos.filter(
                        todo => todo.project === "Personal"
                    );
                    const numberOfPersonalTodos = personalTodos.length;
                    const newID = numberOfPersonalTodos + 1;
                    todo.project = "Personal";
                    todo.todoID = "personal-" + newID.toString();
                };
            }

            changeProjectTodoIds();
            const allTodos = todos.getAllTodos();
            let todosJSON = JSON.stringify(allTodos);
            localStorage.setItem("todos", todosJSON);

            function getCheckedProjectNames() {
                const checkedProjectNameArr = [];
                for (const checkbox of checkedProjectArr) {
                    checkedProjectNameArr.push(checkbox.nextElementSibling.textContent);
                }
                return checkedProjectNameArr;
            }
            const checkedProjectNameArr = getCheckedProjectNames();

            function removeProjects() {
                const allProjects = projects.getAllProjects();
                for (const name of checkedProjectNameArr) {
                    const matchingProjectArr = allProjects.filter(
                        project => project.title === name);
                    const matchingProject = matchingProjectArr[0];
                    allProjects.splice(
                        allProjects.indexOf(matchingProject), 1);
                }
            }

            removeProjects();
            let projectsJSON = JSON.stringify(projects.getAllProjects());
            localStorage.setItem("projects", projectsJSON);

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
            if (checkedProjectNameArr.includes(currentRowName)) {
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

    function activateDialogClose() {
        addProjectDialog.addEventListener("close", closeDialog);
        removeProjectDialog.addEventListener("close", closeDialog);
    }

    return {
        activateAddAndRemoveProjectBtns,
        activateCancelBtns,
        activateRemoveProjectOKBtn,
        activateDialogClose
    }
}