function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100);
    rectMode(CENTER);
    angleMode(DEGREES);
    noStroke();
    textFont("Lucida Console");
    textAlign(CENTER);

    //create player
    r = new Rocket(width / 2, height / 2);

    //set coin position
    cx = random(100, width - 100);
    cy = random(100, height - 100);
}

let r;
let a = [];
let cx;
let cy;
let min = 3;
let gameover = false;

function draw() {
    background(62, 17, 24);

    //display rocket if not gameover
    if (!gameover) {
        r.display();
        r.move();
    }

    //for each asteroid
    for (let i = 0; i < a.length; i ++) {
        a[i].display();
        a[i].move();

        //if rocket hits asteroid
        if (dist(a[i].x, a[i].y, r.x, r.y) < a[i].s / 2) {
            background(100, 100, 100, 50);
            r.lives --;
            a.splice(i, 1);
        }
    }

    //if out of lives
    if (r.lives < 0 || dist(r.x, r.y, width / 2, height / 2) > width * 1.5) {
        a.splice(0, a.length);
        text("GAME OVER\nPRESS R TO RETRY", width/2, height/2);
        gameover = true;
        cx = 8000;

        //restart game
        if (keyIsDown(82)) {
            gameover = false;
            r.coins = 0;
            r.lives = 3;
            min = 3;
            cx = random(100, width - 100);
            cy = random(100, height - 100);
            r.x = width / 2;
            r.y = height / 2;
        }
    } else {
        //add new asteroid if min is raised
        if (a.length < min) {
            a.push(new Asteroid(50, 50));
        }
    }

    //offscreen display
    let y = r.y;

    if (y > height) {
        y = height;
    }

    if (y < 0) {
        y = 0;
    }

    let x = r.x;

    if (x > width) {
        x = width;
    }

    if (x < 0) {
        x = 0;
    }

    //left side
    if (r.x < -50) {
        let size = map(r.x, -10, -800, 1, 0.1);
        drawShip(50, y, r.a, size, 50);
    }

    //right side
    if (r.x > width + 50) {
        let size = map(r.x, width + 10, width + 800, 1, 0.1);
        drawShip(width - 50, y, r.a, size, 50);
    }

    //up
    if (r.y < -50) {
        let size = map(r.y, -10, -800, 1, 0.1);
        drawShip(x, 50, r.a, size, 50);
    }

    //down
    if (r.y > height + 50) {
        let size = map(r.y, height + 10, height + 800, 1, 0.1);
        drawShip(x, height - 50, r.a, size, 50);
    }

    //coin
    fill(14, 100, 100);
    let cs = 30 + cos(frameCount * 2) * 10;
    ellipse(cx, cy, cs);

    //coin collection
    if (dist(cx, cy, r.x, r.y) < 50) {
        if (r.coins % 3 === 0) {
            min ++;
        }

        cx = random(100, width - 100);
        cy = random(100, height - 100);
        r.coins ++;
    }

    //hud
    fill(90, 100, 100);
    textSize(50);
    text("LIVES: " + r.lives, 200, 100);
    text("COINS: " + r.coins, width - 200, 100);
}

function drawShip(x, y, a, s, o) {
    translate(x, y);
    scale(s);
    rotate(a);
    fill(100, o);
    triangle(-12.5, -24, 12.5, -24, 0, -50);
    rect(0, 0, 25, 50, 3, 3);
    fill(0, 100, 100, o);
    triangle(-12, -10, -12, 20, -25, 30);
    triangle(12, -10, 12, 20, 25, 30);
    fill(50, 255, 255, o);
    ellipse(0, -15, 15, 15);
    resetMatrix();
}

class Rocket {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.a = 0;
        this.s = 5;
        this.f = [];
        this.drift = 1;
        this.lives = 3;
        this.coins = 0;
    }
    display() {
        //display flames
        if (keyIsPressed) {
            this.f.push(new Flame(this.x, this.y, this.a));
            this.f.push(new Flame(this.x, this.y, this.a));
        }

        this.f.push(new Flame(this.x, this.y, this.a, "rock"));

        for (let i = 0; i < this.f.length; i ++) {
            this.f[i].display();
            this.f[i].move();

            if (this.f[i].s < 0) {
                this.f.splice(i, 1);
            }
        }

        drawShip(this.x, this.y, this.a, 1, 100);
        resetMatrix();
    }
    move() {
        //left
        if (keyIsDown(65) || keyIsDown(37)) {
            this.a -= this.s;
        }

        //right
        if (keyIsDown(68) || keyIsDown(39)) {
            this.a += this.s;
        }

        let as = sin(this.a) * this.s;
        let cs = cos(this.a) * this.s;

        //up
        if (keyIsDown(87) || keyIsDown(38)) {
            this.drift = 1;
            this.x += as;
            this.y -= cs;
        }

        //down
        if (keyIsDown(83) || keyIsDown(40)) {
            this.x -= as / 2;
            this.y += cs / 2;
        }

        //drifting in space
        this.x += as / this.drift;
        this.y -= cs / this.drift;
        this.drift += 0.05;
    }
}
class Flame {
    constructor(x, y, a, m, s) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.t = 0;
        this.xd = random(-1, 1);
        this.m = m;

        if (this.m == "rock") {
            this.s = random(5, 15);
        } else {
            this.s = s / 1.5;
        }
    }
    display() {
        translate(this.x, this.y);
        rotate(this.a);
        fill(this.s, 100, 100, 90);
        noStroke();

        if (this.m == "rock") ellipse(0, 20, this.s);
        else ellipse(0, 0, this.s / 2);
        resetMatrix();
    }
    move() {
        this.s -= 0.5;
        this.x += this.xd;
    }
}
class Asteroid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.s = random(20, 100);
        let speed = map(this.s, 100, 20, 3, 5);
        this.xs = random(-speed, speed);

        if (this.xs < 2) {
            this.ys = random(2, speed);
        } else {
            this.ys = random(-speed, speed);
        }

        this.f = [];
    }
    display() {
        //display flames
        if (frameCount % 6 === 0) {
            this.f.push(new Flame(this.x, this.y, this.a, "ast", this.s));
        }

        for (let i = 0; i < this.f.length; i ++) {
            this.f[i].display();
            this.f[i].move();

            if (this.f[i].s < 0) {
                this.f.splice(i, 1);
            }
        }

        fill(70);
        ellipse(this.x, this.y, this.s);
    }
    move() {
        this.x += this.xs;
        this.y += this.ys;

        //asteroid bounce
        if (this.x > width || this.x < 0) {
            this.xs *= -1;
        }

        if (this.y > height || this.y < 0) {
            this.ys *= -1;
        }
    }
}