export const FIELD_WIDTH = 10;
export const FIELD_HEIGHT = 20;

export const FigureModels = {
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],

  J: [
    [0, 2, 0],
    [0, 2, 0],
    [2, 2, 0],
  ],

  S: [
    [0, 3, 3],
    [3, 3, 0],
    [0, 0, 0],
  ],

  Z: [
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0],
  ],

  I: [
    [0, 5, 0, 0],
    [0, 5, 0, 0],
    [0, 5, 0, 0],
    [0, 5, 0, 0],
  ],

  O: [
    [6, 6],
    [6, 6],
  ],

  T: [
    [7, 7, 7],
    [0, 7, 0],
    [0, 0, 0],
  ],
};

export const colors: Record<number, string> = {
  1: "#f49b00",
  2: "#0000ff",
  3: "#08b014",
  4: "#cc1616",
  5: "#00f4f0",
  6: "#f0f000",
  7: "#800080",
};

export type FiguresTypes = keyof typeof FigureModels;
