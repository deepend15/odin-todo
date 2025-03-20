import { todos } from "./todo-objects.js";
import { format, endOfYesterday } from "date-fns";
// import { capitalize } from "./capitalize-fn.js";

export function loadAll() {
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
        mainDiv.appendChild(addTodoPageBtn);
    } else {
        mainDiv.insertBefore(addTodoPageBtn, todoContainer);
        allTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        for (const todo of allTodos) {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo-div");
            switch(todo.priority) {
                case 1:
                    todoDiv.classList.add("p1");
                    break;
                case 2:
                    todoDiv.classList.add("p2");
                    break;
                case 3:
                    todoDiv.classList.add("p3");
                    break;
            }
            let yesterday = endOfYesterday();
            if (new Date(todo.dueDate) <= yesterday) {
                todoDiv.classList.add("overdue");
            }
            const title = document.createElement("p");
            title.textContent = todo.title;
            const dueDate = document.createElement("p");
            dueDate.textContent = `Due: ${format(new Date(todo.dueDate), 'MM/dd/yyyy')}`;
            todoDiv.append(title, dueDate);
            todoContainer.appendChild(todoDiv);
        }
    }
}