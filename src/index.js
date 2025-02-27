import "./styles.css";
import { loadPersonal } from "./personal-page.js";
import { loadWork } from "./work-page.js";
import { loadHobbies } from "./hobbies-page.js";
import { loadGrocery } from "./grocery-page.js";
import { todos } from "./todo-objects.js";

const personalBtn = document.querySelector(".personal-btn");
const workBtn = document.querySelector(".work-btn");
const hobbiesBtn = document.querySelector(".hobbies-btn");
const groceryBtn = document.querySelector(".grocery-btn");

const projectButtonWrappers = document.querySelectorAll(".project-button-wrapper");

loadPersonal();
personalBtn.parentElement.classList.add("project-button-selected");

function unselectCurrentProject() {
    projectButtonWrappers.forEach((wrapper) => {
        wrapper.classList.remove("project-button-selected");
    });
}

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

function toggleProjectButtonHighlighted(e) {
    e.target.classList.toggle("project-button-highlighted");
}

projectButtonWrappers.forEach((wrapper) => {
    wrapper.addEventListener("mouseenter", toggleProjectButtonHighlighted);
    wrapper.addEventListener("mouseleave", toggleProjectButtonHighlighted);
});

