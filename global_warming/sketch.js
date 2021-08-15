let originalFreq=50;
let wave;

function preload(){
  img = loadImage ('globalcore.png');
  mono = loadFont ('ChampagneSocialist-Mono.otf')
}

function setup() {
  createCanvas(windowWidth,3400);
  textFont(mono);

  wave = new p5.Oscillator();
  wave.setType('sine');
  wave.start();
}

function mouseWheel(event){
  if (event.delta>0 && originalFreq<500){
    originalFreq = originalFreq + 2
  } 

  if (event.delta<0 && originalFreq>50){
    originalFreq = originalFreq - 2
  } 
}

function draw() {
  background(33,113,181);
  image(img,0,200,windowWidth,3200);

  wave.amp(1);
  wave.freq(originalFreq);

  fill(255);
  textSize(14);
  text('Global Temperature Change (1850-2019)',width/50,height/80);
  text('Temperature rise to date has already resulted in profound alterations to human and natural systems, including increases in droughts, floods, and some other types of extreme weather; sea level rise; and biodiversity loss – these changes are causing unprecedented risks to vulnerable persons and populations.',width/50,height/45,600);
  push()
  textSize(10);
  text('Intergovernmental Panel on Climate Change, Special Report: Global Warming',width/50,height/19,600);
  pop();
  
}

