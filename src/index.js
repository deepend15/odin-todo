import "./styles.css";
import { loadPersonal } from "./personal-page.js";
import { loadWork } from "./work-page.js";
import { loadHobbies } from "./hobbies-page.js";
import { loadGrocery } from "./grocery-page.js";

loadPersonal();

const personalBtn = document.querySelector(".personal-btn");
const workBtn = document.querySelector(".work-btn");
const hobbiesBtn = document.querySelector(".hobbies-btn");
const groceryBtn = document.querySelector(".grocery-btn");

personalBtn.addEventListener("click", loadPersonal);
workBtn.addEventListener("click", loadWork);
hobbiesBtn.addEventListener("click", loadHobbies);
groceryBtn.addEventListener("click", loadGrocery);