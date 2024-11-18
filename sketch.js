let rivers;
let rows;
let radius = 80;
let margin = 10;
let x;
let y;

function preload() {
  rivers = loadTable('fiumi.csv','ssv','header');
}

function setup() {
  createCanvas(1600, 800);
  background(245, 245, 220);
  textAlign(CENTER, CENTER);
  rows = rivers.getRows(); 
  rows.sort((a, b) => { return a.getNum("length") - b.getNum("length"); }); 
}

function draw() {
  let lengths = rivers.getColumn("length").map(Number);
  maxLength = Math.max(...lengths);
  drawTitle();
  drawRivers();
  drawLegend();
}

function drawTitle(){
  x = radius*1.6, y = radius/4;
  textSize(30);
  fill(0,0,0);
  text("Fiumi del mondo", x, y);
}

function drawLegend(){
  x = radius;
  y = y + radius;
  let pointradius = 20;
  let deltax = 100;
  textSize(10);
  
  drawLegendItem("Africa", "Africa", deltax*0, x, y, pointradius);
  drawLegendItem("Europa", "Europe", deltax*1, x, y, pointradius);
  drawLegendItem("Asia", "Asia", deltax*2, x, y, pointradius);
  drawLegendItem("Nord America", "North America", deltax*3, x, y, pointradius);
  drawLegendItem("Sud America", "South America", deltax*4, x, y, pointradius);
  drawLegendItem("Oceania", "Oceania", deltax*5, x, y, pointradius);
}

function drawLegendItem(label, txtcolor, deltax, labelx, labely, pointradius){
  fill(0,0,0);
  text(label, labelx+pointradius+deltax, labely);
  fill(getColorByContinent(txtcolor));
  ellipse(labelx-pointradius+deltax, labely, pointradius, pointradius);
}

function drawRivers() {
  x = margin + radius, y = y/2 + margin + radius;

  for (let i = 0; i < rows.length; i++) {

    let color = getColorByContinent(rows[i].getString("continent"));

    let angle = map(rows[i].getNum("length"), 0, maxLength, 0, TWO_PI);

    noFill();
    strokeWeight(9);
    stroke(200); 
    ellipse(x, y, radius, radius);

    stroke(color); 
    arc(x, y, radius, radius, -HALF_PI, -HALF_PI + angle);

    noStroke();
    fill(0);
    textSize(12);
    text(rows[i].getString("name"), x, y);

    x += radius + margin * 2;
    if (x > width - margin - radius) {
      x = margin + radius;
      y += radius + margin * 2;
    }
  }
}

function getColorByContinent(continent) {
  switch (continent) {
    case "Oceania":
      return color(0, 114, 158); 
    case "Europe":
      return color(85, 176, 194); 
    case "Africa":
      return color(46, 173, 147); 
    case "South America":
      return color(33, 165, 175); 
    case "North America":
      return color(122, 204, 232); 
    case "Asia":
      return color(32, 125, 123); 
    default:
      return color(150); 
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}
