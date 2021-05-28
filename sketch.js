
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var PLAY;
var END ;
var WIN;
var HOME;
var HOWTOPLAY;
var won;
var gameState = "HOME";
var score=0;
var blastGroup,monster1Group,monster2Group,monster3Group,monster4Group;
var ship,shipImg,monsterImg,blastImg,fire;
var monster1,monster2,monster3,monster4,youloose,home,howtoplay,backgr; 

function preload()
{
	shipImg = loadImage("ship.png");
	monsterImg = loadImage("monster.png");
	blastImg = loadImage("blast.png");
	fire = loadImage("fireblast.png");
	won = loadImage("youwin.png");
	youloose = loadImage("youloose.png");
	home = loadImage("home.png");
	howtoplay = loadImage("howtoplay.png");
}

function setup() {
createCanvas(displayWidth,displayHeight);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
ship = createSprite(displayWidth/2,displayHeight-200,30,30);

backgr = createSprite(displayWidth/2,displayHeight/2,30,30);
monster1Group = createGroup();
monster2Group = createGroup();
monster3Group = createGroup();
monster4Group = createGroup();

blastGroup = createGroup();

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(rgb(15, 25, 38));


if(gameState==="HOME"){
	backgr.addImage(home);
     backgr.scale = 2
	 if(keyDown('space') && gameState==="HOME"){
		 gameState="HOWTOPLAY"
	 }
}
if(gameState==="HOWTOPLAY"){
	backgr.addImage(howtoplay);
     backgr.scale = 2
	 if(keyDown(UP_ARROW) && gameState==="HOWTOPLAY"){
		 gameState="PLAY"
	 }
}
  
  if(gameState === "PLAY"){
ship.visible = true;
	spwanmonster1();
	spwanmonster2();
	spwanmonster3();
	spwanmonster4();
	ship.addImage(shipImg);
ship.scale = 0.4;
backgr.visible=false
   
   textSize(20);
   fill("yellow");
   text ("Score: "+score,50,150);

   if(keyWentDown("space")){
	var blast = createSprite(0,350,10,10);
	blast.addImage(blastImg);
	blast.scale = 0.7;
	blast.x = ship.x;
	blast.velocityY = -10;
	blast.lifeTime = 200;
	blastGroup.add(blast);
	}
   
  if (score===10){
	  gameState="WIN";
  }
   edges = createEdgeSprites() ; 
  ship.bounceOff(edges[0]); 
  ship.bounceOff(edges[1]);
 
   
   
   if (keyDown("right")) {
   ship.x+=10;  
   }
   
  if (keyDown("left")) {
   ship.x-=10;  
   }


   if(blastGroup.isTouching(monster1Group)){
	   monster1Group.destroyEach();
	   monster1.addImage(fire);
	   score+=1
	   blastGroup.destroyEach();
   }

   if(blastGroup.isTouching(monster2Group)){
	monster2Group.destroyEach();
	monster2.addImage(fire);
	blastGroup.destroyEach();
	score+=1
}


if(blastGroup.isTouching(monster3Group)){
	monster3Group.destroyEach();
	monster3.addImage(fire);
	blastGroup.destroyEach();
	score+=1
}

if(blastGroup.isTouching(monster4Group)){
	monster4Group.destroyEach();
	monster4.addImage(fire);
	blastGroup.destroyEach();
	score+=1
}





   if(monster1Group.isTouching(ship) || monster2Group.isTouching(ship) || monster3Group.isTouching(ship)||
   monster4Group.isTouching(ship)){
	   gameState = "END"
	   score=0;
 }
  }
  
   if (gameState === "END"){
	   backgr.visible=true;
	   backgr.addImage(youloose)
	   backgr.scale=1
	 monster1Group.destroyEach();
	 monster2Group.destroyEach();
	 monster3Group.destroyEach();
	 monster4Group.destroyEach();
	 ship.addImage(fire);
	 if(keyDown('space') && gameState==="END"){
		gameState ="PLAY"
	}
   }
   
   
   if(gameState==="WIN"){
	backgr.visible=true
	   backgr.addImage(won);
	   backgr.scale=2;
	   monster1Group.destroyEach();
	   monster2Group.destroyEach();
	   monster3Group.destroyEach();
	   monster4Group.destroyEach();
	   ship.visible = false
score=0;
	   if(keyDown('space') && gameState==="WIN"){
		   gameState ="PLAY"
	   }

   }
   
  drawSprites();
 
}


function spwanmonster1(){

	if (frameCount % 120 === 0) {
	 monster1 = createSprite(displayWidth/1.2,0,100,100);
	monster1.addImage(monsterImg);
	monster1.scale = 0.1;
	monster1.velocityY = 3;
	monster1.lifeTime=200;
	monster1Group.add(monster1);
}
}

function spwanmonster2(){

	if (frameCount % 100 === 0) {
	 monster2 = createSprite(displayWidth/1.6,0,100,100);
	monster2.addImage(monsterImg);
	monster2.scale = 0.1;
	monster2.velocityY = 3;
	monster2.lifeTime=200;
	monster2Group.add(monster2);
	}
}

function spwanmonster3(){

	if (frameCount % 150 === 0) {
		
	monster3 = createSprite(displayWidth/2.3,0,100,100);
	monster3.addImage(monsterImg);
	monster3.scale = 0.1;
	monster3.velocityY = 3;
	monster3.lifeTime=200;
	monster3Group.add(monster3);
	}
}

function spwanmonster4(){

	if (frameCount % 200 === 0) {
    monster4 = createSprite(displayWidth/6,0,100,100);
	monster4.addImage(monsterImg);
	monster4.scale = 0.1;
	monster4.velocityY = 3;
	monster4.lifeTime=200;
	monster4Group.add(monster4);

	}
}