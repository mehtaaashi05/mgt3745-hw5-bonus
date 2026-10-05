const areas = [
  {
    name: "BUSINESS CREDIT",
    detail: "Illustrative work: evaluating credit needs and business context.",
    question: "Ask: What does a typical week look like?",
    color: "#c4553d"
  },
  {
    name: "TREASURY MANAGEMENT",
    detail: "Illustrative work: helping businesses manage cash and payments.",
    question: "Ask: Which problems do clients bring you most?",
    color: "#28745e"
  }
];

let selected = 0;
let compact = false;
const compactBreakpoint = 820;

function setup() {
  compact = windowWidth < compactBreakpoint;
  const canvas = createCanvas(min(windowWidth, 980), compact ? 835 : 660);
  canvas.parent("sketch-root");
  canvas.elt.setAttribute("role", "img");
  canvas.elt.setAttribute("aria-label", "Interactive illustration about information-first conversations when exploring another line of business.");
  canvas.elt.setAttribute("aria-describedby", "selection-status");
  noLoop();
  announceSelection();
}

function draw() {
  compact = width < compactBreakpoint;
  background("#f3efe5");

  noStroke();
  fill("#c4553d");
  rect(26, 25, 5, 23);
  fill("#53616a");
  textFont("Arial");
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, BASELINE);
  text("MGT 3745  /  CREATIVE CODING AS BUSINESS COMMUNICATION", 40, 41);

  fill("#102b40");
  textFont("Georgia");
  textStyle(BOLD);
  textSize(compact ? 22 : 26);
  text("A first conversation can be about learning, not moving.", 28, 91, width - 56, compact ? 88 : 42);

  fill("#53616a");
  textFont("Arial");
  textStyle(NORMAL);
  textSize(14);
  text("For interns curious about another line of business.", 29, compact ? 190 : 151, width - 58, 34);

  const flowY = compact ? 246 : 221;
  const steps = ["Curious", "Ask to learn", "Decide with context"];

  if (compact) {
    stroke("#c9c2b2");
    strokeWeight(2);
    line(46, flowY, 46, flowY + 96);
  } else {
    const centers = [width * 0.2, width * 0.5, width * 0.8];
    stroke("#c9c2b2");
    strokeWeight(2);
    line(centers[0], flowY, centers[2], flowY);
  }

  noStroke();
  steps.forEach((step, index) => {
    const x = compact ? 46 : [width * 0.2, width * 0.5, width * 0.8][index];
    const y = compact ? flowY + index * 48 : flowY;
    fill(index === 1 ? "#c4553d" : "#102b40");
    circle(x, y, 32);
    fill("#ffffff");
    textFont("Arial");
    textSize(9);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("0" + (index + 1), x, y);
    fill("#102b40");
    textSize(13);
    textStyle(NORMAL);
    textAlign(compact ? LEFT : CENTER, CENTER);
    text(step, compact ? x + 23 : x, compact ? y : y + 29);
  });

  const cardY = compact ? 405 : 322;
  const cardHeight = compact ? 151 : 196;
  const gap = 14;
  const cardWidth = compact ? width - 40 : (width - 70 - gap) / 2;
  const left = compact ? 20 : 35;

  areas.forEach((area, index) => {
    const x = compact ? left : left + index * (cardWidth + gap);
    const y = compact ? cardY + index * (cardHeight + 12) : cardY;
    drawArea(area, index, x, y, cardWidth, cardHeight);
  });

  fill("#53616a");
  textFont("Arial");
  textStyle(NORMAL);
  textSize(10);
  textAlign(LEFT, BASELINE);
  const footer = compact
    ? "ILLUSTRATIVE ONLY / NOT A TRANSFER RECOMMENDATION"
    : "STARTER, NOT AN OFFICIAL ROLE DESCRIPTION OR TRANSFER RECOMMENDATION";
  text(footer, 28, height - 23);
}

function drawArea(area, index, x, y, cardWidth, cardHeight) {
  textAlign(LEFT, BASELINE);
  fill(index === selected ? "#fffdf8" : "#ebe6da");
  stroke(index === selected ? area.color : "#d6d0c3");
  strokeWeight(index === selected ? 2 : 1);
  rect(x, y, cardWidth, cardHeight, 4);

  noStroke();
  fill(area.color);
  rect(x, y, 5, cardHeight, 2);

  fill("#53616a");
  textFont("Arial");
  textStyle(BOLD);
  textSize(10);
  text(index === selected ? "ILLUSTRATIVE EXAMPLE  /  SELECTED" : "ILLUSTRATIVE EXAMPLE  /  SELECT", x + 18, y + 25);

  fill("#102b40");
  textFont("Georgia");
  textSize(18);
  text(area.name, x + 18, y + 57, cardWidth - 34, 30);

  fill("#3b494f");
  textFont("Arial");
  textStyle(NORMAL);
  textSize(13);
  text(area.detail, x + 18, y + 87, cardWidth - 34, 42);

  fill(area.color);
  textStyle(BOLD);
  textSize(12);
  text(area.question, x + 18, y + cardHeight - 25, cardWidth - 34, 24);
}

function mousePressed() {
  const compactNow = width < compactBreakpoint;
  const cardY = compactNow ? 405 : 322;
  const cardHeight = compactNow ? 151 : 196;
  const gap = 14;
  const cardWidth = compactNow ? width - 40 : (width - 70 - gap) / 2;
  const left = compactNow ? 20 : 35;

  areas.forEach((area, index) => {
    const x = compactNow ? left : left + index * (cardWidth + gap);
    const y = compactNow ? cardY + index * (cardHeight + 12) : cardY;
    if (mouseX >= x && mouseX <= x + cardWidth && mouseY >= y && mouseY <= y + cardHeight) {
      selected = index;
      announceSelection();
      redraw();
    }
  });
}

function keyPressed() {
  if (key === "1" || key === "2") {
    selected = Number(key) - 1;
    announceSelection();
    redraw();
    return false;
  }
}

function announceSelection() {
  const status = document.getElementById("selection-status");
  if (status) {
    status.textContent = "Selected " + areas[selected].name + ". " + areas[selected].question;
  }
}

function windowResized() {
  compact = windowWidth < compactBreakpoint;
  resizeCanvas(min(windowWidth, 980), compact ? 835 : 660);
  announceSelection();
  redraw();
}