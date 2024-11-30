let historicMarkerTable;
let markers = [];
const cityBounds = { minLat: 30.3290, maxLat: 30.5838, minLon: -91.2805, maxLon: -91.0025 };
const aspectRatio = (cityBounds.maxLon - cityBounds.minLon) / (cityBounds.maxLat - cityBounds.minLat);

function preload() {
  historicMarkerTable = loadTable("Historic_Marker.csv", "header");
  console.log("CSV loaded: ", historicMarkerTable);
}

function setup() {
  createCanvas(800, 800 / aspectRatio);
  console.log("Canvas created with width:", width, "height:", height);

  for (let i = 0; i < historicMarkerTable.getRowCount(); i++) {
    let row = historicMarkerTable.getRow(i);
    let marker = {
      name: row.get("Name"),
      latitude: parseFloat(row.get("Latitude")),
      longitude: parseFloat(row.get("Longitude")),
      description: row.get("Description"),
    };
    markers.push(marker);
  }
  console.log("Markers loaded: ", markers);
}

function draw() {
  background(20, 20, 40);
  noStroke();
  for (let marker of markers) {
    let x = map(marker.longitude, cityBounds.minLon, cityBounds.maxLon, 0, width);
    let y = map(marker.latitude, cityBounds.minLat, cityBounds.maxLat, height, 0);
    console.log("Drawing marker:", marker.name, "at", x, y);
    fill(100, 100, 255);
    ellipse(x || 0, y || 0, 10, 10);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(marker.name, x, y - 15);
  }
}

function mousePressed() {
  for (let marker of markers) {
    let x = map(marker.longitude, cityBounds.minLon, cityBounds.maxLon, 0, width);
    let y = map(marker.latitude, cityBounds.minLat, cityBounds.maxLat, height, 0);
    let d = dist(mouseX, mouseY, x, y);
    console.log(`Mouse: (${mouseX}, ${mouseY}), Marker: (${x}, ${y}), Distance: ${d}`);
    if (d < 10) {
      alert(marker.description);
    }
  }
}