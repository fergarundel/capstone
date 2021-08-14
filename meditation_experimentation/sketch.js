let ellipseSize=10;
let originalFreq=50;
let wave;
let wave2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  wave = new p5.Oscillator();
  wave2 = new p5.Oscillator();

  wave.setType('sine');
  wave.start();
}

function draw() {
  background(135,206,250);
  noStroke();
  fill (240,240,250);
  ellipse(mouseX,mouseY,ellipseSize);
  wave.amp(1);
  wave.freq(originalFreq);

  if (mouseIsPressed){
    ellipseSize++;
    originalFreq=originalFreq+0.5;  
  } else {
    if (ellipseSize>10){
      ellipseSize=ellipseSize-2;}
      if (originalFreq>50){
        originalFreq=originalFreq-1;}
  }
}

