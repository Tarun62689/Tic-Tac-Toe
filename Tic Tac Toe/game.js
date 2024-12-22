let Boxs = document.querySelectorAll(".Box");
let statustext = document.querySelector("#status");
let resetbtn = document.querySelector("#reset");

let turnO = true; // true for "O", false for "X"

const winpatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Add event listeners to each box
Boxs.forEach((Box) => {
  Box.addEventListener("click", () => {
    if (turnO) {
      Box.innerText = "O";
      Box.classList.add("disabled");
      turnO = false;
      statustext.innerText = "Player X's Turn";
    } else {
      Box.innerText = "X";
      Box.classList.add("disabled");
      turnO = true;
      statustext.innerText = "Player O's Turn";
    }
    checkwinner();
  });
});

// Disable all boxes after the game is over
const disableBoxs = () => {
  Boxs.forEach((Box) => {
    Box.classList.add("disabled");
  });
};

// Check for a winner
const checkwinner = () => {
  for (let pattern of winpatterns) {
    let pos1val = Boxs[pattern[0]].innerText;
    let pos2val = Boxs[pattern[1]].innerText;
    let pos3val = Boxs[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        statustext.innerText = `Winner: Player ${pos1val}`;
        alert(`Winner: Player ${pos1val}`);
        disableBoxs();
        return;
      }
    }
  }

  // Check for a draw
  if ([...Boxs].every((Box) => Box.innerText !== "")) {
    statustext.innerText = "It's a Draw!";
    alert("It's a Draw!");
  }
};

// Reset the game
resetbtn.addEventListener("click", () => {
  Boxs.forEach((Box) => {
    Box.innerText = "";
    Box.classList.remove("disabled");
  });
  turnO = true;
  statustext.innerText = "Player O's Turn";
});
