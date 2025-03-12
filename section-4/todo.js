const listDOM = document.getElementById("todo-list");
const inputDOM = document.getElementById("todo-input");
const submitButtonDOM = document.getElementById("todo-submit");

// Local Storage helpers
function getList() {
  return JSON.parse(localStorage.getItem("todo")) || [];
}

function setList(list) {
  localStorage.setItem("todo", JSON.stringify(list));
}

function registerEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}

function appendItemToDOM(name, isComplete, index) {
  // Row in list
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");
  itemContainer.setAttribute("data-index", index);

  // Name
  const itemText = document.createElement("span");
  itemText.classList.add("item-text");
  itemText.innerText = name;
  if (isComplete) {
    itemText.style.textDecoration = "line-through";
  }
  itemContainer.appendChild(itemText);

  // Check button
  const removeButton = document.createElement("button");
  removeButton.innerText = "X";
  removeButton.classList.add("remove-button");
  if (isComplete) {
    removeButton.disabled = true;
  }
  itemContainer.appendChild(removeButton);

  listDOM.appendChild(itemContainer);
}

function addItemToDo(name) {
  const list = getList();
  list.push({ text: name, completed: false });
  setList(list);

  appendItemToDOM(name, false, list.length - 1);
}

function handleAddItem() {
  const input = document.getElementById("todo-input");
  if (!input.value.trim()) {
    alert("Please enter a valid to-do item.");
    return;
  }

  addItemToDo(input.value.trim());
  input.value = "";
}

function markItemComplete(index) {
  const list = getList();
  list[index].completed = !list[index].completed;
  setList(list);

  // Convert item to completed style
  const itemText = listDOM.querySelector(`[data-index="${index}"] .item-text`);
  if (itemText) {
    itemText.style.textDecoration = list[index].completed
      ? "line-through"
      : "none";
  }
}

function handleCompleteItem(e) {
  const index = e.target.parentElement.getAttribute("data-index");
  markItemComplete(index);

  // Disable remove button
  e.target.disabled = true;
}

function renderToDoList() {
  const list = getList();
  const listDOM = document.getElementById("todo-list");
  listDOM.innerHTML = "";

  if (!list) {
    return;
  }

  list.forEach((item, index) => {
    appendItemToDOM(item.text, item.completed, index);
  });
}

registerEventListener("click", "#add-todo", handleAddItem);
registerEventListener("click", ".remove-button", handleCompleteItem);

renderToDoList();
