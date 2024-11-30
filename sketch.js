let cemeteryData;
let cemeteryLocations = [];

function preload() {
    cemeteryData = loadTable("cemetery.csv", "header");
}

function getColorForGraveType(graveType) {
    switch (graveType) {
        case 'Family Plot': return color(184, 147, 147); // red
        case 'Single Grave': return color(148, 184, 157); // green
        case 'Veteran': return color(134, 159, 167); // blue
        default: return color(150, 150, 150); // gray
    }
}

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < cemeteryData.getRowCount(); i++) {
        let lat = parseFloat(cemeteryData.getString(i, 'latitude'));
        let lon = parseFloat(cemeteryData.getString(i, 'longitude'));
        let graveType = cemeteryData.getString(i, 'grave_type');

        if (!isNaN(lat) && !isNaN(lon)) {
            cemeteryLocations.push({ lat, lon, graveType });
        }
    }
}

function draw() {
    background(255);
    for (let i = 0; i < cemeteryLocations.length; i++) {
        let loc = cemeteryLocations[i];
        let x = map(loc.lon, -91.5, -91, 0, width);
        let y = map(loc.lat, 30.2, 30.6, height, 0);
        
        fill(getColorForGraveType(loc.graveType));
        noStroke();
        ellipse(x, y, 10, 10);
    }
    drawLegend();
}

function drawLegend() {
    fill(0);
    textSize(12);
    text('Grave Type Legend', 10, 20);
    fill(255, 0, 0);
    ellipse(10, 40, 10, 10);
    fill(0);
    text('Family Plot', 20, 45);
    
    fill(0, 255, 0);
    ellipse(10, 60, 10, 10);
    fill(0);
    text('Single Grave', 20, 65);
    
    fill(0, 0, 255);
    ellipse(10, 80, 10, 10);
    fill(0);
    text('Veteran', 20, 85);
}
let cemeteries = [
    { name: "T.C.C", type: "PRIVATE", coordinates: [100, 150], area: 620 },
    { name: "R.G.", type: "PUBLIC", coordinates: [300, 200], area: 1943 },
    { name: "S.O.", type: "PUBLIC", coordinates: [500, 300], area: 707 },
    { name: "J.C.", type: "PRIVATE", coordinates: [200, 400], area: 350 },
    { name: "G.C.", type: "PUBLIC", coordinates: [600, 100], area: 1120 },
    { name: "C.M.", type: "PRIVATE", coordinates: [700, 500], area: 1500 },
    { name: "S.J.", type: "PUBLIC", coordinates: [450, 500], area: 950 },
    { name: "C.C.", type: "PRIVATE", coordinates: [800, 300], area: 750 },
    { name: "L.C.", type: "PUBLIC", coordinates: [400, 600], area: 600 },
    { name: "E.M.", type: "PRIVATE", coordinates: [100, 500], area: 1350 },
    { name: "L.S.C.", type: "PRIVATE", coordinates: [150, 700], area: 500 },
    { name: "C.C.", type: "PUBLIC", coordinates: [600, 700], area: 1500 },
    { name: "B.C.", type: "PRIVATE", coordinates: [250, 250], area: 850 },
    { name: "P.C.", type: "PUBLIC", coordinates: [750, 400], area: 1200 },
    { name: "F.C.", type: "PRIVATE", coordinates: [1000, 200], area: 600 },
    { name: "R.M.", type: "PUBLIC", coordinates: [950, 600], area: 1800 },
    { name: "S.G.C.", type: "PRIVATE", coordinates: [1100, 700], area: 400 },
    { name: "U.H.C.", type: "PUBLIC", coordinates: [400, 450], area: 1600 },
    { name: "M.Z.C.", type: "PRIVATE", coordinates: [800, 500], area: 700 },
    { name: "P.G.", type: "PUBLIC", coordinates: [900, 650], area: 1400 },
    { name: "S.M.C.", type: "PRIVATE", coordinates: [200, 300], area: 1300 },
    { name: "G.W.C.", type: "PUBLIC", coordinates: [350, 350], area: 1100 },
    { name: "S.H.", type: "PRIVATE", coordinates: [1200, 350], area: 950 },
    { name: "H.C.", type: "PUBLIC", coordinates: [1300, 500], area: 1400 },
    { name: "R.O.C.", type: "PRIVATE", coordinates: [1500, 100], area: 800 },
    { name: "T.C.", type: "PUBLIC", coordinates: [1350, 200], area: 900 },
    { name: "P.C.", type: "PRIVATE", coordinates: [600, 800], area: 950 },
    { name: "N.H.C.", type: "PUBLIC", coordinates: [700, 800], area: 1050 },
    { name: "C.G.S.", type: "PRIVATE", coordinates: [1200, 200], area: 550 },
    { name: "R.P.C.", type: "PUBLIC", coordinates: [800, 150], area: 1000 },
    { name: "F.M.", type: "PRIVATE", coordinates: [1300, 100], area: 600 },
    { name: "I.M.C.", type: "PUBLIC", coordinates: [1600, 500], area: 950 },
    { name: "H.V.C.", type: "PRIVATE", coordinates: [1500, 200], area: 750 },
    { name: "B.H.C.", type: "PUBLIC", coordinates: [200, 100], area: 1200 },
    { name: "M.V.C.", type: "PRIVATE", coordinates: [1100, 100], area: 500 },
    { name: "V.M.", type: "PUBLIC", coordinates: [1200, 600], area: 1600 },
    { name: "S.P.C.", type: "PRIVATE", coordinates: [900, 200], area: 750 }
];

function setup() {
    createCanvas(1800, 900); 
    background(0, 4, 29);  // blue

    cemeteries.forEach(cemetery => {
        drawCemetery(cemetery);
    });
}

function draw() {
}

function drawCemetery(cemetery) {
    // get the color based on the cemetery type
    let cemeteryColor = cemetery.type === "PRIVATE" ? color(255, 215, 0) : color(255);  // yellow for private cemeteries, white for public

    let circleSize = map(cemetery.area, 400, 2000, 5, 30);

    // circle for location
    fill(cemeteryColor);
    noStroke();
    ellipse(cemetery.coordinates[0], cemetery.coordinates[1], circleSize, circleSize);  // circle size

  //cemetery name
    fill(255);  // white text
    textSize(12);
    textAlign(CENTER, CENTER);
    text(cemetery.name, cemetery.coordinates[0], cemetery.coordinates[1] - circleSize / 2 - 10);
}
