function setup() {
	createCanvas(windowWidth,windowHeight);
	if(width>height)
			max = width
	else
			max = height
background(0);
	angleMode(DEGREES);
	strokeWeight(0.1);
	colorMode(HSB,1000);
	for(let i = 0; i < 2; i++){
		balls.push(new ball(random(10,width-10),random(10,height-10)));
	}
}
let max;
let balls = [];

function draw() {
background(0,0);

	// if(keyIsPressed||mouseIsPressed){
	// 	background(0);
	// }

	for(let i = 0; i < balls.length; i++){
		balls[i].connect();
	}

	for(let i = 0; i < balls.length; i++){
		balls[i].move();
		balls[i].display();
	}


}

class ball{
constructor(x,y){
	this.x = x;
	this.y = y
	this.xs = random(-1,1);
	this.ys = random(-1,1);
	this.connections = 0;
}

display(){
	// ellipse(this.x,this.y,20,20);
}

move(){
	this.x+=this.xs+this.xs*cos(frameCount*this.xs);
	this.y+=this.ys+this.ys*sin(frameCount*this.ys);
	
	this.bounce();
	
}

bounce(){
	if(this.x > width-10||this.x < 10){
		this.xs*= -1;
	}
	if(this.y > height-10||this.y < 10){
		this.ys*= -1;
	}
}

connect(){
	this.connections = 0;
	for(let i = 0; i < balls.length;i++){
		if(dist(this.x,this.y,balls[i].x,balls[i].y)< max){
			if(dist(this.x,this.y,balls[i].x,balls[i].y)>1){
				stroke((100-this.connections*10+frameCount)%1000,1000,1000);
				line(this.x,this.y,balls[i].x,balls[i].y);
				this.connections++;
			}
		}
	}

}
}