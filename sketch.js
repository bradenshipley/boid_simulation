const flock = []

function setup() {
  createCanvas(600, 600)
  for (let i = 0; i < 100; i++) {
    flock.push(new Boid())
  }
}

function draw() {
  background(0)
  for (let boid of flock) {
    boid.edges()
    boid.flock(flock)
    boid.show()
    boid.update()
  }
}
