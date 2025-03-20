import { todos } from "./todo-objects.js";
import { format } from "date-fns";
// import { capitalize } from "./capitalize-fn.js";

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
        completedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        for (const todo of completedTodos) {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo-div");
            todoDiv.classList.add("completed");
            const title = document.createElement("p");
            title.textContent = todo.title;
            const dueDate = document.createElement("p");
            dueDate.textContent = `Due: ${format(new Date(todo.dueDate), 'MM/dd/yyyy')}`;
            todoDiv.append(title, dueDate);
            todoContainer.appendChild(todoDiv);
        }
    }
}