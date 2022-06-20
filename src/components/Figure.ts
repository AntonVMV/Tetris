import { FigureModels, FiguresTypes } from "../models/MainModel";
import { transposeMatrix } from "../helpers/commonHelpers";
import { FIELD_WIDTH } from "../models/MainModel";

export interface IPosition {
  x: number;
  y: number;
}

export interface IFigure {
  position: IPosition;
  form: number[][];
  rotateFigure: () => void;
}

export class Figure implements IFigure {
  private _position: IPosition;
  public form: number[][];

  constructor(key: FiguresTypes) {
    this.form = FigureModels[key];

    //Find center of the gamefield, so figure will arears there
    const fieldCenter =
      Math.floor(FIELD_WIDTH / 2) - Math.floor(this.form[0].length / 2);

    this.position = { x: fieldCenter, y: 0 };
  }

  get position() {
    return this._position;
  }

  set position(position: IPosition) {
    this._position = position;
  }

  //Rotate figure matrix
  rotateFigure() {
    this.form = transposeMatrix(this.form);
  }
}
