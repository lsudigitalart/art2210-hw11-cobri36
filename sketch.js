let historicMarkerTable;
let markers = [];
const cityBounds = { 
    minLat: 30.3290, 
    maxLat: 30.5838, 
    minLon: -91.2805, 
    maxLon: -91.0025 
  };
const aspectRatio = (cityBounds.maxLon - cityBounds.minLon) / (cityBounds.maxLat - cityBounds.minLat);

function preload() {
  historicMarkerTable = loadTable("Historic_Marker.csv", "header");
  console.log("CSV loaded: ", historicMarkerTable);
}

function setup() {
    createCanvas(800, 800 / aspectRatio);
    for (let i = 0; i < historicMarkerTable.getRowCount(); i++) {
        let row = historicMarkerTable.getRow(i);
        let latitude = parseFloat(row.get("Latitude"));
        let longitude = parseFloat(row.get("Longitude"));
        let marker = {
            name: row.get("Name"),
            latitude: latitude,
            longitude: longitude,
            description: row.get("Description"),
        };
        markers.push(marker);
        console.log(`Marker: ${marker.name}, Latitude: ${latitude}, Longitude: ${longitude}`);
        if (
            latitude < cityBounds.minLat || 
            latitude > cityBounds.maxLat || 
            longitude < cityBounds.minLon || 
            longitude > cityBounds.maxLon
        ) {
            console.warn(`Marker ${marker.name} is out of cityBounds!`);
        }
    }
    console.log("Markers loaded: ", markers);
    console.log("City Bounds: ", cityBounds);
}

function draw() {
    background(20, 20, 40);
    noStroke();
    
    for (let marker of markers) {
      let x = map(marker.longitude, cityBounds.minLon, cityBounds.maxLon, 0, width);
      let y = map(marker.latitude, cityBounds.minLat, cityBounds.maxLat, height, 0);
      if (isNaN(x) || isNaN(y)) {
        console.error(`Invalid coordinates for marker: ${marker.name} (Latitude: ${marker.latitude}, Longitude: ${marker.longitude})`);
        continue;
      }
  
      console.log("Drawing marker:", marker.name, "at", x, y);
      
      fill(100, 100, 255);
      ellipse(x, y, 10, 10);
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