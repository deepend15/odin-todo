export function loadPersonal() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Personal";
    mainDiv.appendChild(title);
}