import { defineStore } from "pinia";

interface GameData {
  numberChoose: number | null;
  randomNumber: number | null;
  isSubmit: boolean;
  isWin: boolean;
  alertRightShow: boolean;
  alertErrorShow: boolean;
  restoreText: string;
  restoreShow: boolean;
}

export const useGameData = defineStore("windowShow", {
  state: (): GameData => ({
    randomNumber: null,
    numberChoose: null,
    isSubmit: false,
    isWin: false,
    alertErrorShow: false,
    alertRightShow: false,
    restoreText: '',
    restoreShow: false
  }),
  getters: {
  },
  actions: {
    generateRandomNumber(): number{
      let randomNumGen = Math.floor(Math.random() * 100);
      localStorage.setItem('randomNumber',String(randomNumGen))
      return randomNumGen
    },
    submitNumber(){
      this.isWin = Number(this.numberChoose) === this.randomNumber;
      this.alertErrorShow = this.isWin === false;
      this.alertRightShow = this.isWin === true;
      this.isSubmit = true;
      setTimeout(() => {
        this.isSubmit = false;
      }, 2000);
    },
    initRandomNumber(){
      const randomNumber = localStorage.getItem('randomNumber');
      console.log('randomNumber', randomNumber);
      if(randomNumber !== null){
        console.log('restore from storge', randomNumber);
        this.randomNumber = Number(randomNumber);
        this.restoreText = '数据已从本地存储中恢复:' + randomNumber;
        this.restoreShow = true;
        setTimeout(() => {
          this.restoreShow = false;
        }, 2000);
      }else{
        this.randomNumber = this.generateRandomNumber();
        localStorage.setItem('randomNumber',String(this.randomNumber));
        console.log('randomNumber create', this.randomNumber);
      }
    }
  }
});