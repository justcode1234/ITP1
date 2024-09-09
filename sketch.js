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
var starX; 
var starY;

var game_score;
var flagPole;
var lives;
var platforms;
var level;

//declare variables for sound effects
var gameover;
var jump;
var morning;
var death;
var backgroundmusic;
var footsteps;
var falling;


function preload() {
    soundFormats('mp3');
    gameover = loadSound('sound/wasted.mp3');           //load player death sound effect from GTA
    jump = loadSound('sound/jump.mp3');                 //load sound effect when mario jumps
    footsteps = loadSound('sound/footsteps.mp3');       //load sound effect for walking
    morning = loadSound('sound/rooster.mp3');           //load sound effect when it becomes daytime
    backgroundmusic = loadSound('sound/minecraft.mp3'); //load minecraft background sound
    falling = loadSound('sound/falling.mp3');           //load mario falling effect

    //change volume of sound effect
    // referenced from https://archive.p5js.org/reference/#/p5.SoundFile/setVolume
    gameover.setVolume(1.0); 
    jump.setVolume(0.1);
    footsteps.setVolume(0.5);
    morning.setVolume(0.7);
    backgroundmusic.setVolume(0.4);
    falling.setVolume(0.1);
}


function setup(){
    createCanvas(1024, 576);

    // Initialize the variables
    floorPos_y = height * 3/4;
    lives = 4; 
    level = 0;
    backgroundmusic.loop();     //play background sound
    startGame();
}


function draw(){

///////////DRAWING CODE//////////
    frameRate(60);
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


    for(var i = 0; i < enemies.length; i++){
        enemies[i].draw();

        var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);
            if(isContact){
                if(lives > 0 && level == 0){
                    startGame();
                    break;
                }
                else if(lives > 0 && level == 1){
                    startChallengingGame();
                }
            }
    }
    
    pop();
    
    drawCharacter(); //load character
    physics();  //load physics function
    
    if(lives == 0){
        if(death){
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
        text("Press space to restart", width/3, height*1.2/2);
        text("Press L for hardmode", width/3, height*1.3/2);
        return;
    }
}


function checkPlayerDie(){
    if(gameChar_y > height && lives > 0){
        if(lives > 0 && level == 0){
            startGame();
        }
        if(lives > 0 && level == 1){
            startChallengingGame();
        }
    }
}


function drawScoreBoard(){
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Score: ", cameraPosX, floorPos_y + 50);
    text(game_score,cameraPosX + 100, floorPos_y + 50);
    text("Lives: ", cameraPosX, floorPos_y + 90);
    text(lives ,    cameraPosX + 100, floorPos_y + 90);
    text("Level: ", cameraPosX, floorPos_y + 130);
    text(level ,    cameraPosX + 100, floorPos_y + 130);
}


// function to control the animation of the character when keys are pressed
function keyPressed(){
    //To ensure player does not move after plummeting or "freezing controls"
        if(keyCode == 37 && !isPlummeting){
            footsteps.loop();
            isLeft = true;
        }
        if(keyCode == 39 && !isPlummeting){
            footsteps.loop();
            isRight = true;
        }
        if(keyCode == 32){
            if(!isFalling && !isPlummeting && !flagPole.isReached && lives != 0){
                jump.play(); //play mario jumping sound
                gameChar_y -= 100; 
                isFalling = true;
            }
            else if((lives == 0 || flagPole.isReached)){
                level = 0;
                lives = 4;
                startGame();
            }
        } 
        if(keyCode == 76){
            if((lives == 0 || flagPole.isReached)){
                level = 1;
                lives = 3;
                startChallengingGame();
            }
        }
}


// function to update the animation of the character when keys are released.
function keyReleased(){  
        if(keyCode == 37){
            isLeft = false;
        }
        
        if(keyCode == 39){
            isRight = false;
         }
}