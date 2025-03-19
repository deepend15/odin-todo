import { todos } from "./todo-objects.js";
import { capitalize } from "./capitalize-fn.js";

export function loadCompleted() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";

    const title = document.createElement("h3");
    title.textContent = "Completed Todos";
    mainDiv.appendChild(title);

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);

    const allTodos = todos.getAllTodos();

    const completedTodos = allTodos.filter(todo => todo.isComplete === 'yes');

    if (completedTodos.length === 0) {
        const todosTextDiv = document.createElement("div");
        todosTextDiv.classList.add("todos-text-div");
        const todosTextLine1 = document.createElement("p");
        todosTextLine1.textContent = "You haven't completed any todos yet.";
        todosTextDiv.appendChild(todosTextLine1);
        const todosTextLine2 = document.createElement("p");
        todosTextLine2.textContent = "But we believe in you! \u00A0\uD83D\uDCAB";
        todosTextDiv.appendChild(todosTextLine2);
        todoContainer.appendChild(todosTextDiv);
    } else {
        for (const todo of completedTodos) {
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
            isComplete.textContent = `Completed? ${capitalize(todo.isComplete)}`;
            todoDiv.append(title, description, dueDate, priority, projectName, isComplete);
            todoContainer.appendChild(todoDiv);
        }
    }
}