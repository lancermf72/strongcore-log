const exercises = {
  "Chest": ["Bench Press", "Dumbbell Press"],
  "Back": ["Bent Over Row", "Lat Pulldown"],
  "Legs": ["Squat", "Leg Press"],
  "Shoulders": ["Shoulder Press"],
  "Arms": ["Biceps Curl", "Triceps Pushdown"],
  "Core (DRA Safe)": ["Dead Bug", "Heel Slides", "Glute Bridge"]
};

const muscleSelect = document.getElementById("muscle");
const exerciseSelect = document.getElementById("exercise");

Object.keys(exercises).forEach(m => {
  let opt = document.createElement("option");
  opt.value = m;
  opt.textContent = m;
  muscleSelect.appendChild(opt);
});

muscleSelect.onchange = () => {
  exerciseSelect.innerHTML = "";
  exercises[muscleSelect.value].forEach(e => {
    let opt = document.createElement("option");
    opt.value = e;
    opt.textContent = e;
    exerciseSelect.appendChild(opt);
  });
};

muscleSelect.dispatchEvent(new Event("change"));

function saveWorkout() {
  const entry = {
    date: new Date().toLocaleDateString(),
    muscle: muscleSelect.value,
    exercise: exerciseSelect.value
  };

  const data = JSON.parse(localStorage.getItem("workouts") || "[]");
  data.push(entry);
  localStorage.setItem("workouts", JSON.stringify(data));

  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("workouts") || "[]");

  data.forEach(w => {
    const div = document.createElement("div");
    div.textContent = `${w.date} – ${w.exercise}`;
    list.appendChild(div);
  });
}

renderHistory();

function showTab(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};
