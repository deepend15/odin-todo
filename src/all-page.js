import { todos } from "./todo-objects.js";

export function loadAll() {
    const allTodos = todos.getAllTodos();
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "All Todos";
    mainDiv.appendChild(title);
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);
    const addTodoPageBtn = document.createElement("button");
    addTodoPageBtn.classList.add("add-todo-page-button");
    addTodoPageBtn.textContent = `+ Add Todo`;
    if (allTodos.length === 0) {
        const todosTextDiv = document.createElement("div");
        todosTextDiv.classList.add("todos-text-div");
        const todosTextLine1 = document.createElement("p");
        todosTextLine1.textContent = "You haven't created any todos yet.";
        todosTextDiv.appendChild(todosTextLine1);
        const todosTextLine2 = document.createElement("p");
        todosTextLine2.textContent = "\uD83D\uDCDD\u00A0 Add one now to get started!";
        todosTextDiv.appendChild(todosTextLine2);
        todoContainer.appendChild(todosTextDiv);
        mainDiv.appendChild(addTodoPageBtn);
    } else {
        mainDiv.insertBefore(addTodoPageBtn, todoContainer);
        for (const todo of allTodos) {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo-div");
            const title = document.createElement("p");
            title.textContent = todo.title;
            const description = document.createElement("p");
            description.textContent = todo.description;
            const dueDate = document.createElement("p");
            dueDate.textContent = `Due: ${todo.dueDate}`;
            const priority = document.createElement("p");
            priority.textContent = `Priority: ${todo.priority}`;
            const projectName = document.createElement("p");
            projectName.textContent = `Project: ${todo.project}`;
            const isComplete = document.createElement("p");
            isComplete.textContent = `Is complete: ${todo.isComplete}`;
            todoDiv.append(title, description, dueDate, priority, projectName, isComplete);
            todoContainer.appendChild(todoDiv);
        }
    }
}