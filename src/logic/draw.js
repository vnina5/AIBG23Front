//Uploadovanje slika iz gif-a:

// TODO: dodati slike u gif folder (ili drugi pa izmeniti putanju)
import PlayersURL from "../../gif/Players.png";
import MapBaseURL from "../../gif/MapBase.png";
import MapFrameURL from "../../gif/MapFrame.png";
import TileBorderURL from "../../gif/TileBorder.png"
import FullTileEntitiesURL from "../../gif/Tiles.png";
import SkullURL from "../../gif/Skull.png";
import TigerURL from "../../gif/Tiger.png";
import StoneURL from "../../gif/Stone.png";


// Slike =====================================================================================

let players = new Image();	
let mapBase = new Image();
let mapFrame = new Image();
let tileBorder = new Image();
let FullTileEntities = new Image();
let skull = new Image();
let tiger = new Image();
let stone = new Image();

players.src = PlayersURL;
mapBase.src = MapBaseURL;
mapFrame.src = MapFrameURL;
tileBorder.src =  TileBorderURL;
FullTileEntities.src = FullTileEntitiesURL;
skull.src = SkullURL;
tiger.src = TigerURL;
stone.src = StoneURL;


// Dimenzije za Tajlove =====================================================================================
const numOfRows = 29;
const dTileW = 44;  // Skraceno od  - Destination Tile Width - Sirina tile-a na canvasu
const dTileH = 44;  // Skraceno od  - Destination Tile Height - Visina tile-a na canvasu
const sTileW =  44; // Skraceno od  - Source Tile Width - Sirinu koju uzima od izvorne slike
const sTileH =  44; // Skraceno od  - Source Tile Height - Visinu koju uzima od izvorne slike
const sPlayerW =  44; 
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
const TileEntity = { // uzima delovi 1, drugi red kako to zna pitate se? ctrl f = 
    CHEST : { index: 0 },
    CLIFF : { index: 1 },
    LEAVES : { index: 2 },
    TreeFull : { index: 3 },    // nije udareno
    TreeHalf : { index: 4 },    // udareno 1 put
    TreeStump : { index: 5 },   // udareno 2 puta
                                // koliko god slicica da ima, samo dodati ovde i u drawTile
};

export class Draw {
    //Klasika konstruktor:
    constructor(ctx) {
        window.ctx = ctx;
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ PLAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // TODO: isplanirati kako ce se iscrtavati, okretati levo desno, animacija udaranja, itd

    // TODO: implementirati promene, za pocetak sam samo kopirala
    drawRotatedPlayer(player){
        
		if(player.rotated == false){
			this.rotatePlayer(player);
		}		
		else if(player.moved == false){
			this.movePlayer(player);
		} else{

			ctx.save();
			ctx.translate(player.x+22,player.y+22);
			ctx.rotate(player.angle*Math.PI/180);
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

		}
    }

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
		calculateDifXY(player);
    }

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
				tiger,		// what image
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
				tigers,		// what image
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
				tigers,		// what image
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

    // TODO: proveriti polozaj, jel nam se rotira pozadina? vrv ne -> obrisati
    // Iscrtavanje podloge mape:
	drawMapBase(){
		ctx.save();
		ctx.translate(551, 488);		// ?
		// ctx.rotate(angle1*Math.PI/180);
		
		ctx.drawImage(
			mapBase,
			-551,
			-551
		)
		// angle1 = angle1+0.02;
		ctx.restore();
	};

    // TODO: proveriti polozaj
	drawMapFrame(){
		ctx.drawImage(
			mapFrame,
			-1,
			-3
		)

	}

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ SKULL ~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // TODO: proveriti polozaj
	// Iscrtavanje Boss-a:
	drawSkull(){
		ctx.drawImage(
			skull,
			492,
			429
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

        // crtamo sve osim praznih i lobanja
        if(!(entity.type === 'EMPTY' || entity.type === 'SKULL')){	

            // prilagodjavanje crtanju drveca	
            if(entity.type === 'TREES'){
                if(entity.health > 300){
					entityType = TileEntity['TreeFull'];
                }
                if(entity.health > 150 && entity.health <= 300){
                    entityType = TileEntity['TreeHalf'];
                }
                if(entity.health <= 150 ){
                    entityType = TileEntity['TreeStump'];
                }
            } else entityType = TileEntity[entity.type];

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
	drawEntity(x, y, indexOfEntityType){
		ctx.save();
		ctx.translate(x+22,y+22);           // centriramo: 22 je pola sirine i visine tile-a
		ctx.drawImage(
        	FullTileEntities,
        	sTileW * indexOfEntityType,     // prosledjuje se TileEntity['nesto']
			0, 
			sTileW, 
			sTileH,
        	-22, 
        	-22, 
        	dTileW, 
        	dTileH
    	);
		ctx.restore();
  	}

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ ATTACKS ~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // izmeniti?
    drawAttackedTile(r,q){
		var [x,y] = convertCoordinates(r, q);
		
		//console.log(x,y);
		ctx.drawImage(
        	FullTileEntities,
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
		// var [endX, endY] = convertCoordinates(endR, endQ);	
        // ctx.beginPath();
		// ctx.strokeStyle = "red";
		// ctx.lineWidth = 3;
		// ctx.moveTo(550,535);
		// ctx.lineTo(endX + 22, endY + 22);
		// ctx.stroke();
    }
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