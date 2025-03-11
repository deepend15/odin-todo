export function loadHobbies() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Hobbies \u00A0\uD83C\uDFC6";
    mainDiv.appendChild(title);
}