import qs from 'qs';
// import { Game } from "./logic/game"; 
import { WebsocketHandler } from  "./socket/ws"; //  ovo sa serverom komunicira
import { API_ROOT } from './configuration'; // lokalno 

console.log("pokrenut index.js");
// const url = "http://localhost:8081/game?gameId=1&password=salamala";

const queryArgs = qs.parse( //parsira argumente iz urla
  window.location.search.substring(1)  //vraca ? i query deo URL-a (?gameId=1)
)
// const queryArgs = qs.parse(url);
console.log("parsiran qs");
console.log(queryArgs);

const gameId = queryArgs.gameId;
// const gameId = 0;
console.log(gameId);

if (gameId) {  
  //audioLoading.pause();
  console.info(`Connecting to game ${ gameId }`);
  const game = new Game(gameId);

  console.log(game);
  
  game.init();
  
  new WebsocketHandler(`ws://${API_ROOT}/streaming?gameId=${gameId}&password=salamala`, game); // 
	//console.log(game);

}

