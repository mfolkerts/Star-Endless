class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_music', './assets/New_Music.mp3');
        this.load.image('menu', './assets/menu.png');
      }
    create() {
      
      this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0);
      let menuConfig = {
        fontFamily: 'Times',
        fontSize: '28px',
        backgroundColor: '#ff0000',
        color: '#ffffff',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
        
      }
      
      
      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 600000000000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');
          game.global.health = 4;
          game.global.loop = 0;    
        }
      }
}