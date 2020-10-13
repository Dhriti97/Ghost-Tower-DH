var towerImg, tower;
var doorImg, door, doorGroup;
var climberImg, climber, climberGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
 doorGroup=new Group();
  climberGroup= new Group();
  invisibleBlockGroup= new Group();
 
}

function draw(){
  background(0);
  
     if(gameState=== "play"){
       
     
      if(tower.y>400){
        tower.y=300;
      }

      if(keyDown("space")){
        ghost.velocityY=-5; 
      }

      if(keyDown("right")){
        ghost.x=ghost.x+3;
      }
      if(keyDown("left")){
        ghost.x=ghost.x-3;
      }
      ghost.velocityY=ghost.velocityY+0.8;
      
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;    
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
      spawnDoors();
     drawSprites();
     }
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
    
  }
     }

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
   var door=createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY=1;
    
    var climber=createSprite(200,10);
    climber.addImage(climberImg);
    
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    door.x=Math.round(random(120,400));
    climber.velocityY=1;
    ghost.depth=door.depth;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    ghost.depth +=1;
    climber.x=door.x;
    
    door.lifetime=800;
    climber.lifetime=800;
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

