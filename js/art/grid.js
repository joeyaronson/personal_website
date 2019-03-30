function setup() {
    createCanvas(windowWidth,windowHeight);
angleMode(DEGREES);
rectMode(CENTER);
noStroke();
createNodes()
}

let boxSize = 50;
let b = [];
function draw() {
if(b[0].c == "black")
    background(255);
else
    background(0);
for(let i = 0; i < b.length; i++){
    b[i].display();
    b[i].move();
}
}

function createNodes(){
for(let i = -2; i < (width+500)/100; i++){
    for(let j = -2; j < (height+500)/100; j++){
        b.push(new Box(i,j));
    }
}
}

class Box{
constructor(x,y){
    this.x = x*100;
    this.y = y*100;
    this.offset = 0;
    this.a = 0;
    this.a2 = 1;
    this.c = "black"
}
display(){
    if(this.c === "black")
        fill(0);
    else
        fill(255);
    translate(this.x+this.offset+sin(this.a)*100,this.y+cos(this.a)*100);
    rotate(this.a); 
    
    rect(0,0,sin(this.a)*50,sin(this.a)*50);
    resetMatrix();
    translate(this.x+50+this.offset+sin(this.a)*100,this.y+50+cos(this.a)*100);
    rotate(-this.a);
    rect(0,0,sin(this.a)*50,sin(this.a)*50);
    resetMatrix();
}

move(){
    this.a+=this.a2;
    
    if(this.a  == 90){
        if(this.c === "black"){
            this.c = "white";
            this.offset = 50;
        }
        else{
            this.c = "black";
            this.offset = 0;
        }
        
    }
    if(this.a == 180 ){
        this.a = 0;
    }
    // else if(this.a+90 %270 === 0 && this.c === "white"){
        
    //     //this.a2 = 0;
    //     this.offset = 0;
    //     this.c = "black";
    // }
}

}