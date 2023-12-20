export class Character{
    constructor(ctx, Player){
        this.ctx = ctx;
		this.id = Player.playerIdx;          
		this.index = this.id - 1; 
        
        this.q = Player.q;      
        this.r = Player.r;
		[this.x, this.y] = convertCoordinates(this.r, this.q);             
        
		this.prevQ = this.q;
		this.prevR = this.r;
		[this.prevX, this.prevY] = convertCoordinates(this.prevR, this.prevQ);             

        this.difX = 0;
		this.difY = 0;
		this.coefXY = 1;
		if(this.id == 1 || this.id == 3){
			this.directionR = true;
			this.directionL = false;
		}else{
			this.directionR = false;
			this.directionL = true;
		}
		
		
		this.moved = true;

		this.name = Player.name;
		this.scoreLevel  = Player.scoreLevel;
		this.health = Player.health;
        this.skull = Player.skull;
		this.attackPower  = Player.attackPower;
		this.kills  = Player.kills;
		this.score = Player.score;
		this.sword = Player.sword;

        this.attackedQ = null;
		this.attackedR = null;
		this.attackedX = null;
		this.attackedY = null;
		this.setInfoBox();		

    }

    updatePlayer(Player, playerAttack){
		 
		// Ovo uvek update-uje: 
        this.scoreLevel  = Player.scoreLevel;
		this.health = Player.health;
        this.skull = Player.skull;
		this.attackPower  = Player.attackPower;
		this.kills  = Player.kills;
		this.score = Player.score;
		this.sword = Player.sword;
		this.setInfoBox();	
		this.attackedQ =null;
			this.attackedR = null;

		// Prethodni potez:
		var [playerX, playerY] = convertCoordinates(Player.r, Player.q);
					
	console.log("Usao u Update\n");
// Slucaj kada se pomeri:
	if( Player.q != this.q || Player.r != this.r){
		this.moved = false;
		

		this.prevQ = this.q;
		this.prevR = this.r;
		[this.prevX, this.prevY] = convertCoordinates(this.prevR, this.prevQ);

		// Trenutni potez: 
		this.q = Player.q;             
		this.r = Player.r;
		[this.x, this.y] = convertCoordinates(this.r, this.q); 

		// Razdaljina za akciju move: 
		this.difX  = this.x - this.prevX;
		this.difY = this.y - this.prevY;
		if(this.difX!=0  || this.difY !=0){
			this.coefXY  = Math.abs(this.difX/this.difY);
		} else this.coefXY = 1;


		if(this.q > this.prevQ){
			this.directionR = true;
			this.directionL = false;
		}else if(this.q < this.prevQ){
			this.directionR = false;
			this.directionL = true;
		}else{
			if(this.r < this.prevR){
			this.directionR = true;
			this.directionL = false;
			}else{
			this.directionR = true;
			this.directionL = false;	
			}
		}
		console.log("Usao");
		// Ugao za rotaciju:
		// this.difAngle = this.angle;
		// this.angle = find_angle(this.prevR, this.prevQ, this.r, this.q);	

		// Resetovanje za laser jer se ne koristi:
		// this.difLaserX = 0;
		// this.difLaserY = 0;		
		
// Slucaj kada napada:		
	} else if(playerAttack != null && playerAttack.playerIdx == this.id){	
			
			this.prevQ = this.q;
			this.prevR = this.r;
			[this.prevX, this.prevY] = convertCoordinates(this.prevR, this.prevQ);

			// Trenutni potez: 
			this.q = Player.q;             
			this.r = Player.r;
			[this.x, this.y] = convertCoordinates(this.r, this.q); 
			// // Ugao za rotaciju:
			// this.difAngle = this.angle;
			// this.attackedQ = playerAttack.q;
			// this.attackedR = playerAttack.r;
			
			[this.attackedX, this.attackedY] = convertCoordinates(this.attackedR , this.attackedQ);
			// console.log(this.attackedX, this.attackedY);
			// this.angle = find_angle(this.r, this.q, this.attackedR, this.attackedQ);			
			// this.difLaserX = this.attackedX - this.x;
			// this.difLaserY = this.attackedY - this.y;
			// if(this.difLaserX!=0  || this.difLaserY !=0){
			// 	this.coefLaser  = Math.abs(this.difLaserX/this.difLaserY);
			// } else this.coefLaser = 1;

			if(this.q > this.prevQ){
				this.directionR = true;
				this.directionL = false;
			}else if(this.q < this.prevQ){
				this.directionR = false;
				this.directionL = true;
			}else{
				if(this.r < this.prevR){
				this.directionR = true;
				this.directionL = false;
				}else{
				this.directionR = true;
				this.directionL = false;	
				}
			}

			// this.rotated = false;
			this.moved = true;
			// this.laserDrawn = false;
			
			
		} 				
	}
    setInfoBox() {
		const div = document.querySelector(`.player${this.index+1}`);
		
		div.querySelector(".name").innerHTML = `${this.name}`;
		div.querySelector(".health").innerHTML = `${this.health}`;
        div.querySelector(".score").innerHTML = `${this.score}`;
		div.querySelector(".skull").innerHTML = `${this.skull}`;
        div.querySelector(".power").innerHTML = `${this.attackPower}`;
				
     }
}

function convertCoordinates(r, q){
	let x = 266 + (14+r)*19 + q*38;
	let y = (14 + r)*33;
	return [x,y];
}