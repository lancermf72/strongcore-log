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

  Core: [
    { name: "Dead Bug ⭐", draSafe: true, hotel: true },
    { name: "Heel Slides ⭐", draSafe: true, hotel: true },
    { name: "Front Plank", draSafe: false, hotel: true }
  ]
};

// -------- WORKOUT STATE --------

let currentWorkout = null;
let workoutSessions = [];

// -------- INIT --------

document.addEventListener("DOMContentLoaded", function() {
  populateMuscles();
  setupListeners();
  addWorkoutButton();
  renderExerciseLibrary();
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
    currentWorkout = null;
    document.getElementById("workoutToggle").textContent = "Start Workout";
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
