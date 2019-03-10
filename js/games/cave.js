function setup() {
	createCanvas(1000,1000);
    p = new Char(100,515);
    m = new Char(100,515);
    angleMode(DEGREES);
    rectMode(CENTER);
}
var p;

var m;

var s = [];

var ms = [];
var g = [];
var mode = "menu";

var speed = 10;
var timer = 0;

var gx = 500;

var score = 0;

var fc;



function draw() {
    
    
    if(mode == "help")
    {
        background(0,0,102);
        strokeWeight(5);
        fill(102,102,153);
        rect(500,500,700,700,50);
        
        textSize(75);
        strokeWeight(5);
        stroke(0);
        fill(0);
        for(let i = 0; i <20; i++)
        {
            text("Avoid spikes as long as possible! Press space to jump and SHIFT to flip gravity.",530+i,530+i,700,700);  
        }
        
        
        fill(255,255,0);
        
        text("Avoid spikes as long as possible! Press space to jump and SHIFT to flip gravity.",530,530,700,700);
       
        fill(0);
        for(let i = 0; i <20; i++)
        {
            text("BACK",381+i,781+i);    
        }
        
        
        fill(255,255,0);
        
        text("BACK",380,780);
        
        if(mouseX > 380 && mouseX < 600)
        {
            if(mouseY > 700 && mouseY <800)
            {
                if(mouseIsPressed)
                {
                    mode = "menu";
                    frameCount = fc;
                }
            }
        }
    }
    
    if(mode == "menu")
    {
        
        background(0,0,102);
        strokeWeight(5);
        fill(102,102,153);
        rect(500,900,2000,200);
        rect(500,200,2000,400);
        
        textSize(120);
        fill(0);
        strokeWeight(7);
        stroke(0);
        for(let i = 0; i <20; i++)
        {
            text("CAVE   ESCAPE!",31+i,231+i);    
        }
        
        
        fill(255,255,0);
        
        text("CAVE   ESCAPE!",30,230);
        
        
        strokeWeight(5);
        
        textSize(75);
        fill(0);
        for(let i = 0; i <20; i++)
        {
            text("HELP",81+i,931+i);    
        }
        
        
        fill(255,255,0);
        
        text("HELP",80,930);
        
        
        fill(0);
        for(let i = 0; i <20; i++)
        {
            text("PLAY",681+i,931+i);    
        }
        
        
        fill(255,255,0);
        
        text("PLAY",680,930);
        
        
        if(mouseX > 675 && mouseX < 900)
        {
            if(mouseY > 850 && mouseY < 960)
            {
                if(mouseIsPressed)
                {
                    mode = "game";
                    fc = frameCount;
                    ms.splice(0,ms.length);
                }
            }
        }
        
        if(mouseX > 75 && mouseX < 300)
        {
            if(mouseY > 850 && mouseY < 960)
            {
                if(mouseIsPressed)
                {
                    mode = "help";
                    fc = frameCount;
                    ms.splice(0,ms.length);
                }
            }
        }
        
        
        
        m.display();
        m.move();
        m.checkHit();
        
        
        for(let i = 0; i < ms.length;i++)
        {
            
            ms[i].display();
            ms[i].move();
            
            if(ms[i].x < -100)
            {
                ms.splice(i,1);
                score++;
            }
            
           
        }
        
        if(frameCount % 200 == 100)
        {
            m.j = true;
        }
        
        
        if(frameCount % 200 === 0)
        {
            ms.push(new Spike(1200,775,"down"));
            ms.push(new Spike(1285,775,"down"));
            ms.push(new Spike(1370,775,"down"));
        }
        
        
        
        
        
    }
    
    if(mode == "game")
    {
        background(0,0,102);
        strokeWeight(5);
        fill(102,102,153);
        rect(500,900,2000,200);
        rect(500,100,2000,200);
        
        ground(gx);
        
        gx-=10;
        
        if(gx <= -1000)
        {
            gx = 1200;
        }
        
        
        for(let i = 0; i < s.length;i++)
        {
            if(s[i].x < -100)
            {
                s.splice(i,1);
                score++;
            }
            s[i].display();
            s[i].move();
           
        }
        
        //text(p.y,100,100);
        
        
        p.display();
        p.move();
        p.checkHit();
        
        
        //bottom
        if(frameCount % 200 === 0)
        {
            var ran = floor(random(1,10));
            
            if(ran < 6)
            {
                for(let i = 0; i <= ran; i++)
                {
                    s.push(new Spike(1000+i*85,775,"down"));
                }               
            }
            else
            {
                 for(let i = 0; i <= ran-6; i++)
                {
                    s.push(new Spike(1000+i*390,775,"down"));
                }     
            }
            

            
        }
        
        //top
        if(frameCount % 200 === 100)
        {
            ran = floor(random(1,10));
            
            if(ran < 6)
            {
                for(let i = 0; i <= ran; i++)
                {
                    s.push(new Spike(1000+i*85,225,"up"));
                }               
            }
            else
            {
                 for(let i = 0; i <= ran-6; i++)
                {
                    s.push(new Spike(1000+i*390,225,"up"));
                }     
            }
            
        }
        
        //middle
        if(frameCount % 100 === 25)
        {
            ran = floor(random(1,4));
            
            for(let i = 0; i <= ran; i++)
            {
                s.push(new Spike2(1000+i*100,500));
            }   
        }
        
        noStroke();
        
        textSize(50);
        fill(0);
        for(let i = 0; i <7; i++)
        {
            text("Score: "+ score,101+i,101+i);    
        }
        
        
        fill(255,255,0);
        
        text("Score: "+ score,100,100);
        
        stroke(0);
        
    }
    
    if(mode =="gameover")
    {
        fill(102,102,153,100);
        rect(500,500,600,200,20);
        strokeWeight(6);
        textSize(70);     
        fill(0);
        for(let i = 0; i <7; i++)
        {
            text("RETRY",230+i,530+i)
        }
        
        fill(255,255,0);

        text("RETRY",230,530)
        
        fill(0);
        for(let i = 0; i <7; i++)
        {
            text("QUIT",580+i,530+i)
        }
        
        fill(255,255,0);

        text("QUIT",580,530)
        
        
        stroke(0);
        
        if(mouseX > 225 && mouseX <475)
        {
            if(mouseY > 475 && mouseY < 550 )
            {
                if(mouseIsPressed)
                {
                    s.splice(0,s.length);
                    mode = "game";
                    frameCount = 0;
                    p.y = 515;
                    p.r = 0;
                    p.j = false;
                    p.s = 30;
                    p.d = "down";
                    p.size = 50;
                    score = 0;
                }
            }
        }
        
        if(mouseX > 575 && mouseX <760)
        {
            if(mouseY > 475 && mouseY < 550 )
            {
                if(mouseIsPressed)
                {
                    s.splice(0,s.length);
                    frameCount = 0;
                    p.y = 515;
                    p.r = 0;
                    p.j = false;
                    p.s = 30;
                    p.d = "down";
                    p.size = 50;
                    score = 0;
                    mode = "menu";
                    frameCount = fc;
                }
            }
        }
    }
    
    timer++;
    
    
}

