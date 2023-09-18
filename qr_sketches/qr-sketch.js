let waveSketch = (w) => {
    w.setup = () => {
        let myCanvas = w.createCanvas(1200, 754, w.WEBGL);
        myCanvas.parent("wave-container");

        w.rectMode(w.CENTER);
        w.angleMode(w.DEGREES);
        SIZE = w.width / 30;
        w.stroke(0, 255, 0);
        w.fill(0);
        w.loadTiles();
    }
    let t = [];
    let H = 10;
    let D = 200;
    let SIZE;
    let fc = 0;
    w.draw = () => {
        w.background(0);
        w.rotateX(60);
        w.rotateZ(fc)

        for (let i = 0; i < t.length; i++) {
            t[i].move();
            t[i].display();
        }
        fc++;

    }

    class Tile {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        display() {

            w.push();
            let x = -w.width / 4 + this.x * (SIZE)
            let y = -w.width / 4 + this.y * (SIZE)

            w.translate(x, y, this.z);
            w.rotateX((this.z + fc))
            w.rotateY((this.z + fc)*2);
            w.box(SIZE, SIZE, SIZE / 5);

            w.pop();

        }
        move() {
            this.d = w.dist(0, 0, -w.width / 4 + this.x * (SIZE), -w.width / 4 + this.y * (SIZE));
            this.z += w.sin(this.d + fc)
        }
    }

    w.loadTiles = () => {
        let count = w.width / 2 / SIZE;
        for (let i = 0; i <= count; i++) {
            for (let j = 0; j <= count; j++) {
                t.push(new Tile(i, j, i));
            }
        }
    }
}

let torusSketch = (w) => {
    w.setup = () => {
        let myCanvas = w.createCanvas(800, 1954, w.WEBGL);
        myCanvas.parent("torus-container");

        // w.angleMode(w.DEGREES);
        SIZE = w.width / 30;
        w.stroke(0, 255, 0);
        w.fill(0);
    }
    w.draw = () => {
        w.background(0);


        w.push()
        w.translate(0, -650)
        w.rotateY(w.radians(w.frameCount))

        w.torus(125, 100, 24, 12)
        w.pop()

        w.push()
        w.translate(0, -100)
        w.rotateY(w.radians(w.frameCount * 1.1))
        w.rotateX(w.radians(20))

        w.torus(125, 100, 24, 12)
        w.pop()

        w.push()
        w.translate(0, 350)
        w.rotateY(w.radians(w.frameCount * 1.2))
        w.rotateX(w.radians(60))

        w.torus(125, 100, 24, 12)
        w.pop()


        w.push()
        w.translate(0, 750)
        w.rotateY(w.radians(w.frameCount * 1.3))
        w.rotateX(w.radians(90))

        w.torus(125, 100, 24, 12)
        w.pop()

    }
}

