// ===============================
// STRONGCORE LOG - CLEAN STABLE VERSION (SIMPLIFIED FLOW)
// ===============================


// -------- EXERCISE DATABASE --------
// ⚠️ KEEP YOUR CURRENT DATABASE HERE EXACTLY AS YOU HAVE IT
// (Paste your full exerciseDatabase object here and remove this comment)


// -------- WORKOUT STATE --------

let workoutSessions = JSON.parse(localStorage.getItem("workoutSessions")) || [];
let currentWorkout = {
  id: Date.now(),
  date: new Date(),
  exercises: []
};


// -------- INIT --------

document.addEventListener("DOMContentLoaded", function () {
  populateMuscles();
  setupListeners();
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

  exercises.forEach(function (exercise) {
    const option = document.createElement("option");
    option.value = exercise.name;
    option.textContent = exercise.name;
    exerciseSelect.appendChild(option);
  });
}


// -------- LISTENERS --------

function setupListeners() {
  document.getElementById("muscle").addEventListener("change", populateExercises);
  document.getElementById("generateBtn").addEventListener("click", generateWorkout);
}


// -------- GENERATE WORKOUT --------

function generateWorkout() {
  const selectedMuscle = document.getElementById("muscle").value;
  const bodyweightOnly = document.getElementById("bodyweightOnly").checked;
  const dumbbellOnly = document.getElementById("dumbbellOnly").checked;
  const draSafeMode = document.getElementById("draSafeMode").checked;

  let exercises = exerciseDatabase[selectedMuscle].slice();

  if (bodyweightOnly) {
    exercises = exercises.filter(ex => ex.equipment === "bodyweight");
  }

  if (dumbbellOnly) {
    exercises = exercises.filter(ex => ex.equipment === "dumbbell");
  }

  if (draSafeMode) {
    exercises = exercises.filter(ex =>
      ex.draLevel === "safe" || ex.draLevel === "caution"
    );
  }

  if (exercises.length === 0) {
    alert("No exercises match selected filters.");
    return;
  }

  currentWorkout.exercises = [];

  const shuffled = exercises.sort(() => 0.5 - Math.random());
  const count = Math.min(5, shuffled.length);

  for (let i = 0; i < count; i++) {
    currentWorkout.exercises.push({
      muscle: selectedMuscle,
      name: shuffled[i].name,
      draLevel: shuffled[i].draLevel || null,
      sets: "",
      reps: "",
      weight: ""
    });
  }

  renderActiveWorkout();
}


// -------- CUSTOM EXERCISE --------

function addCustomExercise() {
  const input = document.getElementById("customExerciseName");
  const name = input.value.trim();

  if (!name) return;

  currentWorkout.exercises.push({
    muscle: "Custom",
    name: name,
    sets: "",
    reps: "",
    weight: ""
  });

  input.value = "";
  renderActiveWorkout();
}


// -------- ACTIVE WORKOUT DISPLAY --------

function renderActiveWorkout() {
  const container = document.getElementById("activeWorkout");
  container.innerHTML = "";

  if (currentWorkout.exercises.length === 0) {
    container.innerHTML = "<p>No exercises yet.</p>";
    return;
  }

  currentWorkout.exercises.forEach(function (exercise, index) {
    const card = document.createElement("div");
    card.className = "exercise-card";

    const badge =
      exercise.draLevel === "safe"
        ? " ⭐"
        : exercise.draLevel === "caution"
        ? " ⚠️"
        : "";

    card.innerHTML = `
      <h3>${exercise.name}${badge}</h3>
      <p>Muscle: ${exercise.muscle}</p>

      <label>Sets:</label>
      <input type="number" value="${exercise.sets}"
        onchange="updateWorkoutField(${index}, 'sets', this.value)" />

      <label>Reps:</label>
      <input type="number" value="${exercise.reps}"
        onchange="updateWorkoutField(${index}, 'reps', this.value)" />

      <label>Weight:</label>
      <input type="number" value="${exercise.weight}"
        onchange="updateWorkoutField(${index}, 'weight', this.value)" />
    `;

    container.appendChild(card);
  });
}

function updateWorkoutField(index, field, value) {
  currentWorkout.exercises[index][field] = value;
}


// -------- FINISH WORKOUT --------

function saveWorkout() {
  if (currentWorkout.exercises.length === 0) {
    alert("No workout to save.");
    return;
  }

  workoutSessions.push(currentWorkout);
  localStorage.setItem("workoutSessions", JSON.stringify(workoutSessions));

  currentWorkout = {
    id: Date.now(),
    date: new Date(),
    exercises: []
  };

  renderActiveWorkout();
  renderHistory();
  alert("Workout saved.");
}


// -------- HISTORY --------

function renderHistory() {
  const historyDiv = document.getElementById("historyList");
  historyDiv.innerHTML = "";

  workoutSessions.forEach(function (workout, workoutIndex) {
    const workoutDiv = document.createElement("div");
    workoutDiv.style.border = "1px solid #ccc";
    workoutDiv.style.padding = "10px";
    workoutDiv.style.marginBottom = "15px";

    const date = new Date(workout.date).toLocaleDateString();
    workoutDiv.innerHTML = `<h3>Workout - ${date}</h3>`;

    workout.exercises.forEach(function (ex) {
      const exDiv = document.createElement("div");
      exDiv.textContent =
        `${ex.name} - ${ex.sets}x${ex.reps} @ ${ex.weight || 0}`;
      workoutDiv.appendChild(exDiv);
    });

    historyDiv.appendChild(workoutDiv);
  });
}


// -------- EXERCISE LIBRARY --------

function renderExerciseLibrary() {
  const container = document.getElementById("exerciseCards");
  container.innerHTML = "";

  for (let muscle in exerciseDatabase) {
    const header = document.createElement("h3");
    header.textContent = muscle;
    container.appendChild(header);

    exerciseDatabase[muscle].forEach(function (exercise) {
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
