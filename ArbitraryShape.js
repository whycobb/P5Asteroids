//Code below this point defines an 'object' called ArbitraryShape.
    //I've set this one up so that's clear how to change the shape
function ArbitraryShape(x_, y_, size_, theta_, r_, g_, b_, alpha_, sr_, sg_, sb_, salpha_, sweight_) {
    this.points = [];
    this.posX = x_;
    this.posY = y_;
    this.colorR = r_;
    this.colorG = g_;
    this.colorB = b_;
    this.strokeH = sr_;
    this.strokeS = sg_;
    this.strokeV = sb_;
    this.strokeWeight = sweight_;
    this.strokeAlpha = salpha_;
    this.colorAlpha = alpha_;
    
    //this is what you'd think
        //try to let 1 be the default value
    this.size = size_;
    
    //this is the angle of rotation
        //it's measured in radians (pi radians = 180 degrees)
    this.theta = theta_;
    
    
    //if you send this function something other than numbers, I'm going to come to your house and bludgeon you
    this.addPoint = function(newX, newY){
        this.points.push(newX);
        this.points.push(newY);
    }
    
    
    //adds the given value to the angle of rotation
    this.rotate = function(dTheta) {
        this.theta += dTheta;
    }
    
    //moves the shape by adding dX and dY to its position
    this.move = function(dX, dY) {
        this.posX += dX;
        this.posY += dY;
    }
    
    this.setTheta = function(newTheta) {
        this.theta = newTheta;
    }
    
    this.moveAngle = function(velocity) {
        this.posX += velocity * Math.cos(this.theta * 180 /Math.PI);
        this.posY -= velocity * Math.sin(this.theta * 180 / Math.PI);
        
    }
    
    //this completely relocates the shape to (newX, newY);
    this.relocate = function(newX, newY) {
        this.posX = newX;
        this.posY = newY;
    }
    
    //changes the size multiplier of the shape (remember: 1 should be the default value)
    this.resize = function(dSize) {
        this.size = dSize;
    }
    
    this.setColor = function(newR, newG, newB, newA, newSR, newSG, newSB, newSA, newSW) {
        this.colorR = newR;
        this.colorG = newG;
        this.colorB = newB;
        this.colorAlpha = newA;
        
        this.strokeH = newSR;
        this.strokeS = newSG;
        this.strokeV = newSB;
        this.strokeAlpha = newSA;
        this.strokeWeight = newSW;
    }
    
    //I'm not sure this function works. Don't use it.
    this.getPosition = function() {
        return [this.posX, this.posY];
    }
    
    this.setAlpha = function(newAlpha) {
        this.colorAlpha = newAlpha;
    }
    
    
    
    
    
    
    
    
    //call this to draw the shape
    this.draw = function() {
        //push() is used to 'back up' your canvas properties. Don't worry about it too much, it's totally optional.
        push();
        
        //General formula for these rotations:
        // rotatedX = size * (X * cosine(theta) + Y * sine(theta))
        // rotatedY = size * (Y * cosine(theta) - X * sine(theta))
        //
        //and you'll have to do this for every point in your shape EXCEPT the origin (posX and posY)
        //
        //Then when you draw the point, use (posX + rotatedX, posY + rotatedY);
        
        var rotatedPoints = [];
        for (i = 0; i < this.points.length; i += 2){
            //i is x, i+1 is y
            
            rotatedPoints.push(this.size * (this.points[i] * Math.cos(this.theta) + this.points[i+1] * Math.sin(this.theta)));
            
            rotatedPoints.push(this.size * (this.points[i+1] * Math.cos(this.theta) - this.points[i] * Math.sin(this.theta)));
        }
        
        colorMode(HSB);
        fill(this.colorR, this.colorG, this.colorB, this.colorAlpha);
        stroke(this.strokeH, this.strokeS, this.strokeV, this.strokeAlpha);
        strokeWeight(this.strokeWeight);
        
        //start drawing a multi-vertex shape
        beginShape();
        
        //call vertex(x, y) to add the next point in the shape
            //you MUST work either clockwise or counter-clockwise
        
        for (i = 0; i < rotatedPoints.length; i += 2) {
            vertex(this.posX + rotatedPoints[i], this.posY + rotatedPoints[i+1]);
        }
        
        //finish the shape with this function call
        endShape();
        
        
        //pop() is used to load your canvas properties after a push(). Don't worry about it too much, it's also totally optional. (but if you use push(), you MUST have a corresponding pop().)
        pop();
        
    }   
}