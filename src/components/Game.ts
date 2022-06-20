import { IBoard, Board } from "./Board";
import { IFigure, Figure } from "./Figure";
import { deepCloneArr, loop2dArray } from "../helpers/commonHelpers";
import { getRandomFigure } from "../helpers/gameHelpers";

export interface IGame {
  board: IBoard;
  activeFigure: IFigure;
  nextFigure: IFigure;

  getCurrentFieldState: () => number[][];
  spawnNewFigure: () => void;
  checkCollision: () => boolean;
}

export class Game implements IGame {
  board: IBoard;
  activeFigure: IFigure;
  nextFigure: IFigure;

  constructor() {
    this.board = new Board();
    this.nextFigure = new Figure(getRandomFigure());
  }

  //Create a new figure object.
  spawnNewFigure() {
    this.activeFigure = this.nextFigure;
    this.nextFigure = new Figure(getRandomFigure());
  }

  //Returns a clone of the game field with an active figure placed on it. If each time we moves a piece,
  //we put it on the game board, then the next time we move it we have to clear the previous position,
  //so returning a clone looks little simplier.
  getCurrentFieldState() {
    const field = deepCloneArr(this.board.boardState);
    const { form, position } = this.activeFigure;

    //Just lopp through gamefiled array and place active figure
    loop2dArray(form, (x, y) => {
      if (form[y][x]) {
        field[y + position.y][x + position.x] = form[y][x];
      }
    });

    return field;
  }

  //Check collision with walls and figures allready placed on the game field.
  checkCollision = () => {
    const { form, position } = this.activeFigure;
    const { boardState } = this.board;

    let isCollision: boolean = false;

    //Check active figure array. The array element must be greater than 0,
    //at the same time the array element of the board with the same coordinates must not be
    //undefined (outside the field) and must not be greater than 0 (so there is already a piece there).
    //Otherwise we return true, it means that there was a collision
    loop2dArray(form, (i, k) => {
      if (
        form[i][k] &&
        //...again check if row exist, so we don't get an error when we access row[index].
        (boardState[i + position.y] === undefined ||
          boardState[i + position.y][k + position.x] === undefined ||
          boardState[i + position.y][k + position.x])
      ) {
        isCollision = true;
        return;
      }
    });

    return isCollision;
  };
}
