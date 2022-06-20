import { loop2dArray } from "../helpers/commonHelpers";
import { colors, FIELD_WIDTH, FIELD_HEIGHT } from "../models/MainModel";
import { IGameStatistic } from "./GameStatus";

export interface IView {
  fieldElements: HTMLElement[];
  status: IGameStatistic;
  drawField: (arr: number[][]) => void;
  drawScore: () => void;
  drawNextFigure: (figure: number[][]) => void;
  drawModal: (text: string) => void;
}

export class View implements IView {
  fieldElements: HTMLElement[] = [];
  score: HTMLElement = document.getElementById("score")!;
  lines: HTMLElement = document.getElementById("lines")!;
  level: HTMLElement = document.getElementById("level")!;
  nextFigure = document.getElementById("next-figure")!;

  constructor(
    arr: number[][],
    container: HTMLElement,
    public status: IGameStatistic
  ) {
    container.style.setProperty("--grid-w-size", `${FIELD_WIDTH}`);
    container.style.setProperty("--grid-h-size", `${FIELD_HEIGHT}`);

    //Create an array of html elements according to the obtained array of the current
    //play field state and place them in the dom.
    loop2dArray(arr, () => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      this.fieldElements.push(cell);
      container.appendChild(cell);
    });

    this.drawScore();
  }

  //Loop through the array of the playing field and change the colors of the html elements appropriate to the array elements.
  //If the array element is 0, we apply the standard color. Also add/remove class 'filled'
  drawField(arr: number[][]) {
    loop2dArray(arr, (i, k) => {
      if (arr[k][i]) {
        this.fieldElements[k * FIELD_WIDTH + i].style.backgroundColor =
          colors[arr[k][i]];
        this.fieldElements[k * FIELD_WIDTH + i].classList.add("filled");
      } else {
        this.fieldElements[k * FIELD_WIDTH + i].style.backgroundColor =
          "rgba(201, 201, 255, 0.8)";
        this.fieldElements[k * FIELD_WIDTH + i].classList.remove("filled");
      }
    });
  }

  //Render game status
  drawScore() {
    this.lines.innerText = this.status.clearedLines.toString();
    this.level.innerText = this.status.level.toString();
    this.score.innerText = this.status.score.toString();
  }

  //Render next figure
  drawNextFigure(figure: number[][]) {
    this.nextFigure.style.setProperty("--grid-s-size", `${figure[0].length}`);
    this.nextFigure.innerHTML = "";

    loop2dArray(figure, (x, y) => {
      const element = document.createElement("div");
      element.classList.add("cell_s");
      element.style.backgroundColor = colors[figure[y][x]];
      if (figure[y][x]) {
        element.classList.add("filled");
      }
      this.nextFigure.appendChild(element);
    });
  }

  drawModal(text: string) {
    const modal = document.getElementById("modal")!;
    const modalInfo = document.querySelector(".modal-info")! as HTMLElement;

    if (text) {
      modal.classList.add("visible");
      modalInfo.innerText = text;
    } else {
      modal.classList.remove("visible");
    }
  }
}
