/*
Star Endless
Made by Mariel Folkerts, Gabriel Gallegos, and Elroy Lobos
Date Completed: 5/4/2021

Creative Tilt:
Our game takes concepts from Rocket Patrols and implements them to be more advanced. 
For instance, Rocket Patrol had objects come in a horizontal direction, meanwhile ours came in a vertical direction. 
Another instance is that our game also implements a 3 life system, whereas unlike Rocket Patrol's 1 hit and game over,
our game also allows a rewarding system where the less hearts we have then the more points we gain.
On the artistic side, we are proud of the pixel artwork and music we designed for this game.
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }
  let game = new Phaser.Game(config);
  game.global = {
    health: 4,
    loop: 0,
   }
  
  // reserve keyboard vars
  let keyLEFT, keyRIGHT, keyUP, keyDOWN;
  let borderUISize = game.config.height / 15;
  let borderPadding = borderUISize / 3;