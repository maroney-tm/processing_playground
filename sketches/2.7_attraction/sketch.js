const width = 640
const height = 360
const topSpeed = 10
const gravity = 0.1
const NUM_PARTICLES = 100

class Particle {
	constructor(location, mass) {
		this.location = location
		this.velocity = createVector(0, 0)
		this.acceleration = createVector(0, 0)
		this.mass = mass
	}
}

Particle.prototype.show = function () {
	stroke(0)
	fill(175)
	ellipse(this.location.x,  this.location.y,  this.mass*4, this.mass*4)
}

Particle.prototype.update = function () {
	this.velocity.add(this.acceleration)
	this.location.add(this.velocity)
	this.acceleration.mult(0)
}

Particle.prototype.checkEdges = function() {
	if (this.location.x > width) {
		this.location.x = width
		this.velocity.x *= -1
	} else if(this.location.x < 0) {
		this.location.x = 0
		this.velocity.x *= -1
	}
	if (this.location.y > height) {
		this.location.y = height
		this.velocity.y *= -1
	} else if(this.location < 0) {
		this.location.y = 0
		this.velocity.y *= -1
	}
}

Particle.prototype.applyForce = function(force) {
	this.acceleration.add(p5.Vector.div(force, this.mass))
}

let particles = new Array(NUM_PARTICLES)

function setup() {
	createCanvas(width, height)
	background(255)

	for(let i=0; i<NUM_PARTICLES; i++) {
		particles[i] = new Particle(
			createVector(random(width), height/2),
			random(1,10)
		)
	}
}

function draw() {
	if(mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
		return
	}

	background(255)
	for(let i=0; i<NUM_PARTICLES; i++) {
		let c = 0.06 //friction coefficient
		let friction = particles[i].velocity.copy()
		friction.mult(-1)
		friction.normalize()
		friction.mult(c)
		particles[i].applyForce(friction)

		let m = particles[i].mass
		particles[i].applyForce(createVector(0, gravity*m))
		particles[i].applyForce(createVector(0.02, 0))

		particles[i].show()
		particles[i].checkEdges()
		particles[i].update()
	}
}
