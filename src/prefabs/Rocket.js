// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 6;
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
      this.sfxmovement = scene.sound.add('sfx_select');
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
                this.sfxmovement.play();  // play sfx
                
            } else if (keyRIGHT.isDown && this.x <= game.config.width -
            borderUISize - this.width) {
                this.x += this.moveSpeed;
                this.sfxmovement.play();  // play sfx
                
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 2 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 2 + borderPadding) {
            this.reset();
        }
    }
    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height- borderUISize - borderPadding;
    }
  }