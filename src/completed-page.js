import { todos } from "./todo-objects.js";
import { format } from "date-fns";

export function loadCompleted() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("completed-title-wrapper");
    const title = document.createElement("h3");
    title.textContent = "Completed Todos";
    titleWrapper.appendChild(title);
    mainDiv.appendChild(titleWrapper);

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
        completedTodos.sort((a, b) => a.dueDate - b.dueDate);
        for (const todo of completedTodos) {
            const todoDivContainer = document.createElement("div");
            todoDivContainer.classList.add("todo-div-container");
            const todoDiv = document.createElement("button");
            todoDiv.classList.add("todo-div");
            todoDiv.classList.add("completed");
            const title = document.createElement("p");
            title.textContent = todo.title;
            const dueDate = document.createElement("p");
            dueDate.textContent = `Due: ${format(todo.dueDate, 'MM/dd/yyyy')}`;
            todoDiv.append(title, dueDate);
            todoDivContainer.appendChild(todoDiv);
            todoContainer.appendChild(todoDivContainer);
        }
    }
}