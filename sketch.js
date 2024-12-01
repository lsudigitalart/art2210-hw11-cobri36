let cemeteries = [
    { name: "Tranquil Community Cemetery", type: "PRIVATE", coordinates: [100, 150], area: 620 },
    { name: "Rosewood Gardens", type: "PUBLIC", coordinates: [300, 200], area: 1943 },
    { name: "Serenity Oaks", type: "PUBLIC", coordinates: [500, 300], area: 707 },
    { name: "Jasmine Cemetery", type: "PRIVATE", coordinates: [200, 400], area: 350 },
    { name: "Greenwood Cemetery", type: "PUBLIC", coordinates: [600, 100], area: 1120 },
    { name: "Calm Meadows", type: "PRIVATE", coordinates: [700, 500], area: 1500 },
    { name: "St. John's Cemetery", type: "PUBLIC", coordinates: [450, 500], area: 950 },
    { name: "Crystal Clear Cemetery", type: "PRIVATE", coordinates: [800, 300], area: 750 },
    { name: "Lakeview Cemetery", type: "PUBLIC", coordinates: [400, 600], area: 600 },
    { name: "Eternal Meadows", type: "PRIVATE", coordinates: [100, 500], area: 1350 },
    { name: "Lakeside Serenity Cemetery", type: "PRIVATE", coordinates: [150, 700], area: 500 },
    { name: "Crescent Cemetery", type: "PUBLIC", coordinates: [600, 700], area: 1500 },
    { name: "Blossom Cemetery", type: "PRIVATE", coordinates: [250, 250], area: 850 },
    { name: "Peaceful Cove", type: "PUBLIC", coordinates: [750, 400], area: 1200 },
    { name: "Fairview Cemetery", type: "PRIVATE", coordinates: [1000, 200], area: 600 },
    { name: "Riverbank Memorial", type: "PUBLIC", coordinates: [950, 600], area: 1800 },
    { name: "Serenity Gardens Cemetery", type: "PRIVATE", coordinates: [1100, 700], area: 400 },
    { name: "Unity Hill Cemetery", type: "PUBLIC", coordinates: [400, 450], area: 1600 },
    { name: "Mountain Zenith Cemetery", type: "PRIVATE", coordinates: [800, 500], area: 700 },
    { name: "Pine Grove", type: "PUBLIC", coordinates: [900, 650], area: 1400 },
    { name: "Sacred Meadows Cemetery", type: "PRIVATE", coordinates: [200, 300], area: 1300 },
    { name: "Golden Willow Cemetery", type: "PUBLIC", coordinates: [350, 350], area: 1100 },
    { name: "Shady Hills", type: "PRIVATE", coordinates: [1200, 350], area: 950 },
    { name: "Horizon Cemetery", type: "PUBLIC", coordinates: [1300, 500], area: 1400 },
    { name: "River Oaks Cemetery", type: "PRIVATE", coordinates: [1500, 100], area: 800 },
    { name: "Timeless Cemetery", type: "PUBLIC", coordinates: [1350, 200], area: 900 },
    { name: "Prairie Cemetery", type: "PRIVATE", coordinates: [600, 800], area: 950 },
    { name: "New Haven Cemetery", type: "PUBLIC", coordinates: [700, 800], area: 1050 },
    { name: "Cedar Grove Sanctuary", type: "PRIVATE", coordinates: [1200, 200], area: 550 },
    { name: "Restful Peace Cemetery", type: "PUBLIC", coordinates: [800, 150], area: 1000 },
    { name: "Fern Meadows", type: "PRIVATE", coordinates: [1300, 100], area: 600 },
    { name: "Infinity Memorial Cemetery", type: "PUBLIC", coordinates: [1600, 500], area: 950 },
    { name: "Harbor View Cemetery", type: "PRIVATE", coordinates: [1500, 200], area: 750 },
    { name: "Blue Horizon Cemetery", type: "PUBLIC", coordinates: [200, 100], area: 1200 },
    { name: "Majestic Valley Cemetery", type: "PRIVATE", coordinates: [1100, 100], area: 500 },
    { name: "Verdant Meadows", type: "PUBLIC", coordinates: [1200, 600], area: 1600 },
    { name: "Sacred Peace Cemetery", type: "PRIVATE", coordinates: [900, 200], area: 750 }
];

function setup() {
    createCanvas(1800, 900);
    background(0, 4, 29); //dark blue
}

function draw() {
    background(0, 4, 29);
    cemeteries.forEach(cemetery => {
        drawCemetery(cemetery);
    });
    drawLegend();
}

function drawCemetery(cemetery) { //make cemetery locations glow and twinkle
    let cemeteryColor = cemetery.type === "PRIVATE" ? color(255, 215, 0) : color(255);
    let circleBaseSize = map(cemetery.area, 400, 2000, 5, 30);
    let twinkleSize = circleBaseSize + sin(frameCount * 0.1 + cemetery.coordinates[0] * 0.01) * 2;
    noStroke();
    for (let i = 5; i > 0; i--) {
        fill(cemeteryColor.levels[0], cemeteryColor.levels[1], cemeteryColor.levels[2], map(i, 1, 5, 50, 5));
        ellipse(cemetery.coordinates[0], cemetery.coordinates[1], twinkleSize + i * 5);
    }
    fill(cemeteryColor);
    ellipse(cemetery.coordinates[0], cemetery.coordinates[1], twinkleSize);
    if (
        dist(mouseX, mouseY, cemetery.coordinates[0], cemetery.coordinates[1]) <
        twinkleSize / 2
    ) {
        showTooltip(cemetery);
    }
}

function showTooltip(cemetery) {
    fill(0, 128); // Semi-transparent black background
    rect(mouseX + 10, mouseY - 10, 200, 70, 5); // Tooltip box
    fill(255);
    textSize(12);
    textAlign(LEFT, TOP);
    text(
        `Name: ${cemetery.name}\nType: ${cemetery.type}\nArea: ${cemetery.area} sq ft`,
        mouseX + 15,
        mouseY - 5
    );
}

function drawLegend() { //label box
    let legendX = width - 260; 
    let legendY = height - 160; 
    let boxWidth = 250;
    let boxHeight = 150;
    fill(0, 150);
    rect(legendX, legendY, boxWidth, boxHeight, 10);
    fill(255);
    textSize(18);
    textAlign(LEFT, TOP);
    text("Cemetery Types", legendX + 20, legendY + 20);
    textSize(16);
    fill(255, 215, 0);
    rect(legendX + 20, legendY + 60, 30, 30);
    fill(255);
    rect(legendX + 20, legendY + 110, 30, 30);
    fill(255);
    text("PRIVATE", legendX + 60, legendY + 60);
    text("PUBLIC", legendX + 60, legendY + 110);
}