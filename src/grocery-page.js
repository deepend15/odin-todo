export function loadGrocery() {
    const mainDiv = document.querySelector("main");
    mainDiv.textContent = "";
    const title = document.createElement("h3");
    title.textContent = "Grocery";
    mainDiv.appendChild(title);
}