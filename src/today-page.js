import { todos } from "./todo-objects.js";
import { format, isToday } from "date-fns";
import { capitalize } from "./capitalize-fn.js";

export function loadToday() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";

    const title = document.createElement("h3");
    title.textContent = "Today's Todos";
    mainDiv.appendChild(title);

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);

    const addTodoPageBtn = document.createElement("button");
    addTodoPageBtn.classList.add("add-todo-page-button");
    addTodoPageBtn.textContent = `+ Add Todo`;

    const allTodos = todos.getAllTodos();

    function getTodaysTodos(array) {
        return array
            .filter(todo => isToday(new Date(todo.dueDate)))
            .filter(todo => todo.isComplete === 'no');
    }
    const todaysTodos = getTodaysTodos(allTodos);

    if (todaysTodos.length === 0) {
        const todosTextDiv = document.createElement("div");
        todosTextDiv.classList.add("todos-text-div");
        todosTextDiv.textContent = `\u2705\u00A0 Nice! You don't have any todos for today.`;
        todoContainer.appendChild(todosTextDiv);
        mainDiv.appendChild(addTodoPageBtn);
    } else {
        mainDiv.insertBefore(addTodoPageBtn, todoContainer);
        for (const todo of todaysTodos) {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo-div");
            const title = document.createElement("p");
            title.textContent = todo.title;
            const description = document.createElement("p");
            description.textContent = todo.description;
            const dueDate = document.createElement("p");
            dueDate.textContent = `Due: ${format(new Date(todo.dueDate), 'MM/dd/yyyy')}`;
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