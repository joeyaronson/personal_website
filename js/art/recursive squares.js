//joey aronson 2018
function setup() {
    createCanvas(windowWidth,windowHeight);
    angleMode(DEGREES);
    rectMode(CENTER);
    colorMode(HSB,100);
    temph = height;
    tempw = width;
}

var col = 0;

var angle = 0;
function draw() {

    width = windowWidth;
    height = windowHeight;

    if(width !== tempw || height !== temph)
    {
        tempw = width;
        temph = height;
        background(0);
    }

    background(hue%100,100,100);
    strokeWeight(3);
    stroke(100);
    translate(width/2,height/2);

    if(width >= height)
    {
        square(width+200);
    }
    else
    {
        square(height+200);
    }



    resetMatrix();

    text("joey aronson 2018",50,height-100)
    angle+=0.06;
    col+=0.25;
}


function square(s)
{
    rotate(angle);
    fill((col+s/10)%100,100,100);
    strokeWeight(s/100);
    //fill(0,100,100);
    rect(0,0,s,s);

    if(s>10)
    {
        square(s*0.93);
    }
}
//joey aronson 2018