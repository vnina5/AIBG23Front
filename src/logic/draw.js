//Uploadovanje slika iz gif-a:

// TODO: dodati slike u gif folder (ili drugi pa izmeniti putanju)
import PlayersURL from "../../gif/Players.png";
// import MapBaseURL from "../../gif/MapBase.png";
// import FullTileEntitiesURL from "../../gif/Tiles.png";

import Players1URL from "../../gif/Player1/PlayerIdle1.png";
import Players2URL from "../../gif/Player2/PlayerIdle2.png";
import Players3URL from "../../gif/Player3/PlayerIdle3.png";
import Players4URL from "../../gif/Player4/PlayerIdleR4.png";


import MapFrameURL from "../../gif/mapFrame.png";
import TileBorderURL from "../../gif/tileBorder.png"

// import WhiteSwordURL from "./whiteSword.png";
import WhiteSwordURL from "../../gif/whiteSword.png";
import WhiteWhipURL from "../../gif/whiteWhip.png";
import WhitePlayerURL from "../../gif/whiteWalk.png";

import BlackSwordURL from "../../gif/blackSword.png";
import BlackWhipURL from "../../gif/BlackWhip.png";
import BlackPlayerURL from "../../gif/BlackWalk.png";

import PurpleSwordURL from "../../gif/purpleSword.png";
import PurpleWhipURL from "../../gif/purpleWhip.png";
import PurplePlayerURL from "../../gif/purpleWalk.png";

import BlueSwordURL from "../../gif/blueSword.png";
import BlueWhipURL from "../../gif/blueWhip.png";
import BluePlayerURL from "../../gif/blueWalk.png";

import RipURL from "../../gif/rip.png";

import allURL from "../../gif/all.png";

import Tiger1URL from "../../gif/tiger1.png";
import Tiger2URL from "../../gif/tiger2.png";
// import TigerURL from "../../gif/tiger.png";

import StoneURL from "../../gif/stone.svg";

import Fire1URL from "../../gif/fire1.png";
import Fire2URL from "../../gif/fire2.png";

import SkullURL from "../../gif/skull.png";

// probati closedChest closedChest2 closedChest3
import ClosedChestURL from "../../gif/closedChest.png";
import OpenedChestURL from "../../gif/openedChest.png";

import CLiffURL from "../../gif/cliff.svg";


// Slike =====================================================================================
let players1 = new Image();	
let players2 = new Image();	
let players3 = new Image();	
let players4 = new Image();	

players1.src = Players1URL;
players2.src = Players2URL;
players3.src = Players3URL;
players4.src = Players4URL;

let mapFrame = new Image(); mapFrame.src = MapFrameURL;
let tileBorder = new Image(); tileBorder.src = TileBorderURL;

let whiteSword = new Image(); whiteSword.src = WhiteSwordURL;
let whiteWhip = new Image(); whiteWhip.src = WhiteWhipURL;
let whitePlayer = new Image(); whitePlayer.src = WhitePlayerURL;

let blackSword = new Image(); blackSword.src = BlackSwordURL;
let blackWhip = new Image(); blackWhip.src = BlackWhipURL;
let blackPlayer = new Image(); blackPlayer.src = BlackPlayerURL;

let purpleSword = new Image(); purpleSword.src = PurpleSwordURL;
let purpleWhip = new Image(); purpleWhip.src = PurpleWhipURL;
let purplePlayer = new Image(); purplePlayer.src = PurplePlayerURL;

let blueSword = new Image(); blueSword.src = BlueSwordURL;
let blueWhip = new Image(); blueWhip.src = BlueWhipURL;
let bluePlayer = new Image(); bluePlayer.src = BluePlayerURL;

let ripImage = new Image(); ripImage.src = RipURL;

let all = new Image(); all.src = allURL;
let skull = new Image(); skull.src = SkullURL;
let tiger1 = new Image(); tiger1.src = Tiger1URL;
let tiger2 = new Image(); tiger2.src = Tiger2URL;
let stone = new Image(); stone.src = StoneURL;
let fire1 = new Image(); fire1.src = Fire1URL;
//let fire2 = new Image(); fire2.src = Fire2URL;

let closedChest = new Image(); closedChest.src = ClosedChestURL;
let openedChest = new Image(); openedChest.src = OpenedChestURL;

