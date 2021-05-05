class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/satellite.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('super', './assets/ship.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        //
        this.load.image('4field', './assets/pixil-layer-Background.png');
        this.load.image('3field', './assets/pixil-layer-nebulas.png');
        this.load.image('2field', './assets/pixil-layer-stars.png');
        this.load.image('1field', './assets/pixil-layer-planets.png');
        this.load.spritesheet('meteor', './assets/meteor.png', {frameWidth: 35, frameHeight: 64, startFrame: 0, endFrame: 4});



      }
    create() {
        this.musicPlaying = this.sound.add('sfx_music', './assets/New_Music.mp3');
        this.musicPlaying.play()

    // place tile sprite
    //background first, foreground last

    this.starfield4 = this.add.tileSprite(0, 0, 640, 480, '4field').setOrigin(0, 0);
    this.starfield3 = this.add.tileSprite(0, 0, 640, 480, '3field').setOrigin(0, 0);
    this.starfield2 = this.add.tileSprite(0, 0, 640, 480, '2field').setOrigin(0, 0);
    this.starfield1 = this.add.tileSprite(0, 0, 640, 480, '1field').setOrigin(0, 0);
    
    this.add.rectangle(40, borderUISize - 10 + borderPadding, game.config.width - 500, borderUISize * 2, 0x0F1F0).setOrigin(0, 0);
    
    this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
    // add spaceships (x3)
    this.ship01 = new Spaceship(this, 500, 10, 'spaceship', 0, 30).setOrigin(0,0);
    this.ship04 = new Spaceship(this, 300, 10, 'super', 0, 35).setOrigin(0,0);
    this.ship02 = new Spaceship(this, 150, 10, 'spaceship', 0, 20).setOrigin(0,0);
    this.ship03 = new Spaceship(this, 10, 10, 'spaceship', 0, 10).setOrigin(0,0);
    // define keys
    
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

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
    if (game.global.health > 0) {
        this.gameOver = false;
    }
    } // End of Create Function
    update() {
    if (this.gameOver == true)
    {
        for(;game.global.loop < 1;game.global.loop++)
        {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press ← to return to Menu',).setOrigin(0.5);
        }
    }
    if (game.global.health <= 0) {
        this.gameOver = true;
        this.sound.get('sfx_music').stop();
    }
          // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.musicPlaying.stop();
            }
        if( game.global.health > 0)
        {
            this.p1Score += 1/game.global.health;
        }
        this.scoreLeft.text = Math.round(this.p1Score);

        if (game.global.health == 0) {
            this.starfield4.tilePositionY -= 0;
            this.starfield3.tilePositionY -= 0;
            this.starfield2.tilePositionY -= 0;
            this.starfield1.tilePositionY -= 0;
        }
        if (game.global.health > 0) {
            this.starfield4.tilePositionY -= 4 / game.global.health;
            this.starfield3.tilePositionY -= 6 / game.global.health;
            this.starfield2.tilePositionY -= 8 / game.global.health;
            this.starfield1.tilePositionY -= 4 / game.global.health;
        }
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
        ship.reset();
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(this.p1Rocket.x, this.p1Rocket.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
                                 // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        }); 
         // score add and repaint
        this.sound.play('sfx_explosion');
        game.global.health -= 1;             
      }
}