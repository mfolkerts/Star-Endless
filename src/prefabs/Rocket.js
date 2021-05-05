// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = 6;
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
      this.sfxmovement = scene.sound.add('sfx_select');
      this.anims.create({
        key: 'fireball',
        frames: this.anims.generateFrameNumbers('meteor', { start: 0, end: 3, first: 0}),
        frameRate: 8,
        repeat: -1
    });
    this.anims.play('fireball');
    }

    update() {
        // left/right movement
        
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
                
                
            } else if (keyRIGHT.isDown && this.x <= game.config.width -
            borderUISize - this.width) {
                this.x += this.moveSpeed;
                
                
            }
            if(keyUP.isDown && this.y >= borderUISize + this.height) {
                this.y -= this.moveSpeed;
                
                
            } else if (keyDOWN.isDown && this.y <= game.config.height -
            borderUISize - this.height) {
                this.y += this.moveSpeed;
                
                
            }
        
        
    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
    
  }