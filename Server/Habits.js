const API = "http://localhost:3000/api/habits";

async function loadHabits() {

  const res = await fetch(API);
  const habits = await res.json();

  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach(habit => {

    const li = document.createElement("li");
    li.textContent = habit.name;

    list.appendChild(li);

  });

}

loadHabits();