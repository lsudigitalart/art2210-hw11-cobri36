let markerTable;
let markers = [];
const cityBounds = { minLat: 30.3290, maxLat: 30.5838, minLon: -91.2805, maxLon: -91.0025 };
const aspectRatio = (cityBounds.maxLon - cityBounds.minLon) / (cityBounds.maxLat - cityBounds.minLat);

function preload() {
    // Load the Historic Marker dataset
    historicmarkerTable = loadTable("Historic_Marker.csv", "header");
  }

function setup() 
    {
    createCanvas(800, 800 / aspectRatio);
    for (let i = 0; i < historicMarkerTable.getRowCount(); i++)
    {
        let row = historicMarkerTable.getRow(i);
        let marker = 
        {
            name: row.get("Name"),
            latitude: parseFloat(row.get("Latitude")),
            longitude:parseFloat(row.get("Longitude")),
            description: row.get("Description"),
        };
        markers.push(marker);
    }
    console.log("Markers loaded: ", markers);
    }

function draw() 
    {
    background(20, 20, 40);  // Dark background to make the markers pop
    noStroke();
    fill(255);
    for (let marker of markers) {
        let x = map(marker.longitude, cityBounds.minLon, cityBounds.maxLon, 0, width);
        let y = map(marker.latitude, cityBounds.minLat, cityBounds.maxLat, height, 0);
        fill(100, 100, 255); // Blue-ish marker color
        ellipse(x, y, 10, 10);
        textSize(10);
        textAlign(CENTER);
        text(marker.name, x, y - 15);
      }
    }

    function mousePressed()
    {
        for (let marker of markers) {
            let x = map(marker.longitude, cityBounds.minLon, cityBounds.maxLon, 0, width);
            let y = map(marker.latitude, cityBounds.minLat, cityBounds.maxLat, height, 0);
            let d = dist(mouseX, mouseY, x, y);
        if (d < 10) {
        // Show the marker's description
        alert(marker.description);
            }
        }
    }