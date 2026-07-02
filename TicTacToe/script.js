console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false
let isMusicPlaying = false

// Loop background music
music.loop = true;

// Music toggle logic
const musicToggleBtn = document.getElementById("music-toggle");
if (musicToggleBtn) {
    musicToggleBtn.addEventListener("click", () => {
        const icon = musicToggleBtn.querySelector(".vol-state");
        if (isMusicPlaying) {
            music.pause();
            isMusicPlaying = false;
            icon.className = "fa-solid fa-volume-xmark vol-state";
            musicToggleBtn.style.color = "var(--text-slate)";
            musicToggleBtn.style.borderColor = "var(--border-color)";
        } else {
            music.play().then(() => {
                isMusicPlaying = true;
                icon.className = "fa-solid fa-volume-high vol-state";
                musicToggleBtn.style.color = "var(--accent-cyan)";
                musicToggleBtn.style.borderColor = "var(--accent-cyan)";
            }).catch(err => {
                console.log("Audio play failed: ", err);
            });
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
        [0, 1, 2, 2.5, 5, 0],
        [3, 4, 5, 2.5, 15, 0],
        [6, 7, 8, 2.5, 25, 0],
        [0, 3, 6, -7.5, 15, 90],
        [1, 4, 7, 2.5, 15, 90],
        [2, 5, 8, 12.5, 15, 90],
        [0, 4, 8, 2.5, 15, 45],
        [2, 4, 6, 2.5, 15, 135],
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
            gameover.play();
            
            // Positioning responsive line
            // Check screen width to determine line position scaling
            const line = document.querySelector(".line");
            if (window.innerWidth > 800) {
                // Desktop scale
                line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
                line.style.width = "25vw";
            } else {
                // Mobile/Tablet scale (approximate positions in grid container)
                // For mobile we rely heavily on winning cell highlights since layout is very dynamic
                line.style.width = "0vw";
            }
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
            document.querySelector(".line").style.width = "0vw";
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
            audioTurn.play();
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
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').classList.remove('active');
})
