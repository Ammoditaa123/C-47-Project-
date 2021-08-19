var gameState = "serve"


var ice1, ice2, ice3, water, bg;
var iceImg, waterImg, bg;
var edges;

var reButton;

function preload() {

    iceImg = loadAnimation("ice.png");
    waterImg = loadAnimation("water.png")
    bg = loadImage("freezer.jpeg")

}

function setup() {

    createCanvas(600, 600);

    edges = createEdgeSprites();



    water = createSprite(200, 200);
    water.addAnimation("water drop", waterImg);
    water.scale = 0.1;
    water.setCollider("circle", 0, 90, 300);
    iceGroup = new Group();
    // ice1.debug = false;
    // ice2.debug = false;
    // ice3.debug = false;
    water.debug = false;

    maze1 = createSprite(500, 100, 200, 20);
    maze1.shapeColor = rgb(255, 255, 0, 0.4)

    maze2 = createSprite(300, 300, 200, 20);
    maze2.shapeColor = rgb(255, 0, 0, 0.4)

    maze3 = createSprite(100, 550, 200, 20);
    maze3.shapeColor = rgb(0, 255, 0, 0.4)

    maze4 = createSprite(200, 400, 200, 20);
    maze4.shapeColor = rgb(0, 0, 255, 0.4)

    maze5 = createSprite(400, 200, 200, 20);
    maze5.shapeColor = rgb(255, 0, 255, 0.4);

    ice1 = createSprite(100, 60);
    ice1.addAnimation("ice1", iceImg);
    ice1.scale = 0.2;
    ice1.velocityX = 4;
    ice1.setCollider("circle", 0, 0, 200);

    ice2 = createSprite(100, 260);
    ice2.addAnimation("ice2", iceImg);
    ice2.scale = 0.2;
    ice2.velocityX = 2;
    ice2.setCollider("circle", 0, 0, 200);

    ice3 = createSprite(100, 500);
    ice3.addAnimation("ice3", iceImg);
    ice3.scale = 0.2;
    ice3.velocityX = 5;
    ice3.setCollider("circle", 0, 0, 200);

    reButton = createSprite(200, 200, 100, 20);
    reButton.shapeColor = "red"
}


function draw() {
    background(bg);
    if (gameState === "serve") {

        background(0);
        fill(255);
        textSize(25)
        text("WELCOME I AM FRIZZY", 150, 300);
        text("I HOPE IT'S NOT TOO COLD INSIDE BYEEE!!!", 20, 350);
        text("Press space to start", 200, 450);
        // ice1.visible = false;
        // ice2.visible = false;
        // ice3.visible = false;
        water.visible = false;
        maze1.visible = false;
        maze2.visible = false;
        maze3.visible = false;
        maze4.visible = false;
        maze5.visible = false;
        reButton.visible = false

    }

    if (keyDown("space") && gameState === "serve") {
        gameState = "play";
    }

    if (gameState === "play") {
        drawSprites()

        iceGroup.add(ice1);
        iceGroup.add(ice2);
        iceGroup.add(ice3);

        // ice1.visible = true;
        // ice2.visible = true;
        // ice3.visible = true;
        water.visible = true;
        maze1.visible = true;
        maze2.visible = true;
        maze3.visible = true;
        maze4.visible = true;
        maze5.visible = true;

        if (keyDown(RIGHT_ARROW)) {
            // water.x += 10;
            water.velocityX = 10
        }
        if (keyDown(LEFT_ARROW)) {
            // water.x -= 10;
            water.velocityX = -10
        }
        if (keyDown(UP_ARROW)) {
            water.y -= 10;
        }
        if (keyDown(DOWN_ARROW)) {
            water.y += 10;
        }

        water.bounceOff(maze1);
        water.bounceOff(maze2);
        water.bounceOff(maze3);
        water.bounceOff(maze4);
        water.bounceOff(maze5);
        water.collide(edges);
        iceGroup.bounceOff(edges)

        if (water.isTouching(iceGroup)) {
            water.addAnimation("frozen", iceImg);
            water.changeAnimation("frozen", iceImg);
            water.scale = 0.2;
            gameState = "end";
        }
    }

    if (gameState === "end") {
        background(0)
        textSize(35)
        fill("white")
        text("YOU LOST", 200, 150);

        text("Restart", 150, 200);

        // reButton=createButton('Restart');
        // reButton.position(150,200)
        // reButton.mousePressed(reset);
        // iceGroup.destroyEach();
        // water.destroy();
        // maze1.destroy();
        // maze2.destroy();
        // maze3.destroy();
        // maze4.destroy();
        // maze5.destroy();
        if (mousePressedOver(reButton) && gameState === "end") {
            reset()
        }
    }



}

function reset() {
    gameState = "serve";
    // location.reload();

    // water.y = 300;

}