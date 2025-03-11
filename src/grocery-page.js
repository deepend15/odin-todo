export function loadGrocery() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Grocery \u00A0\uD83C\uDF4E";
    mainDiv.appendChild(title);
}