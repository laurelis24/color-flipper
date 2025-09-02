export default class DOM {
  addRestartGameContainer(restartGame) {
    const el = document.createElement("div");
    const title = document.createElement("h1");
    const button = document.createElement("button");

    el.classList.add("restart-game-container");
    title.innerText = "You won!";
    button.innerText = "Restart!";

    button.addEventListener("click", () => {
      restartGame();
      document.body.removeChild(el);
    });

    el.append(title, button);
    document.body.appendChild(el);
  }
}
