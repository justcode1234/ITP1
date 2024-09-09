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
                var d = this.y - gc_y;
                if(d >= 0 && d<5){
                    return true;
                }
            }
            return false;
        }
    }
    return p;
}


//added speed argument so that enermies at the difficult level move faster
function enermy(x, y, range, speed){
    this.x = x;
    this.y = y;
    this.range = range;
    this.speed = speed;

    this.currentX = x;
    this.inc = speed;

    this.update = function(){
        this.currentX += this.inc;
        
        if(this.currentX >=  this.x + this.range){
            this.inc = -random(1,this.speed);
        }
        else if(this.currentX < this.x){
            this.inc = random(1,this.speed);
        }
    }


    this.draw = function(){
        this.update();
        fill(255,0,0);
        ellipse(this.currentX,this.y,20,20);
    }

    
    this.checkContact = function(gc_x,gc_y){
        var d = dist(gc_x,gc_y, this.currentX, this.y);
        if(d < 20){
            return true;
        }
        return false;
    }
}