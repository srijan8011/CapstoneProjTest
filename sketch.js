var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ship, ship_moving, sea, seaImg;
var diamondsGroup, diamond, diamondsImg, swordsGroup, sword, swordsImg;
var distance, score, gameOver, gameOverImg, restart, restartImg; 

function preload(){
    seaImg = loadImage("sea.png");
    ship_moving = loadAnimation("ship-1.png", "ship-2.png", "ship-3.png", "ship-4.png");
    diamondsImg = loadImage("diamonds.png");
    swordsImg = loadImage("sword.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    sea=createSprite(width/10,height/2);
    sea.addImage(seaImg);
    sea.velocityX = -5;
    sea.scale = 5;

    ship  = createSprite(width-800,height/2);
    ship.addAnimation("ship_bobbing", ship_moving);
    ship.scale=0.5;

    ship.setCollider("rectangle", 0, 0, ship.width, ship.height);
    //ship.debug = true;

    gameOver = createSprite(width/2,height/2- 50);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(width/2,height/2+ 50);
    restart.addImage(restartImg);
  
    gameOver.scale = 1;
    restart.scale = 0.1;

    gameOver.visible = false;
    restart.visible = false;

    diamondsGroup = new Group();
    swordsGroup = new Group();

    distance = 0;
    score = 0;
}

function draw() {
    background(0);
    
    textSize(25);
    //change text color
    fill(255);
    text("Distance: " + distance, width-300, height/2 - 300);

    textSize(25);
    //change text color
    fill(255);
    text("Score: " + score, width-300, height/2 - 400);


    if(gameState === PLAY) {

        distance = distance + Math.round(getFrameRate()/50);
        sea.velocityX = -(6 + 2*distance/150);

        ship.y = World.mouseY;

        edges = createEdgeSprites();
        ship.collide(edges);

        if(sea.x < 0) {
            sea.x = width/2;
        }

        spawnDiamonds();
        spawnSwords();

        if(diamondsGroup.isTouching(ship)) {
            score = score + 50;
            diamondsGroup.destroyEach();
        } 
        else if(swordsGroup.isTouching(ship)) {
            gameState = END;
        }


    } else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;

        // textSize(30);
        // fill(255);
        // text("Press 'SPACE' to reset the game!")

        ship.destroy();
        diamondsGroup.destroyEach();
        swordsGroup.destroyEach();

        sea.velocityX = 0;

        if(keyDown("SPACE")) {
            reset();
            // touches = [];
        }

        

    }

    drawSprites();
}

function spawnDiamonds() {
    if(World.frameCount % 250 == 0) {
    var diamond = createSprite(width, Math.round(random(50, height - 50)));
    diamond.scale = 0.05;
    diamond.velocityX = -5;
    diamond.lifetime = 500;
    diamond.addImage(diamondsImg);
    diamondsGroup.add(diamond)
    }
}

function spawnSwords() {
    if(World.frameCount % 300 == 0) {
        var sword = createSprite(width, Math.round(random(50, height - 50)));
        sword.scale = 0.2;
        sword.velocityX = -5;
        sword.lifetime = 500;
        sword.addImage(swordsImg);
        swordsGroup.add(sword)
        }
}

function reset() {
    gameState = PLAY;
    
    gameOver.visible = false;
    restart.visible = false;

    ship.addAnimation("ship_bobbing", ship_moving);

    score = 0;
    distance = 0;

    sea.velocityX = -5;
}