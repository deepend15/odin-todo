import { projects } from "./projects.js";
import { todos } from "./todo-objects.js";
import { format } from "date-fns";
import { loadToday } from "./today-page.js";
import { loadUpcoming } from "./upcoming-page.js";
import { loadAll } from "./all-page.js";
import { loadCompleted } from "./completed-page.js";
import { loadProjectPage } from "./projects-pages.js";

export function todoDialogController() {
    const addTodoBtn = document.querySelector(".add-todo-button");
    const todoBtns = document.querySelectorAll(".todo-div");
    const todoDialog = document.querySelector("#todo-dialog");
    const todoDialogBtns = todoDialog.querySelector(".todo-dialog-buttons");
    const todoH4 = todoDialog.querySelector("h4");
    const nameLine = todoDialog.querySelector(".name-line");
    const descriptionLine = todoDialog.querySelector(".description-line");
    const dialogDueDate = todoDialog.querySelector("#dueDate");
    const dialogPriority = todoDialog.querySelector("#priority");
    const dialogProject = todoDialog.querySelector("#project");
    const radioYes = todoDialog.querySelector("#yes");
    const radioNo = todoDialog.querySelector("#no");
    const cancelBtn = todoDialog.querySelector(".cancel-button");
    const okBtn = todoDialog.querySelector(".ok-button");
    const confirmDeleteDialog = document.querySelector("#confirm-delete-dialog");
    const confirmYesBtn = document.querySelector(".confirm-yes");
    const confirmNoBtn = document.querySelector(".confirm-no");
    const deleteConfirmationDialog = document.querySelector("#delete-confirmation-dialog");
    const deleteConfirmationOKBtn = document.querySelector(".delete-confirmation-ok-btn");

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
    };

    function dialogEscBtn(e) {
        if (e.key === "Escape") {
            todoDialog.close("cancel");
            console.log(todoDialog.returnValue);
        }
    };

    function openTodoDialog(e) {
        todoDialog.returnValue = "";
        nameLine.textContent = "";
        descriptionLine.textContent = "";

        function createNameInput() {
            const nameLabel = document.createElement("label");
            nameLabel.setAttribute("for", "todoName");
            const requiredSpan = document.createElement("span");
            requiredSpan.setAttribute("aria-label", "required");
            requiredSpan.textContent = `*`;
            nameLabel.append(requiredSpan, `Name:`);
            nameLine.appendChild(nameLabel);
            const nameInput = document.createElement("input");
            nameInput.setAttribute("type", "text");
            nameInput.setAttribute("id", "todoName");
            nameInput.setAttribute("name", "todoName");
            nameInput.setAttribute("autofocus", "");
            nameInput.setAttribute("required", "");
            nameLine.appendChild(nameInput);
        };

        function createDescriptionTextArea() {
            const descriptionLabel = document.createElement("label");
            descriptionLabel.setAttribute("for", "description");
            descriptionLabel.textContent = `Description:`;
            descriptionLine.appendChild(descriptionLabel);
            const descriptionTextArea = document.createElement("textarea");
            descriptionTextArea.setAttribute("name", "description");
            descriptionTextArea.setAttribute("id", "description");
            descriptionLine.appendChild(descriptionTextArea);
        }

        if (e.currentTarget.classList.contains("add-todo-button")) {
            todoH4.textContent = `Add Todo`;
            createNameInput();
            createDescriptionTextArea();
            dialogDueDate.value = "";
            dialogPriority.value = "2 - Normal";
            dialogProject.textContent = "";
            addProjectSelections();
            radioYes.checked = false;
            radioNo.checked = true;
        } else {
            todoH4.textContent = `View/Edit Todo`;
            const allTodos = todos.getAllTodos();
            const currentTodoID = e.currentTarget.dataset.todoId;
            const currentTodoArray = allTodos.filter(todo => todo.todoID === currentTodoID);
            const currentTodo = currentTodoArray[0];
            currentTodo.targeted = 'yes';
            console.log(allTodos.indexOf(currentTodo));
            const name = document.createElement("p");
            name.textContent = `Name:`;
            nameLine.appendChild(name);
            const editNameDiv = document.createElement("div");
            editNameDiv.classList.add("edit-name-and-description-div");
            const nameText = document.createElement("p");
            nameText.textContent = currentTodo.title;
            editNameDiv.appendChild(nameText);
            const editNameBtn = document.createElement("button");
            editNameBtn.classList.add("edit-button");
            editNameBtn.setAttribute("type", "button");
            editNameBtn.textContent = `edit`;
            editNameDiv.appendChild(editNameBtn);
            nameLine.appendChild(editNameDiv);
            editNameBtn.addEventListener("click", () => {
                nameLine.textContent = "";
                createNameInput();
                const dialogTodoName = todoDialog.querySelector("#todoName");
                dialogTodoName.value = currentTodo.title;
                dialogTodoName.focus();
            });
            const description = document.createElement("p");
            description.textContent = `Description:`;
            descriptionLine.appendChild(description);
            const editDescriptionDiv = document.createElement("div");
            editDescriptionDiv.classList.add("edit-name-and-description-div");
            const descriptionText = document.createElement("p");
            descriptionText.textContent = currentTodo.description;
            editDescriptionDiv.appendChild(descriptionText);
            const editDescriptionBtn = document.createElement("button");
            editDescriptionBtn.classList.add("edit-button");
            editDescriptionBtn.setAttribute("type", "button");
            editDescriptionBtn.textContent = `edit`;
            editDescriptionDiv.appendChild(editDescriptionBtn);
            descriptionLine.appendChild(editDescriptionDiv);
            editDescriptionBtn.addEventListener("click", () => {
                descriptionLine.textContent = "";
                createDescriptionTextArea();
                const dialogDescription = todoDialog.querySelector("#description");
                dialogDescription.value = currentTodo.description;
                dialogDescription.focus();
            })
            dialogDueDate.value = format(currentTodo.dueDate, 'yyyy-MM-dd');
            if (currentTodo.priority === 1) {
                dialogPriority.value = '1 - High';
            } else {
                dialogPriority.value = '2 - Normal'
            };
            dialogProject.textContent = "";
            const allProjects = projects.getAllProjects();
            for (const project of allProjects) {
                const projectOption = document.createElement("option");
                if (project.title === currentTodo.project) {
                    projectOption.setAttribute("selected", "");
                };
                projectOption.textContent = project.title;
                dialogProject.appendChild(projectOption);
            };
            if (currentTodo.isComplete === 'yes') {
                radioYes.checked = true;
                radioNo.checked = false;
            } else {
                radioYes.checked = false;
                radioNo.checked = true;
            };
            okBtn.setAttribute("autofocus", "");
            const deleteTodoBtn = document.createElement("button");
            deleteTodoBtn.classList.add("delete-todo-btn");
            deleteTodoBtn.setAttribute("type", "button");
            const deleteBtnFirstLine = document.createElement("p");
            deleteBtnFirstLine.textContent = `delete`;
            const deleteBtnSecondLine = document.createElement("p");
            deleteBtnSecondLine.textContent = `todo`;
            deleteTodoBtn.append(deleteBtnFirstLine, deleteBtnSecondLine);
            todoDialogBtns.appendChild(deleteTodoBtn);
            deleteTodoBtn.addEventListener("click", () => {
                confirmDeleteDialog.showModal();
            });
        }
        todoDialog.showModal();
        console.log(todos.getAllTodos());
        window.addEventListener("keydown", dialogEscBtn);
        todoDialog.addEventListener("close", () => window.removeEventListener("keydown", dialogEscBtn));
    }

    function activateAddTodoBtn() {
        addTodoBtn.addEventListener("click", openTodoDialog);
    };

    function activateTodoButtons() {
        todoBtns.forEach((btn) => {
            btn.addEventListener("click", openTodoDialog);
        });
    }

    function activateCancelBtn() {
        cancelBtn.addEventListener("click", () => todoDialog.close("cancel"));
    };

    function activateConfirmDeleteBtns() {
        confirmNoBtn.addEventListener("click", () => confirmDeleteDialog.close());
        confirmYesBtn.addEventListener("click", () => {
            confirmDeleteDialog.close();
            todoDialog.close("delete");
            deleteConfirmationDialog.showModal();
        });
    };

    function activateDeleteConfirmationOKBtn() {
        deleteConfirmationOKBtn.addEventListener("click", () => deleteConfirmationDialog.close());
    };

    function closeDialog() {
        const dueDateEnd = "T00:00:00";
        const dueDateValue = new Date((dialogDueDate.value + dueDateEnd));
        let priorityValue;
        if (dialogPriority.value === "2 - Normal") {
            priorityValue = 2;
        } else {
            priorityValue = 1;
        };
        const checkedRadioBtn = todoDialog.querySelector("input[name=isComplete]:checked");

        const allTodos = todos.getAllTodos();

        if (todoH4.textContent === "Add Todo") {
            const dialogTodoName = todoDialog.querySelector("#todoName");
            const dialogDescription = todoDialog.querySelector("#description");
            if (todoDialog.returnValue === "cancel") {
                return;
            } else {
                const projectName = dialogProject.value.toLowerCase();
                const projectTodos = allTodos.filter(todo => todo.project === dialogProject.value);
                const numberOfProjectTodos = projectTodos.length;
                const newID = numberOfProjectTodos + 1;
                const todoID = projectName + `-` + newID.toString();
                todos.addTodo(dialogTodoName.value, dialogDescription.value, dueDateValue, priorityValue, dialogProject.value, checkedRadioBtn.value, todoID);
                console.log(allTodos);
            } 
        } else {
            const targetedTodoArray = allTodos.filter(todo => todo.targeted === 'yes');
            const targetedTodo = targetedTodoArray[0];

            const deleteTodoBtn = todoDialog.querySelector(".delete-todo-btn");

            function adjustProjectTodoIDs() {
                const currentProjectTodos = allTodos.filter(todo => todo.project === targetedTodo.project && !(todo.targeted));
                const targetedTodoIDNumber = Number(targetedTodo.todoID.at(-1));
                for (const todo of currentProjectTodos) {
                    const todoIDNumber = Number(todo.todoID.at(-1));
                    if (todoIDNumber > targetedTodoIDNumber) {
                        const newTodoIDNumber = todoIDNumber - 1;
                        todo.todoID = todo.project.toLowerCase() + `-` + newTodoIDNumber.toString();
                    };
                };
            }

            if (todoDialog.returnValue === "cancel") {
                deleteTodoBtn.remove();
                okBtn.removeAttribute("autofocus");
                delete targetedTodo.targeted;
                return;
            } else if (todoDialog.returnValue === "delete") {
                adjustProjectTodoIDs();
                allTodos.splice(allTodos.indexOf(targetedTodo), 1);
                deleteTodoBtn.remove();
                console.log(allTodos);
            } else {
                if (nameLine.lastElementChild.id === "todoName") {
                    targetedTodo.title = nameLine.lastElementChild.value;
                };
                if (descriptionLine.lastElementChild.id === "description") {
                    targetedTodo.description = descriptionLine.lastElementChild.value;
                };
                targetedTodo.dueDate = dueDateValue;
                targetedTodo.priority = priorityValue;
                if (targetedTodo.project !== dialogProject.value) {
                    adjustProjectTodoIDs();
                    const newProjectName = dialogProject.value.toLowerCase();
                    const newProjectTodos = allTodos.filter(todo => todo.project === dialogProject.value);
                    const numberOfNewProjectTodos = newProjectTodos.length;
                    const targetedTodoNewID = numberOfNewProjectTodos + 1;
                    const targetedTodoNewTodoID = newProjectName + `-` + targetedTodoNewID.toString();
                    targetedTodo.project = dialogProject.value;
                    targetedTodo.todoID = targetedTodoNewTodoID;
                };
                targetedTodo.isComplete = checkedRadioBtn.value;
                deleteTodoBtn.remove();
                okBtn.removeAttribute("autofocus");
                delete targetedTodo.targeted;
                console.log(allTodos);
            }
        };

        const navRows = Array.from(document.querySelectorAll(".nav-list-button-wrapper"));
        const selectedRowArray = navRows
            .filter(row =>
            row.classList.contains("todo-button-selected") ||
            row.classList.contains("project-button-selected"));
        const selectedRow = selectedRowArray[0];
        if (selectedRow.classList.contains("todo-button-selected")) {
            switch (selectedRow.firstElementChild.textContent.slice(2)) {
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
        } else {
            loadProjectPage();
        }
    };

    function activateDialogClose() {
        todoDialog.addEventListener("close", closeDialog);
    };

    return { activateAddTodoBtn, activateTodoButtons, activateCancelBtn, activateDialogClose, activateConfirmDeleteBtns, activateDeleteConfirmationOKBtn };
};