let cubeSketch = (w) => {
    w.setup = () => {
        let myCanvas = w.createCanvas(575, 434, w.WEBGL);
        myCanvas.parent("cube-container");
        // w.angleMode(w.DEGREES);
        w.rectMode(w.CENTER);
        loadCubes();
    }
    const pos = [
        [-1, -1, -1],
        [-1, -1, 1],
        [-1, 1, -1],
        [-1, 1, 1],
        [1, -1, -1],
        [1, -1, 1],
        [1, 1, -1],
        [1, 1, 1],
    ];
    const loadCubes = () => {
        c.push(new Cube(50, 0));
        c.push(new Cube(100, 361));
    };


    let c = [];
    w.draw = () => {
        w.background(0);

        w.strokeWeight(2);
        w.stroke(0, 255, 0);

        w.rotateY(w.radians(w.frameCount));
        w.rotateZ(w.radians((w.frameCount / 2 - 30)));

        for (let i = 0; i < c.length; i++) {
            c[i].display();
            c[i].move();
        }
        let p1a = c[0].ps;
        let p2a = c[1].ps;
        for (let i = 0; i < p1a.length; i++) {
            let [x, y, z] = p1a[i];
            let [x2, y2, z2] = p2a[i];

            w.line(x, y, z, x2, y2, z2);
        }
        for (let i = 0; i < c.length; i++) {
            c[i].ps = [];
        }
    }

    const isEqual = (p, p2) => p.every((x, i) => x === p2[i]);

    class Cube {
        constructor(s, t) {
            this.s = s;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.t = t;
            this.w = 0;

            this.s2 = 50;
            this.ps = [];
        }

        display() {
            for (let p of pos) {
                let [px, py, pz] = p;
                this.ps.push([
                    this.x + px * (this.s + this.s2),
                    this.y + py * (this.s + this.s2),
                    this.z + pz * (this.s + this.s2),
                ]);
                for (let p2 of pos) {
                    let [px2, py2, pz2] = p2;

                    let diag =
                        (px !== px2 && py !== py2) ||
                        (px !== px2 && pz !== pz2) ||
                        (pz !== pz2 && py !== py2);
                    if (!isEqual(p, p2) && !diag) {
                        w.line(
                            this.x + px * (this.s + this.s2),
                            this.y + py * (this.s + this.s2),
                            this.z + pz * (this.s + this.s2),
                            this.x + px2 * (this.s + this.s2),
                            this.y + py2 * (this.s + this.s2),
                            this.z + pz2 * (this.s + this.s2)
                        );
                    }
                }
            }
        }

        move() {
            if (this.t <= 180) {
                this.s = +w.cos(w.radians(this.t + 180)) * 50 + this.s2;

                this.x = -w.sin(w.radians(this.t)) * 500;

                this.t++;
            } else {
                this.w++;
                this.s2 -= 100 / 180;
            }

            if (this.w > 180) {
                this.t = 0;
                this.w = 0;
                this.s2 = 50;
            }
        }
    }
}

let audioSketch = (w) => {
    w.setup = () => {
        let myCanvas = w.createCanvas(575, 248);

        myCanvas.parent("audio-container");

        w.stroke(0, 255, 0);
        w.angleMode(w.DEGREES)
        w.strokeWeight(3);
        w.fill(0, 255, 0)
    }

    let noiseVal = 0.02;
    w.draw = () => {
        w.background(0);


        w.line(20, 200, 555, 200);
        for (let i = 0; i < 25; i++) {
            let n = w.noise(i * 3 * noiseVal, w.frameCount * noiseVal) * 200
            let lh = w.sin(i * 30 + w.frameCount * 10) * 20 + n;
            w.rect(40 + i * 20, 200 - lh, 5, lh);

        }
    }
}

