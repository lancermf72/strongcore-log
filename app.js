// ===============================
// STRONGCORE SMART TRAINING APP
// ===============================

// ===============================
// EXERCISE DATABASE
// ===============================

const exercises = [

  // ---------------- CHEST ----------------
  { name: "Barbell Bench Press", muscle: "Chest", secondary: "Triceps", equipment: "Barbell", video: yt("barbell bench press exercise demo") },
  { name: "Incline Dumbbell Press", muscle: "Chest", secondary: "Triceps", equipment: "Dumbbell", video: yt("incline dumbbell press exercise demo") },
  { name: "Machine Chest Press", muscle: "Chest", secondary: "Triceps", equipment: "Machine", video: yt("machine chest press exercise demo") },
  { name: "Cable Chest Fly", muscle: "Chest", secondary: "Chest", equipment: "Cable", video: yt("cable chest fly exercise demo") },
  { name: "Push-Up", muscle: "Chest", secondary: "Triceps", equipment: "Bodyweight", video: yt("push up exercise demo proper form") },
  { name: "Close Grip Bench Press", muscle: "Chest", secondary: "Triceps", equipment: "Barbell", video: yt("close grip bench press exercise demo") },

  // ---------------- BACK ----------------
  { name: "Seated Cable Row", muscle: "Back", secondary: "Biceps", equipment: "Cable", video: yt("seated cable row exercise demo") },
  { name: "Lat Pulldown", muscle: "Back", secondary: "Biceps", equipment: "Machine", video: yt("lat pulldown exercise demo") },
  { name: "Chest Supported Row", muscle: "Back", secondary: "Biceps", equipment: "Machine", video: yt("chest supported row machine demo") },
  { name: "Straight Arm Pulldown", muscle: "Back", secondary: "Back", equipment: "Cable", video: yt("straight arm pulldown exercise demo") },
  { name: "Single Arm Dumbbell Row", muscle: "Back", secondary: "Biceps", equipment: "Dumbbell", video: yt("single arm dumbbell row demo") },

  // ---------------- SHOULDERS ----------------
  { name: "Dumbbell Shoulder Press", muscle: "Shoulders", secondary: "Triceps", equipment: "Dumbbell", video: yt("dumbbell shoulder press demo") },
  { name: "Lateral Raise", muscle: "Shoulders", secondary: "Shoulders", equipment: "Dumbbell", video: yt("dumbbell lateral raise demo") },
  { name: "Rear Delt Fly (Machine)", muscle: "Shoulders", secondary: "Back", equipment: "Machine", video: yt("rear delt fly machine demo") },
  { name: "Barbell Shrugs", muscle: "Shoulders", secondary: "Back", equipment: "Barbell", video: yt("barbell shrugs demo") },
  { name: "Dumbbell Shrugs", muscle: "Shoulders", secondary: "Back", equipment: "Dumbbell", video: yt("dumbbell shrugs demo") },

  // ---------------- ARMS ----------------
  { name: "Preacher Curl", muscle: "Arms", secondary: "Biceps", equipment: "Machine", video: yt("preacher curl demo") },
  { name: "Dumbbell Curl", muscle: "Arms", secondary: "Biceps", equipment: "Dumbbell", video: yt("dumbbell bicep curl demo") },
  { name: "Cable Triceps Pushdown", muscle: "Arms", secondary: "Triceps", equipment: "Cable", video: yt("cable triceps pushdown demo") },
  { name: "Overhead Triceps Extension", muscle: "Arms", secondary: "Triceps", equipment: "Dumbbell", video: yt("overhead triceps extension demo") },

  // ---------------- LEGS ----------------
  { name: "Barbell Squat", muscle: "Legs", secondary: "Glutes", equipment: "Barbell", video: yt("barbell squat demo") },
  { name: "Leg Press", muscle: "Legs", secondary: "Glutes", equipment: "Machine", video: yt("leg press machine demo") },
  { name: "Walking Lunges", muscle: "Legs", secondary: "Glutes", equipment: "Dumbbell", video: yt("walking lunges demo") },
  { name: "Romanian Deadlift", muscle: "Legs", secondary: "Glutes", equipment: "Barbell", video: yt("romanian deadlift demo") },
  { name: "Glute Bridge", muscle: "Legs", secondary: "Glutes", equipment: "Bodyweight", video: yt("glute bridge demo") },
  { name: "Marching Bridge", muscle: "Legs", secondary: "Core", equipment: "Bodyweight", video: yt("marching glute bridge demo") },

  // ---------------- CORE (DRA SAFE ONLY) ----------------
  { name: "Dead Bug", muscle: "Core", secondary: "Core", equipment: "Bodyweight", draSafe: true, video: yt("dead bug exercise demo") },
  { name: "Heel Slides", muscle: "Core", secondary: "Core", equipment: "Bodyweight", draSafe: true, video: yt("heel slides core exercise demo") },
  { name: "Standing Pallof Press", muscle: "Core", secondary: "Core", equipment: "Cable", draSafe: true, video: yt("standing pallof press demo") },
  { name: "Side Lying Clamshell", muscle: "Core", secondary: "Glutes", equipment: "Bodyweight", draSafe: true, video: yt("side lying clamshell demo") },
  { name: "Modified Plank (Knees)", muscle: "Core", secondary: "Core", equipment: "Bodyweight", draSafe: true, advanced: true, video: yt("modified plank knees demo") },
  { name: "Elevated Plank (Bench)", muscle: "Core", secondary: "Core", equipment: "Bodyweight", draSafe: true, advanced: true, video: yt("incline plank demo") }

];

