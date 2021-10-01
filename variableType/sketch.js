let poseNet;
let pose;
let video;

let VariableWidth=18;
let easing = 0.08;

function setup() {
  createCanvas (window.innerWidth,window.innerHeight);
  
  p = createP('the quick brown<br>fox jumps over<br>the lazy dog');

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
  background(0);



  
  let posX = 0;
  let posY = height/7.5;
  
  let fts = 120;
  
  if (pose){
    // strokeWeight (10)
    // stroke(255,0,0);
    // image(video,100,100);
    // line (pose.leftWrist.x+100,pose.leftWrist.y+100,pose.rightWrist.x+100,pose.rightWrist.y+100)

    let d = dist(pose.leftWrist.x,pose.leftWrist.y,pose.rightWrist.x,pose.rightWrist.y)
   
    if (d>300){
      if (VariableWidth<58){
        let maxTarget=58
        let dx = maxTarget - VariableWidth
        VariableWidth += dx * easing
      }
    }

    if (d<100){
      if (VariableWidth>1){
        let minTarget=1
        let dx = minTarget - VariableWidth
        VariableWidth += dx * easing
      }
    }

    p.elt.style['font-variation-settings'] = `"wdth" ${VariableWidth}`;
  }

  p.style('font-size' ,fts+'px');
  p.style('align', 'center');
  p.position(posX,posY);
}
