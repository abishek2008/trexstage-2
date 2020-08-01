var trex,trexanimation,ground,groundimage,invisbleground,cloudimage,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstale6,cloudgroup,obstaclegroup,PLAY,END,gameState,trexanimationend,gameoverimage,restartimage,gameover,restart;

function preload(){
  trexanimation=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  groundimage =loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  trexanimationend=loadAnimation("trex_collided.png");
  gameoverimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  
  trex = createSprite(200,150,10,10);
  trex.addAnimation("t1",trexanimation);
  trex.addAnimation("a1",trexanimationend);
  trex.scale=0.5;
  
  ground = createSprite(200,180,10,10);
  ground.addImage("g1",groundimage);
  
  gameover=createSprite(300,80,10,10);
  gameover.addImage("s1",gameoverimage);
  gameover.scale=0.5;
  gameover.visible=false;
  
  restart=createSprite(300,120,10,10);
  restart.addImage("d1",restartimage);
  restart.scale=0.5;
  restart.visible=false;
  
  invisbleground= createSprite(200,190,400,10);
  invisbleground.visible=false;
  
  cloudgroup=new Group();
  obstaclegroup=new Group();
}

function draw() {
  background("black");
  
  if(gameState===PLAY){
 
    ground.velocityX=-3;
  
    if(obstaclegroup.isTouching(trex)){
      gameState=END;
    }
    
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  console.log(trex.y);
  
  if((keyDown("space"))&& trex.y>161){
    
     trex.velocityY=-12;
     }
  
  spawnClouds();
  spawnObstacles();
  
  trex.velocityY=trex.velocityY+1;
  }
  else if(gameState===END){
    ground.velocityX=0;
    trex.velocityY=0;
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    trex.changeAnimation("a1",trexanimationend);
    gameover.visible=true;
    restart.visible=true;
  }
  trex.collide(invisbleground);
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    
    cloud.y = Math.round(random(80,120));
    cloud.addImage("c1",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud);
  }

}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      
      case 2:obstacle.addImage(obstacle2);
      break;
      
      case 3:obstacle.addImage(obstacle3);
      break;
      
      case 4:obstacle.addImage(obstacle4);
      break;
      
      case 5:obstacle.addImage(obstacle5);
      break;
      
      case 6:obstacle.addImage(obstacle6);
      break;
      
      default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200
    obstaclegroup.add(obstacle);
  }
}