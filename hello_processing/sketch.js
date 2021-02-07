let x = 100
let y = 100
let x_speed = 1
let y_speed = 3.3
let pause = false

function setup() {
	createCanvas(640, 360)
	background(255)
}

function draw() {
	if (pause) {
		return
	}
	background(255)

	x += x_speed
	y += y_speed

	if (x > width || x < 0) {
		x_speed *= -1
	}
	if (y > height || y < 0) {
		y_speed *= -1
	}

	stroke(0)
	fill(175)
	ellipse(x,y,16,16)
}

function mouseClicked() {
	pause = !pause
}