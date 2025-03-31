import { projects } from "./projects.js";
import { todos } from "./todo-objects.js";
import { showTodos } from "./display-todos.js";
import { format } from "date-fns";

export function todoDialogController() {
    const addTodoBtn = document.querySelector(".add-todo-button");
    const todoBtns = document.querySelectorAll(".todo-div");
    const todoDialog = document.querySelector("#todo-dialog");
    const todoH4 = todoDialog.querySelector("h4");
    const dialogTodoName = todoDialog.querySelector("#todoName");
    const dialogDescription = todoDialog.querySelector("#description");
    const dialogDueDate = todoDialog.querySelector("#dueDate");
    const dialogPriority = todoDialog.querySelector("#priority");
    const dialogProject = todoDialog.querySelector("#project");
    const radioYes = todoDialog.querySelector("#yes");
    const radioNo = todoDialog.querySelector("#no");
    const cancelBtn = todoDialog.querySelector(".cancel-button");

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
        if (e.currentTarget.classList.contains("add-todo-button")) {
            todoH4.textContent = `Add Todo`;
            dialogTodoName.value = "";
            dialogDescription.value = "";
            dialogDueDate.value = "";
            dialogPriority.value = "2 - Normal";
            dialogProject.textContent = "";
            addProjectSelections();
            radioYes.checked = false;
            radioNo.checked = true;
        } else {
            todoH4.textContent = `View/Edit Todo`;
            const allTodos = todos.getAllTodos();
            const currentTodoID = e.currentTarget.dataset.projectId;
            const currentTodoArray = allTodos.filter(todo => todo.projectID === currentTodoID);
            const currentTodo = currentTodoArray[0];
            currentTodo.targeted = 'yes';
            dialogTodoName.value = currentTodo.title;
            dialogDescription.value = currentTodo.description;
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
        }
        todoDialog.showModal();
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

    function closeViaCancel() {
        todoDialog.close("cancel");
        const checkedRadioBtn = todoDialog.querySelector("input[name=isComplete]:checked");
        console.log(todoDialog.returnValue);
        console.log(`${dialogTodoName.value}, ${dialogDescription.value}, ${dialogDueDate.value}, ${dialogPriority.value}, ${dialogProject.value}, ${checkedRadioBtn.value}`);
    };

    function activateCancelBtn() {
        cancelBtn.addEventListener("click", closeViaCancel);
    };

    function closeDialog() {
        if (todoH4.textContent === "Add Todo") {
            if (todoDialog.returnValue === "cancel") {
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
                const checkedRadioBtn = todoDialog.querySelector("input[name=isComplete]:checked");
                const projectName = dialogProject.value.toLowerCase();
                const allTodos = todos.getAllTodos();
                const projectTodos = allTodos.filter(todo => todo.project === dialogProject.value);
                const numberOfProjectTodos = projectTodos.length;
                const newID = numberOfProjectTodos + 1;
                const projectID = projectName + `-` + newID.toString();
                todos.addTodo(dialogTodoName.value, dialogDescription.value, dueDateValue, priorityValue, dialogProject.value, checkedRadioBtn.value, projectID);
                console.log(allTodos);
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
            } 
        } else {
            const allTodos = todos.getAllTodos();
            const targetedTodoArray = allTodos.filter(todo => todo.targeted === 'yes');
            const targetedTodo = targetedTodoArray[0];
            if (todoDialog.returnValue === "cancel") {
                delete targetedTodo.targeted;
                return;
            } else {
                targetedTodo.title = dialogTodoName.value;
                targetedTodo.description = dialogDescription.value;
                const dueDateEnd = "T00:00:00";
                const dueDateValue = new Date((dialogDueDate.value + dueDateEnd));
                targetedTodo.dueDate = dueDateValue;
                let priorityValue;
                if (dialogPriority.value === "2 - Normal") {
                    priorityValue = 2;
                } else {
                    priorityValue = 1;
                };
                targetedTodo.priority = priorityValue;
                if (targetedTodo.project !== dialogProject.value) {
                    const currentProjectTodos = allTodos.filter(todo => todo.project === targetedTodo.project && !(todo.targeted));
                    const targetedTodoIDNumber = Number(targetedTodo.projectID.at(-1));
                    for (const todo of currentProjectTodos) {
                        const todoIDNumber = Number(todo.projectID.at(-1));
                        if (todoIDNumber > targetedTodoIDNumber) {
                            const newTodoIDNumber = todoIDNumber - 1;
                            todo.projectID = todo.project.toLowerCase() + `-` + newTodoIDNumber.toString();
                        };
                    };
                    const newProjectName = dialogProject.value.toLowerCase();
                    const newProjectTodos = allTodos.filter(todo => todo.project === dialogProject.value);
                    const numberOfNewProjectTodos = newProjectTodos.length;
                    const targetedTodoNewID = numberOfNewProjectTodos + 1;
                    const targetedTodoNewProjectID = newProjectName + `-` + targetedTodoNewID.toString();
                    targetedTodo.project = dialogProject.value;
                    targetedTodo.projectID = targetedTodoNewProjectID;
                    const checkedRadioBtn = todoDialog.querySelector("input[name=isComplete]:checked");
                    targetedTodo.isComplete = checkedRadioBtn.value;
                    console.log(targetedTodo.isComplete);
                    delete targetedTodo.targeted;
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
            }
        };
    };

    function activateDialogClose() {
        todoDialog.addEventListener("close", closeDialog);
    };

    return { activateAddTodoBtn, activateTodoButtons, activateCancelBtn, activateDialogClose };
};