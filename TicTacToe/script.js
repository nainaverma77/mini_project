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

console.log("Welcome to Tic Tac Toe")

let music, audioTurn, gameover;
try {
    music = new Audio("music.mp3");
    music.loop = true;
} catch (e) {
    console.warn("Audio 'music.mp3' failed to initialize:", e);
}

try {
    audioTurn = new Audio("ting.mp3");
} catch (e) {
    console.warn("Audio 'ting.mp3' failed to initialize:", e);
}

try {
    gameover = new Audio("gameover.mp3");
} catch (e) {
    console.warn("Audio 'gameover.mp3' failed to initialize:", e);
}

let turn = "X"
let isgameover = false
let isMusicPlaying = false

// Music toggle logic
const musicToggleBtn = document.getElementById("music-toggle");
if (musicToggleBtn) {
    musicToggleBtn.addEventListener("click", () => {
        const icon = musicToggleBtn.querySelector(".vol-state");
        if (isMusicPlaying) {
            if (music) {
                try {
                    music.pause();
                } catch (e) {
                    console.error("music.pause() failed:", e);
                }
            }
            isMusicPlaying = false;
            icon.className = "fa-solid fa-volume-xmark vol-state";
            musicToggleBtn.style.color = "var(--text-slate)";
            musicToggleBtn.style.borderColor = "var(--border-color)";
        } else {
            if (music) {
                music.play().then(() => {
                    isMusicPlaying = true;
                    icon.className = "fa-solid fa-volume-high vol-state";
                    musicToggleBtn.style.color = "var(--accent-cyan)";
                    musicToggleBtn.style.borderColor = "var(--accent-cyan)";
                }).catch(err => {
                    console.log("Audio play failed: ", err);
                });
            } else {
                console.log("Music object not available.");
            }
        }
    });
}

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X" ? "O" : "X"
}

// Function to check for a win
const checkWin = ()=>{
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 16.67, 0, 90],
        [3, 4, 5, 5, 50.00, 0, 90],
        [6, 7, 8, 5, 83.33, 0, 90],
        [0, 3, 6, 16.67, 5, 90, 90],
        [1, 4, 7, 50.00, 5, 90, 90],
        [2, 5, 8, 83.33, 5, 90, 90],
        [0, 4, 8, 10, 10, 45, 113],
        [2, 4, 6, 10, 90, -45, 113],
    ]
    let winDetected = false;
    
    wins.forEach(e =>{
        if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText !== "") ){
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won!"
            isgameover = true
            winDetected = true
            
            // Highlight cells
            boxtexts[e[0]].parentElement.classList.add('winner-cell');
            boxtexts[e[1]].parentElement.classList.add('winner-cell');
            boxtexts[e[2]].parentElement.classList.add('winner-cell');
            
            // Show Excited GIF
            document.querySelector('.imgbox').classList.add('active');
            
            // Play win audio
            if (gameover) {
                gameover.play().catch(err => console.log("Audio play failed:", err));
            }
            
            // Positioning responsive line
            const line = document.querySelector(".line");
            line.style.left = `${e[3]}%`;
            line.style.top = `${e[4]}%`;
            line.style.transform = `rotate(${e[5]}deg)`;
            line.style.width = `${e[6]}%`;
        }
    });

    // Check for draw if no win detected
    if (!winDetected) {
        let allFilled = true;
        Array.from(boxtexts).forEach(element => {
            if (element.innerText === "") {
                allFilled = false;
            }
        });
        
        if (allFilled) {
            document.querySelector('.info').innerText = "Game Draw!"
            isgameover = true;
            // Clear line style just in case
            document.querySelector(".line").style.width = "0%";
        }
    }
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === '' && !isgameover){
            boxtext.innerText = turn;
            // Add styling class depending on who clicked
            if (turn === "X") {
                boxtext.classList.add("boxtext-x");
            } else {
                boxtext.classList.add("boxtext-o");
            }
            
            turn = changeTurn();
            if (audioTurn) {
                audioTurn.play().catch(err => console.log("Audio play failed:", err));
            }
            checkWin();
            
            if (!isgameover){
                document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
            } 
        }
    })
})

// Add onclick listener to reset button
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
        element.classList.remove("boxtext-x", "boxtext-o");
        element.parentElement.classList.remove("winner-cell");
    });
    turn = "X"; 
    isgameover = false
    document.querySelector(".line").style.width = "0%";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').classList.remove('active');
})
