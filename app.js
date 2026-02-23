// ===============================
// STRONGCORE LOG v3.0
// ===============================

// -------- EXERCISE DATABASE --------

const exerciseDatabase = {

  Chest: [
    { name: "Barbell Bench Press", draSafe: false, hotel: false },
    { name: "Incline Barbell Press", draSafe: false, hotel: false },
    { name: "Dumbbell Bench Press", draSafe: false, hotel: true },
    { name: "Incline Dumbbell Press", draSafe: false, hotel: true },
    { name: "Push-Up", draSafe: false, hotel: true },
    { name: "Decline Push-Up", draSafe: false, hotel: true },
    { name: "Machine Chest Press", draSafe: false, hotel: false },
    { name: "Cable Chest Fly", draSafe: false, hotel: false },
    { name: "Pec Deck", draSafe: false, hotel: false },
    { name: "Close Grip Bench Press", draSafe: false, hotel: false }
  ],

  Back: [
    { name: "Lat Pulldown", draSafe: false, hotel: false },
    { name: "Pull-Up", draSafe: false, hotel: true },
    { name: "Assisted Pull-Up", draSafe: false, hotel: false },
    { name: "Seated Cable Row", draSafe: false, hotel: false },
    { name: "Chest Supported Row", draSafe: false, hotel: true },
    { name: "Single Arm Dumbbell Row", draSafe: false, hotel: true },
    { name: "Straight Arm Pulldown", draSafe: false, hotel: false },
    { name: "Barbell Row", draSafe: false, hotel: false },
    { name: "T-Bar Row", draSafe: false, hotel: false },
    { name: "Face Pull", draSafe: false, hotel: false }
  ],

  Shoulders: [
    { name: "Barbell Overhead Press", draSafe: false, hotel: false },
    { name: "Dumbbell Shoulder Press", draSafe: false, hotel: true },
    { name: "Arnold Press", draSafe: false, hotel: true },
    { name: "Lateral Raise", draSafe: false, hotel: true },
    { name: "Rear Delt Fly", draSafe: false, hotel: true },
    { name: "Cable Lateral Raise", draSafe: false, hotel: false },
    { name: "Front Raise", draSafe: false, hotel: true },
    { name: "Shoulder Shrugs", draSafe: false, hotel: true },
    { name: "Upright Row", draSafe: false, hotel: false }
  ],

  Arms: [
    { name: "Barbell Curl", draSafe: false, hotel: false },
    { name: "Preacher Curl", draSafe: false, hotel: false },
    { name: "Dumbbell Curl", draSafe: false, hotel: true },
    { name: "Hammer Curl", draSafe: false, hotel: true },
    { name: "Cable Curl", draSafe: false, hotel: false },
    { name: "Triceps Pushdown", draSafe: false, hotel: false },
    { name: "Overhead Triceps Extension", draSafe: false, hotel: true },
    { name: "Skull Crushers", draSafe: false, hotel: false },
    { name: "Bench Dips", draSafe: false, hotel: true }
  ],

  Legs: [
    { name: "Barbell Squat", draSafe: false, hotel: false },
    { name: "Goblet Squat", draSafe: false, hotel: true },
    { name: "Leg Press", draSafe: false, hotel: false },
    { name: "Walking Lunges", draSafe: false, hotel: true },
    { name: "Reverse Lunges", draSafe: false, hotel: true },
    { name: "Romanian Deadlift", draSafe: false, hotel: true },
    { name: "Deadlift", draSafe: false, hotel: false },
    { name: "Hamstring Curl", draSafe: false, hotel: false },
    { name: "Step-Ups", draSafe: false, hotel: true },
    { name: "Calf Raises", draSafe: false, hotel: true }
  ],

  Core: [
    { name: "Dead Bug ⭐", draSafe: true, hotel: true },
    { name: "Heel Slides ⭐", draSafe: true, hotel: true },
    { name: "Bird Dog ⭐", draSafe: true, hotel: true },
    { name: "Modified Plank ⭐", draSafe: true, hotel: true },
    { name: "Side Plank (Knees) ⭐", draSafe: true, hotel: true },
    { name: "Glute Bridge ⭐", draSafe: true, hotel: true },
    { name: "Marching Bridge ⭐", draSafe: true, hotel: true },
    { name: "Standing Pallof Press ⭐", draSafe: true, hotel: false },
    { name: "Farmer Carry ⭐", draSafe: true, hotel: true },
    { name: "Front Plank", draSafe: false, hotel: true },
    { name: "Side Plank", draSafe: false, hotel: true },
    { name: "Cable Crunch", draSafe: false, hotel: false },
    { name: "Hanging Leg Raise", draSafe: false, hotel: false },
    { name: "Sit-Up", draSafe: false, hotel: true },
    { name: "Russian Twist", draSafe: false, hotel: true },
    { name: "Ab Wheel Rollout", draSafe: false, hotel: true }
  ]
};

