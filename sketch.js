var gameChar_x;
var gameChar_y;
var floorPos_y;
var cameraPosX;
var gameChar_world_x;

var isLeft; 
var isRight;
var isFalling;
var isPlummeting;
var isFound;

var canyons;
var collectables;
var clouds;
var mountains;
var trees;

var gravity;
var speed;
var sky;
var peak;
var day;
let starX; 
let starY;

var game_score;
var flagPole;
var lives;


var platforms;

//declare variables for sound effects
let gameover;
let jump;
let morning;
var death;


// referenced from https://archive.p5js.org/reference/#/p5/loadSound
//assistance from P5.js examples 
function preload() {
    soundFormats('mp3');
    gameover = loadSound('sound/wasted.mp3'); //load player death sound effect from GTA
    jump = loadSound('sound/jump.mp3');       //load sound effect when mario jumps
    morning = loadSound('sound/rooster.mp3'); //load sound effect when it becomes daytime
    
    //change volume of sound effect
    // referenced from https://archive.p5js.org/reference/#/p5.SoundFile/setVolume
    gameover.setVolume(1.0); 
    jump.setVolume(0.1);
    morning.setVolume(1.0);
  }


function setup(){
    createCanvas(1024, 576);

    // Initialize the variables
    floorPos_y = height * 3/4;
    lives = 3; 
    
    startGame();
}


function draw(){

///////////DRAWING CODE//////////
    noStroke();
    
    //draw background and sky
    drawBackgroundAndSky();
    
    //Implement scrolling
    push();
    translate(-cameraPosX, 0);
   
    //draw and create the interaction of the canyon 
    for(var i = 0; i<canyons.length; i++){
            drawCanyon(canyons[i]);
            checkCanyon(canyons[i]);
    }
  

    //draw and create the interaction of the collectable
    for(var i = 0; i<collectables.length; i++){
        if(!collectables[i].isFound){
            checkCollectable(collectables[i]);
            drawCollectable(collectables[i]);
        }
    }

     
    //draw clouds
    drawClouds();
    
    //draw Mountains
    drawMountains();
    
    //draw trees
    drawTrees();
    
    //draw platform
    for(var i = 0; i < platforms.length; i++){
        platforms[i].draw();
    }
    
    //draw Score board
    drawScoreBoard();
    
    //draw flag
    renderFlagPole();
    
    //check player death
    checkPlayerDie();
    
    pop();
    
    drawCharacter();

    
    if(lives == 0){
        if(death){
            //play sound referenced from: https://archive.p5js.org/examples/sound-load-and-play-sound.html
            gameover.play();    //Play sound when plummeting
            death = false;
        }
        noStroke();
        fill(0);
        rect(0, 0, width, height); 
        textSize(48);
        fill("red");
        text("Game Over", width/2.5, height/2);
        textSize(32);
        text("Press space to restart", width/3, height*1.1/2);
        return;
    }
    
    if(flagPole.isReached){
        noStroke();
        textSize(32);
        fill("red");
        text("Level complete. Press space to continue.", width/4, height*3/5);
        return;
    }

    //gravity increase while plummeting
    if(isPlummeting){
        if(gameChar_y < height){
            gameChar_y += gravity*1.5;
        }
    }
    
    //"gravity" physics
    if(gameChar_y < floorPos_y){
        
        var isContact = false;
        for(var i = 0; i < platforms.length; i++){
            if(platforms[i].checkContact(gameChar_world_x, gameChar_y)){
                isContact = true;
                break;
            }
        }
        if(!isContact){
            gameChar_y += gravity;  
            isFalling = true; 
        }else{
            isFalling = false;  
        }
    }else{
        isFalling = false;  
    }
    
    //move background to the left
    if(isLeft){
        cameraPosX -= speed;
    }
    
    //move background to the right
    if(isRight){
        cameraPosX += speed; 
    }

    //play rooster sound  when sun rise
    if(day){
	//play sound referenced from: https://archive.p5js.org/examples/sound-load-and-play-sound.html
        morning.play();	//when it is morning, rooster sound plays
        day = false;
    }
    
    //Update real position of gameCharX for collision detection
    gameChar_world_x = gameChar_x + cameraPosX;
    
    if(!flagPole.isReached){
        checkFlagPole();
    }
}


