function drawCharacter(){

    //game character
    if(isLeft && isFalling)		    //Jumping left model
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


    else if(isLeft)		            //Walking left model
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


    else if(isRight)		        //Waling Right model
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


    else if(isFalling || isPlummeting)//Jumping front model
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


    else	                        //facing front model
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
