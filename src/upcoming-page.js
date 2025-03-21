import { todos } from "./todo-objects.js";
import { format, isToday, endOfToday } from "date-fns";

export function loadUpcoming() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";

    const topLine = document.createElement("div");
    topLine.classList.add("top-line");
    mainDiv.appendChild(topLine);

    const legend = document.createElement("div");
    legend.classList.add("legend");
    const legendLine = document.createElement("div");
    legendLine.classList.add("legend-line");
    const legendColorWrapper = document.createElement("div");
    legendColorWrapper.classList.add("priority-color-wrapper");
    legendLine.appendChild(legendColorWrapper);
    const legendLineText = document.createElement("p");
    legendLineText.textContent = `= priority 1`;
    legendLine.appendChild(legendLineText);
    legend.appendChild(legendLine);
    topLine.appendChild(legend);

    const title = document.createElement("h3");
    title.textContent = "Upcoming Todos";
    topLine.appendChild(title);

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);

    const addTodoPageBtn = document.createElement("button");
    addTodoPageBtn.classList.add("add-todo-page-button");
    addTodoPageBtn.textContent = `+ Add Todo`;

    const allTodos = todos.getAllTodos();

    let today = endOfToday();

    function getUpcomingTodos(array) {
        return array
            .filter(todo => todo.dueDate > today)
            .filter(todo => todo.isComplete === 'no');
    }
    const upcomingTodos = getUpcomingTodos(allTodos);

    if (upcomingTodos.length === 0) {
        const todosTextDiv = document.createElement("div");
        todosTextDiv.classList.add("todos-text-div");
        todosTextDiv.textContent = `\uD83D\uDE4C\u00A0 Woo-hoo! You don't have any upcoming todos.`;
        todoContainer.appendChild(todosTextDiv);
        mainDiv.appendChild(addTodoPageBtn);
    } else {
        mainDiv.insertBefore(addTodoPageBtn, todoContainer);
        upcomingTodos.sort((a, b) => a.dueDate - b.dueDate);
        for (const todo of upcomingTodos) {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo-div");
            if (todo.priority === 1) {
                todoDiv.classList.add("p1");
            };
            const title = document.createElement("p");
            title.textContent = todo.title;
            const dueDate = document.createElement("p");
            dueDate.textContent = `Due: ${format(todo.dueDate, 'MM/dd/yyyy')}`;
            todoDiv.append(title, dueDate);
            todoContainer.appendChild(todoDiv);
        }
    }
}