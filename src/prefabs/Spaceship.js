// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.points = pointValue;
      this.moveSpeed = (pointValue + game.settings.spaceshipSpeed - 10);
    }

    update() {
        // move spaceship down
        this.y -= this.moveSpeed;
        if(this.y <= 0 - this.width) {
           this.reset();
        } 
    }

    reset() {
        this.x = game.config.width;
    }
}