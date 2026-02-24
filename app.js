// ===============================
// STRONGCORE LOG - CLEAN STABLE VERSION
// ===============================

// -------- EXERCISE DATABASE --------

const exerciseDatabase = {

  Chest: [
    { name: "Barbell Bench Press", draSafe: false, hotel: false },
    { name: "Dumbbell Bench Press", draSafe: false, hotel: true },
    { name: "Push-Up", draSafe: false, hotel: true }
  ],

  Back: [
    { name: "Lat Pulldown", draSafe: false, hotel: false },
    { name: "Seated Cable Row", draSafe: false, hotel: false },
    { name: "Single Arm Dumbbell Row", draSafe: false, hotel: true }
  ],

  Shoulders: [
    { name: "Dumbbell Shoulder Press", draSafe: false, hotel: true },
    { name: "Lateral Raise", draSafe: false, hotel: true }
  ],

  Arms: [
    { name: "Dumbbell Curl", draSafe: false, hotel: true },
    { name: "Triceps Pushdown", draSafe: false, hotel: false }
  ],

  Legs: [
    { name: "Goblet Squat", draSafe: false, hotel: true },
    { name: "Walking Lunges", draSafe: false, hotel: true }
  ],

  "Core": [

  // ⭐ DRA-Friendly
  { name: "Dead Bug ⭐" },
  { name: "Heel Slides ⭐" },
  { name: "Marching Bridge ⭐" },
  { name: "Glute Bridge ⭐" },
  { name: "Bird Dog ⭐" },
  { name: "Side-Lying Clamshell ⭐" },
  { name: "Standing Pallof Press ⭐" },
  { name: "Modified Side Plank ⭐" },
  { name: "Wall Plank ⭐" },
  { name: "Farmer Carry ⭐" },
  { name: "Suitcase Carry ⭐" },
  { name: "Modified Plank ⭐" },

  // Controlled Progression
  { name: "Front Plank" },
  { name: "Side Plank" },
  { name: "Cable Woodchop" },
  { name: "Cable Lift" },
  { name: "Stability Ball Stir the Pot" },
  { name: "Hanging Knee Raise" },
  { name: "Reverse Crunch" },
  { name: "Swiss Ball Rollout" },
  { name: "Ab Wheel Rollout" },
  { name: "Russian Twist" },
  { name: "Medicine Ball Slams" },
  { name: "V-Ups" },
  { name: "Toes to Bar" }
]
};

// -------- WORKOUT STATE --------

let workoutSessions = JSON.parse(localStorage.getItem("workoutSessions")) || [];
let currentWorkout = null;

// -------- INIT --------

document.addEventListener("DOMContentLoaded", function() {
  populateMuscles();
  setupListeners();
  addWorkoutButton();
  renderExerciseLibrary();
  renderHistory();
});

// -------- DROPDOWNS --------

function populateMuscles() {
  const muscleSelect = document.getElementById("muscle");
  muscleSelect.innerHTML = "";

  for (let muscle in exerciseDatabase) {
    const option = document.createElement("option");
    option.value = muscle;
    option.textContent = muscle;
    muscleSelect.appendChild(option);
  }

  populateExercises();
}

function populateExercises() {
  const muscle = document.getElementById("muscle").value;
  const exerciseSelect = document.getElementById("exercise");
  exerciseSelect.innerHTML = "";

  const exercises = exerciseDatabase[muscle];

  if (!exercises) return;

  exercises.forEach(function(exercise) {
    const option = document.createElement("option");
    option.value = exercise.name;
    option.textContent = exercise.name;
    exerciseSelect.appendChild(option);
  });
}

// -------- LISTENERS --------

function setupListeners() {
  document.getElementById("muscle").addEventListener("change", populateExercises);
  document.getElementById("saveBtn").addEventListener("click", saveExercise);
}

// -------- WORKOUT BUTTON --------

function addWorkoutButton() {
  const logSection = document.getElementById("log");
  const button = document.createElement("button");
  button.id = "workoutToggle";
  button.textContent = "Start Workout";
  button.style.marginBottom = "10px";

  button.addEventListener("click", toggleWorkout);

  logSection.insertBefore(button, logSection.firstChild);
}

