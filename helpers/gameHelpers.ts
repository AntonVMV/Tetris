import { FigureModels, FiguresTypes } from "../models/MainModel";

export const getRandomFigure = () => {
  const figures = Object.keys(FigureModels) as FiguresTypes[];
  const random = Math.floor(Math.random() * figures.length);
  return figures[random];
};
