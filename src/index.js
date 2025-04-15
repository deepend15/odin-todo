import "./styles.css";
import { projects } from "./projects.js";
import { loadProjectRows } from "./project-rows.js";
import { navButtons } from "./nav-button-fns.js";
import { projectDialogController } from "./project-dialogs.js";
import { todos } from "./todo-objects.js";
import { loadToday } from "./today-page.js";
import { todoDialogController } from "./todo-dialog.js";

(function initialSiteLoad() {
    function addInitialProjects() {
        projects.addProject("Personal");
        projects.addProject("Work");
        projects.addProject("Hobbies");
        projects.addProject("Grocery");
    }

    if (!localStorage.getItem("projects")) {
        addInitialProjects();
    } else {
        let projectsJSON = localStorage.getItem("projects");
        let parsedProjects = JSON.parse(projectsJSON);
        for (const project of parsedProjects) {
            projects.addProject(project.title);
        }
    }

    loadProjectRows();

    navButtons().activateTodayBtn();
    navButtons().activateUpcomingBtn();
    navButtons().activateAllBtn();
    navButtons().activateCompletedBtn();
    navButtons().activateProjectBtns();

    const todoNav = document.querySelector(".todo-nav");
    const projectRowsDiv = document.querySelector(".project-rows");
    navButtons().activateNavRowEventListener(todoNav);
    navButtons().activateNavRowEventListener(projectRowsDiv);

    projectDialogController().activateAddAndRemoveProjectBtns();
    projectDialogController().activateCancelBtns();
    projectDialogController().activateRemoveProjectOKBtn();
    projectDialogController().activateDialogClose();

    if (localStorage.getItem("todos")) {
        let todosJSON = localStorage.getItem("todos");
        let parsedTodos = JSON.parse(todosJSON);
        for (const todo of parsedTodos) {
            todo.dueDate = new Date(todo.dueDate);
        };
        for (const todo of parsedTodos) {
            todos.addTodo(todo.title, todo.description, todo.dueDate, todo.priority, todo.project, todo.isComplete, todo.todoID);
        }
    }

    loadToday();

    const todayBtn = document.querySelector(".today-btn");
    todayBtn.parentElement.classList.add("todo-button-selected");

    todoDialogController().activateCancelBtn();
    todoDialogController().activateDialogClose();
})();