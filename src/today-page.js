export function loadToday() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Today's Todos";
    mainDiv.appendChild(title);
}