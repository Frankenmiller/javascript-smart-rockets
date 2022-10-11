var rocket;

function setup() {
    createCanvas(400, 300);
    rocket = new Rocket();
}

function draw() {
    background(0);
    rocket.update();
    rocket.show();
}

function Population() {
    
}

function Rocket() {
    this.pos = createVector(width/2, height);
    this.vel = createVector(0, -1);
    this.acc = createVector();

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.update = function() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.show = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        fill(255, 0, 0);
        rect(0, 0, 50, 5);
        fill(255, 255, 255);
        rect(-7.5, 0, 5, 5);
        rect(-17.5, 0, 5, 5);
        rect(-27.5, 0, 5, 5);
        rect(2.5, 0, 5, 5);
        rect(12.5, 0, 5, 5);
        rect(22.5, 0, 5, 5);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
