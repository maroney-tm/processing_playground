const width = 640
const height = 360
const topSpeed = 10

class Particle {
	constructor(x, y) {
		this.location = createVector(x, y)
		this.velocity = createVector(1, 1)
		this.acceleration = createVector(0, 0)
	}
}

Particle.prototype.show = function () {
	stroke(0)
	fill(175)
	ellipse(this.location.x,  this.location.y,  16,  16)
}

Particle.prototype.update = function () {
	let mouse = createVector(mouseX, mouseY)
	let dir = p5.Vector.sub(mouse, this.location)
	dir.normalize()
	dir.mult(0.5)
	this.acceleration = dir
	this.velocity.add(this.acceleration)
	this.velocity.limit(topSpeed)
	this.location.add(this.velocity)
}

Particle.prototype.checkEdges = function() {
	if (this.location.x > width || this.location.x < 0) {
		this.velocity.x *= -1
	}
	if (this.location.y > height || this.location.y < 0) {
		this.velocity.y *= -1
	}
}


let particles = new Array(10)

function setup() {
	createCanvas(width, height)
	background(255)

	for(let i=0; i<10; i++) {
		particles[i] = new Particle(random(width), random(height))
	}

}

function draw() {
	background(255)
	for(let i=0; i<10; i++) {
		particles[i].show()
		particles[i].update()
	}
}