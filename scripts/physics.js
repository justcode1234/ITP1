function physics(){
    if(!flagPole.isReached){
        checkFlagPole();
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
    

    //play rooster sound when sun rise
    if(day){
    //play sound referenced from: https://archive.p5js.org/examples/sound-load-and-play-sound.html
        morning.play();	//when it is morning, rooster sound plays
        day = false;
    }
    

    if(!isLeft && !isRight){
        footsteps.stop();
    }
    

    //Update real position of gameCharX for collision detection
    gameChar_world_x = gameChar_x + cameraPosX;
}
