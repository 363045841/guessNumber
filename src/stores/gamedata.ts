import { defineStore } from "pinia";

interface GameData {
  numberChoose: number | null;
  randomNumber: number | null;
  isSubmit: boolean;
  isWin: boolean;
  alertRightShow: boolean;
  alertErrorShow: boolean;
}

export const useGameData = defineStore("windowShow", {
  state: (): GameData => ({
    randomNumber: Math.floor(Math.random() * 100),
    numberChoose: null,
    isSubmit: false,
    isWin: false,
    alertErrorShow: false,
    alertRightShow: false,
  }),
  getters: {
  },
  actions: {
    submitNumber(){
      this.isWin = Number(this.numberChoose) === this.randomNumber;
      this.alertErrorShow = this.isWin === false;
      this.alertRightShow = this.isWin === true;
      this.isSubmit = true;
      setTimeout(() => {
        this.isSubmit = false;
      }, 2000);
    }
  }
});