function startGame(){
    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    cameraPosX = 0;
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    
    
    game_score = 0;
    flagPole = {isReached: false, x_pos: 2400};
    
    
    canyons = [{x_pos: 150, width: 200}, 
               {x_pos: 700, width: 200}, 
               {x_pos: 1220,width: 200}];
    
    collectables = [{x_pos: 250, isFound: false},
                    {x_pos: 800, isFound: false},
                    {x_pos: 1300, isFound: false}];    
    
    clouds = [{x_pos:200, y_pos: 100, size: 50},
              {x_pos:800, y_pos: 100, size: 50},
              {x_pos:1400,y_pos: 100, size: 50}];    
    
    
    mountains = [{x_pos: -550, y_pos: 182},
                 {x_pos: 50,   y_pos: 182},
                 {x_pos: 690,  y_pos: 182},
                 {x_pos: 1200, y_pos: 182},
                 {x_pos: 1800, y_pos: 182}];
    
    trees = [{x_pos: -600, y_pos: height/2},
             {x_pos: 150,  y_pos: height/2},
             {x_pos: 850,  y_pos: height/2},
             {x_pos: 1400, y_pos: height/2},
             {x_pos: 1920, y_pos: height/2}];     
    
    platforms = [];
    platforms.push(drawPlatform(700, floorPos_y - 50, 120));
    platforms.push(drawPlatform(1250, floorPos_y - 50, 120));
    platforms.push(drawPlatform(1770, floorPos_y - 50, 120));
    
    cloudSpeed = 3.5;   //Speed of cloud
    gravity = 5;        //value of the gravitational pull strength
    speed = 10;         //value of character speed

    sky = 0;            //store as time(12 am)
    peak = false;       //everytime the sun/moon peaked, this boolean changes
    day = false;        //day start as false as it is nighttime
    death = true;
}


function drawPlatform(x, y, length){
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function(){
            fill(0);
            rect(this.x, this.y, this.length, 20);
        },
        checkContact: function(gc_x, gc_y){
            if(gc_x > this.x && gc_x < this.x + this.length){
                var d = this.y - gameChar_y;
                if(d >= 0 && d<5){
                    return true;
                }
            }
            return false;
        }
    }
    return p;
}


function renderFlagPole(){
    push();
    strokeWeight(5);
    stroke(0);
    line(flagPole.x_pos,floorPos_y,flagPole.x_pos,floorPos_y -250);
    noStroke();
    fill(255,0,0);
    if(flagPole.isReached){
        rect(flagPole.x_pos,floorPos_y-250,50,50);
    } else {
        rect(flagPole.x_pos,floorPos_y-50,50,50);
    }
    pop();
}


function checkFlagPole(){
    if(abs(flagPole.x_pos - gameChar_world_x) < 20){
        flagPole.isReached = true;
    }
}


function checkPlayerDie(){
    if(gameChar_y > height && lives > 0){
        lives--;
        if(lives > 0){
            startGame();
        }
    }
}


function drawCollectable(t_collectable){
    //spawn the collectable and remove it when player reaches it
    if (!t_collectable.isFound){
        fill(255,215,0);
        ellipse(t_collectable.x_pos+gameChar_x,300,50,50);
        fill(255); 
        rect(t_collectable.x_pos-10+gameChar_x,290,20,20);
    }
    
}


function checkCollectable(t_collectable){
    //To determine if character approaches the collectable
    if(dist(cameraPosX, gameChar_y - 65 ,t_collectable.x_pos, 300) < 50){  
        t_collectable.isFound = true;
        game_score++;
        
    }
}


function drawCanyon(t_canyon){
    fill(100, 155, 255);
    rect(t_canyon.x_pos + gameChar_x, floorPos_y, t_canyon.width, 150);
}


function checkCanyon(t_canyon){
    if((cameraPosX >= t_canyon.x_pos && cameraPosX <= t_canyon.x_pos + t_canyon.width) && gameChar_y == floorPos_y) {
    isPlummeting = true;
    //To prevent player from moving left and right while plummeting
    isLeft = false;
    isRight = false;
    }
}


function drawScoreBoard(){
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Score: ", cameraPosX, floorPos_y+50);
    text(game_score,cameraPosX + 100, floorPos_y+50);
    text("Lives: ", cameraPosX, floorPos_y+90);
    text(lives ,    cameraPosX + 100, floorPos_y+90);
}


// function to control the animation of the character when keys are pressed
function keyPressed(){
    //To ensure player does not move after plummeting or "freezing controls"
    if(!isPlummeting && lives>0 && !flagPole.isReached){
        
        if(keyCode == 37){
            isLeft = true;
        }
        if(keyCode == 39){
            isRight = true;
        }
        if(keyCode == 32  && !isFalling ){
	//play sound referenced from: https://archive.p5js.org/examples/sound-load-and-play-sound.html
            jump.play(); //play mario jumping sound
            gameChar_y -= 100; 
            isFalling = true;
        }
    } else if(lives == 0 || flagPole.isReached){
        if(keyCode == 32){
            lives = 3;
            startGame();
        }
    }
}


// function to update the animation of the character when keys are released.
function keyReleased(){
    if(!flagPole.isReached){
        
        if(keyCode == 37){
            isLeft = false;
        }
        
        if(keyCode == 39){
            isRight = false;
        }
    }
}