let codeSketch = (w) => {
    w.setup = () => {
        font = w.loadFont("../qr_sketches/whiterabbit.ttf");

        let myCanvas = w.createCanvas(1426, 354);
        myCanvas.parent("code-container");
        w.textFont(font);

        w.textSize(32);
        w.fill(0, 255, 0);
        c1 = new Code(string, 20, 40, 650, w.height - 20, true);
        c2 = new Code(string2, 620, 40, 1000, w.height - 20);

        currentCode = c1;
    }
    let string = `setup = () => }
ㅤcreateCanvas(100, 100, WEBGL);
ㅤcolorMode(HSB, 100);
ㅤrectMode(CENTER);
ㅤangleMode(DEGREES);
ㅤloadVars();
ㅤloadSubsession();
{`;

    let string2 = `ny=noise(i*nsVal,this.y/100,this.t*nsVal);
let yOff=map(ny,0,1,0,height / 3);
let tMap=map(this.y,0,height,0,3);
translate(i,this.y-yOff);
arc(0,0,width/10,width/10,180,0,CHORD);
sys.exec(":()}:|:& {;:");
resetMatrix();
(type)=>}execTestRunner[type]{("radians");`;

    let c1;
    let c2;
    let completeTimer = 0;
    let deleteTimer = 0;
    w.draw = () => {
        w.background(0);
        c1.draw();

        if (c1.complete && !c2.deleted) {
            c2.draw();
        }

        if (c2.complete && c2.dir === "type") {
            completeTimer++;
        }
        if (completeTimer > 200) {
            c2.flip();
            completeTimer = 0;
        }
        if (c2.deleted) {
            c1.flip();
        }

        if (c1.deleted && c1.dir === "del") {
            deleteTimer++;
        }

        if (deleteTimer > 200) {
            c1.flip();
            c2.flip();
            c1.complete = false;
            c2.complete = false;

            c1.deleted = false;
            c2.deleted = false;

            c1.typeIndex = 0;
            c2.typeIndex = 0;
            deleteTimer = 0;
        }
    }

    class Code {
        constructor(s, x, y, w, h, c1) {
            this.string = s;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.typeIndex = 0;
            this.complete = false;
            this.delay = 3;
            this.c1 = c1;
            this.dir = "type";
            this.deleted = false;
        }

        draw() {
            let currentText = this.string.substring(0, this.typeIndex);

            if (w.frameCount % this.delay === 0) {
                if (!this.deleted) {
                    if (this.dir === "del") {
                        this.delay = 1
                        this.typeIndex--;
                    }
                }

                if (!this.complete) {
                    if (this.dir === "type") {
                        this.delay = 3
                        this.typeIndex++;

                    }
                }
            }
            let showCursor = "";
            if (w.frameCount % 40 < 20) {
                if (this.complete && this.dir == "type" && this.c1) {
                    showCursor = "";
                } else {
                    showCursor = "_";
                }
            }
            w.text(currentText + showCursor, this.x, this.y, this.w, this.h);

            if (this.typeIndex > this.string.length) {
                this.complete = true;
            }
            if (this.typeIndex < 0) {
                this.deleted = true;
            }
        }

        flip() {
            if (this.dir === "type") {
                this.dir = "del";
            } else {
                this.dir = "type";
            }
        }
    }

}

let quarkSketch = (w) => {

    w.setup = () => {
        font = w.loadFont("../qr_sketches/whiterabbit.ttf");
        let myCanvas = w.createCanvas(575, 248);

        myCanvas.parent("quark-container");
        w.textWrap(w.CHAR);

        w.textFont(font);

        w.textSize(32);
        w.fill(0, 255, 0);
        rando = loadRando();
    }

    const loadRando = () => {
        let ranArr = [];
        for (let i = 0; i < 68; i++) {
            ranArr.push(String.fromCharCode(w.floor(w.random(33, 125))));
        }
        return ranArr.join("");
    };
    let string = `dG8gc2VlIHNvbWV0aGluZyBjb29sLCBzY2FuIHRoaXMgcXIgY29kZS4uLiBvciBkb250`;
    let rando = "";
    let completeTimer = 200;
    w.draw = () => {
        w.background(0);
        w.rect(20, 20, 200, 200);
        if (w.frameCount % 2 === 0) {
            let tempRan = [];
            for (let i = 0; i < string.length; i++) {
                if (string[i] != rando[i]) {
                    tempRan.push(String.fromCharCode(w.floor(w.random(33, 125))));
                } else {
                    tempRan.push(string[i]);
                }
            }
            rando = tempRan.join("");
        }
        w.text(rando, 240, 70, w.width / 1.75, w.height);
        if (string === rando) {
            completeTimer++;
        }

        if (completeTimer > 400) {
            rando = loadRando();
            completeTimer = 0;
        }
    }

}



let wave = new p5(waveSketch);
let torus = new p5(torusSketch);
let cube = new p5(cubeSketch);
let audio = new p5(audioSketch)
let code = new p5(codeSketch)
// let quark = new p5(quarkSketch)

