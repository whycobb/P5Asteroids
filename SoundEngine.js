function SoundEngine(sound_) {
    this.intensity = 100;
    this.hue = 0;
    this.hue2 = 180;
    this.mySound = sound_;
    this.amplitude = new p5.Amplitude();
    
    this.getIntensity = function() {
        return this.intensity;
    }
    
    this.getHue = function() {
        return this.hue;
    }
    
    this.getHue2 = function() {
        return this.hue2;
    }
    
    this.tick = function() {
        //this is going to be the doozy
        
        this.intensity = this.amplitude.getLevel() * (this.amplitude.getLevel() * 2) * 600 + 20;
        
        
        this.hue += 0.5;
        this.hue2 = this.hue + 180;
        
        if (this.hue > 360) this.hue -= 360;
        if (this.hue2 > 360) this.hue2 -= 360;
        
        text("Intensity: " + this.intensity.toFixed(3), 10, 250);
        
        if (!this.mySound.isPlaying()) {
            this.mySound.play();
        }
        
    }
}