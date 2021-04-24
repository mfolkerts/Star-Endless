class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/plane.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('5field', './assets/5thclouds.png');
        this.load.image('4field', './assets/4rthcanyon.png');
        this.load.image('3field', './assets/3rdmountains.png');
        this.load.image('2field', './assets/2ndtrees.png');
        this.load.image('1field', './assets/FrontClouds.png');
        this.load.image('super', './assets/superplane.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
      }
    create() {
    // place tile sprite
    this.starfield5 = this.add.tileSprite(0, 0, 640, 480, '5field').setOrigin(0, 0);
    this.starfield4 = this.add.tileSprite(0, 0, 640, 480, '4field').setOrigin(0, 0);
    this.starfield3 = this.add.tileSprite(0, 0, 640, 480, '3field').setOrigin(0, 0);
    this.starfield2 = this.add.tileSprite(0, 0, 640, 480, '2field').setOrigin(0, 0);
    this.starfield1 = this.add.tileSprite(0, 0, 640, 480, '1field').setOrigin(0, 0);
    // green UI background
    this.add.rectangle(40, borderUISize - 10 + borderPadding, game.config.width - 500, borderUISize * 2, 0x0F1F0).setOrigin(0, 0);
    // white borders
    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    // add rocket (p1)
    this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
    // add spaceships (x3)
    this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
    this.ship04 = new Spaceship(this, game.config.width + borderUISize*2, borderUISize*2.5, 'super', 0, 35).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
    // define keys
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyF2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
    });
    // initialize score
    this.p1Score = 0;
      // display score
    let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#ffffff',
        color: '#000000',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 100
    }
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
   // GAME OVER flag
    this.gameOver = false;

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
    this.gameOver = true;
    }, null, this);
    } // End of Create Function
    update() {
          // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
                }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            }   
        this.starfield5.tilePositionX -= 1;
        this.starfield4.tilePositionX -= 2;
        this.starfield3.tilePositionX -= 3;
        this.starfield2.tilePositionX -= 4;
        this.starfield1.tilePositionX -= 5;
        if (!this.gameOver) {              
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        } 
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);


        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            game.settings = {
                  
              }
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);

        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);

        }           
      }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        }); 
         // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');             
      }
}