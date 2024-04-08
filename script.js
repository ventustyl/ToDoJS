let todoInput = document.getElementById("todo-input");
let ajouterButton = document.querySelector("button");
let todoList = document.getElementById("todo-list");

// Chargement initial de la liste
window.onload = function () {
  console.log(localStorage);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    ajouterTodoDansLaListe(localStorage.getItem(key), key);
  }
};

// Ajout d'une nouvelle tâche
ajouterButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    todoInput.placeholder = "Veuillez entrer une tâche";
    return;
  }

  const uniqueId = Date.now().toString();
  localStorage.setItem(uniqueId, todoInput.value);
  ajouterTodoDansLaListe(todoInput.value, uniqueId);
  todoInput.value = "";
});

// Fonction pour ajouter un todo dans la liste
function ajouterTodoDansLaListe(text, id) {
  let newTodo = document.createElement("li");
  newTodo.classList.add("todo");
  newTodo.textContent = text;
  newTodo.dataset.id = id;
  todoList.appendChild(newTodo);
}

// Gestion des événements sur les tâches (marquer comme fait ou supprimer)
todoList.addEventListener("mousedown", function (e) {
  if (e.target && e.target.matches("li.todo")) {
    console.log(e.target.classList.value);
    if (e.target.classList.contains("done")) {
      console.log("Suppression de la tâche");
      localStorage.removeItem(e.target.dataset.id);
      e.target.remove();
    } else {
      console.log("Marquer la tâche comme faite");
      e.target.classList.add("done");
    }
  }
});
