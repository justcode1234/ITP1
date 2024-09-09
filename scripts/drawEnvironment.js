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