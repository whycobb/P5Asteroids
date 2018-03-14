function KBDArray() {
    this.cw = false;
    this.ccw = false;
    this.fwd = false;
    this.bwd = false;
    this.fire = false;
    this.pause = false;
    this.k = false;
    
    this.update = function() {
        //call this function at the end of a frame to wipe the array
        this.cw = false;
        this.ccw = false;
        this.fwd = false;
        this.bwd = false;
        this.pause = false;   
        this.fire = false;
        this.k = false;
    }
    
    this.setCW = function(in_) {
        this.cw = in_;
    }
    
    this.setCCW = function(in_) {
        this.ccw = in_;
    }
    
    this.setFWD = function(in_) {
        this.fwd = in_;
    }
    
    this.setBWD = function(in_) {
        this.bwd = in_;
    }
    
    this.setPause = function(in_) {
        this.pause = in_;
    }
    
    this.setFire = function(in_) {
        this.fire = in_;
    }
    
    this.setK = function(in_) {
        this.k = in_;
    }
}