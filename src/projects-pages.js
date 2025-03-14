import { todos } from "./todo-objects.js";

export function loadProjectPage() {
    const allTodos = todos.getAllTodos();
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";

    function getCurrentProject() {
        const selectedProject = document.querySelector(".project-button-selected");
        const selectedProjectName = selectedProject.firstElementChild.textContent.slice(2).toLowerCase();
        return selectedProjectName;
    };
    const currentProject = getCurrentProject();

    function capitalize(str) {
        const firstLetter = str.charAt(0).toUpperCase();
        const rest = str.slice(1);
        return firstLetter + rest;
    }
    const currentProjectCapitalized = capitalize(currentProject);

    const title = document.createElement("h3");
    title.textContent = currentProjectCapitalized;
    switch(currentProject) {
        case 'personal':
            title.textContent += "\u00A0\u00A0\uD83C\uDFE1";
            break;
        case 'work':
            title.textContent += "\u00A0\u00A0\uD83D\uDCBB";
            break;
        case 'hobbies': 
            title.textContent += "\u00A0\uD83C\uDFC6";
            break;
        case 'grocery':
            title.textContent += "\u00A0\uD83C\uDF4E";
            break;
    }
    mainDiv.appendChild(title);

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    mainDiv.appendChild(todoContainer);

    const addTodoPageBtn = document.createElement("button");
    addTodoPageBtn.classList.add("add-todo-page-button");
    addTodoPageBtn.textContent = `+ Add Todo`;

    const showTodosOnProjectPage = (function () {
        const currentProjectTodos = allTodos.filter(todo => todo.project === currentProject);
        if (currentProjectTodos.length === 0) {
            const todosTextDiv = document.createElement("div");
            todosTextDiv.classList.add("todos-text-div");
            todosTextDiv.textContent = `No todos for this project.`;
            todoContainer.appendChild(todosTextDiv);
            mainDiv.appendChild(addTodoPageBtn);
        } else {
            mainDiv.insertBefore(addTodoPageBtn, todoContainer);
            for (const todo of currentProjectTodos) {
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
    })();
}