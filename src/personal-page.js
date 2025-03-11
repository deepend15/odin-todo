export function loadPersonal() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Personal \u00A0\uD83C\uDFE1";
    mainDiv.appendChild(title);
}