function setup() {
	createCanvas(windowWidth,windowHeight);
    rectMode(CENTER);
    noFill();
    drawParts();
}
let strokes;
let timer = 0;

function drawParts(){
    background(200);
    strokes = [
    color(random(255),random(255),random(255)),
    color(random(255),random(255),random(255)),
    color(random(255),random(255),random(255)),
    color(random(255),random(255),random(255)),
    color(random(255),random(255),random(255)),
    color(random(255),random(255),random(255)),
    color(random(255),random(255),random(255))];
    
    for(let i = 100; i < width; i+=150){
        for(let j = 100; j < height; j+=150){
            part(i,j);
        }   
    }
}
function draw() {
	timer++;
    if((keyIsPressed || mouseIsPressed) && timer > 10){
		drawParts();
		timer = 0;
    }
}

function part(x,y){
    var randline = floor(random(4)); 
    for(let i = 0; i < randline; i++){
        rand2 = ceil(random(4));
        rands = random(strokes)
        stroke(rands);
        strokeWeight(random(1,5));
        randlen = random(10,40)
        if(rand2 == 1){
            line(x-randlen,y,x+randlen,y); 
        }
        
        if(rand2 == 2){
            line(x,y-randlen,x,y+randlen); 
        }
        
        if(rand2 == 3){
            line(x-randlen,y-randlen,x+randlen ,y+randlen); 
        }
        
        if(rand2 == 4){
            line(x+randlen,y-randlen,x- randlen ,y+randlen); 
        }
    }
    
    var rand = ceil(random(3)); 
    for(let i = rand; i >= 0;i--){
        var randshape = random(1);
        var rands = random(strokes)
        stroke(rands);
        strokeWeight(random(1,10));
        
        if(randshape < 0.5)
            ellipse(x,y,i*28,i*28);
        else
            rect(x,y,i*28,i*28,random(i*2));
    }
}