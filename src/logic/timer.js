export class TurnCountdown{

    constructor(turn, skullWIn){

      this.updateCountdown(turn);
      this.updateSkullWin(skullWIn);
    }
    
    updateCountdown(turn){
      let countdownEl = document.getElementById('countdown'); 
      countdownEl.innerHTML = `${turn}`;

      if(turn == 0){
        popup.classList.add("open-popup");
      }
    }

    updateSkullWin(skullWIn) {
      if(skullWIn) {
        popup.classList.add("open-popup");
      }
    }

}

let popup = document.getElementById("popup"); 

addEventListener("keydown", e=>{
  if(e.code == "KeyW"){
    popup.classList.add("open-popup");
  }
})
addEventListener("keyup", e=>{
  if(e.code == "KeyW"){
  popup.classList.remove("open-popup");
  }
})

let canvas = document.getElementById("game");

let counter=1;
addEventListener("keypress", e=>{
  if(e.code == "KeyZ" && counter%2 ==1){
    canvas.classList.add("full-screen")
    counter++;
  }
  else{
    canvas.classList.remove("full-screen")
    counter++;
  }
})