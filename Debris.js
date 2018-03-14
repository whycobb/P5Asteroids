
function Debris(pos_, vel_, se_, h_, s_, v_) {
    /*
        Needs:
        position
        rotation speed (no bearing on velocity)
        velocity
        reference to sound engine
        reference to BG engine?
        an ArbitraryShape object
        a lifetime
        a draw function
        */
    
    //console.log("Debris received position: (" + pos_.x + ", " + pos_.y + ")");
    this.pos = pos_; //this is a vector2
    //console.log("Debris received velocity: (" + vel_.x + ", " + vel_.y + ")");
    this.vel = vel_; //this is a vector2
    this.theta = Math.random() * 2 * Math.PI;
    this.dTheta = Math.random() * 0.08 + 0.02;
    this.lifeTime = 300;
    this.age = 0;
    
    this.h = h_;
    this.s = s_;
    this.v = v_;
    
    this.se = se_;
    
    
    this.shape = new ArbitraryShape(this.pos.x, this.pos.y, width/500, this.theta, 0, 0, 0, 255, this.se.getHue(), this.s, this.se.getIntensity(), 255, width/300);
    
    var shapeVersion = Math.random() * 6;
    
    if (shapeVersion < 3) {
        this.shape.addPoint(0.1,0);
        this.shape.addPoint(-0.1,0);
        this.lifeTime = 100;
        //this.vel.scale(1.2);
    } else if (shapeVersion < 4) {
        this.shape.addPoint(1, 0);
        this.shape.addPoint(-1, 0);
        //this.lifeTime = 200;
    } else if (shapeVersion < 6) {
        this.shape.addPoint(3, 0);
        this.shape.addPoint(-3, 0);
        //this.vel.scale(0.3);
    }
    
    
    
    this.update = function(intensity, hue) {
        this.lifetime--;
        this.pos.addVec(this.vel);
        this.theta += this.dTheta;
        
        this.shape.setColor(0, 0, 0, 255, this.se.getHue(), this.s, this.se.getIntensity(), (this.lifeTime - this.age)/this.lifeTime, width/300);
        
        this.age++;
        
        
        this.shape.relocate(this.pos.x, this.pos.y);
        this.shape.setTheta(this.theta);
        
        this.vel.scale(0.995);
    }
    
    this.getX = function() {
        return this.pos.x;
    }
    
    this.getY = function() {
        return this.pos.y;
    }
    
    this.draw = function() {
        this.shape.draw();
    }
    
    this.log = function() {
        
    }
    
    
}