window.addEventListener("load", () => {
    const form = document.querySelector(".form");
    const input = document.querySelector("#task-input");
    const listEl = document.querySelector("#tasks");

    form.addEventListener("submit", (error) => {
        error.preventDefault();

        const val = input.value.trim();
        if (!val) {
            alert("Please enter the task");
            return;
        }

        // else console.log(`${val}`);
        const taskEl = document.createElement("div");
        taskEl.classList.add("task");

        const taskContentEl = document.createElement("div");
        taskContentEl.classList.add("content");

        const taskInputEl = document.createElement("input");
        taskInputEl.type = "text";
        taskInputEl.classList.add("text");
        taskInputEl.value = val;
        taskInputEl.readOnly = true;

        input.value = "";

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

        taskContentEl.appendChild(taskInputEl);

        taskEl.appendChild(taskContentEl);
        taskEl.appendChild(btnEl);

        listEl.appendChild(taskEl);

        btnEdit.addEventListener("click", () => {
            if (!taskInputEl.readOnly && !taskInputEl.value.trim()) {
            taskInputEl.readOnly = !taskInputEl.readOnly;
            const editText = taskInputEl.readOnly ? "Edit" : "Save";
            btnEdit.innerText = editText;
        });

        btnDelete.addEventListener("click", () => {
            listEl.removeChild(taskEl);
        });
    });
});
