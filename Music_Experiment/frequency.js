let analyzer, fft, song;

function preload(){
    song = loadSound ('data/oasis.mp3'); // associates the sound to variable
}

function setup() {
  createCanvas (windowWidth, windowHeight);
  background (0);
  
  analyzer = new p5.Amplitude(); 
  analyzer.setInput(song);
  fft = new p5.FFT(0, 128); 
  fft.setInput(song);
}

function draw() {
  var volume = analyzer.getLevel();
  var spectrum = fft.analyze();
  var low = fft.getEnergy("bass");
  //var l = map(low,
  var mid = fft.getEnergy("mid");
  var high = fft.getEnergy("treble");
  
  console.log(low);
  
  translate (width/2,height/2);
  background (0,8);
  stroke (low,0,high);
  strokeWeight (volume*8);
  
 let x1 = cos (radians(frameCount)*2.4) * 500;
 let y1 = sin (radians(frameCount)*1.6) * 300;
 let x2 = sin (radians(frameCount)*2.4) * 500;
 let y2 = cos (radians(frameCount)*1.6) * 300;
 
 line (x1,y1,x2,y2);

}

function mousePressed(){
  if (song.isPlaying()) {
    song.stop();
    song.noLoop();
  } else {
    song.play();
    song.loop();
  }
  }
