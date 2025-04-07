import { loadToday } from "./today-page.js";
import { loadUpcoming } from "./upcoming-page.js";
import { loadAll } from "./all-page.js";
import { loadCompleted } from "./completed-page.js";
import { loadProjectPage } from "./projects-pages.js";

export function navButtons() {
    const todayBtn = document.querySelector(".today-btn");
    const upcomingBtn = document.querySelector(".upcoming-btn");
    const allBtn = document.querySelector(".all-btn");
    const completedBtn = document.querySelector(".completed-btn");

    function unselectCurrentTab() {
        const navListButtonWrappers = document.querySelectorAll(
        ".nav-list-button-wrapper");
        navListButtonWrappers.forEach((wrapper) => {
            wrapper.classList.remove("project-button-selected");
            wrapper.classList.remove("todo-button-selected");
        });
    };

    function activateTodayBtn() {
        todayBtn.parentElement.addEventListener(
        "click", () => {
            unselectCurrentTab();
            todayBtn.parentElement.classList.add(
            "todo-button-selected");
            loadToday();
        })
    };
    
    function activateUpcomingBtn() {
        upcomingBtn.parentElement.addEventListener(
        "click", () => {
            unselectCurrentTab();
            upcomingBtn.parentElement.classList.add(
            "todo-button-selected");
            loadUpcoming();
        })
    };
    
    function activateAllBtn() {
        allBtn.parentElement.addEventListener(
        "click", () => {
            unselectCurrentTab();
            allBtn.parentElement.classList.add(
            "todo-button-selected");
            loadAll();
        })
    };
    
    function activateCompletedBtn() {
        completedBtn.parentElement.addEventListener(
        "click", () => {
            unselectCurrentTab();
            completedBtn.parentElement.classList.add(
            "todo-button-selected");
            loadCompleted();
        })
    };

    function activateProjectBtns() {
        const projectRowsDiv = document.querySelector(
        ".project-rows");
        const projectRowChildren = Array.from(
        projectRowsDiv.children);
        projectRowChildren.forEach((row) => {
            row.addEventListener("click", () => {
                unselectCurrentTab();
                row.classList.add("project-button-selected");
                loadProjectPage();
            });
        });
    };

    function toggleNavListButtonHighlighted(e) {
        e.target.classList.toggle("nav-list-button-highlighted");
    };

    function activateNavRowEventListener(nav) {
        const navRows = Array.from(nav.children);
        navRows.forEach((row) => {
            row.addEventListener(
            "mouseenter", toggleNavListButtonHighlighted);
            row.addEventListener(
            "mouseleave", toggleNavListButtonHighlighted);
        });
    };

    return {
        unselectCurrentTab,
        activateTodayBtn,
        activateUpcomingBtn,
        activateAllBtn,
        activateCompletedBtn,
        activateProjectBtns,
        activateNavRowEventListener
    }
}