//Uploadovanje slika iz gif-a:
import { Draw } from "./draw";
import { Character } from "./character";
import { API_ROOT } from "../configuration";
import { Timer } from "./timer";
import { forEach } from "lodash";

const numOfRows = 29;
var row1 = document.querySelectorAll(".prvi td");
var row2 = document.querySelectorAll(".drugi td");
var row3 = document.querySelectorAll(".treci td");
var row4 = document.querySelectorAll(".cetvrti td");
var rows = [row1, row2, row3, row4];

export class Game {
  //Klasika konstruktor:
  constructor(gameId) {
    this.ctx = document.getElementById("game").getContext("2d");
    this.gameId = gameId;
    this.drawInstance = null;
    this.map = null;
    this.skull = null;
    this.players = [];
    this.tiger = [];
    this.stone = [];
    this.shouldDraw = true;
    this.firstRender = true;
    this.playerAttack = null;
    // this.turn=null;
  }

  //inicijalizacija igrice - poziva se iz index.js
  init() {
    // Povezivanje Draw i Game
    this.drawInstance = new Draw(this.ctx);

    jQuery(() => {
      $.ajax({
        url: `http://${API_ROOT}/game?gameId=${this.gameId}&password=salamala`,
        dataType: "json",
        success: (result) => {
          this.drawInstance = new Draw(this.ctx); // Isto kao i prva linija inita-a. Sa svakim zahtevom mi povezujemo game i Draw() klasu.
          var game = JSON.parse(result.gameState);
          //      var turn = JSON.parse(result.turn);
          var playerAttack = JSON.parse(result.playerAttack);
          // var attacks = JSON.parse(result.attacks);
          this.update(game, playerAttack); // this.update(game, turn, playerAttack);
          requestAnimationFrame(this.draw.bind(this)); // bind vraca funkciju draw klase game, a prosledjuje joj Game
        },
        error: (error) => {},
      });
    });
  }

