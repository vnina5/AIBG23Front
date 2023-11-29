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
