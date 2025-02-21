export function loadWork() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Work";
    mainDiv.appendChild(title);
}