class Char
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.t = 0;
        this.s = 30;
        this.j = false;
        this.r = 0;
        this.d = "down";
        this.size = 50;
    }
    
    display()
    {
        fill(128,0,0);
        translate(this.x,this.y);
        rotate(this.r);
        rect(0,0,this.size,this.size,10);
        
        fill(255);
        if(this.d == "down")
        {
            ellipse(-10,-10,5,5);
            ellipse(10,-10,5,5);
            ellipse(0,10,20,5);
        }
        if(this.d == "up")
        {
            ellipse(-10,+10,5,5);
            ellipse(10,+10,5,5);
            ellipse(0,-10,20,5);
        }

        resetMatrix();
    }
    
    move()
    {
        if(this.d == "down")
        {
            if(this.y < 775)
            {
                this.y +=10;
            }
            if(keyIsDown(32) && !keyIsDown(16) && this.y == 775 && mode !== "menu")
            {
                this.j = true;
            }
            if(keyIsDown(16) && !keyIsDown(32) && this.y == 775 && mode !== "menu")
            {
                this.d = "up";
            }
            
            if(this.j)
            {
                this.jump();
                if(this.y == 780)
                {
                    this.y = 775;
                    this.s = 30;
                    this.j = false;
                }
            }
        }
        
        if(this.d == "up")
        {
            if(this.y > 225)
            {
                this.y -=10;
            }
            if(keyIsDown(32) && !keyIsDown(16) && this.y == 225 && mode !== "menu")
            {
                this.j = true;
            }
            if(keyIsDown(16) && !keyIsDown(32) && this.y == 225 && mode !== "menu")
            {
                this.d = "down";
            }
            
            if(this.j)
            {
                this.jump();
                if(this.y == 220)
                {
                    this.y = 225;
                    this.s = 30;
                    this.j = false;
                }
            }
        }
        
    }
    
    jump()
    {
        if(this.d == "down")
        {
            if(this.y <= 775)
            {
                this.t++;
                this.y -= this.s;
                this.r+=7.659;
                if(this.s > 0)
                {
                    this.s--;
                }
            } 
        }
        
        if(this.d == "up")
        {
            if(this.y >= 225)
            {
                this.t++;
                this.y += this.s;
                this.r-=7.659;
                if(this.s > 0)
                {
                    this.s--;
                }
            } 
        }
    }
    
    checkHit()
    {  
        for(let i = 0; i < s.length; i++)
        {
            if(dist(this.x,this.y,s[i].x,s[i].y)<50)
            {
                mode = "gameover";
                timer = 0;
            }
        }
    }
}

