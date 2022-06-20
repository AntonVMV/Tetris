export enum Statuses {
  playing,
  stopped,
  ended,
  none,
}

export interface IGameStatistic {
  status: Statuses;
  score: number;
  level: number;
  clearedLines: number;
  resetStatus: () => void;
}

export class GameStatistic implements IGameStatistic {
  status: Statuses = Statuses.none;
  private _score = 0;
  private _level = 1;
  private _clearedLines = 0;

  get clearedLines() {
    return this._clearedLines;
  }

  //Just doing the calculations, adding points, lines.
  set clearedLines(lines: number) {
    this._clearedLines += lines;
    this._score = this.score + lines * lines * 100;
    this._level = Math.floor(this._clearedLines / 10) + 1;
  }

  get score() {
    return this._score;
  }

  get level() {
    return this._level;
  }

  //Reset all status to default.
  resetStatus() {
    this._score = 0;
    this._level = 1;
    this._clearedLines = 0;
  }
}
