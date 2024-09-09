function renderFlagPole(){
    push();
    strokeWeight(5);
    stroke(0);
    line(flagPole.x_pos,floorPos_y,flagPole.x_pos,floorPos_y -250);
    noStroke();
    fill(255,0,0);
    if(flagPole.isReached){
        rect(flagPole.x_pos,floorPos_y-250,50,50);
        textSize(48);
        fill("Black");
        if(level==0){
            text("Basic Level Complete", gameChar_world_x, height-80);
        }else if (level==1){
            text("You win!", gameChar_world_x, height-80);
        }
        textSize(32);
        text("Press space to restart", gameChar_world_x, height-50);
        text("Press L for hardmode", gameChar_world_x, height-20);
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