// -------- FILTER STATE --------

let filterDRA = JSON.parse(localStorage.getItem("filterDRA")) || false;
let filterHotel = JSON.parse(localStorage.getItem("filterHotel")) || false;

// -------- WORKOUT STATE --------

let currentWorkout = JSON.parse(localStorage.getItem("currentWorkout")) || null;
let workoutSessions = JSON.parse(localStorage.getItem("workoutSessions")) || [];

// -------- INIT --------

document.addEventListener("DOMContentLoaded", () => {
  addFilterBar();
  populateMuscles();
  renderExercises();
  renderHistory();
  setupEventListeners();
  updateWorkoutButton();
});

// -------- FILTER BAR --------

function addFilterBar() {
  const logSection = document.getElementById("log");

  const filterDiv = document.createElement("div");
  filterDiv.style.marginBottom = "10px";

  filterDiv.innerHTML = `
    <label><input type="checkbox" id="draFilter"> DRA Only</label>
    <label style="margin-left:10px;"><input type="checkbox" id="hotelFilter"> Hotel Only</label>
  `;

  logSection.insertBefore(filterDiv, logSection.children[1]);

  document.getElementById("draFilter").checked = filterDRA;
  document.getElementById("hotelFilter").checked = filterHotel;

  document.getElementById("draFilter").addEventListener("change", (e) => {
    filterDRA = e.target.checked;
    localStorage.setItem("filterDRA", JSON.stringify(filterDRA));
    populateExercises();
  });

  document.getElementById("hotelFilter").addEventListener("change", (e) => {
    filterHotel = e.target.checked;
    localStorage.setItem("filterHotel", JSON.stringify(filterHotel));
    populateExercises();
  });
}

// -------- DROPDOWNS --------

function populateMuscles() {
  const muscleSelect = document.getElementById("muscle");
  muscleSelect.innerHTML = "";

  Object.keys(exerciseDatabase).forEach(muscle => {
    const option = document.createElement("option");
    option.value = muscle;
    option.textContent = muscle;
    muscleSelect.appendChild(option);
  });

  populateExercises();
}

function populateExercises() {
  const muscle = document.getElementById("muscle").value;
  const exerciseSelect = document.getElementById("exercise");
  exerciseSelect.innerHTML = "";

  let exercises = exerciseDatabase[muscle];

  if (filterDRA) exercises = exercises.filter(ex => ex.draSafe);
  if (filterHotel) exercises = exercises.filter(ex => ex.hotel);

  exercises.forEach(exercise => {
    const option = document.createElement("option");
    option.value = exercise.name;
    option.textContent = exercise.name;
    exerciseSelect.appendChild(option);
  });
}

// -------- EVENT LISTENERS --------

function setupEventListeners() {
  document.getElementById("muscle").addEventListener("change", populateExercises);
  document.getElementById("saveBtn").addEventListener("click", saveExercise);
  addWorkoutButton();
}

