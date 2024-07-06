/*
The Game Project Part 4 - Sidescrolling

I wrote this code mostly without assistance except for the load/play sounds which I referenced
from P5.js examples under the sound catergory and also with reference from the videos on coursera
on how to do each part of the project and also from doing sleuth.

apologies but do take note that the html file only works when it is setup with a local server 
on p5.js due the browsers security implications:
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors.
*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var cameraPosX;

var isLeft; 
var isRight;
var isFalling;
var isPlummeting;
var isFound;

var canyon;
var collectable;
var clouds_x;
var cloud;
var mountains_x;
var mountainPos_y;
var trees_x;
var treePos_y;
var gravity;
var speed;

var sky;
var night;
let starX; 
let starY;
var day;

//declare variables for sound effects
let gameover;
let jump;
let morning;

// referenced from https://p5js.org/reference/#/libraries/p5.sound
//assistance from P5.js examples (starting)
function preload() {
    soundFormats('mp3');
    gameover = loadSound('sound/wasted.mp3'); //load player death sound effect from GTA
    jump = loadSound('sound/jump.mp3');       //load sound effect when mario jumps
    morning = loadSound('sound/rooster.mp3'); //load sound effect when it becomes daytime
    
    //change volume of sound effect
    gameover.setVolume(1.0); 
    jump.setVolume(0.1);
    morning.setVolume(1.0);
  }
//end

function setup()
{
    
	createCanvas(1024, 576);
    
    // Initialize the variables
	floorPos_y = height * 3/4;
    
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    cameraPosX = gameChar_x;
    
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    isFound = false;
    
    canyon = {x_pos: 150, width: 100};
    
    collectable = {x_pos: 200, y_pos: 300, size: 50};
    
    clouds_x = [200,800,1400];          //3 as per instructions
    cloud = {y_pos: 100, size: 50};
    
    mountains_x = [-500,100,700,1200,1800];
    mountainPos_y = 182;                //change base height of mountain
    
    trees_x = [-600,150,850,1400,1900];
    treePos_y = height/2;               //change base height of tree

    gravity = 5;        //change the value according to how strong you want the gravitational pull to be
    speed = 10;         //change the value according to how fast you want to be

    gravity = 5;        //change the value according to how strong you want the gravitational pull to be
    speed = 10;         //change the value according to how fast you want to be

    sky = 0;
    peak = false;       //everytime the sun/moon peaked, this boolean changes
    day = false;
}


function draw()
{

	///////////DRAWING CODE//////////
    noStroke();

    //draw the sky that dynamically changes as time goes by
    //inspired after doing Coursera Programming exercise 7. Hack it: Sunrise
    if(peak == false){
        sky += 0.004;
        background(sky+=0.1,sky+=0.02,255);
        fill(255);
        ellipse(gameChar_x + 400, 100 + sky*4,100,100);
        fill(255,255,0);
        ellipse(gameChar_x - 400, 900 - sky*4,100,100);
        //when sunrise, play rooster sound effect
        if(sky >= 100 && sky <= 100.1 && day == false){
            day = true;
        }
        if(sky > 199){
            peak = true;
        }
    }
    else if(peak == true){
        sky -= 0.004
        background(sky-=0.1,sky-=0.02,255);
        fill(255);
        ellipse(gameChar_x + 400,100 + sky*4,100,100);
        fill(255,255,0);
        ellipse(gameChar_x - 400,900 - sky*4,100,100);
        if(sky < 1){
            peak = false;
        }
    }

    //during the night, stars will appear randomly
    if(sky < 101){
        starX = random(-gameChar_x,gameChar_x); //spawn stars whithin frame of character
        starY = random(0, 150);                 //spawn stars only within the sky
        starX = random(-500, 500);
        starY = random(0, 150);
        strokeWeight(5);
        stroke(255);
        point(starX + gameChar_x,starY);
    }

    
    //Draw green ground
    noStroke();
    fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); 
        
     
    //Implement scrolling
    push();
    translate(-cameraPosX, 0);
    
    
	//draw and create the interection of the canyon 
	fill(100, 155, 255);
    rect(canyon.x_pos + gameChar_x,floorPos_y,canyon.width,150);
    
    if((cameraPosX >= canyon.x_pos && cameraPosX <= canyon.x_pos + canyon.width) && gameChar_y == floorPos_y) {
        isPlummeting = true;
        //To prevent player from moving left and right while plummeting
        isLeft = false;
        isRight = false;
    }
    
    
    //draw and create the interection of the collectable
    //To determine if character approches the collectable
    if(dist(cameraPosX, gameChar_y - 65 ,collectable.x_pos, collectable.y_pos) < 50){  
        isFound = true;
    }
    
    //spawn the collectable and remove it when player reaches it
    if (!isFound){
        fill(255,215,0);
        ellipse(collectable.x_pos + gameChar_x,collectable.y_pos,collectable.size,collectable.size);
        fill(255);
        rect(collectable.x_pos - 10 + gameChar_x,collectable.y_pos - 10, collectable.size - 30,collectable.size - 30);
    }
    
    
    //draw and create a for loop to traverse the `mountains_x` array
    for(var i = 0; i < mountains_x.length; i++){
        
        fill(160);
        triangle(mountains_x[i] + 250, mountainPos_y + 250, mountains_x[i] + 350, mountainPos_y + 56, mountains_x[i] + 450, mountainPos_y + 250);
        fill(180);
        fill(200,200,200);
        triangle(mountains_x[i] + 250, mountainPos_y + 250, mountains_x[i] + 350, mountainPos_y + 56, mountains_x[i] + 450, mountainPos_y + 250);
        fill(180,180,180);
        triangle(mountains_x[i] + 325, mountainPos_y + 250, mountains_x[i] + 425, mountainPos_y + 95, mountains_x[i] + 525, mountainPos_y + 250);
        fill(255);
        triangle(mountains_x[i] + 335, mountainPos_y + 85,  mountains_x[i] + 350, mountainPos_y + 56, mountains_x[i] + 365, mountainPos_y + 85);
        triangle(mountains_x[i] + 408, mountainPos_y + 120, mountains_x[i] + 425, mountainPos_y + 95, mountains_x[i] + 442, mountainPos_y + 120);
    }
    
    
    //draw and create a for loop to traverse the `trees_x` array
    for(var i = 0; i < trees_x.length; i++){
        
        fill(160,82,45);
        rect(trees_x[i] + 25, treePos_y - 5, 40, 150);
        fill(0,255,127);
        ellipse(trees_x[i] + 45,  treePos_y - 25, 100, 100);
        ellipse(trees_x[i] - 5,   treePos_y - 25, 40,   40);
        ellipse(trees_x[i] - 5,   treePos_y - 5,  40,   40);
        ellipse(trees_x[i] - 25,  treePos_y - 5,  40,   40);
        ellipse(trees_x[i] + 95,  treePos_y - 25, 40,   40);
        ellipse(trees_x[i] + 95,  treePos_y - 5,  40,   40);
        ellipse(trees_x[i] + 115, treePos_y - 5,  40,   40);
    }
      
        
        
    //draw and create a for loop to traverse the `clouds_x` array
    for(var i = 0; i < clouds_x.length; i++){
        
        fill(255,255,255);

        ellipse(clouds_x[i] + 340, cloud.y_pos - 10, cloud.size + 20, cloud.size + 20);
        ellipse(clouds_x[i] + 380, cloud.y_pos - 5,  cloud.size,cloud.size);
        ellipse(clouds_x[i] + 300, cloud.y_pos - 5,  cloud.size,cloud.size);

        ellipse(clouds_x[i] + 590, cloud.y_pos + 30, cloud.size + 20, cloud.size + 20);
        ellipse(clouds_x[i] + 630, cloud.y_pos + 35, cloud.size,cloud.size);
        ellipse(clouds_x[i] + 550, cloud.y_pos + 35, cloud.size,cloud.size);


        ellipse(clouds_x[i] + 740, cloud.y_pos - 30, cloud.size + 20, cloud.size + 20);
        ellipse(clouds_x[i] + 740, cloud.y_pos - 30, cloud.size + 20, cloud.size +20);
        ellipse(clouds_x[i] + 780, cloud.y_pos - 20, cloud.size,cloud.size);
        ellipse(clouds_x[i] + 700, cloud.y_pos - 20, cloud.size,cloud.size);
            

            //This section allows the clouds to move and spawn accordingly
 
            //if statement to spawn cloud to the player right if player stray to far to the right     
            if(clouds_x[i] + 800 <= cameraPosX) {
                clouds_x[i] = (cameraPosX + 800);
            } 
            //else if statement to spawn cloud to the player left if player stray to far to the left
            else if(clouds_x[i] >= cameraPosX + 800) {
                clouds_x[i] = (cameraPosX - 800);
                clouds_x[i]+=3.5; 
            }
            else {
                //speed of the cloud
                clouds_x[i]+=3.5; 
            }
            
        
    }

    pop();
    
    
    //game character
	if(isLeft && isFalling)
	{
        fill(0);
        quad(gameChar_x-5,gameChar_y-30,gameChar_x,gameChar_y-30,gameChar_x-15,gameChar_y-10,gameChar_x-25,gameChar_y-10);
        quad(gameChar_x+5,gameChar_y-30,gameChar_x,gameChar_y-30,gameChar_x-15,gameChar_y,gameChar_x-5,gameChar_y);
        rect(gameChar_x-5,gameChar_y-50,25,10);
        rect(gameChar_x-5,gameChar_y-60,10,30);
        ellipse(gameChar_x,gameChar_y-65,20,20);
        fill(255,0,0);
        rect(gameChar_x-10,gameChar_y-70,10,5);
        rect(gameChar_x+20,gameChar_y-35,5,20);
        fill(200);
        rect(gameChar_x+20,gameChar_y-55,5,20);
		// add your jumping-left code
        //head
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 5, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 52);
        vertex(gameChar_x - 5, gameChar_y - 52);
        endShape(CLOSE);

        //right eye
        beginShape();
        fill(255,0,0);
        vertex(gameChar_x - 5, gameChar_y - 64);
        vertex(gameChar_x + 4, gameChar_y - 66);
        vertex(gameChar_x - 5, gameChar_y - 55);
        endShape(CLOSE);

        //neck
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 52,4,3);

        //body
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 10, gameChar_y - 49);
        vertex(gameChar_x + 10, gameChar_y - 49);
        vertex(gameChar_x + 10, gameChar_y - 45);
        vertex(gameChar_x +  5, gameChar_y - 32);
        vertex(gameChar_x -  5, gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 45);
        endShape(CLOSE);
    
        //right arm joint
        fill(0);
        ellipse(gameChar_x, gameChar_y - 43,8,8);

        //right arm connector
        beginShape();
        fill(0);
        vertex(gameChar_x - 1, gameChar_y - 42);
        vertex(gameChar_x - 5, gameChar_y - 36);
        vertex(gameChar_x - 3, gameChar_y - 36);
        vertex(gameChar_x + 1, gameChar_y - 42);
        endShape(CLOSE);

        //right arm
        fill(255,255,0);
        rect(gameChar_x - 15, gameChar_y - 37,12,8);

        //right sword
        fill(255,0,0);
        beginShape(TRIANGLES);
        vertex(gameChar_x - 15, gameChar_y - 37);
        vertex(gameChar_x - 23, gameChar_y - 33);
        vertex(gameChar_x - 15, gameChar_y - 29);
        endShape();

        //body to rocket connector
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 32,4,10);


        //thuster
        fill(255,255,0);
        beginShape(QUADS);
        vertex(gameChar_x - 5, gameChar_y - 27);
        vertex(gameChar_x + 5, gameChar_y - 27);
        vertex(gameChar_x + 10, gameChar_y - 12);
        vertex(gameChar_x - 10, gameChar_y - 12);
        endShape();
        
        //fire
        fill(255,0,0);
        beginShape();
        vertex(gameChar_x - 7, gameChar_y - 12);
        vertex(gameChar_x + 7, gameChar_y - 12);
        vertex(gameChar_x + 5, gameChar_y + 1);
        vertex(gameChar_x - 5, gameChar_y + 1);
        endShape(CLOSE);

        fill("orange");
        beginShape();
        vertex(gameChar_x - 5, gameChar_y - 12);
        vertex(gameChar_x + 5, gameChar_y - 12);
        vertex(gameChar_x + 3, gameChar_y - 2);
        vertex(gameChar_x - 3, gameChar_y - 2);
        endShape(CLOSE);

        fill(255,0,0);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 12);
        vertex(gameChar_x + 3, gameChar_y - 12);
        vertex(gameChar_x + 1, gameChar_y - 7);
        vertex(gameChar_x - 1, gameChar_y - 7);
        endShape(CLOSE);
	
        
	}
    
	else if(isRight && isFalling)
	{    
        fill(0);
        quad(gameChar_x+2,gameChar_y-35,gameChar_x-5,gameChar_y-35,gameChar_x+15,gameChar_y-10,gameChar_x+25,gameChar_y-20);
        quad(gameChar_x+2,gameChar_y-30,gameChar_x-5,gameChar_y-30,gameChar_x+10,gameChar_y-15,gameChar_x+20,gameChar_y-15);
        rect(gameChar_x-5,gameChar_y-50,25,10);
        rect(gameChar_x-5,gameChar_y-60,10,30);
        ellipse(gameChar_x,gameChar_y-65,20,20);
        fill(255,0,0);
        rect(gameChar_x,gameChar_y-70,10,5);
        rect(gameChar_x+20,gameChar_y-75,5,20);
        fill(200);
        rect(gameChar_x+20,gameChar_y-55,5,20);
	{
		// add your jumping-right code
        //head
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 5, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 52);
        vertex(gameChar_x - 5, gameChar_y - 52);
        endShape(CLOSE);

        //left eye
        beginShape();
        fill(255,0,0);
        vertex(gameChar_x + 5, gameChar_y - 64);
        vertex(gameChar_x - 4, gameChar_y - 66);
        vertex(gameChar_x + 5, gameChar_y - 55);
        endShape(CLOSE);

        //neck
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 52,4,3);

        //body
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 10, gameChar_y - 49);
        vertex(gameChar_x + 10, gameChar_y - 49);
        vertex(gameChar_x + 10, gameChar_y - 45);
        vertex(gameChar_x +  5, gameChar_y - 32);
        vertex(gameChar_x -  5, gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 45);
        endShape(CLOSE);

        //left arm joint
        fill(0);
        ellipse(gameChar_x, gameChar_y - 43,8,8);

        //left arm connector
        beginShape();
        fill(0);
        vertex(gameChar_x - 1, gameChar_y - 42);
        vertex(gameChar_x + 5, gameChar_y - 36);
        vertex(gameChar_x + 7, gameChar_y - 36);
        vertex(gameChar_x + 1, gameChar_y - 42);
        endShape(CLOSE);

        //left arm
        fill(255,255,0);
        rect(gameChar_x + 5, gameChar_y - 37,12,8);

        //left barrel
        fill('GREY');
        rect(gameChar_x + 17, gameChar_y - 36,7,2);
        rect(gameChar_x + 17, gameChar_y - 32,7,2);


        //body to rocket connector
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 32,4,10);


        //thuster
        fill(255,255,0);
        beginShape(QUADS);
        vertex(gameChar_x - 5, gameChar_y - 27);
        vertex(gameChar_x + 5, gameChar_y - 27);
        vertex(gameChar_x + 10, gameChar_y - 12);
        vertex(gameChar_x - 10, gameChar_y - 12);
        endShape();

        //fire
        fill(255,0,0);
        beginShape();
        vertex(gameChar_x - 7, gameChar_y - 12);
        vertex(gameChar_x + 7, gameChar_y - 12);
        vertex(gameChar_x + 5, gameChar_y + 1);
        vertex(gameChar_x - 5, gameChar_y + 1);
        endShape(CLOSE);

        fill("orange");
        beginShape();
        vertex(gameChar_x - 5, gameChar_y - 12);
        vertex(gameChar_x + 5, gameChar_y - 12);
        vertex(gameChar_x + 3, gameChar_y - 2);
        vertex(gameChar_x - 3, gameChar_y - 2);
        endShape(CLOSE);

        fill(255,0,0);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 12);
        vertex(gameChar_x + 3, gameChar_y - 12);
        vertex(gameChar_x + 1, gameChar_y - 7);
        vertex(gameChar_x - 1, gameChar_y - 7);
        endShape(CLOSE);

	}
    
	else if(isLeft)
	{
        fill(0);
        quad(gameChar_x-5,gameChar_y-30,gameChar_x,gameChar_y-30,gameChar_x-10,gameChar_y,gameChar_x-20,gameChar_y);
        quad(gameChar_x+5,gameChar_y-30,gameChar_x,gameChar_y-30,gameChar_x,gameChar_y,gameChar_x+10,gameChar_y);
        rect(gameChar_x-15,gameChar_y-50,20,10);
        rect(gameChar_x-5,gameChar_y-60,10,30);
        ellipse(gameChar_x,gameChar_y-65,20,20);
        fill(255,0,0);
        rect(gameChar_x-10,gameChar_y-70,10,5);
        rect(gameChar_x-20,gameChar_y-75,5,20);
        fill(200);
        rect(gameChar_x-20,gameChar_y-55,5,20);
		// add your walking left code
        //head
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 5, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 52);
        vertex(gameChar_x - 5, gameChar_y - 52);
        endShape(CLOSE);

        //right eye
        beginShape();
        fill(255,0,0);
        vertex(gameChar_x - 5, gameChar_y - 64);
        vertex(gameChar_x + 4, gameChar_y - 66);
        vertex(gameChar_x - 5, gameChar_y - 55);
        endShape(CLOSE);

        //neck
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 52,4,3);

        //body
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 10, gameChar_y - 49);
        vertex(gameChar_x + 10, gameChar_y - 49);
        vertex(gameChar_x + 10, gameChar_y - 45);
        vertex(gameChar_x +  5, gameChar_y - 32);
        vertex(gameChar_x -  5, gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 45);
        endShape(CLOSE);
    
        //right arm joint
        fill(0);
        ellipse(gameChar_x, gameChar_y - 43,8,8);

        //right arm connector
        beginShape();
        fill(0);
        vertex(gameChar_x - 1, gameChar_y - 42);
        vertex(gameChar_x - 5, gameChar_y - 36);
        vertex(gameChar_x - 3, gameChar_y - 36);
        vertex(gameChar_x + 1, gameChar_y - 42);
        endShape(CLOSE);

        //right arm
        fill(255,255,0);
        rect(gameChar_x - 15, gameChar_y - 37,12,8);

        //right sword
        fill(255,0,0);
        beginShape(TRIANGLES);
        vertex(gameChar_x - 15, gameChar_y - 37);
        vertex(gameChar_x - 23, gameChar_y - 33);
        vertex(gameChar_x - 15, gameChar_y - 29);
        endShape();

        //body to rocket connector
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 32,4,10);

        //wheels
        fill(0);
        ellipse(gameChar_x, gameChar_y - 7,16,16);
        fill(200,200,200);
        ellipse(gameChar_x, gameChar_y - 7,8,8);



        //thuster
        fill(255,255,0);
        beginShape(QUADS);
        vertex(gameChar_x -  5, gameChar_y - 22);
        vertex(gameChar_x +  5, gameChar_y - 22);
        vertex(gameChar_x + 10, gameChar_y - 7);
        vertex(gameChar_x - 10, gameChar_y - 7);
        endShape();


	}
    
	else if(isRight)
	{
        fill(0);
        quad(gameChar_x-5,gameChar_y-30,gameChar_x,gameChar_y-30,gameChar_x,gameChar_y,gameChar_x-10,gameChar_y);
        quad(gameChar_x+5,gameChar_y-30,gameChar_x,gameChar_y-30,gameChar_x+10,gameChar_y,gameChar_x+20,gameChar_y);
        rect(gameChar_x-5,gameChar_y-50,25,10);
        rect(gameChar_x-5,gameChar_y-60,10,30);
        ellipse(gameChar_x,gameChar_y-65,20,20);
        fill(255,0,0);
        rect(gameChar_x,gameChar_y-70,10,5);
        rect(gameChar_x+20,gameChar_y-75,5,20);
        fill(200);
        rect(gameChar_x+20,gameChar_y-55,5,20);
		// add your walking right code
        //head
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 5, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 52);
        vertex(gameChar_x - 5, gameChar_y - 52);
        endShape(CLOSE);

        //left eye
        beginShape();
        fill(255,0,0);
        vertex(gameChar_x + 5, gameChar_y - 64);
        vertex(gameChar_x - 4, gameChar_y - 66);
        vertex(gameChar_x + 5, gameChar_y - 55);
        endShape(CLOSE);

        //neck
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 52,4,3);

        //body
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 10, gameChar_y - 49);
        vertex(gameChar_x + 10, gameChar_y - 49);
        vertex(gameChar_x + 10, gameChar_y - 45);
        vertex(gameChar_x +  5, gameChar_y - 32);
        vertex(gameChar_x -  5, gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 45);
        endShape(CLOSE);
    
        //left arm joint
        fill(0);
        ellipse(gameChar_x, gameChar_y - 43,8,8);

        //left arm connector
        beginShape();
        fill(0);
        vertex(gameChar_x - 1, gameChar_y - 42);
        vertex(gameChar_x + 5, gameChar_y - 36);
        vertex(gameChar_x + 7, gameChar_y - 36);
        vertex(gameChar_x + 1, gameChar_y - 42);
        endShape(CLOSE);

        //left arm
        fill(255,255,0);
        rect(gameChar_x + 5, gameChar_y - 37,12,8);

        //left barrel
        fill('GREY');
        rect(gameChar_x + 17, gameChar_y - 36,7,2);
        rect(gameChar_x + 17, gameChar_y - 32,7,2);


        //body to rocket connector
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 32,4,10);

        //wheels
        fill(0);
        ellipse(gameChar_x, gameChar_y - 7,16,16);
        fill(200,200,200);
        ellipse(gameChar_x, gameChar_y - 7,8,8);



        //thuster
        fill(255,255,0);
        beginShape(QUADS);
        vertex(gameChar_x -  5, gameChar_y - 22);
        vertex(gameChar_x +  5, gameChar_y - 22);
        vertex(gameChar_x + 10, gameChar_y - 7);
        vertex(gameChar_x - 10, gameChar_y - 7);
        endShape();

	}
    
	else if(isFalling || isPlummeting)
	{
        fill(0);
        quad(gameChar_x-5,gameChar_y-30,gameChar_x,gameChar_y-30,gameChar_x-15,gameChar_y-10,gameChar_x-25,gameChar_y-10);
        quad(gameChar_x+5,gameChar_y-30,gameChar_x,gameChar_y-30,gameChar_x+15,gameChar_y-10,gameChar_x+25,gameChar_y-10);
        rect(gameChar_x-15,gameChar_y-50,35,10);
        rect(gameChar_x-5,gameChar_y-60,10,30);
        ellipse(gameChar_x,gameChar_y-65,20,20);
        fill(255,0,0);
        rect(gameChar_x-10,gameChar_y-70,20,5);
        fill(200);
        rect(gameChar_x-20,gameChar_y-55,5,20);
		// add your jumping facing forwards code
       
        //left eye
        beginShape();
        fill(255,0,0);
        vertex(gameChar_x - 13, gameChar_y - 64);
        vertex(gameChar_x - 10, gameChar_y - 66);
        vertex(gameChar_x - 6,  gameChar_y - 55);
        endShape(CLOSE);
    
        //right eye
        beginShape();
        fill(255,0,0);
        vertex(gameChar_x + 13, gameChar_y - 64);
        vertex(gameChar_x + 10, gameChar_y - 66);
        vertex(gameChar_x + 6,  gameChar_y - 55);
        endShape(CLOSE);
    
        //head
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 10, gameChar_y - 67);
        vertex(gameChar_x + 10, gameChar_y - 67);
        vertex(gameChar_x + 5,  gameChar_y - 52);
        vertex(gameChar_x - 5,  gameChar_y - 52);
        endShape(CLOSE);
    
        //neck
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 52,4,3);
    
        //body
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 20, gameChar_y - 49);
        vertex(gameChar_x + 20, gameChar_y - 49);
        vertex(gameChar_x + 10, gameChar_y - 45);
        vertex(gameChar_x + 5,  gameChar_y - 32);
        vertex(gameChar_x - 5,  gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 45);
        endShape(CLOSE);
    
        //left arm joint
        beginShape();
        fill(0);
        vertex(gameChar_x - 15, gameChar_y - 47);
        vertex(gameChar_x - 10, gameChar_y - 44);
        vertex(gameChar_x - 9,  gameChar_y - 42);
        endShape(CLOSE);
    
        //left arm connector
        beginShape();
        fill(0);
        vertex(gameChar_x - 12, gameChar_y - 45);
        vertex(gameChar_x - 15, gameChar_y - 39);
        vertex(gameChar_x - 13, gameChar_y - 39);
        vertex(gameChar_x - 11, gameChar_y - 43);
        endShape(CLOSE);
    
        //left arm
        fill(255,255,0);
        rect(gameChar_x - 20, gameChar_y - 39,8,12);
    
        //left barrel
        fill('GREY');
        rect(gameChar_x - 19,gameChar_y - 27,2,7);
        rect(gameChar_x - 15,gameChar_y - 27,2,7);
      
        //right arm joint
        beginShape();
        fill(0);
        vertex(gameChar_x + 15, gameChar_y - 47);
        vertex(gameChar_x + 10, gameChar_y - 44);
        vertex(gameChar_x + 9,  gameChar_y - 42);
        endShape(CLOSE);
    
        //right arm connector
        beginShape();
        fill(0);
        vertex(gameChar_x + 12, gameChar_y - 44);
        vertex(gameChar_x + 15, gameChar_y - 39);
        vertex(gameChar_x + 17, gameChar_y - 39);
        vertex(gameChar_x + 13, gameChar_y - 45);
        endShape(CLOSE);
    
        //right arm
        fill(255,255,0);
        rect(gameChar_x + 12, gameChar_y - 39,8,12);
    
        //right sword
        fill(255,0,0);
        beginShape(TRIANGLES);
        vertex(gameChar_x + 12, gameChar_y - 27);
        vertex(gameChar_x + 20, gameChar_y - 27);
        vertex(gameChar_x + 16, gameChar_y - 17);
        endShape();
    
        //body to rocket connector
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 32,4,10);
    
        //thuster
        fill(255,255,0);
        beginShape(QUADS);
        vertex(gameChar_x - 5, gameChar_y - 27);
        vertex(gameChar_x + 5, gameChar_y - 27);
        vertex(gameChar_x + 10, gameChar_y - 12);
        vertex(gameChar_x - 10, gameChar_y - 12);
        endShape();
    
        //fire

        fill(255,0,0);
        beginShape();
        vertex(gameChar_x - 7, gameChar_y - 12);
        vertex(gameChar_x + 7, gameChar_y - 12);
        vertex(gameChar_x + 5, gameChar_y + 1);
        vertex(gameChar_x - 5, gameChar_y + 1);
        endShape(CLOSE);
        
        fill("orange");
        beginShape();
        vertex(gameChar_x - 5, gameChar_y - 12);
        vertex(gameChar_x + 5, gameChar_y - 12);
        vertex(gameChar_x + 3, gameChar_y - 2);
        vertex(gameChar_x - 3, gameChar_y - 2);
        endShape(CLOSE);

        fill(255,0,0);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 12);
        vertex(gameChar_x + 3, gameChar_y - 12);
        vertex(gameChar_x + 1, gameChar_y - 7);
        vertex(gameChar_x - 1, gameChar_y - 7);
        endShape(CLOSE);

        
            

	}
    
	else
	{
        fill(0);
        quad(gameChar_x-5,gameChar_y-30,gameChar_x,gameChar_y-30,gameChar_x-10,gameChar_y,gameChar_x-20,gameChar_y);
        quad(gameChar_x+5,gameChar_y-30,gameChar_x,gameChar_y-30,gameChar_x+10,gameChar_y,gameChar_x+20,gameChar_y);
        rect(gameChar_x-15,gameChar_y-50,35,10);
        rect(gameChar_x-5,gameChar_y-60,10,30);
        ellipse(gameChar_x,gameChar_y-65,20,20);
        fill(255,0,0);
        rect(gameChar_x-10,gameChar_y-70,20,5);
        rect(gameChar_x-20,gameChar_y-75,5,20);
        fill(200);
        rect(gameChar_x-20,gameChar_y-55,5,20);
        
		// add your standing front facing code
        
        //left eye
        beginShape();
        fill(255,0,0);
        vertex(gameChar_x - 13, gameChar_y - 64);
        vertex(gameChar_x - 10, gameChar_y - 66);
        vertex(gameChar_x - 6,  gameChar_y - 55);
        endShape(CLOSE);
    
        //right eye
        beginShape();
        fill(255,0,0);
        vertex(gameChar_x + 13, gameChar_y - 64);
        vertex(gameChar_x + 10, gameChar_y - 66);
        vertex(gameChar_x + 6,  gameChar_y - 55);
        endShape(CLOSE);
    
        //head
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 10, gameChar_y - 67);
        vertex(gameChar_x + 10, gameChar_y - 67);
        vertex(gameChar_x + 5,  gameChar_y - 52);
        vertex(gameChar_x - 5,  gameChar_y - 52);
        endShape(CLOSE);
    
        //neck
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 52,4,3);
    
        //body
        beginShape();
        fill(255,255,0);
        vertex(gameChar_x - 20, gameChar_y - 49);
        vertex(gameChar_x + 20, gameChar_y - 49);
        vertex(gameChar_x + 10, gameChar_y - 45);
        vertex(gameChar_x + 5,  gameChar_y - 32);
        vertex(gameChar_x - 5,  gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 45);
        endShape(CLOSE);
    
        //left arm joint
        beginShape();
        fill(0);
        vertex(gameChar_x - 15, gameChar_y - 47);
        vertex(gameChar_x - 10, gameChar_y - 44);
        vertex(gameChar_x - 9,  gameChar_y - 42);
        endShape(CLOSE);
    
        //left arm connector
        beginShape();
        fill(0);
        vertex(gameChar_x - 12, gameChar_y - 45);
        vertex(gameChar_x - 15, gameChar_y - 39);
        vertex(gameChar_x - 13, gameChar_y - 39);
        vertex(gameChar_x - 11, gameChar_y - 43);
        endShape(CLOSE);
    
        //left arm
        fill(255,255,0);
        rect(gameChar_x - 20, gameChar_y - 39,8,12);
    
        //left barrel
        fill('GREY');
        rect(gameChar_x - 19,gameChar_y - 27,2,7);
        rect(gameChar_x - 15,gameChar_y - 27,2,7);
      
        //right arm joint
        beginShape();
        fill(0);
        vertex(gameChar_x + 15, gameChar_y - 47);
        vertex(gameChar_x + 10, gameChar_y - 44);
        vertex(gameChar_x + 9,  gameChar_y - 42);
        endShape(CLOSE);
    
        //right arm connector
        beginShape();
        fill(0);
        vertex(gameChar_x + 12, gameChar_y - 44);
        vertex(gameChar_x + 15, gameChar_y - 39);
        vertex(gameChar_x + 17, gameChar_y - 39);
        vertex(gameChar_x + 13, gameChar_y - 45);
        endShape(CLOSE);
    
        //right arm
        fill(255,255,0);
        rect(gameChar_x + 12, gameChar_y - 39,8,12);
    
        //right sword
        fill(255,0,0);
        beginShape(TRIANGLES);
        vertex(gameChar_x + 12, gameChar_y - 27);
        vertex(gameChar_x + 20, gameChar_y - 27);
        vertex(gameChar_x + 16, gameChar_y - 17);
        endShape();
    
        //body to rocket connector
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 32,4,10);
    
        //thuster
        fill(255,255,0);
        beginShape(QUADS);
        vertex(gameChar_x - 5, gameChar_y - 22);
        vertex(gameChar_x + 5, gameChar_y - 22);
        vertex(gameChar_x + 10,gameChar_y - 7);
        vertex(gameChar_x - 10,gameChar_y - 7);
        endShape();
    
        //wheels
        fill(0);
        rect(gameChar_x - 7,gameChar_y - 7,5,8);
        rect(gameChar_x + 2,gameChar_y - 7,5,8);
        
	}
    

	///////////INTERACTION CODE//////////
    
    
    //gravity increase while plummeting
    if(isPlummeting){
        if(gameChar_y < height){
            gameChar_y += gravity*1.5;
            gameChar_y += 10;
            if(gameChar_y > height){
                gameover.play();    //Play sound when plummeting
            }
        }
        //as a reference to GTA when a player dies
        noStroke();
        textSize(64);
        fill("red");
        text("WASTED", canyon.x_pos + gameChar_x / 2, height*3/5);
    }
    
    //"gravity" physics
    if(gameChar_y < floorPos_y){
        gameChar_y+=gravity;  
        isFalling = true; 
    }else{
        isFalling = false;  
    }
    
    //move background to the left
    if(isLeft == true){
        cameraPosX -= speed;
    }
    
    //move background to the right
    if(isRight == true){
        cameraPosX += speed; 
    }

    //play rooster sound  when sun rise
    if(day == true){
        morning.play();
        day = false;
    }
}


// function to control the animation of the character when keys are pressed
function keyPressed()
{
    //To ensure player does not move after plummeting or "freezing controls"
    if(!isPlummeting){
        
        if(keyCode == 37){
            isLeft = true;
        }
        if(keyCode == 39){
            isRight = true;
        }
        if(keyCode == 32  && !isFalling ){
            jump.play(); //play mario jumping sound
            gameChar_y -= 100; 
            isFalling = true;
        }
    }
}


// function to update the animation of the character when keys are released.
function keyReleased()
{
    if(keyCode == 37){
        isLeft = false;
    }
    if(keyCode == 39){
        isRight = false;
    }
}
