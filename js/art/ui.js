function setup() {
    textAlign(CENTER);
    panes = [];
    sel = createSelect();
    for(let i = 2; i < 7;i++){
        sel.option(i);
    }
    sel.changed(drawTheme);
    noStroke();
   
    drawTheme();
    drawButton();

}
let sel, button;
let num;
let panes;
let mode = "shades";
function draw() {
    
}

function drawButton(){
    textSize(50);
    let numText = "Number of Colors: " 
    let textW = textWidth(numText);
    button = createButton('refresh');
    button.position(width/2-100, height/6);
    button.mousePressed(drawTheme);
    button.style('font-size', '50px');
    button.style('padding', '20px');
    button.style('border-radius', '20px');
    var x = 120;
    let r = panes[1].r;
    let g = panes[1].g;
    let b = panes[1].b;
    let col = "rgb(";
    col = col + r+ ','+g+','+b+')';
    button.style('background-color', col)
    if(r+g+b > 550){
        button.style('color', 'rgb(0,0,0)');
    }
    else{
        button.style('color', 'rgb(255,255,255)');
    }
    sel.position(width/2+textW/2+25, height/6-height/8);
    sel.style('font-size', '50px');
    sel.style('padding', '20px');
    sel.style('border-radius', '20px');

    sel.style('background-color', col)
    if(r+g+b > 550){
        sel.style('color', 'rgb(0,0,0)');
    }
    else{
        sel.style('color', 'rgb(255,255,255)');
    }
   
    
    
    let spanText = createSpan("Number of Colors");
    spanText.position(width/2-textW/2, height/6-height/8);
    spanText.style('font-size', '50px');
    spanText.style('padding', '20px');
    spanText.style('border-radius', '25px');
    spanText.style('font-family', 'arial');
    spanText.style('background-color', col)
    if(r+g+b > 500){
        spanText.style('color', 'rgb(0,0,0)');
    }
    else{
        spanText.style('color', 'rgb(255,255,255)');
    }
}

function drawTheme(){
    
    panes.splice(0,panes.length)
    num = sel.value();
    
    for(let i = 0; i < num;i++){
        panes.push(new pane(i*width/num,height/3,i))
    }
    background(panes[0].r,panes[0].g,panes[0].b);
    for(let i = 0; i < panes.length;i++){
        panes[i].display();
    }
    drawButton();
    fill(200);
    rect(0,height/3,width,25);
    
}

class pane{
    constructor(x,y,i){
        this.x = x;
        this.y = y;
        this.index = i;
        
        if(mode == "random"){
            this.r = round(random(255));
            this.g = round(random(255));
            this.b = round(random(255));
        }
        
        if(mode == "shades"){
            if(this.index === 0){
                
                
                do {
                 	 this.r = round(random(255));
					this.g = round(random(255));
					this.b = round(random(255));
                }
                while (this.r+this.g + this.b < 200);
                
                
            }
            else{
                
                if(panes[0].r - this.index*10 < 0){
                    this.r = 0
                }
                else{
                    this.r = panes[0].r - this.index*10;    
                }
                if(panes[0].g - this.index*10 < 0){
                    this.g = 0
                }
                else{
                    this.g = panes[0].g - this.index*10;    
                }
                if(panes[0].b - this.index*10 < 0){
                    this.b = 0
                }
                else{
                    this.b = panes[0].b - this.index*10;    
                }
                
            }
        }
        
        
       
    }
    
    display(){
        
        
        fill(this.r,this.g,this.b);
        rect(this.x,this.y,width/num,height-height/3);
        if(this.r+this.g+this.b > 550){
            fill(0);
        }
        else{
            fill(255);
        }
        textSize(width/num/10)
        text("RGB:("+this.r+','+this.g+','+this.b+')',this.x+width/num/2,height-height/4);
        
        let rhex = this.r.toString(16);
        let ghex = this.g.toString(16);
        let bhex = this.b.toString(16);   
        if (rhex.length % 2) {
          rhex = '0' + rhex;
        }
        if (ghex.length % 2) {
          ghex = '0' + ghex;
        }
        if (ghex.length % 2) {
          ghex = '0' + ghex;
        }
        let hexString = "HEX: #"+rhex+ghex+bhex;
        text(hexString,this.x+width/num/2,height-height/4-width/num/8);
        text(this.index,this.x+width/num/2,height-height/4-width/num/8-200);
    }
    
}