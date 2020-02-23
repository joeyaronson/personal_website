function setup() {
 clientHeight = document.getElementById("background").clientHeight;
 clientWidth = document.getElementById("background").clientWidth;
  let cnv = createCanvas(clientWidth, clientHeight);
    console.log("gorp")
    cnv.position(0,0)
  cnv.parent("background");
  cnv.style("z-index", "-1");
  cnv.position('position', 'relative')
  background(40, 44, 52)
  colorMode(HSB, 100);
  noStroke();
  hypotenuse = sqrt(width * width + height * height);
  for (let i = 0; i < 1000; i++) {
    p.push(new Particle(random(width), random(height)));
  }
}

function windowResized(){
    clientHeight = document.getElementById("background").clientHeight;
    clientWidth = document.getElementById("background").clientWidth;
    resizeCanvas(clientWidth,clientHeight)
}
let p = [];
let noiseVal = 0.02;
let globalColor = 0;
let hypotenuse;
let clientHeight;
let clientWidth;
function draw() {
colorMode(RGB,255)
  background(40, 44, 52,50)
  colorMode(HSB, 100);
  
  for (let i = 0; i < p.length; i++) {
    p[i].display();
    p[i].move();
  }
  globalColor += 0.5;
  fill(100);
  textSize(20);
  if (frameRate() < 30) {
    p.splice(0, 1);
  }
  if (frameRate() > 60) {
    p.push(new Particle(random(width), random(height)));
  }

  text("particles: " + p.length, 20, 30);
  text("framerate: " + floor(frameRate()), 20, 60);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ax = random(-0.03, 0.03);
    this.ay = random(-0.03, 0.03);
    this.h = globalColor;
  }

  display() {
    fill(this.h % 100, 100, 100);
    ellipse(this.x, this.y, 3, 3);
  }
  move() {
    let dx = noise(
      this.x * noiseVal + this.ax,
      this.y * noiseVal + this.ax,
      frameCount * this.ax
    );
    let dy = noise(
      this.x * noiseVal + this.ay,
      this.y * noiseVal + this.ay,
      frameCount * this.ay
    );
    let ddx = map(dx, 0, 1, -10, 10);
    let ddy = map(dy, 0, 1, -10, 10);

    this.x += ddx;
    this.y += ddy;
    //this.h+=1;
    let delx = mouseX - this.x;
    let dely = mouseY - this.y;

    let angle = atan2(delx, dely);

    let ax = sin(angle);
    let ay = cos(angle);

    let d = dist(this.x, this.y, mouseX, mouseY);

    let ds = map(d, 0, hypotenuse, 3, 10);
    if (mouseIsPressed) {
      this.h += ds / 2;
      this.x += ax * ds;
      this.y += ay * ds;
    } else {
      this.h = globalColor;
      if (d < 100) {
        let rs = map(d, 100, 0, 3, 0.5);
        this.x -= ax * rs;
        this.y -= ay * rs;
      }
    }
  }
}
