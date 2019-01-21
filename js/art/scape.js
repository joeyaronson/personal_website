function setup() {
    createCanvas(windowWidth,windowHeight)
    angleMode(DEGREES);
    strokeWeight(0.3);
    colorMode(HSB,100);

    
}

var b = [];
var timer = 0;

var noiseScale=0.0091;
var n = 10;

var col = 0;

var y = -100;
var x = 0;

var w = 0;
function draw() {
    //background(255);
    stroke(col%100,100,50);
    noFill();
    beginShape();
    for(let i = 0; i < width; i++)
    {
        var noiseVal = noise((x+i)*noiseScale, y*noiseScale);
        //stroke(noiseVal*255);
        vertex(i, y+noiseVal*80);
    }
    
    endShape();
    
    y+=0.5;
    //x++;
    col+=0.1;
    
    if(y >height+300)
    {
        background(255,w);
        w++;
    }
    
    if(w >100)
    {
        y = -100;
        w = 0;
        n-=0.5;
    }
    
    if(n < 2)
    {
        n = 10;
    }
}