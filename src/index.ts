import "./style.css";
import { Game, IGame } from "./components/Game";
import { IView, View } from "./components/View";
import {
  GameStatistic,
  IGameStatistic,
  Statuses,
} from "./components/GameStatus";
import { deepCloneArr } from "./helpers/commonHelpers";

export class GameController {
  game: IGame;
  view: IView;
  gameStatistic: IGameStatistic;
  intervalId: NodeJS.Timer;

  constructor() {
    this.game = new Game();

    this.gameStatistic = new GameStatistic();

    const container = document.getElementById("field")!;
    this.view = new View(
      this.game.board.boardState,
      container,
      this.gameStatistic
    );

    //Draw empty game field
    this.view.drawField(this.game.board.boardState);

    document.addEventListener("keydown", this.keyPess.bind(this));

    document
      .querySelector(".start-btn")
      ?.addEventListener("click", this.startGame.bind(this));

    document
      .querySelector(".pause-btn")
      ?.addEventListener("click", this.pauseGame.bind(this));
  }

  private keyPess(e: KeyboardEvent) {
    if (this.gameStatistic.status !== Statuses.playing) {
      return;
    }
    switch (e.key) {
      case "ArrowLeft":
        this.moveLeft();
        break;

      case "ArrowRight":
        this.moveRight();
        break;

      case "ArrowDown":
        this.moveDown();
        break;

      case "ArrowUp":
        this.rotate();
        break;
      default:
        return;
    }

    //After any key press update dom
    this.view.drawField(this.game.getCurrentFieldState());
  }

  startGame() {
    // If the game status is not 'none' , it means that the game has already been created,
    // and when we press the start button, we reset the status, the interval, and create a new game object...
    if (this.gameStatistic.status !== Statuses.none) {
      clearInterval(this.intervalId);
      this.gameStatistic.resetStatus();
      this.game = new Game();
      this.view.drawModal("");
      this.view.drawScore();
    }

    // ...change the status to playing, create a new figure, start the interval.
    this.gameStatistic.status = Statuses.playing;
    this.game.spawnNewFigure();
    this.view.drawField(this.game.getCurrentFieldState());
    this.view.drawNextFigure(this.game.nextFigure.form);
    this.setTimer();
  }

  //Just conditions when the pause button is pressed. Change status, stop/resume interval, show modal window
  pauseGame() {
    if (
      this.gameStatistic.status === Statuses.ended ||
      this.gameStatistic.status === Statuses.none
    ) {
      return;
    }

    if (this.gameStatistic.status === Statuses.stopped) {
      this.view.drawModal("");
      this.gameStatistic.status = Statuses.playing;
      this.setTimer();
    } else {
      this.view.drawModal("PAUSED");
      clearInterval(this.intervalId);
      this.gameStatistic.status = Statuses.stopped;
    }
  }

  // Downward movement of the figure
  moveDown() {
    const { x, y } = this.game.activeFigure.position;

    // Changing the position of the y-axis...
    this.game.activeFigure.position = { x, y: y + 1 };

    //If the method 'checkCollision' returns true, then such coordinates are not possible, there is a collision...
    if (this.game.checkCollision()) {
      //...so we return the previous coordinates...
      this.game.activeFigure.position = { x, y };

      //...set the piece on the game field, check if the any lines have been cleared...
      this.game.board.setFigureToBoard(this.game.activeFigure);
      const clearedLines = this.game.board.clearLines();

      //...if lines have been cleared, we need to create a new intreval, because
      // the game level may have changed and we need to increase the speed
      if (clearedLines) {
        this.gameStatistic.clearedLines = clearedLines;
        this.view.drawScore();

        clearInterval(this.intervalId);
        this.setTimer();
      }

      this.game.spawnNewFigure();

      // If there is a collision after creating a new piece, then there
      // is nowhere to put the new pieces and the game is over
      if (this.game.checkCollision()) {
        clearInterval(this.intervalId);
        this.gameStatistic.status = Statuses.ended;
        this.view.drawModal("GAME OVER");
      }

      this.view.drawNextFigure(this.game.nextFigure.form);
    }
  }

  // The same conditions as the downward movement, only along the x-axis
  moveLeft() {
    const { x, y } = this.game.activeFigure.position;

    this.game.activeFigure.position = { x: x - 1, y };

    if (this.game.checkCollision()) {
      this.game.activeFigure.position = { x, y };
    }
  }

  // The same conditions as the downward movement, only along the x-axis
  moveRight() {
    const { x, y } = this.game.activeFigure.position;

    this.game.activeFigure.position = { x: x + 1, y };
    if (this.game.checkCollision()) {
      this.game.activeFigure.position = { x, y };
    }
  }

  // Rotate the figure using the transpose matrix function...
  rotate() {
    const previousForm = deepCloneArr(this.game.activeFigure.form);

    this.game.activeFigure.rotateFigure();

    //...if there is a collision, the rotation is impossible, return previous form
    if (this.game.checkCollision()) {
      this.game.activeFigure.form = previousForm;
    }
  }

  //Setting the interval based on the game level
  setTimer() {
    this.intervalId = setInterval(() => {
      this.moveDown();
      this.view.drawField(this.game.getCurrentFieldState());
    }, 1000 - this.gameStatistic.level * 100);
  }
}

new GameController();
