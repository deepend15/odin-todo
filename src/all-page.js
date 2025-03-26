import { todos } from "./todo-objects.js";
import { format, endOfYesterday } from "date-fns";
import { activateAddTodoButton } from "./add-todo-btn.js";

export function loadAll() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    
    const topLine = document.createElement("div");
    topLine.classList.add("top-line");
    mainDiv.appendChild(topLine);

    const legend = document.createElement("div");
    legend.classList.add("legend");
    const legendLine1 = document.createElement("div");
    legendLine1.classList.add("legend-line");
    const legendColorWrapper1 = document.createElement("div");
    legendColorWrapper1.classList.add("overdue-color-wrapper");
    legendLine1.appendChild(legendColorWrapper1);
    const line1Text = document.createElement("p");
    line1Text.textContent = `= overdue`;
    legendLine1.appendChild(line1Text);
    legend.appendChild(legendLine1);
    const legendLine2 = document.createElement("div");
    legendLine2.classList.add("legend-line");
    const legendColorWrapper2 = document.createElement("div");
    legendColorWrapper2.classList.add("priority-color-wrapper");
    legendLine2.appendChild(legendColorWrapper2);
    const line2Text = document.createElement("p");
    line2Text.textContent = `= priority 1`;
    legendLine2.appendChild(line2Text);
    legend.appendChild(legendLine2);
    topLine.appendChild(legend);

    const title = document.createElement("h3");
    title.textContent = "All Todos";
    topLine.appendChild(title);

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);

    const addTodoBtn = document.createElement("button");
    addTodoBtn.classList.add("add-todo-button");
    addTodoBtn.textContent = `+ Add Todo`;

    const allTodos = todos.getAllTodos().filter(todo => todo.isComplete === 'no');

    if (allTodos.length === 0) {
        const todosTextDiv = document.createElement("div");
        todosTextDiv.classList.add("todos-text-div");
        const todosTextLine1 = document.createElement("p");
        todosTextLine1.textContent = "You don't have any new todos.";
        todosTextDiv.appendChild(todosTextLine1);
        const todosTextLine2 = document.createElement("p");
        todosTextLine2.textContent = "\uD83D\uDCDD\u00A0 Add one now to get started!";
        todosTextDiv.appendChild(todosTextLine2);
        todoContainer.appendChild(todosTextDiv);
        mainDiv.appendChild(addTodoBtn);
    } else {
        mainDiv.insertBefore(addTodoBtn, todoContainer);
        allTodos.sort((a, b) => a.dueDate - b.dueDate);
        for (const todo of allTodos) {
            const todoDivContainer = document.createElement("div");
            todoDivContainer.classList.add("todo-div-container");
            const todoDiv = document.createElement("button");
            todoDiv.classList.add("todo-div");
            if (todo.priority === 1) {
                todoDiv.classList.add("p1");
            };
            let yesterday = endOfYesterday();
            if (todo.dueDate <= yesterday) {
                todoDiv.classList.add("overdue");
            };
            const title = document.createElement("p");
            title.textContent = todo.title;
            const dueDate = document.createElement("p");
            dueDate.textContent = `Due: ${format(todo.dueDate, 'MM/dd/yyyy')}`;
            todoDiv.append(title, dueDate);
            todoDivContainer.appendChild(todoDiv);
            todoContainer.appendChild(todoDivContainer);
        }
    }

    activateAddTodoButton();
}