import { IFigure } from "./Figure";
import { loop2dArray } from "../helpers/commonHelpers";
import { FIELD_HEIGHT, FIELD_WIDTH } from "../models/MainModel";

export interface IBoard {
  boardState: number[][];
  createField: () => void;
  setFigureToBoard: (figure: IFigure) => void;
  clearLines: () => number;
}

export class Board implements IBoard {
  boardState: number[][] = [];

  constructor() {
    this.createField();
  }

  //Create a new clear gamefiled
  createField() {
    const field: number[][] = [];

    for (let i = 0; i < FIELD_HEIGHT; i++) {
      field.push(new Array(FIELD_WIDTH).fill(0));
    }

    this.boardState = field;
  }

  //Copy figure array to active bord array, so this figure places on the board permanently
  setFigureToBoard = (figure: IFigure) => {
    const { form, position } = figure;

    //Loop through the figure array and just copy it values to board array
    loop2dArray(form, (i, k) => {
      //Check if row exist, so we don't get an error when we access row[index].
      if (this.boardState[i + position.y]) {
        //Check if figure element is greater than 0, therefore we only wants to replace 0's in board array.
        if (figure.form[i][k]) {
          this.boardState[i + position.y][k + position.x] = form[i][k];
        }
      }
    });
  };

  //Clear lines in the board array if all row is filled by figures blocks.
  clearLines = () => {
    //Deleting rows right in the for loop causes an errors, so
    //we creating array to store indexes of rows we wants to clear,
    //and clear it after loops are finished
    const linesToDelete: number[] = [];

    //Loop from the bottom of the gamefield
    for (let i = this.boardState.length - 1; i >= 0; i--) {
      //Variable to store how many cell in row are filled...
      let filledCellsInRow: number = 0;
      for (let k = 0; k < this.boardState[i].length; k++) {
        if (this.boardState[i][k]) {
          filledCellsInRow++;
        }
      }
      //... and if all cells in current row are 0 (not filled), there no reference to check higher...
      if (filledCellsInRow === 0) {
        break;
      }

      //...if filled cells count in current row equals the row length, it means that this row is fully filled
      //and must to be cleared, so we place it to an array.
      if (filledCellsInRow === this.boardState[i].length) {
        linesToDelete.unshift(i);
      }
    }

    //Clear all rows that were in the array, and places same count of clear rows to an gamefield array.
    for (const item of linesToDelete) {
      this.boardState.splice(item, 1);
      this.boardState.unshift(new Array(FIELD_WIDTH).fill(0));
    }

    //Return deleted rows count, so it come in handy in statistics
    return linesToDelete.length;
  };
}
