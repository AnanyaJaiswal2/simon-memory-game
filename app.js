let gameSeq = [];   // Computer ki sequence
let userSeq = [];   // User ki sequence
let btns = ["yellow", "red", "purple", "green"];

let started = false; // Game start hua ya nahi
let level = 0;       // Current level

let h2 = document.querySelector("h2");

// Game start on keypress
document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp(); // First level load
  }
});

// Sound play karne ka function
function playSound(color) {
  let sound = new Audio(`sounds/${color}.mp3`);
  sound.play();
}

// Game flash animation
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

// User flash animation
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

// New level ke lie function
function levelUp() {
  userSeq = [];   // Reset user input
  level++;        // Level increase
  h2.innerText = `Level ${level}`;

  // Random color select
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  // Push color in game sequence
  gameSeq.push(randColor);

  // Flash and sound
  gameFlash(randBtn);
  playSound(randColor);
}

// Answer check karna
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000); // Next level
    }
  } else {
    // Galat answer
    playSound("wrong");
    document.body.style.backgroundColor = "red";
    h2.innerHTML = `❌ Game Over! Your score was <b>${level}</b><br>Press any key to start`;

    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 200);

    reset(); // Game reset
  }
}

// Button press by user
function btnPress() {
  let btn = this;
  userFlash(btn); // Animation

  let userColor = btn.getAttribute("id"); // Color ka ID
  userSeq.push(userColor);                // Store in userSeq
  playSound(userColor);                   // Sound play

  checkAns(userSeq.length - 1);           // Check answer
}

// Har button pe event listener
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Game reset after game over
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

