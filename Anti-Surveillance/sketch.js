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
}

function drawBoxes (detections){
  if (detections.length > 0){
    for (let f=0;f < detections.length; f++){
      let x = detections[0].alignedRect._box._x;
      let y = detections[0].alignedRect._box._y;
      let rectWidth = detections[0].alignedRect._box._width;
      let rectHeight = detections[0].alignedRect._box._height;

    strokeWeight(2);
    fill(0);
    rect (x,y,rectWidth,rectHeight);
    }
  }
}