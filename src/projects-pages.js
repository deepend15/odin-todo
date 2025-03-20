import { todos } from "./todo-objects.js";
import { format, endOfYesterday } from "date-fns";
import { capitalize } from "./capitalize-fn.js";

export function loadProjectPage() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";

    function getCurrentProject() {
        const selectedProject = document.querySelector(".project-button-selected");
        const selectedProjectName = selectedProject.firstElementChild.textContent.slice(2).toLowerCase();
        return selectedProjectName;
    }
    const currentProject = getCurrentProject();
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

    const allTodos = todos.getAllTodos();

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
        mainDiv.appendChild(addTodoPageBtn);
    } else {
        mainDiv.insertBefore(addTodoPageBtn, todoContainer);
        currentProjectTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        for (const todo of currentProjectTodos) {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo-div");
            if (todo.priority === 1) {
                todoDiv.classList.add("p1");
            };
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