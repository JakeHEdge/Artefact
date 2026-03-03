 const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const list = document.getElementById("taskList");
    const countText = document.getElementById("countText");
    const clearDoneBtn = document.getElementById("clearDone");
    const clearAllBtn = document.getElementById("clearAll");

    const STORAGE_KEY = "fyp_tasks_v1";

    /** @type {{id:string, text:string, done:boolean, created:number}[]} */
    let tasks = loadTasks();

    function uid(){
      return "t_" + Math.random().toString(16).slice(2) + "_" + Date.now();
    }

    function loadTasks(){
      try{
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [
          { id: uid(), text: "Write FYP weekly log", done: false, created: Date.now() },
          { id: uid(), text: "Gym (push day)", done: true,  created: Date.now() - 86400000 },
          { id: uid(), text: "Plan next sprint tasks", done: false, created: Date.now() - 3600000 }
        ];
      }catch{
        return [];
      }
    }

    function saveTasks(){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    function updateCount(){
      const total = tasks.length;
      const done = tasks.filter(t => t.done).length;
      countText.textContent = `${total} task${total === 1 ? "" : "s"} • ${done} done`;
    }

    function render(){
      list.innerHTML = "";
      for(const t of tasks){
        const li = document.createElement("li");
        li.className = "item" + (t.done ? " done" : "");
        li.dataset.id = t.id;

        li.innerHTML = `
          <input class="check" type="checkbox" ${t.done ? "checked" : ""} />
          <div class="text"></div>
          <button class="remove" type="button" aria-label="Remove task">Remove</button>
        `;

        li.querySelector(".text").textContent = t.text;
        list.appendChild(li);
      }

      updateCount();
      saveTasks();
    }

    function addTask(){
      const text = input.value.trim();
      if(!text){
        input.focus();
        return;
      }

      tasks.unshift({ id: uid(), text, done: false, created: Date.now() });
      input.value = "";
      render();
    }

    // Add via button or Enter key
    addBtn.addEventListener("click", addTask);
    input.addEventListener("keydown", (e) => {
      if(e.key === "Enter") addTask();
    });

    // Event delegation (cleaner than adding listeners to every item)
    list.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if(!li) return;

      const id = li.dataset.id;

      if(e.target.classList.contains("remove")){
        tasks = tasks.filter(t => t.id !== id);
        render();
        return;
      }

      if(e.target.classList.contains("check")){
        tasks = tasks.map(t => t.id === id ? { ...t, done: e.target.checked } : t);
        render();
      }
    });

    clearDoneBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => !t.done);
      render();
    });

    clearAllBtn.addEventListener("click", () => {
      tasks = [];
      render();
    });

    render();