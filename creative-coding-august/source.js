// This file is source code for this system from: 
// https://course.juguandian.com/mod/lesson/view.php?id=332&pageid=2281

var font, newShape, shape, pendulumPathColor, size, hierarchy, shapes, x, y, heading, armPos, offset, pendulumTrailPaths, maxArms, margin, pendulumArm, lineLength, showPath, resolution, pos, joints, showPendulumPath, firstFrame, currentIndex, posIndex, currentPos, gravity, previousPos, damping, showPrinterPath, offsetPos, frame, armSizeDeviation, contentIndex, armSize, showPendulum, letter, letterSize, content, angle, centerPos;

function colour_rgb_alpha(rgb, alpha, maxalpha) {
let a = Math.floor(alpha / maxalpha * 255);
return color(rgb+(a>>4).toString(16)+(a%16).toString(16));
}

function mathRandomInt(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function preload(){window._currentP5instance = this;
  font = loadFont("/assets/fonts/Barrio-Regular.ttf");

_initPreloadProgress();
};

function setup(){window._currentP5instance = this;
  window._currentP5renderer=createCanvas(windowWidth,windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  textFont(font, 20);
  strokeWeight(1);
  margin = 0;
  shapes = [];
  newShape = null;
  joints = 4;
  lineLength = 128;
  resolution = 0.04;
  gravity = 0.094;
  damping = 0.998;
  maxArms = 1;
  armSizeDeviation = 0.2;
  showPath = true;
  showPendulum = true;
  showPendulumPath = true;
  showPrinterPath = false;
  content = 'abcdefg hijklmn opqrst uvw xyz';
};

function draw(){window._currentP5instance = this;
  background('#ffffff');
  for (var shape_index in shapes) {
    shape = shapes[shape_index];
    shape.draw();
    shape.update();
  }
  if (newShape) {
    newShape.addPos(mouseX, mouseY);
    newShape.draw();
    newShape.update();
  }
};

class Shape{
  constructor(pendulumPathColor) {
    this.shapePath = [];
    this.pendulumPath = [];
    this.pendulumPathColor = pendulumPathColor;
    this.iterator = 0;
    this.lineLength = lineLength;
    this.resolution = resolution;
    this.pendulum = new Pendulum(this.lineLength, joints);
  }
  addPos(x, y) {
    this.shapePath.push(createVector(x,y));
  }
  draw() {
    strokeWeight(0.8);
    stroke((colour_rgb_alpha('#000000', 10, 100)));
    if (showPath) {

      beginShape();
        var pos_list = this.shapePath;
        for (var pos_index in pos_list) {
          pos = pos_list[pos_index];
          vertex(pos.x,pos.y);
        }
      endShape(null);

    }
    if (showPendulumPath && this.pendulumPath.length != 0) {
      strokeWeight(1);
      firstFrame = this.pendulumPath[0];
      for (let posIndex = 0; posIndex < firstFrame.length; posIndex += 1){
        if (showPrinterPath) {
          stroke(this.pendulumPathColor);

          beginShape();
            var frame_list = this.pendulumPath;
            for (var frame_index in frame_list) {
              frame = frame_list[frame_index];
              pos = frame[posIndex];
              vertex(pos.x,pos.y);
            }
          endShape(null);

        }
        fill(this.pendulumPathColor);
        noStroke();
        previousPos = null;
        contentIndex = 1;
        var frame_list2 = this.pendulumPath;
        for (var frame_index2 in frame_list2) {
          frame = frame_list2[frame_index2];
          pos = frame[posIndex];
          letter = content.charAt((contentIndex - 1));
          letterSize = (textWidth(letter));
          if (previousPos && p5.Vector.dist(pos, previousPos) >= letterSize + margin) {
            angle = p5.Vector.sub(pos, previousPos).heading();
            centerPos = p5.Vector.lerp(pos, previousPos, 0.5);

            push();
              translate(centerPos.x,centerPos.y);
              rotate(angle);
              text(letter,0,0);
            pop();

            contentIndex += 1;
            if (contentIndex > content.length) {
              contentIndex = 1;
            }
            previousPos = pos;
          }
          if (!previousPos) {
            previousPos = pos;
          }
        }
        noFill();
      }
    }
    if (this.shapePath.length >= 2 && this.iterator < this.shapePath.length - 1) {
      currentIndex = Math.floor(this.iterator);
      currentPos = this.shapePath[currentIndex + 1];
      previousPos = this.shapePath[currentIndex];
      offsetPos = p5.Vector.lerp(previousPos, currentPos, (this.iterator - currentIndex));
      heading = p5.Vector.sub(currentPos, previousPos).heading();

      push();
        translate(offsetPos.x,offsetPos.y);
        this.pendulum.update(heading);
        if (showPendulum) {
          this.pendulum.draw();
        }
        this.pendulumPath.push(this.pendulum.getTrail(offsetPos));
      pop();

    }
  }
  update() {
    this.iterator += this.resolution;
    if (this.iterator > this.shapePath.length) {
      this.iterator = this.shapePath.length;
    }
  }
}

class Pendulum{
  constructor(size, hierarchy) {
    this.hierarchy = hierarchy - 1;
    this.armCount = mathRandomInt(1, maxArms);
    this.pendulumArms = [];
    this.size = size;
    this.angle = random(0, TWO_PI);
    this.origin = createVector(0,0);
    this.end = createVector(0,0);
    this.gravity = gravity;
    this.damping = damping;
    this.angularAcceleration = 0;
    this.angularVelocity = 0;
    if (this.hierarchy > 0) {
      var repeat_end = this.armCount;
      for (var count = 0; count < repeat_end; count++) {
        armSize = this.size / randomGaussian(1.5, armSizeDeviation);
        pendulumArm = new Pendulum(armSize, this.hierarchy);
        this.pendulumArms.push(pendulumArm);
      }
    }
  }
  update(heading) {
    armPos = p5.Vector.fromAngle(this.angle, this.size);
    this.end = p5.Vector.add(this.origin, armPos);
    this.angularAcceleration = (-this.gravity / this.size) * sin((this.angle + heading));
    this.angle += this.angularVelocity;
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity *= this.damping;
    var pendulumArm_list = this.pendulumArms;
    for (var pendulumArm_index in pendulumArm_list) {
      pendulumArm = pendulumArm_list[pendulumArm_index];
      pendulumArm.update(heading);
    }
  }
  getTrail(offset, pendulumTrailPaths) {
    if (!pendulumTrailPaths) {
      pendulumTrailPaths = [];
    }
    offset = p5.Vector.add(offset, this.end);
    var pendulumArm_list2 = this.pendulumArms;
    for (var pendulumArm_index2 in pendulumArm_list2) {
      pendulumArm = pendulumArm_list2[pendulumArm_index2];
      if (pendulumArm.pendulumArms.length > 0) {
        pendulumArm.getTrail(offset, pendulumTrailPaths);
      } else {
        pendulumTrailPaths.push(p5.Vector.add(offset, pendulumArm.end));
      }
    }
    return pendulumTrailPaths;
  }
  draw() {
    stroke((colour_rgb_alpha('#c0c0c0', 40, 100)));
    line(this.origin.x,this.origin.y,this.end.x,this.end.y);
    fill((colour_rgb_alpha('#cccccc', 20, 100)));
    ellipse(this.end.x,this.end.y,2);
    noFill();
    var pendulumArm_list3 = this.pendulumArms;
    for (var pendulumArm_index3 in pendulumArm_list3) {
      pendulumArm = pendulumArm_list3[pendulumArm_index3];

      push();
        translate(this.end.x,this.end.y);
        pendulumArm.draw();
      pop();

    }
  }
}

this.mousePressed = function(){
  newShape = new Shape(color(random(0, 360), 80, 60, 50));
  newShape.addPos(mouseX, mouseY);
};
this.mouseReleased = function(){
  shapes.push(newShape);
  newShape = null;
};
pragma=`sketchOwner arthurxie`;
