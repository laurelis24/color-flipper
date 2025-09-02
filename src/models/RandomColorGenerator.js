import Color from "./Color";

export default class RandomColorGenerator {
  generateRandomColors(colors) {
    const colorsClone = [...colors];
    const generatedColors = [];
    for (let i = 0; i < colors.length * 2; i++) {
      const randomIdx = Math.floor(Math.random() * colorsClone.length);
      const randomColor = colorsClone[randomIdx];

      generatedColors.push(new Color(randomColor, i + 1));

      if (generatedColors.filter((colorObj) => colorObj.color === randomColor).length === 2) {
        colorsClone.splice(randomIdx, 1);
      }
    }
    return generatedColors;
  }
}
