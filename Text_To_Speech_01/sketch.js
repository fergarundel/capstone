let speechRec = new p5.SpeechRec();
speechRec.continuous = true;
speechRec.interimResults = true;
speechRec.start();

function preload(){
  Champagne = loadFont('assets/ChampagneSocialist-Mono.otf')
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  textFont(Champagne);
  textSize (48);
  textAlign(CENTER);
  fill (255);
}

function draw(){
  background (255,69,0);
  
  if (speechRec.resultValue){
    text (speechRec.resultString, width/2, height/2);}
}