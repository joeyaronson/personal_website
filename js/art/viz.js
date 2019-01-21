var mic, fft;

var size;

var rot;

var size2;

var rot2;

function setup() {
	
    mic = new p5.AudioIn();
    mic.start();
	  fft = new p5.FFT();
    fft.setInput(mic);
  
    amplitude = new p5.Amplitude();
    background(0);
    angleMode(DEGREES);
    colorMode(HSB, 300);
    rectMode(CENTER);
    createCanvas(windowWidth, windowHeight);

    //noFill();
    size = 1000;
    rot = 0;
    size2 = 1000;
    rot2 = .25;
}

function draw() {
    if (mic.enabled) {
        tri(width / 2, height / 2, size);

        //circ(500,500,size2);
        size += 10;

        if (size > 3000) {
            size = 2000;
        }

        size2 += 8;

        if (size2 > 3000) {
            size2 = 2000;
        }

        // background(frameCount%300,300,300,100);
        var spectrum = fft.analyze();

        //beginShape();
        noStroke();

        for (i = 0; i < spectrum.length; i += 10) {
            let freq = map(spectrum[i], 0, 255, 5, height / 3);
            fill(300 - freq - 30, 500, 300);

            for (let j = height / 2 - freq; j < height / 2 + freq; j += 10) {
                fill((freq + j + frameCount) % 300, 300, 300);
                rect(width / 2 - i * (width / 2) / spectrum.length + 10, j, 10, 10);
            }

            for (let j = height / 2 - freq; j < height / 2 + freq; j += 10) {
                fill((freq + j + frameCount) % 300, 300, 300);
                rect(width / 2 + i * (width / 2) / spectrum.length, j, 10, 10);
            }
        }

        //endShape();
        for (let i = 0; i < 8; i ++) {
            fill(300, 200);
            strokeWeight(5);
            stroke(0);
            translate(width / 9 + i * width / 9, height / 8);
            arc(0, 0, width / 10, width / 10, 180, 0, CHORD);
            let lvl = map(spectrum[i * 10], 0, 255, -85, 80);
            strokeWeight(2);

            //let lvl = map(level,0,1,-80,200);
            rotate(lvl);
            colorMode(RGB);
            fill(300 - 200 + (-lvl * 2), 300, 300);

            if (lvl >= 50) {
                fill(128, 0, 0);
            } else if (lvl >= 30) {
                fill(255, 0, 0);
            } else if (lvl >= -10) {
                fill(255, 200, 0);
            } else if (lvl >= -30) {
                fill(190, 255, 0);
            } else if (lvl >= -60) {
                fill(100, 255, 0);
            } else {
                fill(0, 255, 0);
            }

            rect(0, -width / 40 + 20, 10, width / 20 - 10, 5);
            ellipse(0, 0, 20, 20);
            resetMatrix();
            colorMode(HSB, 300);
        }
    }
}

function tri(x, y, s) {
    //stroke(r,g,b);
    stroke(0, 0, 0);
    translate(x, y);
    strokeWeight(s / 10);
    ellipse(0, 0, s);
    resetMatrix();

    if (s > 100) {
        tri(x, y, s / 1.5);
    }
}