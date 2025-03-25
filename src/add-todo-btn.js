export function activateAddTodoButton() {
    const addTodoBtn = document.querySelector(".add-todo-button");
    const addTodoDialog = document.querySelector("#add-todo-dialog");
    const dialogTodoName = addTodoDialog.querySelector("#todoName");
    const dialogDescription = addTodoDialog.querySelector("#description");
    const dialogDueDate = addTodoDialog.querySelector("#dueDate");
    const dialogPriority = addTodoDialog.querySelector("#priority");
    const dialogProject = addTodoDialog.querySelector("#project");
    const dialogIsComplete = addTodoDialog.querySelector("#isComplete");

    addTodoBtn.addEventListener("click", () => {
        addTodoDialog.showModal();
        dialogTodoName.value = "";
        dialogDescription.value = "";
        dialogDueDate.value = "";
        dialogPriority.value = "Normal";
        dialogProject.value = "Personal";
        dialogIsComplete.value = "No";
        addTodoDialog.returnValue = "";
    })
}