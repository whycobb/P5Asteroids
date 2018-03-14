//how naive I was to think I could escape this
//everybody writes a vector class sooner or later
function YCVector2(val1, val2) {
    this.x = val1;
    this.y = val2;
    
    //adds val1 to x and val2 to y
    this.add = function(val1, val2) {
        this.x += val1;
        this.y += val2;
    }
    
    //adds given YCVector2 to this one
    this.addVec = function(otherVec) {
        this.x += otherVec.x;
        this.y += otherVec.y;
    }
    
    //subtracts val1 from x and val2 from y
    this.sub = function(val1, val2) {
        this.x -= val1;
        this.y -= val2;
    }
    
    //subtracts given YCVector2 from this one
    this.subVec = function(otherVec) {
        this.x -= otherVec.x;
        this.y -= otherVec.y;
    }
    
    
    //scales the whole vector by given amount (val 1 makes no change)
    this.scale = function(val) {
        this.x *= val;
        this.y *= val;
    }
    
    //rotate the vector by a number of radians
    this.rotate = function(dTheta) {
        //General formula for these rotations:
        // rotatedX = size * (X * cosine(theta) + Y * sine(theta))
        // rotatedY = size * (Y * cosine(theta) - X * sine(theta))
        
        var newX = (this.x * Math.cos(dTheta) + this.y * Math.sin(dTheta));
        var newY = (this.y * Math.cos(dTheta) - this.x * Math.sin(dTheta));
        
        this.x = newX;
        this.y = newY;
    }
    
    //this function will probably never be strictly needed
    //because you can just make a whole new vector
    this.set = function(val1, val2) {
        this.x = val1;
        this.y = val2;
    }
    
    this.setX = function(val) {
        this.x = val;
    }
    
    this.setY = function(val) {
        this.y = val;
    }
    
    this.getX = function() {
        return this.x;
    }
    
    this.getY = function() {
        return this.y;
    }
    
    this.getMagnitude = function() {
        var magn = Math.sqrt(this.x * this.x + this.y * this.y);
        
        return magn;
    }
    
    this.setMagnitude = function(val) {
        var magn = this.getMagnitude();
        
        var ratio = val/magn;
        
        this.x *= ratio;
        this.y *= ratio;
    }
    
    
}