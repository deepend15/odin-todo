export function loadHobbies() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Hobbies";
    mainDiv.appendChild(title);
}