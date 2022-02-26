
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var bg_Img, bg,bg_sound
var boy_Img ,boy
var splash_Img,water,splash_sound
var plane_img ,plane,plane_cut_sound
var boat_Img,boat
var paracute , landing,landing_sound
var wind_sound
var mute

function preload() {
 
 boat_Img = loadImage("boat.png")

landing=loadAnimation("boy.png")
parachute=loadAnimation("boy_with_parachute.png")
boat_Img = loadImage("boat.png")
 splash_Img=loadImage("water_splash.png")
 planeImg=loadImage("aeroplane.png")
 bg_Img = loadImage("sea.jpg")
 bg_sound=loadSound("background.mp3")
 splash_sound=loadSound("splash.mp3")
 plane_cut_sound=loadSound("cut.mp3")
 landing_sound=loadSound("happy.wav")
 wind_sound=loadSound("air.wav")
}

function setup() {
  createCanvas(4000,4000);
  //bg_sound.play()
  boat = createSprite(100,900,1300,20);
  boat.addImage('boat1', boat_Img)
  boat.velocityX=0.4

  boy= createSprite(80,100,20,20)
  boy.addAnimation('flying',paracute)
  boy.addAnimation('land',landing)
  boy.changeAnimation('flying')
  
  plane=createSprite(150,200,50,50)
  plane.addImage('plane1', planeImg)

  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  sea = new Sea(300,350,350,20);
  boy_con = new Link(aeroplane,boy);

  engine = Engine.create();
  world = engine.world;
}

function draw() {
 //background();
 
 if(collide(boy,boat)==true)
 {
   World.remove(engine.world,boy );
   boy = null;
   boy.changeAnimation('land');
   landing_sound.play()

}

if(collide(boy,boat)==true)
{
  World.remove(engine.world,boy );
  boy = null;
  boy.changeAnimation('land');
  water.addImage('splashes',splashes_Img)
  splash_sound.play()
   
 }

//calling the winds
 if(keyCode===LEFT_ARROW){
  windLeft()
  wind_sound.play()
}
if(keyCode===RIGHT_ARROW){
 windRight()
wind_sound.play()
}
//detatch the boy
if(keyCode===SPACE){
 boy_con.dettach();
 boy_con = null; 
 boy.velocityY= -2
 plane_cut_sound.play()
}

// making the boat move backwards so that it remains in the sea
if (boat,x=== 50){
 boat.velocityX=-0.4
}
drawSprites();
}

function windLeft(){
Matter.Body.applyForce(boy,{x:0,y:0},{x:0.03,y:0})
}

function windRight(){
Matter.Body.applyForce(boy,{x:0,y:0},{x:-0.03,y:0})
 }


