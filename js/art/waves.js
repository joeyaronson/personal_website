var canvas;
function setup() {
    canvas = createCanvas(displayWidth,displayHeight);
    canvas.position(0,0);
    canvas.style('z-index',-1);
    angleMode(DEGREES);
    strokeWeight(2.3);
    colorMode(HSB,100);
    //frameRate(40);
    console.log("AHHHHHHHHHHH");


}

function windowResized()
{
    resizeCanvas(windowWidth,windowHeight)
}


var b = [];

var noiseScale=0.01;
var n = 10;

var col = 0;

var y = -50;
var x = 0;


var w = 0;
function draw() {
    //background(255);

    noFill();
    beginShape();
    for(var i = 0; i < width; i++)
    {
        var noiseVal = noise((x+i)*noiseScale, y*noiseScale);
        //stroke(noiseVal*255);
        vertex(i, y+noiseVal*80);
    }

    endShape();

    y+=n;
    x++;

    if(y >height+1000)
    {
        background(255,w);
        w++;
    }

    if(w >100)
    {
        y = -50;
        w = 0;
        n-=0.5;
    }

    if(n < 0.5)
    {
        n = 10;
    }
}