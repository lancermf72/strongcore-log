// ===============================
// STRONGCORE LOG - CLEAN STABLE VERSION (SIMPLIFIED FLOW)
// ===============================


// -------- EXERCISE DATABASE --------

const exerciseDatabase = {

  Chest: [
  { name: "Barbell Bench Press", equipment: "barbell", draLevel: "caution", hotelFriendly: false },
  { name: "Incline Barbell Bench Press", equipment: "barbell", draLevel: "caution", hotelFriendly: false },
  { name: "Dumbbell Bench Press", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true },
  { name: "Incline Dumbbell Press", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true },
  { name: "Push-Up", equipment: "bodyweight", draLevel: "caution", hotelFriendly: true },
  { name: "Incline Push-Up", equipment: "bodyweight", draLevel: "safe", hotelFriendly: true },
  { name: "Decline Push-Up", equipment: "bodyweight", draLevel: "caution", hotelFriendly: true },
  { name: "Chest Fly (Dumbbell)", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true },
  { name: "Chest Fly (Machine)", equipment: "machine", draLevel: "caution", hotelFriendly: false },
  { name: "Cable Chest Fly", equipment: "cable", draLevel: "caution", hotelFriendly: false },
  { name: "Close-Grip Bench Press", equipment: "barbell", draLevel: "caution", hotelFriendly: false },
  { name: "Single Arm Dumbbell Press", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true }
],

  Back: [
  { name: "Lat Pulldown", equipment: "cable", hotelFriendly: false },
  { name: "Seated Cable Row", equipment: "cable", hotelFriendly: false },
  { name: "Single Arm Dumbbell Row", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true },
  { name: "Bent Over Barbell Row", equipment: "barbell", draLevel: "caution", hotelFriendly: false },
  { name: "Chest Supported Dumbbell Row", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true },
  { name: "Resistance Band Row", equipment: "bodyweight", draLevel: "safe", hotelFriendly: true },
  { name: "Pull-Up", equipment: "bodyweight", draLevel: "caution", hotelFriendly: false },
  { name: "Assisted Pull-Up", equipment: "bodyweight", draLevel: "caution", hotelFriendly: false },
  { name: "Face Pull", equipment: "cable", draLevel: "safe", hotelFriendly: false },
  { name: "Single Arm Cable Row", equipment: "cable", draLevel: "safe", hotelFriendly: false }
],

  Shoulders: [
  { name: "Dumbbell Shoulder Press", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true },
  { name: "Lateral Raise", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true },
  { name: "Arnold Press", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true },
  { name: "Front Raise", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true },
  { name: "Cable Lateral Raise", equipment: "cable", draLevel: "safe", hotelFriendly: false },
  { name: "Rear Delt Fly (Dumbbell)", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true },
  { name: "Rear Delt Fly (Machine)", equipment: "machine", draLevel: "safe", hotelFriendly: false },
  { name: "Barbell Overhead Press", equipment: "barbell", draLevel: "caution", hotelFriendly: false },
  { name: "Upright Row", equipment: "barbell", draLevel: "caution", hotelFriendly: false }
],

  Arms: [
  { name: "Dumbbell Curl", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true },
  { name: "Hammer Curl", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true },
  { name: "Triceps Pushdown", equipment: "cable", draLevel: "safe", hotelFriendly: false },
  { name: "Overhead Dumbbell Triceps Extension", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true },
  { name: "EZ Bar Curl", equipment: "barbell", draLevel: "safe", hotelFriendly: false },
  { name: "Cable Curl", equipment: "cable", draLevel: "safe", hotelFriendly: false },
  { name: "Concentration Curl", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true },
  { name: "Close-Grip Push-Up", equipment: "bodyweight", draLevel: "caution", hotelFriendly: true },
  { name: "Bench Dips", equipment: "bodyweight", draLevel: "caution", hotelFriendly: true },
  { name: "Skull Crushers", equipment: "barbell", draLevel: "caution", hotelFriendly: false },
  { name: "Cable Overhead Triceps Extension", equipment: "cable", draLevel: "caution", hotelFriendly: false }
],

  Legs: [
  { name: "Goblet Squat", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true },
  { name: "Walking Lunges", equipment: "bodyweight", draLevel: "safe", hotelFriendly: true },
  { name: "Dumbbell Romanian Deadlift", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true },
  { name: "Bodyweight Squat", equipment: "bodyweight", draLevel: "safe", hotelFriendly: true },
  { name: "Split Squat", equipment: "bodyweight", draLevel: "safe", hotelFriendly: true },
  { name: "Rear Foot Elevated Split Squat", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true },
  { name: "Step-Ups", equipment: "dumbbell", draLevel: "safe", hotelFriendly: true },
  { name: "Barbell Back Squat", equipment: "barbell", draLevel: "caution", hotelFriendly: false },
  { name: "Leg Press", equipment: "machine", draLevel: "caution", hotelFriendly: false },
  { name: "Hip Thrust", equipment: "barbell", draLevel: "caution", hotelFriendly: false },
  { name: "Glute Bridge March", equipment: "bodyweight", draLevel: "safe", hotelFriendly: true }
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
  { name: "V-Ups" },
  { name: "Stability Ball Dead Bug", equipment: "bodyweight", draLevel: "safe", hotelFriendly: true },
  { name: "Half-Kneeling Pallof Press", equipment: "cable", draLevel: "safe", hotelFriendly: false },
  { name: "Tall Kneeling Cable Chop", equipment: "cable", draLevel: "caution", hotelFriendly: false },
  { name: "Side Plank with Reach", equipment: "bodyweight", draLevel: "caution", hotelFriendly: true },
  { name: "Bear Crawl (Slow Controlled)", equipment: "bodyweight", draLevel: "caution", hotelFriendly: true },
  { name: "Dead Bug with Resistance Band", equipment: "bodyweight", draLevel: "safe", hotelFriendly: true },
  { name: "Weighted Carry (Heavy)", equipment: "dumbbell", draLevel: "caution", hotelFriendly: true }

]
};


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
  renderActiveWorkout();
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

  const finishBtn = document.getElementById("finishWorkoutBtn");

  if (finishBtn) {
    finishBtn.addEventListener("click", function() {
      alert("Button is connected");
      saveWorkout();
    });
  } else {
    alert("Finish button not found");
  }
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

  currentWorkout = {
  date: new Date().toLocaleDateString(),
  exercises: []
};

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

  // Push deep copy to avoid mutation bugs
  workoutSessions.push(JSON.parse(JSON.stringify(currentWorkout)));

  localStorage.setItem("workoutSessions",
    JSON.stringify(workoutSessions)
  );

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

  workoutSessions.forEach(function (workout) {

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
// -------- TAB SWITCHING --------

function showTab(tabId) {
  const sections = document.querySelectorAll("main section");

  sections.forEach(section => {
    section.classList.remove("active");
  });

  const activeSection = document.getElementById(tabId);
  if (activeSection) {
    activeSection.classList.add("active");
  }
}
