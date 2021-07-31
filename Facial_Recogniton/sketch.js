let faceapi;
let detections = [];

let video;
let canvas;

function setup() {
  canvas = createCanvas(480, 360);
  canvas.id('canvas');

  video = createCapture(VIDEO);
  video.id('video');
  video.size(480, 360);

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
    minConfidence: 0.5
  };

  faceapi = ml5.faceApi(video,faceOptions,faceReady);
}

function faceReady (){
  faceapi.detect(gotFaces);
}

function gotFaces(error, result){
  if (error){
    console.log(error);
    return;
  }

  clear();
  detections = result;
  console.log(detections);
  faceapi.detect(gotFaces);

  drawBoxes(detections);
  drawLandmarks(detections);
  drawExpressions(detections,20,250,14)
}

function drawBoxes (detections){
  if (detections.length > 0){
    for (let f=0;f < detections.length; f++){
      let x = detections[0].alignedRect._box._x;
      let y = detections[0].alignedRect._box._y;
      let rectWidth = detections[0].alignedRect._box._width;
      let rectHeight = detections[0].alignedRect._box._height;

    stroke (255,0,255);
    strokeWeight(2);
    noFill();
    rect (x,y,rectWidth,rectHeight);
    }
  }
}

function drawLandmarks (detections) {
  if (detections.length > 0){
    for (f=0; f < detections.length; f++){
      let points = detections[f].landmarks.positions;
      for(let i=0; i<points.length;i++){
        stroke(255);
        strokeWeight(3);
        point(points[i]._x,points[i]._y)

      }
    }
  }
}

function drawExpressions (detections,x,y,textYspace){
  textSize(14);
  noStroke();
  fill(255);

  if (detections.length > 0){
    let {neutral,happy,angry,sad,disgusted,surprised,fearful}
    = detections[0].expressions;

    text("neutral:" + nf(neutral * 100,2,2) + "%", x, y);
    text("happy:" + nf(happy * 100,2,2) + "%", x, y+textYspace);
    text("angry:" + nf(angry * 100,2,2) + "%", x, y+textYspace*2);
    text("sad:" + nf(sad * 100,2,2) + "%", x, y+textYspace*3);
    text("disgusted:" + nf(disgusted * 100,2,2) + "%", x, y+textYspace*4);
    text("surprised:" + nf(surprised * 100,2,2) + "%", x, y+textYspace*5);
    text("fearful:" + nf(fearful * 100,2,2) + "%", x, y+textYspace*6);
  } else {
    text("neutral:", x, y);
    text("happy:", x, y+textYspace);
    text("angry:", x, y+textYspace*2);
    text("sad:", x, y+textYspace*3);
    text("disgusted:", x, y+textYspace*4);
    text("surprised:", x, y+textYspace*5);
    text("fearful:", x, y+textYspace*6);
  }
}