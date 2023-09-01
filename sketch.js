// "Microcosm" -- 13/01/2023--Jieshan Li
//One of the diagnostic features of the interior of a natural Burmese ruby, where nature and modern time exist in the same space-time, is revealed to mankind by simulating a virtual time-shift.
//feferences:the effect of dots. 


let bg;
let playBool = true;
let cloud = []; 
let spectrum;//on a spectrum of raindrops
let t = 0;//temporal being
let n = 50;//or beings
function preload() {//and think of before
  bg = loadImage('1655976837041797.jpeg')
}

function setup() {
  
  cloud = [];
  angleMode(DEGREES);
  c = min(windowWidth, windowHeight)*0.9;//and yet your drops can paint
  createCanvas(c, c);//this canvas
  background(bg);
  ear = new p5.FFT(); 
  spectrum = ear.analyze();
  for (let i = 0; i < spectrum.length; i++) {
    cloud.push(new drops());
  }
}

function draw() {
  translate(width / 2, height / 2);
  //background(202, 230, 209, 100);
  if (playBool) {
    t += 0.0001;
  } else {
    
  }
  rotate(t);
  //background(200 + 255 * cos(t), 255 + 255 * cos(t), 255 + 255 * cos(t), 10);
  soundProcess();
}

function soundProcess() {
  masking();
  spectrum = ear.analyze();
  waves = ear.waveform();
  for (let i = 0; i < spectrum.length; i += 10) {
    cloud[i].display(spectrum[i] / 10, waves[i]);
  }
}

class drops {
  constructor() {
    this.L = random(0, c / 5);
    this.R = random(this.L+100, c );
    this.R1 = this.R;
    this.theta = random(360);
    this.x = this.R * sin(t + this.theta);
    this.y = this.R * cos(t + this.theta);
    this.t = random(360);
    this.r = 0;
  }
  display(dt, w) {
    noStroke();
    let d = dist(0, 0, this.x, this.y);
    if (d > this.L) {
      this.t +=0.2+abs(w)*2;
      fill(24+10*abs(cos(t/5)), 48+10*abs(cos(t/20)), 87+10*abs(cos(this.t/10)));
      this.R-=0.1
      this.x = this.R * sin(this.t + this.theta);
      this.y = this.R * cos(this.t + this.theta);
      circle(this.x, this.y, 2+w*5+dt/2);
    }
    if (d < this.L && this.r < c / 3) {
      noFill();
	
      stroke(24+10*abs(cos(t/5)), 48+10*abs(cos(t/20)), 87+10*abs(cos(this.t/10)), 5+dt/4);
      strokeWeight(0.3);
      this.r += 0.1;
      for (let i = 0; i < min(100, int(this.r)); i++) {
        circle(this.x, this.y, i * 2);
      }
    }
    if (this.r >= c / 4) {
      this.L = random(0, c / 4);
      this.R = random(this.L+100, c*2 );
      this.R1 = this.R;
      this.theta = random(360);
      this.x = this.R * sin(t + this.theta);
      this.y = this.R * cos(t + this.theta);
      this.t = 0;
      this.x1 = this.x;
      this.y1 = this.y;
      this.r = 0;
    }
  }
}
function masking() {
  fill(255);
  rd = c / 3;
  beginShape();
  for (let i = 0; i <= 180; i++) {
    x = rd * cos(i);
    y = rd * sin(i);
    vertex(x, y);
  }
  vertex(-width, 0);
  vertex(-width, height);
  vertex(width, height);
  vertex(width, 0);
  endShape(CLOSE);
  beginShape();
  for (let i = 179; i <= 361; i++) {
    x = rd * cos(i);
    y = rd * sin(i);
    vertex(x, y);
  }
  vertex(width, 0);
  vertex(width, -height);
  vertex(-width, -height);
  vertex(-width, 0);
  endShape(CLOSE);
  stroke(0);
  strokeWeight(1);
  noFill();
}
