//2018 joey aronson
function setup()
{
    rectMode(CENTER);
    createCanvas(windowWidth,windowHeight);
    colorMode(HSB,100);
    hue = random(0,100);

    temph = height;
    tempw = width;

}

var x = 6;

var x2 = .08;

var rot = 0;

var hue;
var hue2 = 0.25;


function draw()
{

    width = windowWidth;
    height = windowHeight;

    if(width !== tempw || height !== temph || mouseIsPressed)
    {
        tempw = width;
        temph = height;

    }

    //change the x below to a fixed int and see what happens
    strokeWeight(x);
    stroke(0, 0, 0, 255);
    noFill();
    background(hue, 100, 100);

    for (i = -100; i < width+100; i += 100)
    {
        for (j = -100; j < height+100; j += 100)
        {
            translate(i + 50, j + 50);
            rotate(rot);
            rect(0, 0, 200, 200);
            resetMatrix();
        }
    }

    x += x2;
    rot += 0.005;
    hue += hue2;

    //stroke width flip
    if (x > 30 || x <3)
    {
        x2 *= -1;
    }

    if(hue > 100 || hue < 0)
    {
        hue2 *= -1;
    }

    fill(255);
    noStroke();
    text("joey aronson 2018",100,height-50);

}
//2018 joey aronson