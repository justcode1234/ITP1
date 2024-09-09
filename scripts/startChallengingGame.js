function startChallengingGame(){

    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    cameraPosX = 0;
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    
    game_score = 0;

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

    flagPole = {isReached: false, x_pos: 2400};
    
    platforms = [];
    platforms.push(drawPlatform(700, floorPos_y - 50, 120));
    platforms.push(drawPlatform(1250, floorPos_y - 50, 120));
    platforms.push(drawPlatform(1770, floorPos_y - 50, 120));
    
    lives -= 1;
    enemies = [];
    enemies.push(new enermy(300,  floorPos_y - 10, 300,5));
    enemies.push(new enermy(900,  floorPos_y - 10, 250,5));
    enemies.push(new enermy(1420, floorPos_y - 10, 250,5));
    enemies.push(new enermy(1970, floorPos_y - 10, 250,5));


    cloudSpeed = 3.5;   //Speed of cloud
    gravity = 5;        //value of the gravitational pull strength
    speed = 5;         //value of character speed

    sky = 0;            //store as time(12 am)
    peak = false;       //everytime the sun/moon peaked, this boolean changes
    day = false;        //day start as false as it is nighttime
    death = true;
}
