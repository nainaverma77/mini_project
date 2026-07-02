// Global error listener to help debug on-screen
window.addEventListener('error', (event) => {
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '10px';
    errorDiv.style.left = '10px';
    errorDiv.style.right = '10px';
    errorDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.95)';
    errorDiv.style.color = '#ffffff';
    errorDiv.style.padding = '15px';
    errorDiv.style.borderRadius = '8px';
    errorDiv.style.zIndex = '9999';
    errorDiv.style.fontFamily = 'monospace';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    errorDiv.innerHTML = `<strong>JS Error:</strong> ${event.message} <br> <em>at ${event.filename}:${event.lineno}</em>`;
    document.body.appendChild(errorDiv);
});

let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const resetBtn = document.querySelector("#reset-btn");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const drawGame = (userChoice, compChoice) => {
  msg.innerText = `It's a Draw! Both chose ${capitalize(userChoice)}.`;
  msg.style.backgroundColor = "rgba(30, 41, 59, 0.8)";
  msg.style.borderColor = "rgba(255, 255, 255, 0.1)";
  msg.style.color = "#94a3b8";
  
  // Reset animations
  msg.classList.remove("win-anim", "lose-anim");
  void msg.offsetWidth; // Trigger reflow
};

const showWinner = (userWin, userChoice, compChoice) => {
  msg.classList.remove("win-anim", "lose-anim");
  void msg.offsetWidth; // Trigger reflow
  
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${capitalize(userChoice)} beats ${capitalize(compChoice)}.`;
    msg.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
    msg.style.borderColor = "rgba(16, 185, 129, 0.3)";
    msg.style.color = "#10b981";
    msg.classList.add("win-anim");
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost! Computer's ${capitalize(compChoice)} beats your ${capitalize(userChoice)}.`;
    msg.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
    msg.style.borderColor = "rgba(239, 68, 68, 0.3)";
    msg.style.color = "#ef4444";
    msg.classList.add("lose-anim");
  }
};

const playGame = (userChoice) => {
  // Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame(userChoice, compChoice);
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else if (userChoice === "scissors") {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

// Add choice listeners
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    if (userChoice) {
      playGame(userChoice);
    }
  });
});

// Reset logic
resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";
  msg.innerText = "Make your move to start the game!";
  msg.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
  msg.style.borderColor = "rgba(255, 255, 255, 0.08)";
  msg.style.color = "#f8fafc";
  msg.classList.remove("win-anim", "lose-anim");
});