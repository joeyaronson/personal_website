function setup() {
	createCanvas(windowWidth,windowHeight);
    colorMode(HSB,100);
    for(let i = 0; i < 100; i++){
        balls.push(new ball(random(10,width-10),random(10,height-10)));
    }
}

let balls = [];

function draw() {
    background(0);
    
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
        this.xs = random(-2,2);
        this.ys = random(-2,2);
        this.connections = 0;
    }
    
    display(){
        noStroke();
        fill(100-(this.connections*10+20),100,100);
        ellipse(this.x,this.y,this.connections*2+10);
        
    }
    
    move(){
        this.x+=this.xs;
        this.y+=this.ys;
        
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
            if(dist(this.x,this.y,balls[i].x,balls[i].y)< 150){
                stroke(255);
                line(this.x,this.y,balls[i].x,balls[i].y);
                this.connections++;
            }
        }
    
    }
}