function drawClouds(){
    //draw and create a for loop to traverse the `clouds_x` array
    for(var i = 0; i < clouds.length; i++){
        
        fill(255,255,255);

        ellipse(clouds[i].x_pos + 340, clouds[i].y_pos - 10, clouds[i].size + 20, clouds[i].size + 20);
        ellipse(clouds[i].x_pos + 380, clouds[i].y_pos - 5,  clouds[i].size,clouds[i].size);
        ellipse(clouds[i].x_pos + 300, clouds[i].y_pos - 5,  clouds[i].size,clouds[i].size);

        ellipse(clouds[i].x_pos + 590, clouds[i].y_pos + 30, clouds[i].size + 20, clouds[i].size + 20);
        ellipse(clouds[i].x_pos + 630, clouds[i].y_pos + 35, clouds[i].size,clouds[i].size);
        ellipse(clouds[i].x_pos + 550, clouds[i].y_pos + 35, clouds[i].size,clouds[i].size);


        ellipse(clouds[i].x_pos + 740, clouds[i].y_pos - 30, clouds[i].size + 20, clouds[i].size + 20);
        ellipse(clouds[i].x_pos + 780, clouds[i].y_pos - 20, clouds[i].size,clouds[i].size);
        ellipse(clouds[i].x_pos + 700, clouds[i].y_pos - 20, clouds[i].size,clouds[i].size);
            

            //This section allows the clouds to move and spawn accordingly
 
            //if statement to spawn cloud to the player right if player stray to far to the right     
            if(clouds[i].x_pos + 800 <= cameraPosX) {
                clouds[i].x_pos = (cameraPosX + 800);
            } 
            //else if statement to spawn cloud to the player left if player stray to far to the left
            else if(clouds[i].x_pos >= cameraPosX + 800) {
                clouds[i].x_pos = (cameraPosX - 800);
                clouds[i].x_pos += cloudSpeed; 
            }
            else {
                //speed of the cloud
                clouds[i].x_pos += cloudSpeed; 
            }
    }
}


function drawMountains(){
    //draw and create a for loop to traverse the `mountains_x` array
    for(var i = 0; i < mountains.length; i++){
        fill(160);
        triangle(mountains[i].x_pos + 250, mountains[i].y_pos + 250, mountains[i].x_pos + 350, mountains[i].y_pos + 56, mountains[i].x_pos + 450, mountains[i].y_pos + 250);
        fill(180);
        triangle(mountains[i].x_pos + 325, mountains[i].y_pos + 250, mountains[i].x_pos + 425, mountains[i].y_pos + 95, mountains[i].x_pos + 525, mountains[i].y_pos + 250);
        fill(255);
        triangle(mountains[i].x_pos + 335, mountains[i].y_pos + 85,  mountains[i].x_pos + 350, mountains[i].y_pos + 56, mountains[i].x_pos + 365, mountains[i].y_pos + 85);
        triangle(mountains[i].x_pos + 408, mountains[i].y_pos + 120, mountains[i].x_pos + 425, mountains[i].y_pos + 95, mountains[i].x_pos + 442, mountains[i].y_pos + 120);
    }
}


function drawTrees(){
    //draw and create a for loop to traverse the `trees_x` array
    for(var i = 0; i < trees.length; i++){
        
        fill(160,82,45);
        rect(trees[i].x_pos + 25, trees[i].y_pos - 5, 40, 150);
        fill(0,255,127);
        ellipse(trees[i].x_pos + 45,  trees[i].y_pos - 25, 100, 100);
        ellipse(trees[i].x_pos - 5,   trees[i].y_pos - 25, 40,  40);
        ellipse(trees[i].x_pos - 5,   trees[i].y_pos - 5,  40,  40);
        ellipse(trees[i].x_pos - 25,  trees[i].y_pos - 5,  40,  40);
        ellipse(trees[i].x_pos + 95,  trees[i].y_pos - 25, 40,  40);
        ellipse(trees[i].x_pos + 95,  trees[i].y_pos - 5,  40,  40);
        ellipse(trees[i].x_pos + 115, trees[i].y_pos - 5,  40,  40);
    }    
}


function drawBackgroundAndSky(){
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
        // referenced from: https://p5js.org/reference/p5/random/	
        starX = random(-gameChar_x,gameChar_x); //spawn stars within frame of character
        starY = random(0, 150);                 //spawn stars only within the sky
        strokeWeight(5);
        stroke(255);
        point(starX + gameChar_x,starY);
    }
    
    //Draw green ground
    noStroke();
    fill(0,155,0);
    rect(0, floorPos_y, width, height - floorPos_y); 
    
}


function drawCharacter(){
    //game character

if(isLeft && isFalling)		//Jumping left model
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
}


else if(isRight && isFalling)	//Jumping right model
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
}   


else if(isLeft)		//Walking left model
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
}


else if(isRight)		//Waling Right model
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
}


else if(isFalling || isPlummeting)	//Jumping front model
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
}


else	//facing front model
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
}
}
