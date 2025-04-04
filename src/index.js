import "./styles.css";
import { projects } from "./projects.js";
import { loadProjectRows } from "./project-rows.js";
import { navButtons } from "./nav-button-fns.js";
import { todos } from "./todo-objects.js";
import { loadToday } from "./today-page.js";
import { todoDialogController } from "./todo-dialog.js";

const initialSiteLoad = (function () {
    projects.addProject("Personal");
    projects.addProject("Work");
    projects.addProject("Hobbies");
    projects.addProject("Grocery");

    loadProjectRows();

    console.log(projects.getAllProjects());

    navButtons().activateTodayBtn();
    navButtons().activateUpcomingBtn();
    navButtons().activateAllBtn();
    navButtons().activateCompletedBtn();
    navButtons().activateProjectBtns();

    navButtons().activateNavRowEventListener();

    todos.addTodo('Call Mom', 'make sure to call Mom, she worries', new Date('2025-03-12T00:00:00'), 1, 'Personal', 'no', 'personal-1');

    todos.addTodo('Do Laundry', 'do your laundry you heathen', new Date('2025-04-04T00:00:00'), 2, 'Personal', 'no', 'personal-2');

    todos.addTodo('Meeting with Joe', 'discuss important business', new Date('2025-04-04T00:00:00'), 1, 'Work', 'no', 'work-1');

    todos.addTodo(`Shoot 100 3's`, 'gotta improve that stroke', new Date('2025-04-05T00:00:00'), 2, 'Hobbies', 'no', 'hobbies-1');

    todos.addTodo('Feed the Dog', 'dog needs to be fed', new Date('2025-03-20T00:00:00'), 1, 'Personal', 'yes', 'personal-3');

    console.log(todos.getAllTodos());

    loadToday();

    const todayBtn = document.querySelector(".today-btn");
    todayBtn.parentElement.classList.add("todo-button-selected");

    todoDialogController().activateCancelBtn();
    todoDialogController().activateConfirmDeleteBtns();
    todoDialogController().activateDeleteConfirmationOKBtn();
    todoDialogController().activateDialogClose();
})();