function toggleWorkout() {
  if (!currentWorkout) {
    currentWorkout = {
      id: Date.now(),
      date: new Date(),
      exercises: []
    };
    document.getElementById("workoutToggle").textContent = "End Workout";
  } else {
    workoutSessions.push(currentWorkout);
    localStorage.setItem("workoutSessions", JSON.stringify(workoutSessions));
    currentWorkout = null;
    document.getElementById("workoutToggle").textContent = "Start Workout";
    renderHistory();
  }
}
// -------- SAVE --------

function saveExercise() {
  if (!currentWorkout) {
    alert("Start a workout first.");
    return;
  }

  const entry = {
    muscle: document.getElementById("muscle").value,
    exercise: document.getElementById("exercise").value,
    sets: document.getElementById("sets").value,
    reps: document.getElementById("reps").value,
    weight: document.getElementById("weight").value
  };

  currentWorkout.exercises.push(entry);
  alert("Exercise added.");
}
// -------- TAB NAVIGATION --------

function showTab(tabId) {
  const sections = document.querySelectorAll("main section");

  sections.forEach(function(section) {
    section.classList.remove("active");
  });

  const activeSection = document.getElementById(tabId);
  if (activeSection) {
    activeSection.classList.add("active");
  }
}
// -------- EXERCISE LIBRARY --------

function renderExerciseLibrary() {
  const container = document.getElementById("exerciseCards");
  if (!container) return;

  container.innerHTML = "";

  for (let muscle in exerciseDatabase) {
    const header = document.createElement("h3");
    header.textContent = muscle;
    container.appendChild(header);

    exerciseDatabase[muscle].forEach(function(exercise) {
      const link = document.createElement("a");
      link.href =
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(exercise.name + " exercise");
      link.target = "_blank";
      link.textContent = exercise.name;
      link.style.display = "block";

      container.appendChild(link);
    });
  }
}
// -------- HISTORY --------

// -------- HISTORY --------

function renderHistory() {
  const historyDiv = document.getElementById("historyList");
  if (!historyDiv) return;

  historyDiv.innerHTML = "";

  workoutSessions.forEach(function(workout, workoutIndex) {
    const workoutDiv = document.createElement("div");
    workoutDiv.style.border = "1px solid #ccc";
    workoutDiv.style.padding = "10px";
    workoutDiv.style.marginBottom = "15px";

    const date = new Date(workout.date).toLocaleDateString();

    const header = document.createElement("h3");
    header.textContent = "Workout - " + date;
    workoutDiv.appendChild(header);

    // Delete entire workout button
    const deleteWorkoutBtn = document.createElement("button");
    deleteWorkoutBtn.textContent = "Delete Workout";
    deleteWorkoutBtn.style.marginBottom = "10px";
    deleteWorkoutBtn.onclick = function() {
      deleteWorkout(workoutIndex);
    };
    workoutDiv.appendChild(deleteWorkoutBtn);

    // Exercises
    workout.exercises.forEach(function(ex, exerciseIndex) {
      const exDiv = document.createElement("div");
      exDiv.style.display = "flex";
      exDiv.style.justifyContent = "space-between";
      exDiv.style.marginBottom = "5px";

      const exText = document.createElement("span");
      exText.textContent =
        ex.exercise +
        " - " +
        ex.sets +
        "x" +
        ex.reps +
        " @ " +
        (ex.weight || 0);

      const deleteExBtn = document.createElement("button");
      deleteExBtn.textContent = "✖";
      deleteExBtn.onclick = function() {
        deleteExercise(workoutIndex, exerciseIndex);
      };

      exDiv.appendChild(exText);
      exDiv.appendChild(deleteExBtn);

      workoutDiv.appendChild(exDiv);
    });

    historyDiv.appendChild(workoutDiv);
  });
}
function deleteWorkout(index) {
  workoutSessions.splice(index, 1);
  localStorage.setItem("workoutSessions", JSON.stringify(workoutSessions));
  renderHistory();
}

function deleteExercise(workoutIndex, exerciseIndex) {
  workoutSessions[workoutIndex].exercises.splice(exerciseIndex, 1);
  localStorage.setItem("workoutSessions", JSON.stringify(workoutSessions));
  renderHistory();
}
