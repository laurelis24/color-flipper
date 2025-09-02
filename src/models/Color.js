export default class Color {
  constructor(color, idx) {
    this.el = document.createElement("div");
    this.el.classList.add("color");
    this.el.dataset.id = idx;
    this.color = color;
  }

  flip() {
    this.el.classList.add("show");
    this.el.style.backgroundColor = this.color;
  }

  hide() {
    this.el.classList.remove("show");
    this.el.style.backgroundColor = "";
  }
}
