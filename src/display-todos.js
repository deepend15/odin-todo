import { todos } from "./todo-objects.js";
import { format, isToday, endOfYesterday, endOfToday } from "date-fns";

export function showTodos() {
    const mainDiv = document.querySelector("main");
    const todoContainer = document.querySelector(".todo-container");

    const addTodoBtn = document.createElement("button");
    addTodoBtn.classList.add("add-todo-button");
    addTodoBtn.textContent = `+ Add Todo`;

    const allTodos = todos.getAllTodos();

    function showTodaysTodos() {
        let yesterday = endOfYesterday();

        function getTodaysTodos(array) {
            return array
                .filter(todo => isToday(todo.dueDate) || todo.dueDate <= yesterday)
                .filter(todo => todo.isComplete === 'no');
        }
        const todaysTodos = getTodaysTodos(allTodos);

        if (todaysTodos.length === 0) {
            const todosTextDiv = document.createElement("div");
            todosTextDiv.classList.add("todos-text-div");
            todosTextDiv.textContent = `\u2705\u00A0 Nice! You don't have any todos for today.`;
            todoContainer.appendChild(todosTextDiv);
            mainDiv.appendChild(addTodoBtn);
        } else {
            mainDiv.insertBefore(addTodoBtn, todoContainer);
            todaysTodos.sort((a, b) => a.dueDate - b.dueDate);
            for (const todo of todaysTodos) {
                const todoDivContainer = document.createElement("div");
                todoDivContainer.classList.add("todo-div-container");
                const todoDiv = document.createElement("button");
                todoDiv.classList.add("todo-div");
                if (todo.priority === 1) {
                    todoDiv.classList.add("p1");
                };
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
    };

    function showUpcomingTodos() {
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
            mainDiv.appendChild(addTodoBtn);
        } else {
            mainDiv.insertBefore(addTodoBtn, todoContainer);
            upcomingTodos.sort((a, b) => a.dueDate - b.dueDate);
            for (const todo of upcomingTodos) {
                const todoDivContainer = document.createElement("div");
                todoDivContainer.classList.add("todo-div-container");
                const todoDiv = document.createElement("button");
                todoDiv.classList.add("todo-div");
                if (todo.priority === 1) {
                    todoDiv.classList.add("p1");
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
    };

    function showAllTodos() {
        const allUncompletedTodos = allTodos.filter(todo => todo.isComplete === 'no');

        if (allUncompletedTodos.length === 0) {
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
            allUncompletedTodos.sort((a, b) => a.dueDate - b.dueDate);
            for (const todo of allUncompletedTodos) {
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
    };

    function showCompletedTodos() {
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
    };

    function showProjectTodos() {
        function getCurrentProject() {
            const selectedProject = document.querySelector(".project-button-selected");
            const selectedProjectName = selectedProject.firstElementChild.textContent.slice(2);
            return selectedProjectName;
        }
        const currentProject = getCurrentProject();

        function getCurrentProjectTodos(array) {
            return array
                .filter(todo => todo.project === currentProject)
                .filter(todo => todo.isComplete === 'no');
        }
        const currentProjectTodos = getCurrentProjectTodos(allTodos);

        if (currentProjectTodos.length === 0) {
            const todosTextDiv = document.createElement("div");
            todosTextDiv.classList.add("todos-text-div");
            todosTextDiv.textContent = `No todos for this project.`;
            todoContainer.appendChild(todosTextDiv);
            mainDiv.appendChild(addTodoBtn);
        } else {
            mainDiv.insertBefore(addTodoBtn, todoContainer);
            currentProjectTodos.sort((a, b) => a.dueDate - b.dueDate);
            for (const todo of currentProjectTodos) {
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
                }
                const title = document.createElement("p");
                title.textContent = todo.title;
                const dueDate = document.createElement("p");
                dueDate.textContent = `Due: ${format(todo.dueDate, 'MM/dd/yyyy')}`;
                todoDiv.append(title, dueDate);
                todoDivContainer.appendChild(todoDiv);
                todoContainer.appendChild(todoDivContainer);
            }
        }
    };

    return { showTodaysTodos, showUpcomingTodos, showAllTodos, showCompletedTodos, showProjectTodos };
}