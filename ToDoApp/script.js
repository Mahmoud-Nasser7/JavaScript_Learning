let input = document.querySelector("input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let EditMood = false;
let temp;
let array;
if (localStorage.Tasks != null) {
  array = JSON.parse(localStorage.Tasks);
} else {
  array = [];
}

// add to local storage

function addToLocalStorage() {
  localStorage.Tasks = JSON.stringify(array);
}

add.addEventListener("click", () => {
  add();
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  if (input.value != "") {
    createTask();
    showTasks();
    input.value = "";
  }
}

// create
function createTask() {
  let TaskObj = {
    id: Date.now(),
    title: input.value,
    completed: false,
  };
  if (EditMood === false) {
    array.push(TaskObj);
  } else {
    array[temp] = TaskObj;
  }
  addToLocalStorage();
  showTasks();
}
// show
function showTasks() {
  tasks.innerHTML = "";

  array.forEach((task, index) => {
    let div = document.createElement("div");
    div.classList.add("task");
    if (task.completed == true) {
      div.classList.add("completed");
    }
    let label = document.createElement("label");
    label.htmlFor = `task-${index}`;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${index}`;
    checkbox.checked = task.completed;

    checkbox.addEventListener("click", () => {
      task.completed = checkbox.checked;
      if (task.completed) {
        div.classList.add("completed");
      } else {
        div.classList.remove("completed");
      }
      addToLocalStorage();
    });

    let theTask = document.createElement("h2");
    theTask.textContent = task.title;

    label.appendChild(checkbox);
    label.appendChild(theTask);
    div.appendChild(label);

    let buttons = document.createElement("div");
    buttons.classList.add("btn");

    let Edit = document.createElement("button");
    Edit.classList.add("Edit");
    Edit.textContent = "Edit";
    buttons.appendChild(Edit);
    Edit.onclick = function () {
      EditTask(index);
    };

    let Delete = document.createElement("button");
    Delete.classList.add("Delete");
    Delete.textContent = "Delete";
    buttons.appendChild(Delete);
    Delete.onclick = function () {
      DeleteTask(index);
    };

    div.appendChild(buttons);
    tasks.appendChild(div);
  });
}

function DeleteTask(id) {
  array.splice(id, 1);
  addToLocalStorage();
  showTasks();
}

function EditTask(id) {
  EditMood = true;
  input.value = array[id].title;
  temp = id;
  input.focus();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
showTasks();
