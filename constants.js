export const GAME = document.querySelector(".game");
export const ALERT = document.querySelector(".alert");
export const CHOOSER = document.querySelector(".chooser");
export const MESSAGE = document.querySelector(".message");
export const X = document.getElementById("X");
export const O = document.getElementById("O");
export const RESTART = document.getElementById("play-again");

export const WIN_SCENARIO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
