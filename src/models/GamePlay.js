import DOM from "./DOM";
import RandomColorGenerator from "./RandomColorGenerator";

export const points = document.getElementById("points");

export default class GamePlay {
  constructor(colors, onRestart) {
    this.dom = new DOM();
    this.colors = colors;
    this.randomColorGenerator = new RandomColorGenerator();
    this.generatedColors = this.randomColorGenerator.generateRandomColors(this.colors);
    this.points = 0;
    this.flippedColors = [];
    this.onRestart = onRestart;
    this.twoColors = [];
  }

  gameLogic = () => {
    this.generatedColors.forEach((colorObject) => {
      colorObject.el.addEventListener("click", () => this.flipColor(colorObject));
    });
  };

  async flipColor(colorObject) {
    if (
      this.twoColors.some((colorObj) => colorObj.el.dataset.id === colorObject.el.dataset.id) ||
      this.twoColors.length >= 2 ||
      this.flippedColors.some((color) => color === colorObject.color)
    )
      return;

    colorObject.flip();
    this.twoColors.push(colorObject);

    if (this.twoColors.length === 2 && this.twoColors.every((colorObj) => colorObj.color === colorObject.color)) {
      this.addFlippedColors(colorObject.color);
    } else if (this.twoColors.length === 2) {
      this.hideFlippedColors();
    }

    if (this.points >= this.colors.length) {
      this.dom.addRestartGameContainer(() => this.restartGame());
    }
  }

  addFlippedColors(color) {
    this.flippedColors.push(color);
    this.twoColors = [];
    this.setPointsDisplay(++this.points);
  }

  setPointsDisplay(p) {
    points.innerText = `${p}/${this.colors.length}`;
  }

  hideFlippedColors() {
    setTimeout(() => {
      this.twoColors.forEach((color) => color.hide());
      this.twoColors = [];
    }, 1000);
  }

  restartGame() {
    this.generatedColors = this.randomColorGenerator.generateRandomColors(this.colors);
    this.flippedColors = [];
    this.twoColors = [];
    this.points = 0;
    this.setPointsDisplay(this.points);
    this.onRestart();
  }
}