let cliff = new Image(); cliff.src = CLiffURL;

// Dimenzije za Tajlove =====================================================================================
const numOfRows = 29;
const dTileW = 44;  // Skraceno od  - Destination Tile Width - Sirina tile-a na canvasu
const dTileH = 44;  // Skraceno od  - Destination Tile Height - Visina tile-a na canvasu
const sTileW =  44; // Skraceno od  - Source Tile Width - Sirinu koju uzima od izvorne slike
const sTileH =  44; // Skraceno od  - Source Tile Height - Visinu koju uzima od izvorne slike
const sPlayerW = 44; 
const sPlayerH = 44;

var angle = 0; // rotacija entiteta
var angle1 =0; // rotacija pozadine mape;
var helper = true;
var i=44;

// Tipovi entitija: =====================================================================================
// FULL - TREES, CHEST, TIGER, CLIFF, STONE
// NORMAL - NONE, LEAVES, SKULL

// TODO: na osnovu slike izmeniti indekse, videti koliko faza drveca ima
// iz slike Tiles.png (iz FullTileEntities)
const allI = { // uzima delovi 1, drugi red kako to zna pitate se? ctrl f = 
    STUMPTREE : { index: 0 }, // udareno 2 puta
	HALFTREE : { index: 1 },  // udareno 1 put
	FULLTREE : { index: 2 },    // nije udareno
	STONE : { index: 3 },
	LEAVES : { index: 4 },
	CLIFF : { index: 5 },
};
// TODO: NEDOSTAJE NAM CLIF SLIKA

// const chestI = {
// 	purple : { index: 0 },
// 	white : { index: 1 },
// 	black : { index: 2 },
// 	blue : { index: 3 },
// };

const playerI = {
	stand : { index: 0 },
	move1 : { index: 1 },
	move2 : { index: 2 },
	attacked : { index: 3 },
	dead : { index: 4 },
};
const swordI = {
	one: { index: 0 },
	two: { index: 1 },
};

const tigerI = {
	one: { index: 0 },
	two: { index: 1 },
};

