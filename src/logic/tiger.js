export class TigerCharacter{
    constructor(ctx, Tiger){
        this.ctx = ctx;
		this.id = Tiger.tigerId; 
        
        this.q = Tiger.q;      
        this.r = Tiger.r;
		[this.x, this.y] = convertCoordinates(this.r, this.q);             
        
		this.prevQ = this.q;
		this.prevR = this.r;
		[this.prevX, this.prevY] = convertCoordinates(this.prevR, this.prevQ);             

        this.difX = 0;
		this.difY = 0;
		this.coefXY = 1;
		if(this.id == 10){
			this.directionR = true;
			this.directionL = false;
		}else{
			this.directionR = false;
			this.directionL = true;
		}
		
		
		this.moved = true;

		// this.name = Tiger.name;
		// this.scoreLevel  = Tiger.scoreLevel;
		this.health = Tiger.health;
        // this.skull = Tiger.skull;
		this.attackPower  = Tiger.attackPower;
		// this.kills  = Tiger.kills;
		// this.score = Tiger.score;
		// this.sword = Tiger.sword;

        this.attackedQ = null;
		this.attackedR = null;
		this.attackedX = null;
		this.attackedY = null;
    }

    updateTiger(Tiger, TigerAttack){
		 
		// Ovo uvek update-uje: 
        // this.level  = Tiger.level;
		this.health = Tiger.health;
		this.power  = Tiger.power;
		// this.kills  = Tiger.kills;
		// this.score = Tiger.score;
		// this.skull = Tiger.skull;
		// this.setInfoBox();	
		this.attackedQ = null;
		this.attackedR = null;

		// Prethodni potez:
		var [TigerX, TigerY] = convertCoordinates(Tiger.r, Tiger.q);
					
	    console.log("Usao u Update\n");
        // Slucaj kada se pomeri:
	    if( Tiger.q != this.q || Tiger.r != this.r){
		    this.moved = false;
		

	    	this.prevQ = this.q;
	    	this.prevR = this.r;
	    	[this.prevX, this.prevY] = convertCoordinates(this.prevR, this.prevQ);

            // Trenutni potez: 
            this.q = Tiger.q;             
            this.r = Tiger.r;
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
        } else if(TigerAttack != null && TigerAttack.TigerIdx == this.id){	
                
            this.prevQ = this.q;
            this.prevR = this.r;
            [this.prevX, this.prevY] = convertCoordinates(this.prevR, this.prevQ);

            // Trenutni potez: 
            this.q = Tiger.q;             
            this.r = Tiger.r;
            [this.x, this.y] = convertCoordinates(this.r, this.q); 
                // // Ugao za rotaciju:
                // this.difAngle = this.angle;
                // this.attackedQ = TigerAttack.q;
                // this.attackedR = TigerAttack.r;
                
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
}

function convertCoordinates(r, q){
	let x = 266 + (14+r)*19 + q*38;
	let y = (14 + r)*33;
	return [x,y];
}