class Spike
{
    constructor(x,y,r)
    {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    
    display()
    {
        fill(200);
        var s = 50;
        translate(this.x,this.y);
        
        if(this.r == "down")
        {
           rotate(180); 
        }
        else
        {
            rotate(0);
        }
        
        var x1 =s*cos(90);
        var y1 =s*sin(90);
        
        var x2 =s*cos(210);
        var y2 =s*sin(210);
        
        var x3 = s*cos(330);
        var y3 = s*sin(330);
        triangle(x1,y1,x2,y2,x3,y3);
        resetMatrix();
    }
    
    move()
    {
        this.x = this.x -speed;
    }
}

class Spike2
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
    
    display()
    {
        fill(200,100);
        var s = 50;
        translate(this.x,this.y);
        

        rotate(180); 
        
        var x1 =s*cos(90);
        var y1 =s*sin(90);
        
        var x2 =s*cos(210);
        var y2 =s*sin(210);
        
        var x3 = s*cos(330);
        var y3 = s*sin(330);
        triangle(x1,y1,x2,y2,x3,y3);
        
        rotate(90); 
        triangle(x1,y1,x2,y2,x3,y3);
        rotate(90); 
        triangle(x1,y1,x2,y2,x3,y3);
        rotate(90); 
        triangle(x1,y1,x2,y2,x3,y3);
        
        resetMatrix();
    }
    
    move()
    {
        this.x = this.x -speed;
    }
}

function ground(x,y)
{
    noStroke();
    fill(160,180,190);
    ellipse(x,834,200,50);
    ellipse(x+200,874,150,25);
    ellipse(x+400,904,200,50);
    ellipse(x+900,894,300,70);
    
    ellipse(x+200,100,200,50);
    ellipse(x+400,140,150,25);
    ellipse(x+600,50,200,50);
    ellipse(x+700,80,300,70);
    
    stroke(0);
}



function coordinate(x,y)
{
    this.x  = x;
    this.y = y;
}