// -------- DATA --------

let currentWorkout = null;
let workoutHistory = [];


// -------- EXERCISE DATABASE --------

const exerciseDatabase = {

  Chest: [
    { name: "Barbell Bench Press", equipment: "barbell" },
    { name: "Dumbbell Bench Press", equipment: "dumbbell" },
    { name: "Push-Up", equipment: "bodyweight" }
  ],

  Back: [
    { name: "Lat Pulldown", equipment: "machine" },
    { name: "Seated Cable Row", equipment: "machine" },
    { name: "Single Arm Dumbbell Row", equipment: "dumbbell" }
  ],

  Shoulders: [
    { name: "Dumbbell Shoulder Press", equipment: "dumbbell" },
    { name: "Lateral Raise", equipment: "dumbbell" }
  ],

  Arms: [
    { name: "Dumbbell Curl", equipment: "dumbbell" },
    { name: "Triceps Pushdown", equipment: "machine" }
  ],

  Legs: [
    { name: "Goblet Squat", equipment: "dumbbell" },
    { name: "Walking Lunges", equipment: "bodyweight" }
  ],

  Core: [
    { name: "Dead Bug" },
    { name: "Bird Dog" },
    { name: "Modified Plank" },
    { name: "Side Plank" }
  ]
};


// -------- INIT --------

window.onload = function () {
  populateMuscles();
  document.getElementById("generateBtn").addEventListener("click", generateWorkout);
  document.getElementById("saveBtn").addEventListener("click", saveExercise);
  document.getElementById("finishWorkoutBtn").addEventListener("click", saveWorkout);
};


// -------- POPULATE DROPDOWNS --------

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
  const selectedMuscle = document.getElementById("muscle").value;
  const exerciseSelect = document.getElementById("exercise");
  exerciseSelect.innerHTML = "";

  exerciseDatabase[selectedMuscle].forEach(ex => {
    const option = document.createElement("option");
    option.value = ex.name;
    option.textContent = ex.name;
    exerciseSelect.appendChild(option);
  });
}

document.getElementById("muscle").addEventListener("change", populateExercises);


// -------- GENERATE WORKOUT --------

function generateWorkout() {

  const selectedMuscle = document.getElementById("muscle").value;
  const exercises = exerciseDatabase[selectedMuscle];

  currentWorkout = {
    date: new Date().toLocaleDateString(),
    exercises: []
  };

  const shuffled = exercises.sort(() => 0.5 - Math.random());
  const count = Math.min(4, shuffled.length);

  for (let i = 0; i < count; i++) {
    currentWorkout.exercises.push({
      muscle: selectedMuscle,
      name: shuffled[i].name,
      sets: "",
      reps: "",
      weight: ""
    });
  }

  renderActiveWorkout();
}


// -------- ADD FROM DROPDOWN --------

function saveExercise() {

  // If no workout exists yet, automatically create one
  if (!currentWorkout) {
    currentWorkout = {
      date: new Date().toLocaleDateString(),
      exercises: []
    };
  }

  const selectedMuscle = document.getElementById("muscle").value;
  const selectedExercise = document.getElementById("exercise").value;

  currentWorkout.exercises.push({
    muscle: selectedMuscle,
    name: selectedExercise,
    sets: "",
    reps: "",
    weight: ""
  });

  renderActiveWorkout();
}


// -------- RENDER WORKOUT --------

function renderActiveWorkout() {

  const container = document.getElementById("activeWorkout");
  container.innerHTML = "";

  if (!currentWorkout) return;

  currentWorkout.exercises.forEach((exercise, index) => {

    const card = document.createElement("div");
    card.className = "exercise-card";

    card.innerHTML = `
      <h4>${exercise.name}</h4>

      <input type="number" placeholder="Sets"
        value="${exercise.sets}"
        onchange="updateWorkoutField(${index}, 'sets', this.value)" />

      <input type="number" placeholder="Reps"
        value="${exercise.reps}"
        onchange="updateWorkoutField(${index}, 'reps', this.value)" />

      <input type="number" placeholder="Weight"
        value="${exercise.weight}"
        onchange="updateWorkoutField(${index}, 'weight', this.value)" />

      <button onclick="deleteExercise(${index})">Delete</button>
    `;

    container.appendChild(card);
  });
}


// -------- UPDATE FIELDS --------

function updateWorkoutField(index, field, value) {
  currentWorkout.exercises[index][field] = value;
}


// -------- DELETE EXERCISE --------

function deleteExercise(index) {
  currentWorkout.exercises.splice(index, 1);
  renderActiveWorkout();
}


// -------- SAVE WORKOUT --------

function saveWorkout() {

  if (!currentWorkout || currentWorkout.exercises.length === 0) {
    alert("No workout to save.");
    return;
  }

  workoutHistory.push(currentWorkout);
  renderHistory();

  currentWorkout = null;
  renderActiveWorkout();

  alert("Workout saved.");
}


// -------- HISTORY --------

function renderHistory() {

  const container = document.getElementById("historyList");
  container.innerHTML = "";

  workoutHistory.forEach(workout => {

    const div = document.createElement("div");
    div.innerHTML = `<h4>${workout.date}</h4>`;

    workout.exercises.forEach(ex => {
      const p = document.createElement("p");
      p.textContent = `${ex.name} - ${ex.sets} x ${ex.reps} @ ${ex.weight}`;
      div.appendChild(p);
    });

    container.appendChild(div);
  });
}


// -------- TABS --------

function showTab(tabId) {
  document.querySelectorAll("main section").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
}
