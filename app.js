// =====================================
// STRONGCORE LOG - COMPLETE APP.JS
// =====================================


// ===============================
// Exercise Data (Expanded + DRA Safe Core)
// ===============================

const exercises = {

  "Chest": [
    { name: "Barbell Bench Press", video: "https://www.youtube.com/watch?v=rT7DgCr-3pg" },
    { name: "Incline Barbell Bench Press", video: "https://www.youtube.com/watch?v=SrqOu55lrYU" },
    { name: "Dumbbell Bench Press", video: "https://www.youtube.com/watch?v=VmB1G1K7v94" },
    { name: "Incline Dumbbell Press", video: "https://www.youtube.com/watch?v=8iPEnn-ltC8" },
    { name: "Chest Press Machine", video: "https://www.youtube.com/watch?v=xUm0BiZCWlQ" },
    { name: "Cable Chest Fly", video: "https://www.youtube.com/watch?v=taI4XduLpTk" },
    { name: "Pec Deck", video: "https://www.youtube.com/watch?v=eGjt4lk6g34" },
    { name: "Push-Ups", video: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" }
  ],

  "Back": [
    { name: "Pull-Ups", video: "https://www.youtube.com/watch?v=eGo4IYlbE5g" },
    { name: "Lat Pulldown", video: "https://www.youtube.com/watch?v=CAwf7n6Luuc" },
    { name: "Seated Cable Row", video: "https://www.youtube.com/watch?v=HJSVR_67OlM" },
    { name: "Barbell Bent-Over Row", video: "https://www.youtube.com/watch?v=vT2GjY_Umpw" },
    { name: "Dumbbell Row", video: "https://www.youtube.com/watch?v=pYcpY20QaE8" },
    { name: "Chest-Supported Row", video: "https://www.youtube.com/watch?v=GZbfZ033f74" },
    { name: "Straight Arm Pulldown", video: "https://www.youtube.com/watch?v=2d9bG9xZz14" }
  ],

  "Shoulders": [
    { name: "Barbell Overhead Press", video: "https://www.youtube.com/watch?v=2yjwXTZQDDI" },
    { name: "Dumbbell Shoulder Press", video: "https://www.youtube.com/watch?v=B-aVuyhvLHU" },
    { name: "Arnold Press", video: "https://www.youtube.com/watch?v=6Z15_WdXmVw" },
    { name: "Lateral Raises", video: "https://www.youtube.com/watch?v=kDqklk1ZESo" },
    { name: "Front Raises", video: "https://www.youtube.com/watch?v=-t7fuZ0KhDA" },
    { name: "Rear Delt Fly", video: "https://www.youtube.com/watch?v=EA7u4Q_8HQ0" },
    { name: "Face Pulls", video: "https://www.youtube.com/watch?v=rep-qVOkqgk" }
  ],

  "Arms": [
    { name: "Barbell Curl", video: "https://www.youtube.com/watch?v=kwG2ipFRgfo" },
    { name: "Dumbbell Curl", video: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo" },
    { name: "Hammer Curl", video: "https://www.youtube.com/watch?v=zC3nLlEvin4" },
    { name: "Preacher Curl", video: "https://www.youtube.com/watch?v=2rJXU0nXGxA" },
    { name: "Cable Curl", video: "https://www.youtube.com/watch?v=NFzTWp2qpiE" },
    { name: "Close-Grip Bench Press", video: "https://www.youtube.com/watch?v=8Z8tD4h5c_w" },
    { name: "Triceps Pushdown", video: "https://www.youtube.com/watch?v=2-LAMcpzODU" },
    { name: "Overhead Triceps Extension", video: "https://www.youtube.com/watch?v=_gsUck-7M74" },
    { name: "Skull Crushers", video: "https://www.youtube.com/watch?v=d_KZxkY_0cM" }
  ],

  "Legs": [
    { name: "Back Squat", video: "https://www.youtube.com/watch?v=aclHkVaku9U" },
    { name: "Front Squat", video: "https://www.youtube.com/watch?v=t2b8UdqmlFs" },
    { name: "Leg Press", video: "https://www.youtube.com/watch?v=IZxyjW7MPJQ" },
    { name: "Romanian Deadlift", video: "https://www.youtube.com/watch?v=2SHsk9AzdjA" },
    { name: "Lying Leg Curl", video: "https://www.youtube.com/watch?v=1Tq3QdYUuHs" },
    { name: "Seated Leg Curl", video: "https://www.youtube.com/watch?v=ELOCsoDSmrg" },
    { name: "Leg Extension", video: "https://www.youtube.com/watch?v=YyvSfVjQeL0" },
    { name: "Walking Lunges", video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U" },
    { name: "Calf Raises", video: "https://www.youtube.com/watch?v=YMmgqO8Jo-k" }
  ],

  "Core (DRA Safe)": [
    { name: "Dead Bug", video: "https://www.youtube.com/watch?v=I5xbsA71v1A" },
    { name: "Heel Slides", video: "https://www.youtube.com/watch?v=1xRX1MuoImw" },
    { name: "Marching Bridge", video: "https://www.youtube.com/watch?v=1xkzC0kCq6A" },
    { name: "Glute Bridge", video: "https://www.youtube.com/watch?v=m2Zx-57cSok" },
    { name: "Bird Dog", video: "https://www.youtube.com/watch?v=wiFNA3sqjCA" },
    { name: "Standing Pallof Press", video: "https://www.youtube.com/watch?v=3oQv4n3yZ5k" },
    { name: "Side-Lying Clamshell", video: "https://www.youtube.com/watch?v=EGhQD9CVVGc" }
  ]

};


// ===============================
// DOM REFERENCES
// ===============================

const muscleSelect = document.getElementById("muscle");
const exerciseSelect = document.getElementById("exercise");
const saveBtn = document.getElementById("saveBtn");
const historyList = document.getElementById("historyList");
const exerciseCards = document.getElementById("exerciseCards");
const themeToggle = document.getElementById("themeToggle");


// ===============================
// Populate Muscle Dropdown
// ===============================

Object.keys(exercises).forEach(group => {
  const option = document.createElement("option");
  option.value = group;
  option.textContent = group;
  muscleSelect.appendChild(option);
});


// ===============================
// Populate Exercise Dropdown
// ===============================

muscleSelect.onchange = () => {
  exerciseSelect.innerHTML = "";

  exercises[muscleSelect.value].forEach(ex => {
    const option = document.createElement("option");
    option.value = ex.name;
    option.textContent = ex.name;
    exerciseSelect.appendChild(option);
  });
};

// Initialize first load
muscleSelect.onchange();


// ===============================
// Save Workout
// ===============================

saveBtn.onclick = () => {

  const entry = {
    date: new Date().toLocaleDateString(),
    muscle: muscleSelect.value,
    exercise: exerciseSelect.value,
    sets: document.getElementById("sets").value,
    reps: document.getElementById("reps").value,
    weight: document.getElementById("weight").value
  };

  const history = JSON.parse(localStorage.getItem("workouts") || "[]");

  history.push(entry);

  localStorage.setItem("workouts", JSON.stringify(history));

  renderHistory();

  alert("Workout saved!");
};


// ===============================
// Render History
// ===============================

function renderHistory() {

  historyList.innerHTML = "";

  const history = JSON.parse(localStorage.getItem("workouts") || "[]");

  history.slice().reverse().forEach(entry => {

    const div = document.createElement("div");

    div.innerHTML = `
      <strong>${entry.exercise}</strong><br>
      ${entry.sets} sets × ${entry.reps} reps @ ${entry.weight} lbs<br>
      <small>${entry.date}</small>
    `;

    historyList.appendChild(div);
  });
}

renderHistory();


// ===============================
// Render Exercise Library
// ===============================

function renderExercises() {

  exerciseCards.innerHTML = "";

  Object.keys(exercises).forEach(group => {

    exercises[group].forEach(ex => {

      const card = document.createElement("div");

      card.innerHTML = `
        <strong>${ex.name}</strong><br>
        <small>${group}</small><br><br>
        <a href="${ex.video}" target="_blank">▶ Watch Demo</a>
      `;

      exerciseCards.appendChild(card);

    });

  });

}

renderExercises();


// ===============================
// Tab Navigation
// ===============================

function showTab(tabId) {

  document.querySelectorAll("main section").forEach(sec => {
    sec.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
}


// ===============================
// Theme Toggle
// ===============================

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
};