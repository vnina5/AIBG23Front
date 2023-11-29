//Uploadovanje slika iz gif-a:

// TODO: dodati slike u gif folder (ili drugi pa izmeniti putanju)
import PlayersURL from "../../gif/Players.png";
import MapBaseURL from "../../gif/MapBase.png";
import MapFrameURL from "../../gif/MapFrame.png";
import TileBorderURL from "../../gif/TileBorder.png"
import FullTileEntitiesURL from "../../gif/Tiles.png";
import SkullURL from "../../gif/Skull.png";


// Slike =====================================================================================

let players = new Image();	
let mapBase = new Image();
let mapFrame = new Image();
let tileBorder = new Image();
let FullTileEntities = new Image();
let skull = new Image();

players.src = PlayersURL;
mapBase.src = MapBaseURL;
mapFrame.src = MapFrameURL;
tileBorder.src =  TileBorderURL;
FullTileEntities.src = FullTileEntitiesURL;
skull.src = SkullURL;


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
    TIGER : { index: 2 },
    STONE : { index: 3 },   
    LEAVES : { index: 4 },
    TreeFull : { index: 5 },    // nije udareno
    TreeHalf : { index: 6 },    // udareno 1 put
    TreeStump : { index: 7 },   // udareno 2 puta
                                // koliko god slicica da ima, samo dodati ovde i u drawTile
};

export class Draw {
    //Klasika konstruktor:
    constructor(ctx) {
        window.ctx = ctx;
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ PLAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // TODO: kako ce se iscrtavati, okretati levo desno, animacija udaranja, itd

    drawRotatedPlayer(player){
    }
    rotatePlayer(player){
    }
    movePlayer(player){
    }

    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAP ~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // TODO: proveriti polozaj, jel nam se rotira pozadina? vrv ne -> obrisati
    // Iscrtavanje podloge mape:
	drawMapBase(){
		ctx.save();
		ctx.translate(551, 488);
		ctx.rotate(angle1*Math.PI/180);
		
		ctx.drawImage(
			mapBase,
			-551,
			-551
		)
		angle1 = angle1+0.02;
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
                if(entity.health > 200){
					entityType = TileEntity['TreeFull'];
                }
                if(entity.health >100 && entity.health <= 200){
                    entityType = TileEntity['TreeHalf'];
                }
                if(entity.health <= 100 ){
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
}

// POMOCNE FUNKCIJE =====================================================================================

// TODO: proveriti da li je ovo ok na nasem
function convertCoordinates(r, q){
	let x = 266 + (14+r)*19 + q*38;
	let y = (14 + r)*33;
	return [x,y];
}