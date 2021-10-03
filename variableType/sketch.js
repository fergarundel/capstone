// let speechRec = new p5.SpeechRec();
// speechRec.continuous = true;
// speechRec.interimResults = true;
// speechRec.start();

// let originalFreq=50;
// let wave;

let poseNet;
let pose;

let VariableWidth=18;
let VariableSlant = 0;
let VariableWeight = 85;

let easing = 0.08;

function setup() {
  createCanvas (windowWidth,windowHeight);

  // wave = new p5.Oscillator();
  // wave.setType('sine');
  // wave.start();

  p = createP('embrace<br>the<br>machine');

  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose',gotPoses);
}

function modelLoaded(){
  console.log('poseNet Ready');
}

function gotPoses(poses){
  console.log(poses)
  if (poses.length > 0){
    pose = poses[0].pose ;  
  }
}

function draw() {
  // SPEECH RECOGNITON
  // if (speechRec.resultValue){ 
  //   p = createP(speechRec.resultString);
  // }
  
  let posX = 0;
  let posY = -height/5;

  print(width);
  
  if (pose){
    background(0);

    let handWidth = (pose.leftWrist.x-pose.rightWrist.x);
    let mapWidth = map(handWidth,30,500,1,58);

    let handWeight = ((pose.leftWrist.y+pose.rightWrist.y)/2-(pose.leftShoulder.y+pose.rightShoulder.y)/2);
    let mapWeight = map(handWeight,-120,175,69,125);

    let handSlant = pose.rightWrist.y-pose.leftWrist.y;
    let mapSlant = map(handSlant,-350,350,-25,25);
   
    if (mapWidth>1){
      let maxTarget=mapWidth
      let dx = maxTarget - VariableWidth
      VariableWidth += dx * easing
    } else {
      let maxTarget=mapWidth
      let dx = maxTarget - VariableWidth
      VariableWidth += dx * easing
    }

    if (mapWeight>69){
      let maxTarget=mapWeight
      let dx = maxTarget - VariableWeight
      VariableWeight += dx * easing
    } else {
      let maxTarget=mapWeight
      let dx = maxTarget - VariableWeight
      VariableWeight += dx * easing
    }

    if (mapSlant>-25){
      let maxTarget=mapSlant
      let dx = maxTarget - VariableSlant
      VariableSlant += dx * easing
    } else {
      let maxTarget=mapSlant
      let dx = maxTarget - VariableSlant
      VariableSlant += dx * easing
    }

    p.elt.style['font-variation-settings'] = `"wdth" ${VariableWidth},"slnt" ${VariableSlant},"wght" ${VariableWeight}`;  


    // let weightFreq = map(VariableWeight,69,125,106,50);

  // wave.amp(2);
  // wave.freq(weightFreq);

  }

  p.style('align', 'center');
  p.position(posX,posY);

}