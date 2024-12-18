const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");

// Update big cup on interaction
const updateBigCup = () => {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
    showGoalReached();
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${2 - (250 * fullCups) / 1000}L`;
  }
};

// Highlight clicked cups and handle logic
const highlightCups = (index) => {
  if (
    smallCups[index].classList.contains("full") &&
    !smallCups[index].nextElementSibling?.classList.contains("full")
  ) {
    index--;
  }

  smallCups.forEach((cup, idx) => {
    if (idx <= index) cup.classList.add("full");
    else cup.classList.remove("full");
  });

  updateBigCup();
};

// Add event listeners to all cups
smallCups.forEach((cup, index) => {
  cup.addEventListener("click", () => highlightCups(index));
});

// Display a "Goal Achieved" message
const showGoalReached = () => {
  const goalMessage = document.createElement("div");
  goalMessage.className = "goal-message";
  goalMessage.innerHTML = `<h3>🎉 Goal Achieved! 🎉</h3>`;
  document.body.appendChild(goalMessage);
  setTimeout(() => goalMessage.remove(), 2000);
};

// Initialize
updateBigCup();
