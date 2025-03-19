import "./styles.css";
import { loadToday } from "./today-page.js";
import { loadAll } from "./all-page.js";
import { loadCompleted } from "./completed-page.js";
import { loadProjectPage } from "./projects-pages.js";
import { todos } from "./todo-objects.js";
import { projects } from "./projects.js";

const personalBtn = document.querySelector(".personal-btn");
const workBtn = document.querySelector(".work-btn");
const hobbiesBtn = document.querySelector(".hobbies-btn");
const groceryBtn = document.querySelector(".grocery-btn");
const todayBtn = document.querySelector(".today-btn");
const allBtn = document.querySelector(".all-btn");
const completedBtn = document.querySelector(".completed-btn");

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

personalBtn.parentElement.addEventListener("click", () => {
    unselectCurrentTab();
    personalBtn.parentElement.classList.add("project-button-selected");
    loadProjectPage();
});

workBtn.parentElement.addEventListener("click", () => {
    unselectCurrentTab();
    workBtn.parentElement.classList.add("project-button-selected");
    loadProjectPage();
});

hobbiesBtn.parentElement.addEventListener("click", () => {
    unselectCurrentTab();
    hobbiesBtn.parentElement.classList.add("project-button-selected");
    loadProjectPage();
});

groceryBtn.parentElement.addEventListener("click", () => {
    unselectCurrentTab();
    groceryBtn.parentElement.classList.add("project-button-selected");
    loadProjectPage();
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
        projects.addProject(wrapper.firstElementChild.textContent.slice(2).toLowerCase());
    };
})();

console.log(projects.getAllProjects());

todos.addTodo('Call Mom', 'make sure to call Mom, she worries', '2025-03-12T00:00:00', 1, 'personal', 'no');

todos.addTodo('Do Laundry', 'do your laundry you heathen', '2025-03-20T00:00:00', 3, 'personal', 'no');

todos.addTodo('Meeting with Joe', 'discuss important business', '2025-03-24T00:00:00', 1, 'work', 'no');

todos.addTodo(`Shoot 100 3's`, 'gotta improve that stroke', '2025-03-22T00:00:00', 2, 'hobbies', 'no');

todos.addTodo('Feed the Dog', 'dog needs to be fed', '2025-03-18T00:00:00', 1, 'personal', 'yes');

loadToday();
todayBtn.parentElement.classList.add("todo-button-selected");