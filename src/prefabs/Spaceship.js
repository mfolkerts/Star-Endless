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
        // move spaceship left
        this.y += this.moveSpeed / game.global.health;
        // wrap around from left edge to right edge
        if(this.y >= game.config.height) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.y = 0;
        this.x = Phaser.Math.Between(10, 630);
    }
}