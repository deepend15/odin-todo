import "./styles.css";
import { loadToday } from "./today-page.js";
import { loadAll } from "./all-page.js";
import { loadCompleted } from "./completed-page.js";
import { loadPersonal } from "./personal-page.js";
import { loadWork } from "./work-page.js";
import { loadHobbies } from "./hobbies-page.js";
import { loadGrocery } from "./grocery-page.js";
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

loadToday();
todayBtn.parentElement.classList.add("todo-button-selected");

const addInitialProjects = (function () {
    const projectNav = document.querySelector(".project-nav");
    const projectButtonWrappers = projectNav.querySelectorAll(".nav-list-button-wrapper");
    for (const wrapper of projectButtonWrappers) {
        projects.addProject(wrapper.firstElementChild.textContent.slice(2).toLowerCase());
    };
})();

console.log(projects.getAllProjects());

function getCurrentProject() {
    const match = [];
    const selectedProject = document.querySelector(".project-button-selected");
    if (selectedProject) {
        for (const project of projects.getAllProjects()) {
            if (project.title === selectedProject.firstElementChild.textContent.slice(2).toLowerCase()) {
                match.push(project);
            }
        }
        return match[0];
    } else {
        console.log('There is no selected project.');
    }
}

function unselectCurrentProject() {
    navListButtonWrappers.forEach((wrapper) => {
        wrapper.classList.remove("project-button-selected");
        wrapper.classList.remove("todo-button-selected");
    });
}

todayBtn.parentElement.addEventListener("click", () => {
    loadToday();
    unselectCurrentProject();
    todayBtn.parentElement.classList.add("todo-button-selected");
});

allBtn.parentElement.addEventListener("click", () => {
    loadAll();
    unselectCurrentProject();
    allBtn.parentElement.classList.add("todo-button-selected");
});

completedBtn.parentElement.addEventListener("click", () => {
    loadCompleted();
    unselectCurrentProject();
    completedBtn.parentElement.classList.add("todo-button-selected");
});

personalBtn.parentElement.addEventListener("click", () => {
    loadPersonal();
    unselectCurrentProject();
    personalBtn.parentElement.classList.add("project-button-selected");
});

workBtn.parentElement.addEventListener("click", () => {
    loadWork();
    unselectCurrentProject();
    workBtn.parentElement.classList.add("project-button-selected");
});

hobbiesBtn.parentElement.addEventListener("click", () => {
    loadHobbies();
    unselectCurrentProject();
    hobbiesBtn.parentElement.classList.add("project-button-selected");
});

groceryBtn.parentElement.addEventListener("click", () => {
    loadGrocery();
    unselectCurrentProject();
    groceryBtn.parentElement.classList.add("project-button-selected");
});

function toggleNavListButtonHighlighted(e) {
    e.target.classList.toggle("nav-list-button-highlighted");
}

navListButtonWrappers.forEach((wrapper) => {
    wrapper.addEventListener("mouseenter", toggleNavListButtonHighlighted);
    wrapper.addEventListener("mouseleave", toggleNavListButtonHighlighted);
});

