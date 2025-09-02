import GamePlay from "./GamePlay";

const gameContainer = document.querySelector(".game-container");
import { points } from "./GamePlay";

export default class Game {
  constructor() {
    this.colors = ["orange", "black", "purple", "green", "yellow", "red", "blue", "salmon"];
    this.gameplay = new GamePlay(this.colors, this.restartGame);
  }

  startGame() {
    this.drawGame();
    this.gameplay.gameLogic();
  }

  drawGame() {
    gameContainer.replaceChildren();
    this.gameplay.generatedColors.forEach((color) => {
      gameContainer.appendChild(color.el);
    });
    points.innerText = `0/${this.colors.length}`;
  }

  restartGame = () => {
    this.startGame();
  };
}
