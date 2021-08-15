let mobilenet;
let puffin;
let label = '';
let Mono;

function preload (){
  Mono = loadFont('ChampagneSocialist-Mono.otf');
}

function modelReady(){
  print ('model is ready yay');
  mobilenet.predict(gotResults);
}

function gotResults(error, results){
  if (error){
    console.error(error);
  } else {
    label = results[0].label;
    mobilenet.predict(gotResults);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture (VIDEO)
  video.hide();
  mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
  textFont(Mono);
}

function draw(){
  background (225)
  push();
  translate(width,0);
  scale(-1,1);
  image(video,width/3,height/4,width/3,width/4)
  pop();
  textAlign(CENTER);
  fill(0,0,255);
  textSize(64);
  text(label,width/2,height/2);
}