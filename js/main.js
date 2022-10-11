var population;
var rockets;
var lifespan = 200;
var life_P;
var count = 0;
var target;
var maxforce = 0.2;

function setup()  {
    document.getElementById('#my_canvas');
    createCanvas(350, 500);
    rocket = new Rocket();
    population = new Population();
    life_P = createP();
    target = createVector(width/2, 50);
    fill(0, 0, 0);
    rect(0, 0, 10, 10);
}

function draw() {
  background(0);
  population.run();
  life_P.html(count);
  count++;
  
  if  (count == lifespan) {
    population.evaluate();
    population.selection();
    // population = new Population();
    count = 0;
  }
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
  this.mating_pool = [];
  
  
  for (var i = 0;  i < this.pop_size; i++) {
    this.rockets[i] = new Rocket();
  }
  
  this.evaluate = function() {
  
      var maxfit = 0;
      for (var i = 0; i < this.pop_size; i++) {
          this.rockets[i].calcFitness();
          if (this.rockets[i].fitness > maxfit) {
            maxfit = this.rockets[i].fitness;
          }
      }
   

      for (var i = 0; i < this.pop_size; i++) {
          this.rockets[i].fitness /= maxfit;
      }

      this.mating_pool = [];

      for (var i = 0; i < this.pop_size; i++) {
        var n = this.rockets[i].fitness * 100;
        for ( var j = 0;  j < n; j++) {
          this.mating_pool.push(this.rockets[i]);
        }  
      }
  }
  
  
  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var parent_A = random(this.mating_pool).dna;
      var parent_B = random(this.mating_pool).dna;
      var child = parent_A.crossover(parent_B);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.run = function() {
      for (var i = 0;  i < this.pop_size; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}

function DNA(genes) {
  if  (genes) {
    this.genes = genes;
  } else {
     this.genes = [];
     for (var i = 0; i < lifespan; i++) {
       this.genes[i] = p5.Vector.random2D();
       this.genes[i].setMag(maxforce);
     }
  }
  
 
  this.crossover = function(partner) {
      var newgenes = [];
      var mid = floor(random(this.genes.length));
      for (var i = 0; i < this.genes.length; i++) {
        if (i > mid) {
          newgenes[i] = this.genes[i];
        } else {
          newgenes[i] = partner.genes[i];
        }
      }
    return new DNA(newgenes);
  }
  
  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1)  <  0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }
  
  
}


function Rocket(dna) {    
  this.pos = createVector(width/2, height);
  this.vel =  createVector(0);
  this.acc = createVector();
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;
  
  this.applyForce = function(force) {
  this.acc.add(force);
  }
  
  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    
    this.fitness = map(d, 0, width, width, 0);
    
  }
  
  this.update = function() {
    
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    
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
    rect(4, 0, 2.5, 5);
    rect(9, 0, 2.5, 5);
    rect(14, 0, 2.5, 5);
    fill(255, 95, 31, 150);
    rect(-18, 0, 5, 8);
    fill(255, 255, 0, 150);
    rect(-18, 0, 5, 3);
    pop();
  }
}
