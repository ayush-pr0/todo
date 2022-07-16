let todos = [];
window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    DisplayTodos();

    const nameInput = document.querySelector("#name");
    const username = localStorage.getItem("username") || "";
    nameInput.value = username;

    nameInput.addEventListener("change", (e) => {
        localStorage.setItem("username", e.target.value);
    });

    const form = document.querySelector(".form");
    const input = document.querySelector("#task-input");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const val = input.value.trim();
        if (!val) {
            alert("Please enter the task");
            return;
        }

        const todo = {
            content: val,
            done: false,
            // createdAt: new Date().getTime(),
        };

        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        e.target.reset();

        DisplayTodos();
        // else console.log(`${val}`);

        // input.value = "";
    });
});

function DisplayTodos() {
    const listEl = document.querySelector("#tasks");
    listEl.innerHTML = "";

    todos.forEach((todo) => {
        const taskEl = document.createElement("div");
        taskEl.classList.add("task");

        const taskContentEl = document.createElement("div");
        taskContentEl.classList.add("content");

        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.classList.add("check-box");
        taskCheckbox.checked = todo.done;

        const taskInputEl = document.createElement("input");
        taskInputEl.type = "text";
        taskInputEl.classList.add("text");
        taskInputEl.value = todo.content;
        taskInputEl.readOnly = true;

        const btnEl = document.createElement("div");
        btnEl.classList.add("actions");

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("edit");
        btnEdit.innerText = "Edit";

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete");
        btnDelete.innerText = "Delete";

        btnEl.appendChild(btnEdit);
        btnEl.appendChild(btnDelete);

        taskContentEl.appendChild(taskCheckbox);
        taskContentEl.appendChild(taskInputEl);

        taskEl.appendChild(taskContentEl);
        taskEl.appendChild(btnEl);

        listEl.appendChild(taskEl);

        if (taskCheckbox.checked)
            taskInputEl.style.textDecoration = "line-through";

        taskCheckbox.addEventListener("click", () => {
            todo.done = taskCheckbox.checked;
            localStorage.setItem("todos", JSON.stringify(todos));

            if (taskCheckbox.checked)
                taskInputEl.style.textDecoration = "line-through";
            else taskInputEl.style.textDecoration = "none";

            DisplayTodos();
        });

        btnEdit.addEventListener("click", (e) => {
            taskInputEl.removeAttribute("readonly", false);
            btnEdit.textContent = "Save";
            taskInputEl.focus();
            taskInputEl.addEventListener("blur", (e) => {
                taskInputEl.setAttribute("readonly", true);
                btnEdit.textContent = "Edit";
                todo.content = e.target.value;
                localStorage.setItem("todos", JSON.stringify(todos));
                DisplayTodos();
            });
        });

        btnDelete.addEventListener("click", () => {
            todos = todos.filter((t) => t != todo);
            localStorage.setItem("todos", JSON.stringify(todos));
            DisplayTodos();
        });
    });
}