  // Kupljenje podataka iz GameState-a:
  update(game, playerAttack) {
    //      update(game, turn, playerAttack) {

    //Kupimo mapu:
    this.map = game.map.tiles;
    // this.bossAction = game.boss.bossAction;
    this.attackedTiles = game.stone.attackedTiles;
    this.turn = new Timer(turn);
    this.playerAttack = playerAttack;
    // Ubacujemo igrace:
    const Player1 = game.player1;
    const Player2 = game.player2;
    const Player3 = game.player3;
    const Player4 = game.player4;
    if (this.players.length) {
      if (Player1 == null) {
        this.players[0] = null;
      } else this.players[0].updatePlayer(Player1, playerAttack);

      if (Player2 == null) {
        this.players[1] = null;
      } else this.players[1].updatePlayer(Player2, playerAttack);

      if (Player3 == null) {
        this.players[2] = null;
      }
      this.players[2].updatePlayer(Player3, playerAttack);

      if (Player4 == null) {
        this.players[3] = null;
      } else this.players[3].updatePlayer(Player4, playerAttack);
    } else {
      this.players = [
        new Character(this.ctx, Player1),
        new Character(this.ctx, Player2),
        new Character(this.ctx, Player3),
        new Character(this.ctx, Player4),
      ];
    }
    //scoreboard
    for (let i = 0; i < 4; i++) {
      let p = 0;
      let row = rows[i];
      switch (p) {
        case 0:
          row[p].innerHTML = game.scoreBoard.players[i].name;
          p++;
        case 1:
          row[p].innerHTML = game.scoreBoard.players[i].kills;
          p++;
        case 2:
          row[p].innerHTML = game.scoreBoard.players[i].deaths;
          p++;
        case 3:
          row[p].innerHTML = game.scoreBoard.players[i].kd;
          p++;
        case 4:
          row[p].innerHTML = game.scoreBoard.players[i].score;
          p = 0;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (game.scoreBoard.players[i].playerIdx == 1) {
        document.getElementById(`lt${i + 1}`).classList.add("visibility");
        if (i == 0) {
          document.getElementById(`lt${i + 2}`).classList.remove("visibility");
          document.getElementById(`lt${i + 3}`).classList.remove("visibility");
        }
        if (i == 1) {
          document.getElementById(`lt${i}`).classList.remove("visibility");
          document.getElementById(`lt${i + 2}`).classList.remove("visibility");
        }
        if (i == 2) {
          document.getElementById(`lt${i - 1}`).classList.remove("visibility");
          document.getElementById(`lt${i}`).classList.remove("visibility");
        }
      }
      if (game.scoreBoard.players[i].playerIdx == 2) {
        document.getElementById(`rt${i + 1}`).classList.add("visibility");
        if (i == 0) {
          document.getElementById(`rt${i + 2}`).classList.remove("visibility");
          document.getElementById(`rt${i + 3}`).classList.remove("visibility");
        }
        if (i == 1) {
          document.getElementById(`rt${i}`).classList.remove("visibility");
          document.getElementById(`rt${i + 2}`).classList.remove("visibility");
        }
        if (i == 2) {
          document.getElementById(`rt${i - 1}`).classList.remove("visibility");
          document.getElementById(`rt${i}`).classList.remove("visibility");
        }
      }
      if (game.scoreBoard.players[i].playerIdx == 3) {
        document.getElementById(`ld${i + 1}`).classList.add("visibility");
        if (i == 0) {
          document.getElementById(`ld${i + 2}`).classList.remove("visibility");
          document.getElementById(`ld${i + 3}`).classList.remove("visibility");
        }
        if (i == 1) {
          document.getElementById(`ld${i}`).classList.remove("visibility");
          document.getElementById(`ld${i + 2}`).classList.remove("visibility");
        }
        if (i == 2) {
          document.getElementById(`ld${i - 1}`).classList.remove("visibility");
          document.getElementById(`ld${i}`).classList.remove("visibility");
        }
      }
      if (game.scoreBoard.players[i].playerIdx == 4) {
        document.getElementById(`rd${i + 1}`).classList.add("visibility");
        if (i == 0) {
          document.getElementById(`rd${i + 2}`).classList.remove("visibility");
          document.getElementById(`rd${i + 3}`).classList.remove("visibility");
        }
        if (i == 1) {
          document.getElementById(`rd${i}`).classList.remove("visibility");
          document.getElementById(`rd${i + 2}`).classList.remove("visibility");
        }
        if (i == 2) {
          document.getElementById(`rd${i - 1}`).classList.remove("visibility");
          document.getElementById(`rd${i}`).classList.remove("visibility");
        }
      }
    }
    let fourthPlace = game.scoreBoard.players[3];
    if (fourthPlace.playerIdx == 1) {
      document.getElementById(`lt1`).classList.remove("visibility");
      document.getElementById(`lt2`).classList.remove("visibility");
      document.getElementById(`lt3`).classList.remove("visibility");
    }
    if (fourthPlace.playerIdx == 2) {
      document.getElementById(`rt1`).classList.remove("visibility");
      document.getElementById(`rt2`).classList.remove("visibility");
      document.getElementById(`rt3`).classList.remove("visibility");
    }
    if (fourthPlace.playerIdx == 3) {
      document.getElementById(`ld1`).classList.remove("visibility");
      document.getElementById(`ld2`).classList.remove("visibility");
      document.getElementById(`ld3`).classList.remove("visibility");
    }
    if (fourthPlace.playerIdx == 4) {
      document.getElementById(`rd1`).classList.remove("visibility");
      document.getElementById(`rd2`).classList.remove("visibility");
      document.getElementById(`rd3`).classList.remove("visibility");
    }
  }
  // Iscrtavanje svih elemenata:
  draw() {
    if (this.ctx === null) {
      return;
    }
    // Crtanje MapBase-a:

    this.drawInstance.drawMapFrame();

    // Crtanje tile-ova:
    drawTiles(this.map, this.drawInstance);

    // Crtanje lobanje:

    this.drawInstance.drawSkull();

    // Crtanje tigra-a:   **koliko ima tigrova (2)
    for (let i = 0; i < 2; i++) {
      if (this.tiger[i] != null) {
        this.drawInstance.drawRotatedTiger(this.tiger[i]);
      }
    }

    // Crtanje player-a:
    for (let i = 0; i < 4; i++) {
      if (this.players[i] != null) {
        this.drawInstance.drawRotatedPlayer(this.players[i]);
      }
    }

    // Crtanje tigra

    // for (let i = 0; i < 2; i++) {
    //   if (this.tiger[i] != null) {
    //     this.drawInstance.drawRotatedTiger(this.tiger[i]);
    //   }
    // }

    // Crtanje i napad kamena

    // this.attackedTiles.forEach((element) => {
    //   this.drawInstance.drawStoneAttack(element);
    // });

    for (let i = 0; i < 2; i++) {
      this.drawInstance.drawStone(this.stone[i]);
    }

    if (this.shouldDraw || this.firstRender)
      requestAnimationFrame(this.draw.bind(this));

    this.firstRender = false;
  }
}
// function isZoneOne(element) {
//   let max = Math.max(
//     Math.abs(element.q),
//     Math.max(Math.abs(element.r), Math.abs(-element.r - element.q))
//   );
//   return max < 5 && max >= 2;
// }
function drawTiles(map, drawInstance) {
  let cap = 15;
  let sgn = 1;
  for (let y = 0; y <= numOfRows; y++) {
    for (let x = 0; x < cap; x++) {
      drawInstance.drawTile(map[y][x]);
    }
    if (cap == 29) sgn = -1;
    cap = cap + sgn;
    if (sgn * cap == -14) break;
  }
}
