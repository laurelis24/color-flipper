const gameContainer = document.querySelector(".game-container");
const restartGameContainer = document.querySelector(".restart-game-container");
const restartBtn = restartGameContainer.children[1];

const colors = ["orange", "black", "purple", "green", "yellow", "red", "blue", "salmon"];

function createRandomArray(colors) {
  let clone = [...colors];
  let shakeArray = [];

  for (let i = 0; i < 16; i++) {
    let rColor = clone[Math.floor(Math.random() * clone.length)];
    shakeArray.push(rColor);

    if (shakeArray.filter(color => color === rColor).length === 2) {
      clone.splice(clone.indexOf(rColor), 1);
    }
  }

  return shakeArray;
}

function StartGame() {
  let flips = 2;
  let points = 0;

  let flippedColors = [];

  function createColorBoxes() {
    let arr = createRandomArray(colors);

    arr.forEach((color, idx) => {
      const el = document.createElement("div");
      el.classList.add("color");
      el.dataset.id = idx + 1;
      el.dataset.color = color;
      el.dataset.found = "false";
      el.addEventListener("click", flipColor);
      gameContainer.appendChild(el);
    });

    function flipColor() {
      if (flips <= 0 || flips > 2) return;
      if (this.dataset.found === "true") return;

      let find = flippedColors.find(c => c.id === +this.dataset.id);
      if (find) {
        return;
      } else {
        flips--;
      }

      this.classList.add("show");
      this.style.backgroundColor = this.dataset.color;

      flippedColors.push({
        id: +this.dataset.id,
        color: this.dataset.color,
        element: this,
      });

      if (flips === 0) {
        flipBack();
      }
    }

    function flipBack() {
      let every = flippedColors.every(a => a.color === flippedColors[0].color);
      if (flippedColors.length === 2 && !every) {
        setTimeout(() => {
          flippedColors.forEach(c => {
            c.element.classList.remove("show");
            c.element.style.backgroundColor = "white";
          });
          flips = 2;
          flippedColors = [];
        }, 800);
      } else if (flippedColors.length === 2 && every) {
        flippedColors.forEach(c => (c.element.dataset.found = true));
        points += 2;
        flips = 2;
        flippedColors = [];
      }

      if (points === 16) {
        checkWin();
      }
    }

    function checkWin() {
      setTimeout(() => {
        restartGameContainer.classList.remove("hide");
        restartGame()
      }, 1000);
    }

    function restartGame() {
      restartBtn.addEventListener("click", () => {
        location.reload()
      });
    }
  }

  createColorBoxes();
}

StartGame();
