
function GameManager(kbd_, se_) {
    //var hue = 0;
    //var hue2 = 180;
    
    this.myShip = new AstShip(width/2, height/2, Math.PI/2, 100, 100, 100, kbd_, se_, width/700);
    this.asteroids = [];
    this.shots = [];
    this.KBD = kbd_;
    this.SE = se_;
    this.state = 1; //1 is play, 0 is pause
    var unPauseCheck;
    var killCheck = false;
    
    
    var basePosition;
    var debBosition;
    var debVelocity;
    
    this.createAsteroid = function(size, health) {
        basePosition = new YCVector2(Math.random() * width, Math.random()*height);
        
        while ((basePosition.x < width - 5) && (basePosition.x > 5)) {
            basePosition = new YCVector2(Math.random() * width, Math.random()*height);
        }
        
        debVelocity = new YCVector2(1, 0);
        debVelocity.rotate(Math.random() * Math.PI * 2);

        return new Asteroid(basePosition, debVelocity, this.SE, size, health);
    }
    
    this.killAsteroidA = function(victim) {
        //victim is just the index of the asteroid to destroy
        
        //create three smaller asteroids in its place
        for (var coffin = 0; coffin < 3; coffin++) {
            let tempSize = this.asteroids[victim].size / 3;
            
            let tempPos = new YCVector2(Math.random() * 40 - 20, Math.random() * 40 - 20);
            let sz = Math.random() * 0.1 - 0.05 + tempSize;
            let newAsteroid = this.createAsteroid(sz, sz* 50);
            newAsteroid.relocate(tempPos.x + this.asteroids[victim].pos.x, tempPos.y + this.asteroids[victim].pos.y);
            
            //debVelocity = new YCVector2(basePosition.x * basePosition.getMagnitude() / 18 + this.velocity.x, basePosition.y * basePosition.getMagnitude() / 18 + this.velocity.y);
            
            let tempVel = new YCVector2(tempPos.x * tempPos.getMagnitude() / 300 + this.asteroids[victim].vel.x, tempPos.y * tempPos.getMagnitude() / 300 + this.asteroids[victim].vel.y)
            
            newAsteroid.vel = tempVel;
            
            this.asteroids.push(newAsteroid);
        }
        
        //create some debris too?
            //maybe make a separate debris class? and store it in a container in GM, culling it by age? sounds okay
        
        //cull the killed asteroid from the list
        this.asteroids.splice(victim, 1);
    }
    
    this.killAsteroidB = function(victim) {
        //victim is just the index of the asteroid to destroy
        
        //create some debris too?
            //maybe make a separate debris class? and store it in a container in GM, culling it by age? sounds okay
        
        //cull the killed asteroid from the list
        this.asteroids.splice(victim, 1);
    }
    
    
    for (let absinthe = 0; absinthe < 10; absinthe++) {
        let sz = Math.random() + 0.7;
        this.asteroids.push(this.createAsteroid(sz, sz*50));
    }
    
    
    this.update = function() {
        
        
        this.SE.tick();
        
        if (this.state == 1) {
            
            
            if (this.asteroids.length < 10) {
                let sz = Math.random() + 0.7;
                this.asteroids.push(this.createAsteroid(sz, sz*50));
            }
            
            //hue += 0.5;
            //hue2 += 0.5;
            //if (hue>360) hue -= 360;
            //if (hue2>360) hue2 -= 360;
            
            //colorMode(HSB);
            //background(hue2, 50, 100);
            
            
            
            
            //update ship
            this.myShip.update(1, hue);
            
            //update shots
            var spentShots = [];
            
            
            //double check my math here because I think it's buggy
            for (var shotCount = 0; shotCount < this.shots.length; shotCount++) {
                this.shots[shotCount].update();
                if ((this.shots[shotCount].posX > width) ||
                    (this.shots[shotCount].posX < 0) ||
                    (this.shots[shotCount].posY > height) ||
                    (this.shots[shotCount].posY < 0)) {
                    spentShots.push(shotCount);
                }
            }
            
            function sorty(a, b) {
                return b - a;
            }
            spentShots.sort(sorty);
            
            //remove spent shots
            for (var toblerone = 0; toblerone < spentShots.length; toblerone++) {
                if (spentShots[toblerone] > -1) {
                    this.shots.splice(spentShots[toblerone], 1);
                }
            }
            
            
            
            //spawn needed shots
            if (KBD.fire) this.shots.push(new Shot(this.myShip.posX, this.myShip.posY, this.myShip.theta, this.SE.getIntensity(),  this.SE));
            
            //update asteroids
            for (var alimony = 0; alimony < this.asteroids.length; alimony++) {
                this.asteroids[alimony].update();
                if (this.asteroids[alimony].pos.x > width + 50) {
                    this.asteroids[alimony].pos.x -= width+100;
                } if (this.asteroids[alimony].pos.x < -50) {
                    this.asteroids[alimony].pos.x += width+100;
                } if (this.asteroids[alimony].pos.y > height + 50) {
                    this.asteroids[alimony].pos.y -= height+100;
                } if (this.asteroids[alimony].pos.y < -50) {
                    this.asteroids[alimony].pos.y += height+100;
                }
            }
            
            
            //check for collisions
                //shots/asteroids first
            for (var copenhagen = 0; copenhagen <  this.shots.length; copenhagen++) {
                for (var denmark = 0; denmark < this.asteroids.length; denmark++) {
                    //distance is (shot.x - ast.x + shot.y - ast.y) ^ 2
                    let dX = this.shots[copenhagen].posX - this.asteroids[denmark].pos.x;
                    let dY = this.shots[copenhagen].posY - this.asteroids[denmark].pos.y;
                    
                    let distance = Math.sqrt(dX*dX + dY*dY);
                    
                    if (distance < 40 * this.asteroids[denmark].size) {
                        this.asteroids[denmark].health -= this.shots[copenhagen].dmg;
                        
                        this.shots.splice(copenhagen, 1);
                        
                        
                        if (this.asteroids[denmark].health < 0) {
                            if (this.asteroids[denmark].size < 0.9) {
                                this.killAsteroidB(denmark);
                            } else {
                                this.killAsteroidA(denmark);
                            }
                        }
                        break;
                    }
                }
            }
            
                //ship/asteroid now
            for (let p = 0; p < this.asteroids.length; p++) {
                let dX = this.asteroids[p].pos.x - this.myShip.posX;
                let dY = this.asteroids[p].pos.y - this.myShip.posY;
                let distance = Math.sqrt(dX*dX + dY*dY);
                
                if (distance < 40 * this.asteroids[p].size) {
                    this.myShip.kill();
                    
                    /*
                    console.log("killing asteroid " + p + " on collision with ship");
                    if (this.asteroids[p].size < 0.9) {
                        this.killAsteroidB(p);
                    } else {
                        this.killAsteroidA(p);
                    }*/
                    
                }
            }
            
            
            //remove spent shots
            
            //MOVE CODE FROM ABOVE, BUT SOMETHING WAS BREAKING SO BE CAREFUL
            
            if (!killCheck && KBD.k) {
                this.myShip.kill();
                killCheck = true;
            }
            if (!KBD.k) killCheck = false;
            
        
            
            //check keyboard update for pause
            if (!KBD.pause) unPauseCheck = false;
            
            if (KBD.pause && !unPauseCheck) this.state = 0;
            
            
            
            
            
            
        } else if (this.state == 0) {
            //check keyboard for unpause
            if (!KBD.pause) unPauseCheck = true;
            
            if (KBD.pause && unPauseCheck) this.state = 1;
            
            
            //code to pulse the pause menu?
            
            //if possible: save position of playhead, slow down music into a dreamlike kind of pace, then resume at correct position and at full speed when unpaused?
            
            //or do a pitch-down fade out, and move the playhead back a bit to "spin the record back up" without losing position when you resume
            
        }
    }
    
    
    this.draw = function() {
        //text("Asteroids: " + this.asteroids.length, 10, 290);
        
        for (var shotCount2 = 0; shotCount2 < this.shots.length; shotCount2++) {
            this.shots[shotCount2].draw();
        }
        
        for (var peat = 0; peat < this.asteroids.length; peat++) {
            this.asteroids[peat].draw();
        }
        
        
        
        
        
        
        
        this.myShip.draw();
        
        /*
        textSize(10);
        fill(255, 0, 0);
        textAlign(LEFT);
        text("Shots: " + this.shots.length, 20, 40);
        */
        
        
        
        
        if (this.state == 0) {
            //draw pause icon
            push();
            
            colorMode(HSB);
            textSize(50);
            fill(255, 0, 70 + (frameCount%120)/4);
            textAlign(CENTER);
            text("PAUSED", 250, 150);
            
            pop();
        }
    }
}