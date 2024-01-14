let particles = [];
let scale, theme, graphics;

function setup() {
  createCanvas(innerWidth, innerHeight);
  createParticles();
}

function draw() {
  background(0);
  
  for (const p of particles) {
    p.update();
    p.draw();
  }

  image(graphics, 0, 0);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(
      x || random(-50, width + 50),
      y || random(-50, height + 50)
    );
    this.color = random(theme.colors);
    this.r = random(0.25, 1);
  }

  update() {
    const dir = noise(this.pos.x / scale, this.pos.y / scale) * TAU * scale;
    // Calculates a random direction using Perlin noise
    this.pos.add(Math.cos(dir) / 2, Math.sin(dir) / 2);
    // Updates the position by moving in the calculated direction

    if (
      this.pos.x < -50 ||
      this.pos.x > width + 50 ||
      this.pos.y < -50 ||
      this.pos.y > height + 50
    ) {
      this.pos.set(random(-50, width + 50), random(-50, height + 50));
    }
  }

  draw() {
    graphics.fill(this.color);
    graphics.circle(this.pos.x, this.pos.y, this.r);
  }
}

function createParticles() {
  scale = random(8e2, 2e3);
  // Set the global scale variable to a random value between 800 and 2000
  theme = random([
    {
      colors: [
        "#0799F2",
        "#FFFFFF",
        "#0058a1",
        "#004B97",
        "#84C1FF",
        "#c5afd4",
      ],
      background: "#150832",
    },
  ]);

  for (let i = 0; i < 200; i++) {
    particles.push(new Particle());
  }

  createGraphicsBuffer();
}

function createGraphicsBuffer() {
  graphics = createGraphics(width, height);
  // Creates a graphics buffer with the same dimensions as the canvas
  graphics.background(theme.background);
  // Set background color of the graphics buffer
  graphics.noStroke();
}
