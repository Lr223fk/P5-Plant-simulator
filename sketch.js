let growth = 0; // check the growth stage
let questionNum = 0; // which question is displayed
let goodScore = 0; // grows a bit after a constant yes
let badScore = 0; // dies after constant no
let plantDied = false; // check if died
let complete = false; // check if end of questions
let noLooping = 0; // thers loopi issue stops

let questions = [
  ["Curious if your sustainability habits help you grow?\nRelate your answers to this week", 1, -1],
  ["Did you recycle at least once this week?", 1, -1],
  ["Did you buy anything with plastic packaging?", -1, 1],
  ["Did you mostly cycle or walk to get to places?", 1, -1],
  ["Did you use natural light instead of switching on lights?", 1, -1],
  ["Did you reuse or repurpose anything?", 1, -1],
  ["Did you turn off your tap while brushing teeth or doing dishes?", 1, -1],
  ["Did you eat any locally sourced or plant-based meals?", 1, -1],
   ["Have you been using a resuable bottle?", 1, -1],
   ["Did you bring your own bag to the supermarket?", 1, -1],
   ["Did you buy from any fast fashion brands this week?", -1, 1],
   ["Have you had a shower longer than 7mins?", -1, 1],
   ["Do you use paper to make notes?", -1, 1],
   ["Have you thrown out any food?", -1, 1],
   ["Have you driven anywhere shorter than 30mins?", -1, 1],
   ["Do you own any one use items,e.g. plastic gloves?", -1, 1],
    ["Have you familized yourself with the effects of climate change?", 1, -1],
   ["Are you at all considering livng a more sustainable life?", 1, -1]
];

let buttonY;
let buttonN;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  textSize(20);

  buttonY = createButton("Yes");
  buttonN = createButton("No");
  buttonY.position(150, 450);
  buttonN.position(400, 450);
  buttonY.mousePressed(() => nextQ("yes")); //go to next question
  buttonN.mousePressed(() => nextQ("no")); // same as above
  
  buttonY.style ("border-radius", "20px");
  buttonY.style ("width", "50px");
  buttonY.style ("height","30px");
  buttonY.style("background-color", "green");
  buttonY.style("border","green");
  buttonY.style("cursor","pointer");
  
  buttonN.style ("border-radius", "20px");
  buttonN.style ("width", "50px");
  buttonN.style ("height","30px");
  buttonN.style("background-color", "green");
  buttonN.style("border","green");
  buttonN.style("cursor","pointer");
  
   buttonY.mouseOver(() =>{
    buttonY.style ("opacity", "0.7");
  });
  
   buttonY.mouseOut(() =>{
    buttonY.style ("opacity", "1");
  });
   buttonN.mouseOver(() =>{
    buttonN.style ("opacity", "0.7");
  });
  
   buttonN.mouseOut(() =>{
    buttonN.style ("opacity", "1");
  });
}

function draw() {
  background(255,255,100);
  fill(40, 59, 25);
  textSize(18);
  
  randomSeed(100);

  // check plants state and coresspondnes accordingly 
  if (plantDied) {
    text(" Plant died! Fix your habits and come back next week.", width / 2, 50);
  } else if (complete) {
    let display;
    if (growth == 0 || growth == 1) {
      display ="Could be better! Fix your habits and come back next week.";
    } else if (growth == 2) {
      display="Nearly there! Fix your habits and come back next week.";
    } else if (growth== 3 || growth == 4 || growth == 5){
      display="Awesome! If you keep this up you'll see progress next week!";
    }else if (growth >=6 && growth <=11){
      display="Fantastic! Keep up the work your habits are helping you grow!"
    }else if (growth >= 12 && growth <= 18){
      display="Spectacular! Your habits are really helping you grow!"
    }
    text("Thank you!\n" + display, width/2,50);
  } else {
    text(questions[questionNum][0], width / 2, 50);
  }
  drawPlant(growth, plantDied);
}

function nextQ(answer) {
  if (plantDied || complete) return;


  //let state = questions[questionNum][answer];
  
  //if (state == "yes") {
   // resultAffect[1];
 // } else {
  //  resultAffect[2];
 // }



//function resultAffect(option) { // how answer will affect the growth
 // if (plantDied || complete) return;
  let grow 
  if(answer == "yes"){
    grow= questions[questionNum][1];
  }else{
    grow=questions[questionNum][2];
  }

  if (grow == 1) {
    goodScore++;
    badScore = 0;
    if (goodScore >= 3 ) {
      growth = constrain (growth + 1, 0, 18);
      //growth++;
     // goodScore = 0;
      noLooping = floor(random(1000));
    }
  } else if(grow == -1) {
    badScore++;
    goodScore = 0;
    if(badScore >=6){
      plantDied = true;
    }
  }
questionNum++;
  if (questionNum >= questions.length && ! plantDied) {
    complete = true;
  }
}

 // if (badScore >= 3) {
 //   plantDied = true;



function drawPlant(size, died) {
  push();
  translate(width / 2, height / 2 + 100);
  //Plant pot
  fill(207,146,72);
  beginShape();
  vertex(-75, 0);
  vertex(-50, 100);
  vertex(50, 100);
  vertex(75, 0);
  endShape(CLOSE);
  beginShape();
  vertex(-100, -25);
  vertex(100, -25);
  vertex(100, 0);
  vertex(-100, 0);
  endShape(CLOSE);

  //dead plant stem
  if (died) {
    stroke(80);
    line(0, -25, 0, -80);
    pop();
    return;
  }

  // growing ste,m
  stroke(22, 255, 0);
  strokeWeight(3);
  line (0, -25, 0, -125);
  //line(0, -25, 0, -125 - size * 25);

  //growing deatures
  if (size >= 1) {
   // noLoop();
    // stroke(150,0,0);
    strokeWeight(3);
    for(let i =0; i<4; i++){
      let angle;
      if(i<2){
        angle = random (-PI/3, -PI/6-8);
      }else{
        angle = random(PI/6, PI/3);
      }
      let l = random(10,25);
      let x1= 0;
      let x2= x1 + cos(angle)*l;
      let y1 = -50 - i*20;
      let y2= y1 + sin(angle)*l;
   line(x1,y1,x2,y2);
  }
     }
  
  if (size >= 2) {
    
    fill(random(255));
    noStroke();
    for(let a=0; a<5; a++){
      let ang = random(TWO_PI);
    let x = random(-20, 20);
      let y = random(-150, -160);
      let w = random(30,50);
      let h = random(30,50);
      fill(random(255),random(255),random(255));
      ellipse(x,y,w,h);
     // rect(x,y,w,h);
    }
  }
      
  if (size >= 3) {
  fill(random(255));
    for(let b=0; b< 10; b++){
    let xx = random(-100, 10);
    let yy = random(-220, -140);
    let ww= random(50,75);
    let hh= random(50,75);
    fill(random(255), random(255),random (255),150);
    ellipse(xx,yy, ww, hh);
    rect (xx,yy,ww,hh);
    }
  }
  if (size >=6){
    
    for(let c=0; c<12; c++){
      let xX = random(-200, 80);
      let yY = random (-250, -100);
      fill(random(255), random(255),random(255), 105);
      ellipse(xX,yY, 75,80);
      rect(xX, yY, 50, 50);
    }
  }
  if(size >= 12){
    fill(102,61,25);
    stroke(102,61,25);
  strokeWeight(5);
    triangle(-5,-25, 5, -25, 0, -125);
  }
  pop();
}