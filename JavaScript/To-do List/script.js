const inputField = document.querySelector("#taskInput");
const todo = document.querySelector(".todo");
const pendingNum = document.querySelector(".pending-num");
const clearButton = document.querySelector(".clear-button");

// Fonction pour mettre à jour le compteur et l'état du bouton "Tout supprimer"
function updateTasks() {
    let tasks = document.querySelectorAll(".list");
    pendingNum.textContent = tasks.length === 0 ? "Pas de tâches en cours" : `${tasks.length} tâche(s) à faire`;
    clearButton.style.display = tasks.length > 0 ? "block" : "none";
}

// Ajouter une nouvelle tâche
inputField.addEventListener("keyup", (e) => {
    let inputVal = inputField.value.trim();
    if (e.key === "Enter" && inputVal.length > 0) {
        let liTag = document.createElement("li");
        liTag.classList.add("list");

        liTag.innerHTML = `
            <input type="checkbox" onclick="toggleTask(this)">
            <span class="task">${inputVal}</span>
            <i class="uil uil-trash" onclick="deleteTask(this)"></i>
        `;

        todo.appendChild(liTag);
        inputField.value = "";
        updateTasks();
    }
});

// Basculer l'état d'une tâche
function toggleTask(checkbox) {
    let taskItem = checkbox.parentElement;
    taskItem.classList.toggle("pending");
    updateTasks();
}

// Supprimer une tâche individuelle
function deleteTask(icon) {
    icon.parentElement.remove();
    updateTasks();
}

// Supprimer toutes les tâches
clearButton.addEventListener("click", () => {
    todo.innerHTML = "";
    updateTasks();
});

// Initialisation
updateTasks();
