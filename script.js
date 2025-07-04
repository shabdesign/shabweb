document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const clearCompletedBtn = document.getElementById("clear-completed");
  const emptyListBtn = document.getElementById("empty-list");

  function saveListToLocalStorage() {
    const items = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
      const span = li.querySelector("span");
      items.push({
        text: span.textContent,
        completed: li.classList.contains("completed")
      });
    });
    localStorage.setItem("todoList", JSON.stringify(items));
  }

  function createListItem(text, completed = false) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (completed) li.classList.add("completed");

    const spanText = document.createElement("span");
    spanText.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
      li.remove();
      saveListToLocalStorage();
    });

    li.addEventListener("dblclick", function () {
      li.classList.toggle("completed");
      saveListToLocalStorage();
    });

    li.appendChild(spanText);
    li.appendChild(deleteBtn);

    return li;
  }

  function loadListFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("todoList")) || [];
    items.forEach(item => {
      const li = createListItem(item.text, item.completed);
      list.appendChild(li);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const newItemText = input.value.trim();
    if (newItemText !== "") {
      const li = createListItem(newItemText);
      list.appendChild(li);
      input.value = "";
      saveListToLocalStorage();
    }
  });

  clearCompletedBtn.addEventListener("click", function () {
    const completedItems = document.querySelectorAll("#todo-list .completed");
    completedItems.forEach(function (item) {
      item.remove();
    });
    saveListToLocalStorage();
  });

  emptyListBtn.addEventListener("click", function () {
    list.innerHTML = "";
    saveListToLocalStorage();
  });

  loadListFromLocalStorage();
});
