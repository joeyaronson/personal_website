setup = () => {
    let myCanvas = createCanvas(100, 100, WEBGL);
    myCanvas.parent("wave-container");

    rectMode(CENTER);
    angleMode(DEGREES);
    SIZE = width / 30;
    loadTiles();
}
let t = [];
let H = 10;
let D = 200;
let SIZE;
let fc = 0;
draw = () => {
    background(0);
    rotateX(3500);
    rotateZ(fc *50)

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
        stroke(0,255,0);
        fill(0);
        push();
        let x = -width / 4 + this.x * (SIZE)
        let y = -width / 4 + this.y * (SIZE)

        translate(x, y, this.z);
        rotateX((this.z + fc) *50)
        rotateY((this.z + fc)*100);
        box(SIZE, SIZE, SIZE / 5);

        pop();

    }
    move() {
        this.d = dist(0, 0, -width / 4 + this.x * (SIZE), -width / 4 + this.y * (SIZE));
        this.z += sin(this.d + fc)
    }
}

loadTiles = () => {
    let count = width / 2 / SIZE;
    for (let i = 0; i <= count; i++) {
        for (let j = 0; j <= count; j++) {
            t.push(new Tile(i, j, i));
        }
    }
}


pad = (a, b) =>
    (1e15 + a + "").slice(-b)