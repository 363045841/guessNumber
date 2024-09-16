import { defineStore } from "pinia";

interface GameData {
  numberChoose: number | null;
  randomNumber: number | null;
  isSubmit: boolean;
}

export const useGameData = defineStore("windowShow", {
  state: (): GameData => ({
    randomNumber: Math.floor(Math.random() * 100),
    numberChoose: null,
    isSubmit: false
  }),
  getters: {
    isWin(state): boolean {
      // state 是隐式传递给 getters 的
      return Number(state.numberChoose) === state.randomNumber;
    },
    alertRightShow(state): boolean {
      if (state.isSubmit) {
        setTimeout(() => {
          this.isSubmit = false;
        }, 2000);
        return this.isWin === true;
      }
      return this.isWin === true;
    },
    alertErrorShow(state): boolean {
      if (state.isSubmit) {
        setTimeout(() => {
          this.isSubmit = false;
        }, 2000);
        return this.isWin === false;
      }
      return this.isWin === false;
    }
  }
});