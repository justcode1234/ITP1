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
    falling.play();
    isPlummeting = true;
    //To prevent player from moving left and right while plummeting
    isLeft = false;
    isRight = false;
    }
}