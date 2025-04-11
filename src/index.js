import "./styles.css";
import { projects } from "./projects.js";
import { loadProjectRows } from "./project-rows.js";
import { navButtons } from "./nav-button-fns.js";
import { projectDialogController } from "./project-dialogs.js";
import { todos } from "./todo-objects.js";
import { loadToday } from "./today-page.js";
import { todoDialogController } from "./todo-dialog.js";

const initialSiteLoad = (function () {
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

    console.log(projects.getAllProjects());

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

    // todos.addTodo('Call Mom', 'make sure to call Mom, she worries', new Date('2025-03-12T00:00:00'), 1, 'Personal', 'no', 'personal-1');

    // todos.addTodo('Do Laundry', 'do your laundry you heathen', new Date('2025-04-11T00:00:00'), 2, 'Personal', 'no', 'personal-2');

    // todos.addTodo('Meeting with Joe', 'discuss important business', new Date('2025-04-11T00:00:00'), 1, 'Work', 'no', 'work-1');

    // todos.addTodo(`Shoot 100 3's`, 'gotta improve that stroke', new Date('2025-04-12T00:00:00'), 2, 'Hobbies', 'no', 'hobbies-1');

    // todos.addTodo('Feed the Dog', 'dog needs to be fed', new Date('2025-03-20T00:00:00'), 1, 'Personal', 'yes', 'personal-3');

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

    console.log(todos.getAllTodos());

    loadToday();

    const todayBtn = document.querySelector(".today-btn");
    todayBtn.parentElement.classList.add("todo-button-selected");

    todoDialogController().activateCancelBtn();
    todoDialogController().activateDialogClose();
})();