// ===============================
// HELPER FUNCTIONS
// ===============================

function yt(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function getHistory() {
  return JSON.parse(localStorage.getItem("workoutHistory")) || [];
}

function saveHistory(history) {
  localStorage.setItem("workoutHistory", JSON.stringify(history));
}

// ===============================
// SMART GENERATOR LOGIC
// ===============================

function generateSmartWorkout() {

  const history = getHistory();

  const muscleGroups = ["Chest", "Back", "Legs", "Shoulders", "Arms"];

  const lastTrained = {};

  muscleGroups.forEach(m => lastTrained[m] = 0);

  history.forEach(entry => {
    lastTrained[entry.muscle] = Date.parse(entry.date);
  });

  const leastRecent = muscleGroups.sort((a, b) => lastTrained[a] - lastTrained[b])[0];

  const primaryExercises = exercises.filter(e => e.muscle === leastRecent);
  const coreExercises = exercises.filter(e => e.muscle === "Core" && e.draSafe);

  const selectedPrimary = shuffle(primaryExercises).slice(0, 3);
  const selectedCore = shuffle(coreExercises)[0];

  displayWorkout(leastRecent, selectedPrimary, selectedCore);
}

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// ===============================
// DISPLAY
// ===============================

function displayWorkout(muscle, primary, core) {

  const container = document.getElementById("smartWorkout");
  container.innerHTML = `<h3>${muscle} Focus Day</h3>`;

  primary.forEach(ex => {
    container.innerHTML += `
      <div class="exercise-card">
        <strong>${ex.name}</strong><br/>
        Equipment: ${ex.equipment}<br/>
        <a href="${ex.video}" target="_blank">Demo</a>
      </div>
    `;
  });

  container.innerHTML += `
    <h4>DRA-Safe Core</h4>
    <div class="exercise-card">
      <strong>${core.name}</strong><br/>
      Equipment: ${core.equipment}<br/>
      <a href="${core.video}" target="_blank">Demo</a>
    </div>
  `;
}

// ===============================
// BUTTON LISTENER
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("generateWorkoutBtn");
  if (btn) {
    btn.addEventListener("click", generateSmartWorkout);
  }
});