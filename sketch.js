let points = [],
  triangles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  noFill();

  drawDelaunay();
}

function drawPoints() {
  stroke(0);
  strokeWeight(7);
  for (let i = 0; i < points.length; i++) {
    point(points[i].x, points[i].y);
  }
}

function getTriangles() {
  triangles = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (points[i] == points[j]) {
        break;
      }
      for (let k = 0; k < points.length; k++) {
        if (points[j] == points[k] || points[i] == points[k]) {
          break;
        }
        const c = getCircumcenter(points[i], points[j], points[k]),
          r = dist(points[i].x, points[i].y, c.x, c.y);
        let inside = false;
        for (let l = 0; l < points.length; l++) {
          if (points[l] != points[i] && points[l] != points[j] && points[l] != points[k] && dist(points[l].x, points[l].y, c.x, c.y) < r) {
            inside = true;
            break;
          }
        }
        if (!inside) {
          triangles.push([createVector(points[i].x, points[i].y),
          createVector(points[j].x, points[j].y),
          createVector(points[k].x, points[k].y)]);
        }
      }
    }
  }
}

function drawTriangles() {
  stroke(0);
  strokeWeight(1);
  for (let i = 0; i < triangles.length; i++) {
    beginShape();
    vertex(triangles[i][0].x, triangles[i][0].y);
    vertex(triangles[i][1].x, triangles[i][1].y);
    vertex(triangles[i][2].x, triangles[i][2].y);
    endShape(CLOSE);
  }
}

function getCircumcenter(p0, p1, p2) {
  const p0x = p0.x,
    p0y = p0.y
  p1x = p1.x
  p1y = p1.y
  p2x = p2.x
  p2y = p2.y;
  p1x -= p0x;
  p1y -= p0y;
  p2x -= p0x;
  p2y -= p0y;

  let d = 2 * (p1x * p2y - p2x * p1y),
    z1 = p1x * p1x + p1y * p1y,
    z2 = p2x * p2x + p2y * p2y;

  if (d == 0) {
    throw { name: "Error", message: "\'d\' equals 0." };
  }

  return createVector((z1 * p2y - z2 * p1y) / d + p0x,
    (p1x * z2 - p2x * z1) / d + p0y);
}

function drawDelaunay() {
  background(255);
  getTriangles();
  drawTriangles();
  drawPoints();
}

function mouseClicked() {
  points.push(createVector(mouseX, mouseY));
  drawDelaunay();
}