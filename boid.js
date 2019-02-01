class Boid {
  constructor() {
    this.position = createVector(random(width), random(height))
    //setting velocity to a random 2D vector using built in p5 method Vector
    this.velocity = p5.Vector.random2D()
    //setting magnitude to a random number
    this.velocity.setMag(random(2, 5))
    this.acceleration = createVector()
    this.maxForce = random(0.01, 0.2)
    this.maxSpeed = random(1, 2)
  }
  edges() {
    if (this.position.x > width) {
      this.position.x = 0
    } else if (this.position.x < 0) {
      this.position.x = width
    }
    if (this.position.y > height) {
      this.position.y = 0
    } else if (this.position.y < 0) {
      this.position.y = height
    }
  }
  flock(boids) {
    let alignment = this.align(boids)
    let cohesion = this.cohesion(boids)
    let separation = this.separation(boids)
    this.acceleration.add(separation)
    this.acceleration.add(alignment)
    this.acceleration.add(cohesion)
  }
  update() {
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.acceleration.set(0, 0)
  }
  align(boids) {
    let perceptionRadius = 100
    let steering = createVector()
    let total = 0
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      )
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity)
        total++
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }
    return steering
  }
  cohesion(boids) {
    let perceptionRadius = 100
    let steering = createVector()
    let total = 0
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      )
      if (other != this && d < perceptionRadius) {
        steering.add(other.position)
        total++
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.sub(this.position)
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }
    return steering
  }
  separation(boids) {
    let perceptionRadius = 75
    let steering = createVector()
    let total = 0
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      )
      if (other != this && d < perceptionRadius) {
        //set new vector and adjust for the distance between the two objects
        let diff = p5.Vector.sub(this.position, other.position)
        diff.div(d)
        steering.add(diff)
        total++
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
    }
    return steering
  }
  show() {
    strokeWeight(1.5)
    noFill()
    stroke(0, 185, 185)
    ellipse(this.position.x, this.position.y, 10)
  }
}
