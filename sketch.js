var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6,r;

var newImage;

var score=0;

var PLAY=1;
var END =0;
var gameState = PLAY;

var gameOver, restart, gameOverSign, restartButton;

var obstacles;
var clouds;

var jump, die, checkpoint;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  
  gameOver = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  
  obstacles=new Group();
  clouds=new Group();
  
  gameOverSign=createSprite(300,100,10,10);
  gameOverSign.addImage(gameOver);
  gameOverSign.scale=0.5;
  gameOverSign.visible=false
    
  restartButton=createSprite(300,120,10,10);
  restartButton.addImage(restart);
  restartButton.scale=0.4;
  restartButton.visible=false
  
  
  
  trex.setCollider("circle",0,0,40);
}

function draw() {
  background(180);

  trex.collide(invisibleGround);
  
  text("Score:" + score, 500,50);
  
  
  console.log(trex.y)
  
  if(gameState===PLAY){
      
     ground.velocityX = -(6+score*4/100);
    
    if(score%100===0 && score>0){
      checkpoint.play(); 
      
    }
    //score = score + Math.round(getFrameRate()/60);
    
    if (frameCount%5===0){
      score++;
    }
    
    if(keyDown("space")&& trex.y >= 161.5) {
      trex.velocityY = -12;
      jump.play();
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
  
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    spawnClouds();
    spawnObstacle();
    
    if(obstacles.isTouching(trex)){
     gameState=END;
     die.play();
    
    }
    
    
    
    
  }
  else if(gameState===END){
    ground.velocityX=0;
    
    trex.velocityY=0;
    trex.changeAnimation("collided", trex_collided);
    
    clouds.setVelocityXEach(0);
    obstacles.setVelocityXEach(0);
    
    clouds.setLifetimeEach();
    obstacles.setLifetimeEach();
    
    gameOverSign.visible=true;
    restartButton.visible=true;
  }
  
  if(mousePressedOver(restartButton)){
    reset(); 
  }
  
  drawSprites();
}

function spawnObstacle(){
  if (frameCount % 80 === 0){
    var cactus = createSprite(600,170,10,10);
    r=Math.round(random(1,6));
    switch(r){
      case 1: cactus.addImage(cactus1);
      break;
      case 2: cactus.addImage(cactus2);
      break; 
      case 3: cactus.addImage(cactus3);
      break;
      case 4: cactus.addImage(cactus4);
      break;
      case 5: cactus.addImage(cactus5);
      break;
      case 6: cactus.addImage(cactus6);
      break;
      default:break;
    }
    
    cactus.velocityX = -(6+score*4/100);
    cactus.scale=0.5;
    
    cactus.lifetime=150;
    
    obstacles.add(cactus);
  }
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -(3+score*4/100);
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    clouds.add(cloud);
    }
}

function reset(){
   score=0;
   trex.changeAnimation("running",trex_running);
   obstacles.destroyEach();
   clouds.destroyEach();
   gameState=PLAY;
   gameOverSign.visible=false;
   restartButton.visible=false;
   
}


