export function loadAll() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "All Todos";
    mainDiv.appendChild(title);
}