export class Draw {
    //Klasika konstruktor:
    constructor(ctx) {
        window.ctx = ctx;
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ PLAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // TODO: isplanirati kako ce se iscrtavati, okretati levo desno, animacija udaranja, itd

	// proveriti da li ide levo ili desno i kojom nogom?
	// proveriti da li ima bic ili mac i na osnovu toga birati crteze
	// bez rotacija i translacija

    // TODO: implementirati promene, za pocetak sam samo kopirala
	// napad ovde
	drawRotatedPlayer(player) {
		if(player.moved == false){
			this.movePlayer(player);
		}else{
			ctx.save();
		ctx.translate(player.x + 22, player.y + 22);
		ctx.rotate(player.angle * Math.PI / 180);
	
		let currentPlayerImage;
		switch (player.index + 1) {
			case 1:
				currentPlayerImage = players1;
				break;
			case 2:
				currentPlayerImage = players2;
				break;
			case 3:
				currentPlayerImage = players3;
				break;
			case 4:
				currentPlayerImage = players4;
				break;
			default:
				currentPlayerImage = players1; // Set a default image
				break;
		}
	
		// Check the direction the player is facing
		if (player.directionR) {
			// Draw the image normally (no flipping) if facing right
			ctx.drawImage(
				currentPlayerImage,
				-10,
				-22,
				20,
				44
			);
		} else {
			// Flip the image horizontally using scale if facing left
			ctx.scale(-1, 1);
			ctx.drawImage(
				currentPlayerImage,
				-10,
				-22,
				20,
				44
			);
		}
	
		ctx.restore();
		}

		
	}
   /* drawRotatedPlayer(player){
        
		if(false){
			this.rotatePlayer(player);
		}		
		else if(player.moved == false){
			this.movePlayer(player);
		} else{
			
			ctx.save();
			ctx.translate(player.x+22,player.y+22);
			ctx.rotate(player.angle*Math.PI/180);
			
			let currentPlayerImage;
			switch (player.index+1) {
                case 1:
                    currentPlayerImage = players1;
                    break;
                case 2:
                    currentPlayerImage = players2;
                    break;
                case 3:
                    currentPlayerImage = players3;
                    break;
                case 4:
                    currentPlayerImage = players4;
                    break;
                default:
                    currentPlayerImage = players1; // Set a default image
                    break;
            }
			ctx.drawImage(
				currentPlayerImage,		// what image
				///*sPlayerW, //source image start crop
				0,				// source image start crop
				sPlayerW,		//source image width crop
				sPlayerW,       // source image 
				-10,
				-22,
				20,
				44
			)		
			ctx.restore();	

		}
    }*/

    rotatePlayer(player){
        ctx.save();
		ctx.translate(player.prevX+22,player.prevY+22);
			ctx.rotate(player.difAngle*Math.PI/180);
			ctx.drawImage(
				players,		// what image
				sPlayerW*player.index, //source image start crop
				0,				// source image start crop
				sPlayerW,		//source image width crop
				sPlayerW,       // source image 
				-22,
				-22,
				44,
				44
			)
		ctx.restore();
		calculateAngle(player);
    }

    movePlayer(player){
        ctx.save();
		ctx.translate(player.x - player.difX+22, player.y - player.difY+22);
			ctx.rotate(player.angle*Math.PI/180);
			let currentPlayerImage;
			switch (player.index+1) {
                case 1:
                    currentPlayerImage = players1;
                    break;
                case 2:
                    currentPlayerImage = players2;
                    break;
                case 3:
                    currentPlayerImage = players3;
                    break;
                case 4:
                    currentPlayerImage = players4;
                    break;
                default:
                    currentPlayerImage = players1; // Set a default image
                    break;
            }
			// Check the direction the player is facing
		if (player.directionR) {
			// Draw the image normally (no flipping) if facing right
			ctx.drawImage(
				currentPlayerImage,
				-10,
				-22,
				20,
				44
			);
		} else {
			// Flip the image horizontally using scale if facing left
			ctx.scale(-1, 1);
			ctx.drawImage(
				currentPlayerImage,
				-10,
				-22,
				20,
				44
			);
		}
		
		ctx.restore();	
		//calculateDifXY(player);
    }

	// async function drawRipPlayer(player){
	// 	ctx.drawImage(ripImage, player.x, player.y);
	// 	await new Promise(resolve => setTimeout(resolve, 3000));
	// 	ctx.clearRect(player.x, player.y, ripImage.width, ripImage.height);
	// }


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ TIGER ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // TODO: kako ce se iscrtavati, okretati levo desno, animacija udaranja, itd

    // isto kao i player
    drawRotatedTiger(tiger){
		 
		if(tiger.rotated == false){
			this.rotateTiger(tiger);
		}		
		else if(tiger.moved == false){
			this.moveTiger(tiger);
		} else{
			ctx.save();
			ctx.translate(tiger.x+22,tiger.y+22);
			ctx.rotate(tiger.angle*Math.PI/180);
			ctx.drawImage(
				tiger1,		// what image
				0, //source image start crop				// proveriti
				0,				// source image start crop
				stigerW,		//source image width crop
				stigerW,       // source image 
				-22,
				-22,
				44,
				44
			)		
			ctx.restore();	
		}
    }

    rotateTiger(tiger){
		ctx.save();
		ctx.translate(tiger.prevX+22,tiger.prevY+22);
			ctx.rotate(tiger.difAngle*Math.PI/180);
			ctx.drawImage(
				tiger1,		// what image
				0, //source image start crop		// proveriti
				0,				// source image start crop
				stigerW,		//source image width crop
				stigerW,       // source image 
				-22,
				-22,
				44,
				44
			)
		ctx.restore();
		calculateAngle(tiger);
    }

    moveTiger(tiger){
		ctx.save();
		ctx.translate(tiger.x - tiger.difX+22, tiger.y - tiger.difY+22);
			ctx.rotate(tiger.angle*Math.PI/180);
			ctx.drawImage(
				tiger2,		// what image
				0, //source image start crop		// proveriti
				0,				// source image start crop
				stigerW,		//source image width crop
				stigerW,       // source image 
				-22,
				-22,
				44,
				44
			)
		
		ctx.restore();	
		calculateDifXY(tiger);
    }
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAP ~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// deleted drawMapBase()

    // TODO: proveriti polozaj
	drawMapFrame(){
    	// Clear the entire canvas
   	 	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.drawImage(
			mapFrame,
			-4,
			-6
		)
		ctx.drawImage(
			mapFrame,
			-4,
			-6
		)
		ctx.drawImage(
			mapFrame,
			-4,
			-6
		)

	}

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ SKULL ~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // TODO: proveriti polozaj
	// Iscrtavanje lobanje:
	drawSkull(){
		var [x,y] = convertCoordinates(0, 0);

		ctx.drawImage(
			skull,
			x,
			y,
			44,
			44
			// 492,
			// 429
		)
	}


    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ TILES ~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// FULL - TREES, CHEST, TIGER, CLIFF, STONE
    // NORMAL - NONE, LEAVES, SKULL

    // Opsta funkcija:
	drawTile(tile) {
		var [x,y] = convertCoordinates(tile.r, tile.q);
		let entity = tile.entity;
		var entityType;

        // crtamo sve osim praznih, lobanja, tigrova
        if(!(entity.type === 'NONE' || entity.type === 'SKULL' || entity.type === 'TIGER')){	

            // prilagodjavanje crtanju drveca	
            if(entity.type === 'TREES'){
				this.drawTileBorder(x,y);	

                if(entity.health > 300){
					entityType = allI['FULLTREE'];
                }
                if(entity.health > 150 && entity.health <= 300){
                    entityType = allI['HALFTREE'];
                }
                if(entity.health <= 150 ){
                    entityType = allI['STUMPTREE'];
                }
            }
			else if(entity.type === 'CHEST'){
				this.drawChest(x,y,entity);
				this.drawTileBorder(x,y);	
				return;
			} 
			else entityType = allI[entity.type];
			
            this.drawEntity(x, y, entityType.index);	
		}
		
        this.drawTileBorder(x,y);	
	}

    // za vezbu okvir tajla:
	drawTileBorder(x,y){
        ctx.drawImage(
            tileBorder, 
            x, 
            y
        );
    }

    // Ako ima entity poziva ovo:
	drawEntity(x, y, allI){
		// ctx.save();
		// ctx.translate(x+22,y+22);           // centriramo: 22 je pola sirine i visine tile-a
		ctx.drawImage(
        	all,
        	sTileW * allI,     // prosledjuje se allI['nesto']
			0, 
			sTileW, 
			sTileH,
        	x, // -22?
        	y, // -22?
        	dTileW, 
        	dTileH
    	);
		// ctx.restore();
  	}
	  
	// 4 pa 2
	drawBrigde(r, q){
		var [x,y] = convertCoordinates(r, q);
		ctx.drawImage(
			bridge,
			x,
			y
		)
	}

	drawChest(x,y,entity){
		if(entity.taken == false){
			ctx.drawImage(
				closedChest,
				sTileW * entity.idx,	 
				0,						
				sTileW,
				sTileH,    
				x,
				y,
				dTileW,
				dTileH
			)
		} else{
			ctx.drawImage(
				openedChest,
				sTileW * entity.idx,	 
				0,						
				sTileW,
				sTileH,    
				x,
				y,
				dTileW,
				dTileH
			)
		}
	}

	  
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ ATTACKS ~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // izmeniti?
	// napraviti da pocrveni igrac i napraviti vatrice
    drawAttackedTile(r,q){
		var [x,y] = convertCoordinates(r, q);
		
		//console.log(x,y);
		ctx.drawImage(
        	fire1,
        	0,
			44,
			44,
			44,
			x,
			y,
			44,
			44
    	); 
	}

    // proslogodisnji kod za laser, mozda ce posluziti
    drawWhipAttack(player){
        // if(player.rotated == true){
		// 	if(player.laserDrawn == false){
		// 		ctx.beginPath();
		// 		ctx.strokeStyle = "orange";
		// 		ctx.lineWidth = 1;
		// 		ctx.moveTo(player.x +22,player.y +22);
		// 		ctx.lineTo(player.attackedX + 22 - player.difLaserX, player.attackedY + 22 - player.difLaserY);
		// 		ctx.stroke();
		// 		calculateDifLaserXY(player);
		// 	} else{
		// 		ctx.beginPath();
		// 		ctx.strokeStyle = "orange";
		// 		ctx.lineWidth = 1;
		// 		ctx.moveTo(player.x +22,player.y +22);
		// 		ctx.lineTo(player.attackedX + 22, player.attackedY + 22);
		// 		ctx.stroke();
		// 		calculateDifLaserXY(player);
		// 	}
		// 	if(player.laserDrawn == true)
		// 		this.drawAttackedTile(player.attackedR, player.attackedQ);
		// }	
    }

    // Saber (sta god, mac ili sablja refaktorisati po potrebi)
    drawSwordAttack(player){
    }

    drawTigerAttack(tiger){
    }

    // proslo godisnji kod za bossa, mozda ce posluziti
    // proslediti koordinate napada?
    drawStoneAttack(stone){
		length = stone.attackedTiles.size()
		for (i = 0; i < length; i++){
			this.drawAttackedTile(stone.attackedTiles[i]);
		}
		// attackedTiles
		// var [endX, endY] = convertCoordinates(endR, endQ);	
        // ctx.beginPath();
		// ctx.strokeStyle = "red";
		// ctx.lineWidth = 3;
		// ctx.moveTo(550,535);
		// ctx.lineTo(endX + 22, endY + 22);
		// ctx.stroke();
    }

	drawFire(r,q){
		// var [x,y] = convertCoordinates(tile.r, tile.q);
		ctx.drawImage(
			fire1,
			x,
			y
		)
	}

	// drawStone(stoneTile){
	// 	var [x,y] = convertCoordinates(0, -8);
	// 	ctx.drawImage(
	// 		stone,
	// 		x,
	// 		y,
	// 		44,
	// 		44
	// 	)
	// }
}

// POMOCNE FUNKCIJE =====================================================================================

// TODO: proveriti da li je ovo ok na nasem
function convertCoordinates(r, q){
	let x = 266 + (14+r)*19 + q*38;
	let y = (14 + r)*33;
	return [x,y];
}


// ~~~~~~~~~~~~~~ za sad neiskorisceno, posluzice ~~~~~~~~~~~~~~
function calculateAngle(player){
	if(Math.abs(player.angle - player.difAngle) > 2){
		var speed = 3;
		if(player.difAngle>=269 && player.angle<=91) {
			if(player.difAngle>360) {
				player.difAngle=player.difAngle-360;
			}
			player.difAngle = player.difAngle + speed;
			return;
		}
		if(player.angle>=269 && player.difAngle<=91) {
			if(player.difAngle<0) {
				player.difAngle=360+player.difAngle;
			}
			player.difAngle = player.difAngle - speed;
			return;
		}		
		if(player.angle > player.difAngle){
			player.difAngle = player.difAngle + speed;
			
		} else player.difAngle = player.difAngle - speed;
	} else player.rotated = true;
}

function calculateDifXY(player){
	var speed = 1;

	if(player.difX > 0){
		if(player.coefXY <1){
			player.difX = player.difX- player.coefXY*speed;
		} else player.difX = player.difX- speed;
	}
	if(player.difX < 0){
		if(player.coefXY <1){
			player.difX = player.difX +  player.coefXY*speed;
		} else player.difX = player.difX +  speed;
	}
	if(player.difY > 0 ){
		if(player.coefXY >1){
			player.difY = player.difY - player.coefXY*speed;
		} else player.difY = player.difY - speed;
		
	}
	if(player.difY < 0){
		if(player.coefXY >1){
			player.difY = player.difY + player.coefXY*speed;
		} else player.difY = player.difY + speed;
	}

	if(player.difX == 0 && player.difY == 0){
		player.moved = true;
	}
}

function calculateDifLaserXY(player){
	var speed = 8;

	if(player.difLaserX > 0){
		if(player.coefLaser <1){
			player.difLaserX = player.difLaserX- player.coefLaser*speed;
		} else player.difLaserX = player.difLaserX- speed;
	}
	if(player.difLaserX < 0){
		if(player.coefLaser <1){
			player.difLaserX = player.difLaserX +  player.coefLaser*speed;
		} else player.difLaserX = player.difLaserX +  speed;
	}
	if(player.difLaserY > 0 ){
		if(player.coefLaser >1){
			player.difLaserY = player.difLaserY - player.coefLaser*speed;
		} else player.difLaserY = player.difLaserY - speed;
		
	}
	if(player.difLaserY < 0){
		if(player.coefLaser >1){
			player.difLaserY = player.difLaserY + player.coefLaser*speed;
		} else player.difLaserY = player.difLaserY + speed;
	}

	if(player.difLaserX < speed && player.difLaserY <speed){
		
		player.laserDrawn = true;
	}
}