// -------- WORKOUT TOGGLE --------

function addWorkoutButton() {
  const logSection = document.getElementById("log");
  const button = document.createElement("button");
  button.id = "workoutToggle";
  button.style.marginBottom = "10px";
  logSection.insertBefore(button, logSection.firstChild);
  button.addEventListener("click", toggleWorkout);
}

function toggleWorkout() {
  if (!currentWorkout) {
    currentWorkout = { id: Date.now(), date: new Date().toISOString(), exercises: [] };
    localStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
  } else {
    workoutSessions.unshift(currentWorkout);
    localStorage.setItem("workoutSessions", JSON.stringify(workoutSessions));
    localStorage.removeItem("currentWorkout");
    currentWorkout = null;
    renderHistory();
  }
  updateWorkoutButton();
}

function updateWorkoutButton() {
  const button = document.getElementById("workoutToggle");
  if (button) button.textContent = currentWorkout ? "End Workout" : "Start Workout";
}

// -------- SAVE --------

function saveExercise() {
  if (!currentWorkout) {
    alert("Start a workout first.");
    return;
  }

  const newEntry = {
    id: Date.now(),
    muscle: document.getElementById("muscle").value,
    exercise: document.getElementById("exercise").value,
    sets: document.getElementById("sets").value,
    reps: document.getElementById("reps").value,
    weight: document.getElementById("weight").value
  };

  currentWorkout.exercises.push(newEntry);
  localStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
  alert("Exercise added.");
}

// -------- HISTORY --------

function renderHistory() {
  const historyDiv = document.getElementById("historyList");
  historyDiv.innerHTML = "";

  workoutSessions.forEach(workout => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>Workout - ${new Date(workout.date).toLocaleDateString()}</h3>`;

    workout.exercises.forEach(ex => {
      const exDiv = document.createElement("div");
      exDiv.innerHTML = `
        ${ex.exercise} - ${ex.sets}x${ex.reps} @ ${ex.weight || 0}
        <button onclick="editExercise(${workout.id}, ${ex.id})">Edit</button>
        <button onclick="deleteExercise(${workout.id}, ${ex.id})">Delete</button>
      `;
      div.appendChild(exDiv);
    });

    historyDiv.appendChild(div);
  });
}

function deleteExercise(workoutId, exerciseId) {
  workoutSessions = workoutSessions.map(workout => {
    if (workout.id === workoutId) {
      workout.exercises = workout.exercises.filter(ex => ex.id !== exerciseId);
    }
    return workout;
  });

  localStorage.setItem("workoutSessions", JSON.stringify(workoutSessions));
  renderHistory();
}

function editExercise(workoutId, exerciseId) {
  const workout = workoutSessions.find(w => w.id === workoutId);
  const exercise = workout.exercises.find(ex => ex.id === exerciseId);

  showTab("log");

  document.getElementById("muscle").value = exercise.muscle;
  populateExercises();
  document.getElementById("exercise").value = exercise.exercise;
  document.getElementById("sets").value = exercise.sets;
  document.getElementById("reps").value = exercise.reps;
  document.getElementById("weight").value = exercise.weight;

  deleteExercise(workoutId, exerciseId);
}

// -------- EXERCISE LIBRARY --------

function renderExercises() {
  const container = document.getElementById("exerciseCards");
  container.innerHTML = "";

  Object.keys(exerciseDatabase).forEach(muscle => {
    const header = document.createElement("h3");
    header.textContent = muscle;
    container.appendChild(header);

    exerciseDatabase[muscle].forEach(ex => {
      const link = document.createElement("a");
      link.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name + " exercise")}`;
      link.target = "_blank";
      link.textContent = ex.name;
      link.style.display = "block";
      container.appendChild(link);
    });
  });
}

// -------- TABS --------

function showTab(tabId) {
  document.querySelectorAll("main section").forEach(section => {
    section.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}
