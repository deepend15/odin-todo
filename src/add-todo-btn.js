export function activateAddTodoButton() {
    const addTodoBtn = document.querySelector(".add-todo-button");
    const addTodoDialog = document.querySelector("#add-todo-dialog");
    const dialogTodoName = addTodoDialog.querySelector("#todoName");
    const dialogDescription = addTodoDialog.querySelector("#description");
    const dialogDueDate = addTodoDialog.querySelector("#dueDate");
    const dialogPriority = addTodoDialog.querySelector("#priority");
    const dialogProject = addTodoDialog.querySelector("#project");

    addTodoBtn.addEventListener("click", () => {
        addTodoDialog.showModal();
        dialogTodoName.value = "";
        dialogDescription.value = "";
        dialogDueDate.value = "";
        dialogPriority.value = "2 - Normal";
        dialogProject.value = "Personal";
        addTodoDialog.returnValue = "";
    })
}