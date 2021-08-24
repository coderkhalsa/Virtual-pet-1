//Create variables here
var oreo,oreoImg,happyImg,database
var food
var foodStock
function preload()
{
	//load images here
  oreoImg= loadImage("images/dogImg.png")	
happyImg = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(800, 700);
  database= firebase.database()
  oreo = createSprite(250,300,150,150)
  oreo.addImage("hungry",oreoImg)
  oreo.addImage("happy",happyImg)
  oreo.scale= 0.15
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)

}


function draw() {  
background(46,139,87)
if(keyWentDown(UP_ARROW)){
  writeStock(food)
  oreo.changeImage("happy",happyImg)
}
textSize(20)
fill(255,255,254)
stroke("black")
text("food remaining: "+food,170,200)
textSize(13)
text("note: Press UP arrow kry to feed Oreo",130,20)

  drawSprites();
  //add styles here

}

function readStock(data){
  food = data.val()

}
function writeStock(x){
  if(x<= 0){
    x=0
  } else{
    x= x-1
  }
  database.ref("/").update({
   "Food":x 
  })
}


