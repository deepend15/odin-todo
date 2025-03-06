export function loadCompleted() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Completed Todos";
    mainDiv.appendChild(title);
}