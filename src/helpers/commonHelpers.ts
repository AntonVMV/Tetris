export const deepCloneArr = <T>(arr: T): T => {
  const newArr = JSON.parse(JSON.stringify(arr));
  return newArr;
};

export const loop2dArray = <T>(
  arr: T[][],
  cb: (x: number, y: number) => void
) => {
  arr.forEach((row, y) => {
    row.forEach((_, x) => {
      cb(x, y);
    });
  });
};

export const transposeMatrix = <T>(arr: T[][]): T[][] => {
  const rotated: T[][] = [];

  for (let i = 0; i < arr.length; i++) {
    rotated.push([]);
    for (let k = arr.length - 1; k >= 0; k--) {
      rotated[i].push(arr[k][i]);
    }
  }

  return rotated;
};
