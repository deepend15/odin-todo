import { projects } from "./projects.js";
import { todos } from "./todo-objects.js";
import { format } from "date-fns";
import { showTodos } from "./display-todos.js";

export function editTodoDialogController() {
    const todoBtns = document.querySelectorAll(".todo-div");
    const editTodoDialog = document.querySelector("#edit-todo-dialog");
    const dialogTodoName = editTodoDialog.querySelector("#todoName");
    const dialogDescription = editTodoDialog.querySelector("#description");
    const dialogDueDate = editTodoDialog.querySelector("#dueDate");
    const dialogPriority = editTodoDialog.querySelector("#priority");
    const dialogProject = editTodoDialog.querySelector("#project");
    const radioYes = editTodoDialog.querySelector("#yes");
    const radioNo = editTodoDialog.querySelector("#no");
    const cancelBtn = editTodoDialog.querySelector(".cancel-button");

    function dialogEscBtn(e) {
        if (e.key === "Escape") {
            editTodoDialog.close("cancel");
            console.log(editTodoDialog.returnValue);
        }
    };

    function openDialog(e) {
        const allTodos = todos.getAllTodos();
        const currentTodoID = e.currentTarget.dataset.projectId;
        const currentTodoArray = allTodos.filter(todo => todo.projectID === currentTodoID);
        const currentTodo = currentTodoArray[0];
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
        editTodoDialog.showModal();
        window.addEventListener("keydown", dialogEscBtn);
        editTodoDialog.addEventListener("close", () => window.removeEventListener("keydown", dialogEscBtn));
    }

    function activateTodoButtons() {
        todoBtns.forEach((btn) => {
            btn.addEventListener("click", openDialog);
        });
    }

    function closeViaCancel() {
        editTodoDialog.close("cancel");
        const checkedRadioBtn = editTodoDialog.querySelector("input[name=isComplete]:checked");
        console.log(editTodoDialog.returnValue);
        console.log(`${dialogTodoName.value}, ${dialogDescription.value}, ${dialogDueDate.value}, ${dialogPriority.value}, ${dialogProject.value}, ${checkedRadioBtn.value}`);
    };

    function activateCancelBtn() {
        cancelBtn.addEventListener("click", closeViaCancel);
    };

    return { activateTodoButtons, activateCancelBtn };
}