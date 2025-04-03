import "./styles.css";
import { loadToday } from "./today-page.js";
import { loadUpcoming } from "./upcoming-page.js";
import { loadAll } from "./all-page.js";
import { loadCompleted } from "./completed-page.js";
import { loadProjectPage } from "./projects-pages.js";
import { todos } from "./todo-objects.js";
import { projects } from "./projects.js";
import { todoDialogController } from "./todo-dialog.js";

const todayBtn = document.querySelector(".today-btn");
const upcomingBtn = document.querySelector(".upcoming-btn");
const allBtn = document.querySelector(".all-btn");
const completedBtn = document.querySelector(".completed-btn");

const projectNav = document.querySelector(".project-nav");
const projectNavChildren = Array.from(projectNav.children);
const projectRows = projectNavChildren.filter(row => row.classList.contains("nav-list-button-wrapper"));

const navListButtonWrappers = document.querySelectorAll(".nav-list-button-wrapper");

function unselectCurrentTab() {
    navListButtonWrappers.forEach((wrapper) => {
        wrapper.classList.remove("project-button-selected");
        wrapper.classList.remove("todo-button-selected");
    });
}

todayBtn.parentElement.addEventListener("click", () => {
    unselectCurrentTab();
    todayBtn.parentElement.classList.add("todo-button-selected");
    loadToday();
});

upcomingBtn.parentElement.addEventListener("click", () => {
    unselectCurrentTab();
    upcomingBtn.parentElement.classList.add("todo-button-selected");
    loadUpcoming();
});

allBtn.parentElement.addEventListener("click", () => {
    unselectCurrentTab();
    allBtn.parentElement.classList.add("todo-button-selected");
    loadAll();
});

completedBtn.parentElement.addEventListener("click", () => {
    unselectCurrentTab();
    completedBtn.parentElement.classList.add("todo-button-selected");
    loadCompleted();
});

projectRows.forEach((row) => {
    row.addEventListener("click", () => {
        unselectCurrentTab();
        row.classList.add("project-button-selected");
        loadProjectPage();
    });
});

function toggleNavListButtonHighlighted(e) {
    e.target.classList.toggle("nav-list-button-highlighted");
}

navListButtonWrappers.forEach((wrapper) => {
    wrapper.addEventListener("mouseenter", toggleNavListButtonHighlighted);
    wrapper.addEventListener("mouseleave", toggleNavListButtonHighlighted);
});

const addInitialProjects = (function () {
    const projectNav = document.querySelector(".project-nav");
    const projectButtonWrappers = projectNav.querySelectorAll(".nav-list-button-wrapper");
    for (const wrapper of projectButtonWrappers) {
        projects.addProject(wrapper.firstElementChild.textContent.slice(2));
    };
})();

console.log(projects.getAllProjects());

todos.addTodo('Call Mom', 'make sure to call Mom, she worries', new Date('2025-03-12T00:00:00'), 1, 'Personal', 'no', 'personal-1');

todos.addTodo('Do Laundry', 'do your laundry you heathen', new Date('2025-04-04T00:00:00'), 2, 'Personal', 'no', 'personal-2');

todos.addTodo('Meeting with Joe', 'discuss important business', new Date('2025-04-03T00:00:00'), 1, 'Work', 'no', 'work-1');

todos.addTodo(`Shoot 100 3's`, 'gotta improve that stroke', new Date('2025-04-05T00:00:00'), 2, 'Hobbies', 'no', 'hobbies-1');

todos.addTodo('Feed the Dog', 'dog needs to be fed', new Date('2025-03-20T00:00:00'), 1, 'Personal', 'yes', 'personal-3');

console.log(todos.getAllTodos());

loadToday();
todayBtn.parentElement.classList.add("todo-button-selected");
todoDialogController().activateCancelBtn();
todoDialogController().activateConfirmDeleteBtns();
todoDialogController().activateDeleteConfirmationOKBtn();
todoDialogController().activateDialogClose();