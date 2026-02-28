// ===============================
// STRONGCORE LOG - CLEAN STABLE VERSION
// ===============================

// -------- EXERCISE DATABASE --------

const exerciseDatabase = {

  Chest: [
  { name: "Barbell Bench Press", equipment: "barbell", hotelFriendly: false },
  { name: "Dumbbell Bench Press", equipment: "dumbbell", hotelFriendly: true },
  { name: "Push-Up", equipment: "bodyweight", draLevel: "caution", hotelFriendly: true }
],

  Back: [
  { name: "Lat Pulldown", equipment: "cable", hotelFriendly: false },
  { name: "Seated Cable Row", equipment: "cable", hotelFriendly: false },
  { name: "Single Arm Dumbbell Row", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true }
],

  Shoulders: [
  { name: "Dumbbell Shoulder Press", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true },
  { name: "Lateral Raise", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true }
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

  { name: "Dead Bug", draLevel: "safe" },
  { name: "Heel Slides", draLevel: "safe" },
  { name: "Marching Bridge", draLevel: "safe" },
  { name: "Glute Bridge", draLevel: "safe" },
  { name: "Bird Dog", draLevel: "safe" },
  { name: "Side-Lying Clamshell", draLevel: "safe" },
  { name: "Standing Pallof Press", draLevel: "safe" },
  { name: "Modified Side Plank", draLevel: "safe" },
  { name: "Wall Plank", draLevel: "safe" },
  { name: "Farmer Carry", draLevel: "safe" },
  { name: "Suitcase Carry", draLevel: "safe" },
  { name: "Modified Plank", draLevel: "safe" },

  { name: "Front Plank", draLevel: "caution" },
  { name: "Side Plank", draLevel: "caution" },
  { name: "Cable Woodchop", draLevel: "caution" },
  { name: "Cable Lift", draLevel: "caution" },

  { name: "Swiss Ball Rollout" },
  { name: "Ab Wheel Rollout" },
  { name: "Russian Twist" },
  { name: "V-Ups" }

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
  
  document.getElementById("generateBtn")
  .addEventListener("click", generateWorkout);
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
  renderActiveWorkout();
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
// -------- WORKOUT GENERATOR (CLEAN VERSION WITH HOTEL FILTER) --------

function generateWorkout() {

  const selectedMuscle = document.getElementById("muscle").value;

  if (!selectedMuscle) {
    alert("Please select a muscle group.");
    return;
  }

  if (!currentWorkout) {
    alert("Start a workout first.");
    return;
  }

  const bodyweightOnly = document.getElementById("bodyweightOnly").checked;
  const dumbbellOnly = document.getElementById("dumbbellOnly").checked;
const draSafeMode = document.getElementById("draSafeMode").checked;
  
  currentWorkout.exercises = [];

  let exercises = exerciseDatabase[selectedMuscle].slice();

  if (!exercises) {
    alert("No exercises found.");
    return;
  }

  if (bodyweightOnly) {
    exercises = exercises.filter(function(ex) {
      return ex.equipment === "bodyweight";
    });
  }

  if (dumbbellOnly) {
    exercises = exercises.filter(function(ex) {
      return ex.equipment === "dumbbell";
    });
  }

if (draSafeMode) {
  exercises = exercises.filter(function(ex) {
    return ex.draLevel === "safe" || ex.draLevel === "caution";
  });
}
  
  if (exercises.length === 0) {
    alert("No exercises match selected filters.");
    return;
  }

  const shuffled = exercises.slice().sort(function() {
    return 0.5 - Math.random();
  });

  const count = Math.min(5, shuffled.length);

for (let i = 0; i < count; i++) {

  currentWorkout.exercises.push({
    muscle: selectedMuscle,
    name: shuffled[i].name,
    draLevel: shuffled[i].draLevel || null,
    hotelFriendly: shuffled[i].hotelFriendly || false,
    sets: "",
    reps: "",
    weight: ""
  });

}

  alert("New filtered workout generated!");
  renderActiveWorkout();
}
// -------- ACTIVE WORKOUT DISPLAY --------
function renderActiveWorkout() {

  const container = document.getElementById("activeWorkout");

  if (!container) return;

  container.innerHTML = "";

  if (!currentWorkout || currentWorkout.exercises.length === 0) {
    container.innerHTML = "<p>No exercises yet.</p>";
    return;
  }

  currentWorkout.exercises.forEach(function(exercise, index) {

    const card = document.createElement("div");
    card.className = "exercise-card";

    let badge = "";

if (exercise.draLevel === "safe") {
  badge = " ⭐";
} else if (exercise.draLevel === "caution") {
  badge = " ⚠️";
}

    card.innerHTML = `
      <h3>${exercise.name}${badge}</h3>
      <p>Muscle: ${exercise.muscle}</p>
      <p>Sets: ${exercise.sets || "-"}</p>
      <p>Reps: ${exercise.reps || "-"}</p>
      <p>Weight: ${exercise.weight || "-"}</p>
    `;

    container.appendChild(card);

  });

}
