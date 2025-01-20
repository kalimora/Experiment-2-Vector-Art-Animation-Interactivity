let molds = [];
let num = 100; // Number of molds
let drawingActive = true;
let baseColors = []; // Array for base colors
let useCurvedLines = false; // To toggle between straight and curved lines

class Mold {
  constructor() {
    this.x = width / 2; // Start at the center horizontally
    this.y = height / 2; // Start at the center vertically
    this.heading = random(360); // Random initial direction
    this.speed = random(0.5, 1.5); // Slower speed for smoother movement
    this.baseColor = random(baseColors); // Assign a random base color
    this.amplitude = random(15, 35); // Slightly increased wave height
    this.frequency = random(0.02, 0.05); // Slower wave frequency
  }

  update() {
    this.x += this.speed * cos(this.heading);
    this.y += this.speed * sin(this.heading);

    // Wrap around the edges
    this.x = (this.x + width) % width;
    this.y = (this.y + height) % height;
  }

  display() {
    // Calculate pulse weight and color intensity
    const pulse = Mold.pulseStroke();
    const dynamicColor = color(
      red(this.baseColor) * pulse / 12, // Adjust color intensity
      green(this.baseColor) * pulse / 12,
      blue(this.baseColor) * pulse / 12
    );

    // Set stroke weight and color
    stroke(dynamicColor);
    strokeWeight(pulse);

    // Draw the line (straight or curved based on the flag)
    if (useCurvedLines) {
      this.drawWave();
    } else {
      this.drawStraightLine();
    }
  }

  drawStraightLine() {
    // Draw a straight line
    line(this.x, this.y, this.x + cos(this.heading) * 10, this.y + sin(this.heading) * 10);
  }

  drawWave() {
    const cx1 = this.x + cos(this.heading + 45) * 10; // First control point, offset for curve
    const cy1 = this.y + sin(this.heading + 45) * 10 + this.amplitude * sin(frameCount * this.frequency);

    const cx2 = this.x + cos(this.heading - 45) * 15; // Second control point, slightly farther
    const cy2 = this.y + sin(this.heading - 45) * 15 - this.amplitude * cos(frameCount * this.frequency);

    const ex = this.x + cos(this.heading) * 20; // End point, farther out
    const ey = this.y + sin(this.heading) * 20;

    noFill(); // No fill for curves
    bezier(this.x, this.y, cx1, cy1, cx2, cy2, ex, ey); 
  }

  static pulseStroke() {
    // Return a pulsing stroke weight between 2 and 12 for a stronger effect
    return 2 + 10 * abs(sin(millis() / 2000)); // Slower, smoother pulse
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define a color palette without orange and yellow
  baseColors = [
    color(143, 89, 153), // Deep Purple
    color(112, 170, 240), // Light Blue
    color(194, 222, 219), // Soft Cyan
    color(234, 179, 248)  // Light Lavender
  ];

  background(255); // Set the initial background to white

  // Create molds, all starting at the center
  for (let i = 0; i < num; i++) {
    molds.push(new Mold());
  }
}

function draw() {
  if (drawingActive) {
    // Update and display each mold
    molds.forEach(mold => {
      mold.update();
      mold.display();
    });

    // Check if 10 seconds have passed
    if (millis() > 10000) {
      drawingActive = false; // Stop drawing after 10 seconds
    }
  }
}

function mousePressed() {
  // Toggle between straight and wave-like curved lines when the mouse is clicked
  useCurvedLines = !useCurvedLines;
}
