function setup() {
    createCanvas(1000,1000);
    c = new Char(500,941);
    rectMode(CENTER);
    angleMode(DEGREES);
    bl.push(new Ball(300,100));
}

var  bl = [];
var c;
var scr = "menu";
var count = 0;

var ml = [];

function draw() {
    
    if(scr == "menu")
    {
        background(255,80);
        if(frameCount % 20 === 0)
        {
            ml.push(new Ball(500,100));
        }
        
        for(let i = 0; i < ml.length; i++)
        {
            ml[i].display();
            ml[i].move();
            if(ml[i].y > 965 - ml[i].s/2)
            {
                ml[i].ys2 *= 0.82
                ml[i].ys = ml[i].ys2
            }
            if(ml[i].x < ml[i].s/2 || ml[i].x > width-ml[i].s/2)
            {
                ml[i].xs*=-1;
            }
            
        }
        
        for(let i = 0; i < ml.length; i++)
        {
            if(ml[i].ys2 > -2 )
            {
                ml.splice(i,1);
            }
        }
        
        textSize(150);
        text("DODGEBALL",50,150);
        text("PLAY",300,550);
        text("HELP",300,750);
        
        if(mouseX > 300 && mouseX < 600)
        {
            if(mouseY > 450 && mouseY < 550)
            {
                if(mouseIsPressed)
                {
                    scr = "game";
                }
            }
        }
        
        if(mouseX > 300 && mouseX < 600)
        {
            if(mouseY > 650 && mouseY < 750)
            {
                if(mouseIsPressed)
                {
                    scr = "help";
                }
            }
        }
        
        
    }
    
    if(scr == "help")
    {
        background(255);
        textSize(80);
        text("LEFT and RIGHT arrow keys to move, UP arrow key or SPACE to jump",600,500,800,500);
        
        textSize(100);
        text("<",50,100);
        
        if(mouseX > 50 && mouseX < 100)
        {
            if(mouseY > 50 && mouseY < 100)
            {
                if(mouseIsPressed)
                {
                    scr = "menu";
                }
            }
        }
    }
    
    if(scr == "game")
    {
        background(255,80);
        fill(255);
        stroke(0);
        rect(500,1016,1000,100);
        
        c.display();
        c.move();
        
        for(let i = 0; i < bl.length; i++)
        {
            bl[i].display();
            bl[i].move();
            if(bl[i].y > 965 - bl[i].s/2)
            {
                bl[i].ys2 *= 0.82
                bl[i].ys = bl[i].ys2
            }
            if(bl[i].x < bl[i].s/2 || bl[i].x > width-bl[i].s/2)
            {
                bl[i].xs*=-1;
            }
            
            if(dist(bl[i].x,bl[i].y,c.x,c.y)<bl[i].s/2)
            {
                c.h -= 10;
                bl.splice(i,1);
                bl.push(new Ball(random(50,950),100))
            }
        }
        
        for(let i = 0; i < bl.length; i++)
        {
            if(bl[i].ys2 > -2 )
            {
                bl.splice(i,1);
                bl.push(new Ball(random(50,950),100))

                if(count == 5+bl.length)
                {
                   // bl.push(new Ball(random(50,950),100))
                    bl.push(new Ball(random(50,950),100))
                    count = 0;
                    c.h = 100;
                }
                count++;
            }
            
        }
        
        if(c.h <=0)
        {
            scr = "gameover"
        }
        
        textSize(80);
        text("round: " + bl.length,100,100);
        strokeWeight(5)
        stroke(0);
        rect(600,75,200,10);
        fill(255,0,255);
        ellipse(500+200*((count)/(6+bl.length)),75,25,25);
    }
    
    if(scr == "gameover")
    {
        background(255,5);
        textSize(100);
        text("GAME OVER!",600,500,800,500);
        
        text("RETRY",350,600);
        
        text("QUIT",400,800);
        
        if(mouseX >300 && mouseY < 600)
        {
            if(mouseY > 500 && mouseY <600)
            {
                if(mouseIsPressed)
                {
                    scr = "game";
                    bl.splice(0,bl.length);
                    bl.push(new Ball(300,100));
                    count = 0;
                    c.h = 100;
                    
                }
            }
        }
    }
   
    
    
    // text("y:"+c.y+" ys:"+c.ys,100,100);
}

class Char
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.ys = 10;
        this.r =0;
        this.h = 100;
    }
    
    display()
    {
        translate(this.x,this.y);
        rotate(this.r);
        strokeWeight(3);
        fill(204,0,204);
        rect(0,0,50,50,10);
        
        noStroke();
        fill(255,0,255);
        rect(-2,-2,40,40,10);
        
        fill(0);
        ellipse(-10,-10,10,10);
        ellipse(10,-10,10,10);
        ellipse(0,10,30,10);
        
        stroke(0);
        
        //healthbar
        rectMode(CORNER);
        strokeWeight(5);
        fill(255);
        rect(-50,-80,100,15)
        noStroke();
        
        if(this.h >=90)
        {
            fill(0,255,0);
        }
        else if(this.h >=70)
        {
            fill(100,255,0);
        }
        else if(this.h >=50)
        {
            fill(190,255,0);
        }
        else if(this.h >=30)
        {
            fill(255,200,0);
        }
        else if(this.h >=20)
        {
            fill(255,153,0);
        }
        else
        {
            fill(128,0,0);
        }
        
        
        rect(-48,-78,98*this.h/100,12)
        stroke(0);
        rectMode(CENTER);
        resetMatrix();
    }
    
    move()
    {
        if(keyIsDown(37) && this.x > 25)
        {
            this.x = this.x -10;
        }
        
        if(keyIsDown(39) && this.x < 975)
        {
            this.x = this.x +10;
        }
        
        if(keyIsDown(32)|| keyIsDown(38))
        {
            if(this.y>=925)
            {
                this.ys = -30
            }
            
        }
        
        if(this.ys < 50)
        {
            this.ys +=1;
        }
        
        
        if(this.y < 925||keyIsDown(32)||keyIsDown(38))
        {
            this.y += this.ys;
            this.r+=6.101;
            
        }
        
        
    }
}

class Ball
{
    constructor(x,y)
    {
        
        this.t = floor(random(5));
        this.x = x;
        this.y = y;
        this.z = 0;
        
        
        
        this.xs = random(-10,10);
        this.ys = -random(10,20);
        this.zs = random(-2,5);
        
        this.ys2 = -(1000-this.y)/15;
        
        this.s = random(50,100);
        
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
    }
    
    move()
    {
        this.x += this.xs;
        this.z += this.zs;
        this.y = this.y + this.ys;
        this.ys = this.ys + 1;
    }
    
    display()
    {

        stroke(0)
        strokeWeight(this.s/15);
        fill(this.r,this.g,this.b)
        ellipse(this.x,this.y,this.s,this.s);
       
        
        resetMatrix();
    }
}