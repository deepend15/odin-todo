import { todos } from "./todo-objects.js";

export function loadPersonal() {
    const allTodos = todos.getAllTodos();
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Personal \u00A0\uD83C\uDFE1";
    mainDiv.appendChild(title);
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);
    const personalTodos = allTodos.filter(todo => todo.project === 'personal');
    const addTodoPageBtn = document.createElement("button");
    addTodoPageBtn.classList.add("add-todo-page-button");
    addTodoPageBtn.textContent = `+ Add Todo`;
    if (personalTodos.length === 0) {
        const todosTextDiv = document.createElement("div");
        todosTextDiv.classList.add("todos-text-div");
        todosTextDiv.textContent = `No todos for this project.`;
        todoContainer.appendChild(todosTextDiv);
        mainDiv.appendChild(addTodoPageBtn);
    } else {
        mainDiv.insertBefore(addTodoPageBtn, todoContainer);
        for (const todo of personalTodos) {
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
        };
    }
}