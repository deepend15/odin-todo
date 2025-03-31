import { projects } from "./projects.js";
import { todos } from "./todo-objects.js";
import { showTodos } from "./display-todos.js";

export function addTodoDialogController() {
    const addTodoBtn = document.querySelector(".add-todo-button");
    const addTodoDialog = document.querySelector("#add-todo-dialog");
    const dialogTodoName = addTodoDialog.querySelector("#todoName");
    const dialogDescription = addTodoDialog.querySelector("#description");
    const dialogDueDate = addTodoDialog.querySelector("#dueDate");
    const dialogPriority = addTodoDialog.querySelector("#priority");
    const dialogProject = addTodoDialog.querySelector("#project");
    const radioYes = addTodoDialog.querySelector("#yes");
    const radioNo = addTodoDialog.querySelector("#no");
    const cancelBtn = addTodoDialog.querySelector(".cancel-button");

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
            addTodoDialog.close("cancel");
            console.log(addTodoDialog.returnValue);
        }
    };

    function openDialog() {
        dialogTodoName.value = "";
        dialogDescription.value = "";
        dialogDueDate.value = "";
        dialogPriority.value = "2 - Normal";
        addTodoDialog.returnValue = "";
        dialogProject.textContent = "";
        addProjectSelections();
        radioYes.checked = false;
        radioNo.checked = true;
        addTodoDialog.showModal();
        window.addEventListener("keydown", dialogEscBtn);
        addTodoDialog.addEventListener("close", () => window.removeEventListener("keydown", dialogEscBtn));
    };

    function activateAddTodoBtn() {
        addTodoBtn.addEventListener("click", openDialog);
    };

    function closeViaCancel() {
        addTodoDialog.close("cancel");
        const checkedRadioBtn = addTodoDialog.querySelector("input[name=isComplete]:checked");
        console.log(addTodoDialog.returnValue);
        console.log(`${dialogTodoName.value}, ${dialogDescription.value}, ${dialogDueDate.value}, ${dialogPriority.value}, ${dialogProject.value}, ${checkedRadioBtn.value}`);
    };

    function activateCancelBtn() {
        cancelBtn.addEventListener("click", closeViaCancel);
    };

    function closeDialog() {
        if (addTodoDialog.returnValue === "cancel") {
            return;
        } else {
            const dueDateEnd = "T00:00:00";
            const dueDateValue = new Date((dialogDueDate.value + dueDateEnd));
            let priorityValue;
            if (dialogPriority.value === "2 - Normal") {
                priorityValue = 2;
            } else {
                priorityValue = 1;
            };
            const checkedRadioBtn = addTodoDialog.querySelector("input[name=isComplete]:checked");
            todos.addTodo(dialogTodoName.value, dialogDescription.value, dueDateValue, priorityValue, dialogProject.value, checkedRadioBtn.value);
            const navRows = Array.from(document.querySelectorAll(".nav-list-button-wrapper"));
            const selectedRowArray = navRows
                .filter(row =>
                row.classList.contains("todo-button-selected") ||
                row.classList.contains("project-button-selected"));
            const selectedRow = selectedRowArray[0];
            if (selectedRow.classList.contains("todo-button-selected")) {
                switch (selectedRow.firstElementChild.textContent.slice(2)) {
                    case 'Today':
                        showTodos().showTodaysTodos();
                        break;
                    case 'Upcoming':
                        showTodos().showUpcomingTodos();
                        break;
                    case 'All':
                        showTodos().showAllTodos();
                        break;
                }
            } else {
                showTodos().showProjectTodos();
            };
        };
    };

    function activateDialogClose() {
        addTodoDialog.addEventListener("close", closeDialog);
    };

    return { activateAddTodoBtn, activateCancelBtn, activateDialogClose };
};