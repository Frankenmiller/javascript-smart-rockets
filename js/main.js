var population;
var lifespan = 200;
var life_P;
var count = 0;
var target;

function setup() {
    createCanvas(350, 500);
    rocket = new Rocket();
    population = new Population();
    life_P = createP();
    target = createVector(width/2, 50);
}

function draw() {
    background(0);
    population.run();
    life_P.html(count);
    count++;
    
    fill(255, 255, 255);
    ellipse(target.x, target.y, 16, 16);
    fill(255, 0, 0);
    ellipse(target.x, target.y, 12, 12);
    fill(255, 255, 255);
    ellipse(target.x, target.y, 8, 8);
    fill(255, 0, 0);
    ellipse(target.x, target.y, 4, 4);
}

function Population() {
    this.rockets = [];
    this.pop_size = 25;

    for (var i=0; i<this.pop_size; i++) {
        this.rockets[i] = new Rocket();
    }

    this.run = function() {
        for (var i=0; i<this.pop_size; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
}

function DNA() {
    this.genes = [];
    for (var i=0; i<lifespan; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.1);
    }
}

function Rocket() {
    this.pos = createVector(width/2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.dna = new DNA();

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.update = function() {
        this.applyForce(this.dna.genes[count]);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.show = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        fill(255, 255, 255, 150);
        rect(0, 0, 40, 5);
        fill(255, 0, 0, 150);
        rect(2.5, 0, 5, 5);
        rect(12.5, 0, 5, 5);
        fill(255, 95, 31, 150);
        rect(-18, 0, 5, 8);
        fill(255, 255, 0, 150);
        rect(-18, 0, 5, 3);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
