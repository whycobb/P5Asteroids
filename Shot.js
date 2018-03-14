function Shot(x_, y_, theta_, intensity_, se_) {
    /*
        Needs:
        position
        theta
        intensity (at time of birth)
        reference to sound engine?
        reference to BG engine?
        an ArbitraryShape object
            (multiple of these? for different intensities)
                    actually that might make concrete
                    intensity storage redundant, if I can just store that by 
                        nope I nee intensity for damage calc
        */
    
    this.posX = x_;
    this.posY = y_;
    this.theta = theta_;
    this.inensity = intensity_;
    this.health = intensity_;
    
    this.se = se_;
    
    this.dmg = this.se.getIntensity() /50;
    
    this.h = this.se.getHue();
    this.s = this.se.getIntensity();
    this.s = this.se.getIntensity();
    
    this.shape = new ArbitraryShape(x_, y_, width/500 * this.s / 50, theta_, this.se.getHue(), this.s, this.v, 100, 0, 0, 0, 0, 0);
    
    this.shape.setColor(this.se.getHue(), this.se.getIntensity(), this.se.getIntensity(), 255, this.se.getHue(), this.se.getIntensity(), this.se.getIntensity(), 255, width/300);
    
    if (intensity_ == intensity_) {
        this.shape.addPoint(10, 1);
        this.shape.addPoint(10, -1);
        this.shape.addPoint(-1, -1);
        this.shape.addPoint(-1, 1);
        this.shape.addPoint(10, 1);
        
    }
    
    var vel = new YCVector2(15 * (width/500), 0);
    vel.rotate(this.theta);
    
    this.update = function() {
        //change position
        
        this.posX += vel.x;
        this.posY += vel.y;
        
        this.shape.relocate(this.posX, this.posY);
        this.shape.setTheta(this.theta);
        
    }
    
    this.collide = function() {
        this.health--;
    }
    
    this.draw = function() {
        this.shape.draw();
        /*
        push();
        colorMode(HSB);
        fill(this.h, this.s, this.v);
        noStroke();
        ellipse(this.posX, this.posY, width/80, width/80);
        pop();*/
        
    }
}