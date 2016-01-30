var CrossRoadsGame = require('./CrossRoadsGame.js');
var Pixi = require('pixi.js');
var RoadTile = require('./RoadTile.js');
var Sprite = Pixi.Sprite;
var loader = Pixi.loader;

var TrafficGrid = require('./TrafficGrid.js');

class Game {
  constructor() {
    this.lastTime = 0;
    this.time = 0;

    this.state = new CrossRoadsGame();
  }

  load(){
    loader.add('roads', 'assets/roads/roads.json')
      .on('error', console.log)
      .load(this._setup.bind(this));
  }

  gameLoop(time){
    window.requestAnimationFrame(this.gameLoop.bind(this));
    //console.log('render[' + time + ']');

    if(time - this.lastTime > (1/60) * 1000){
      //Call update
    }

    this.renderer.render(this.stage);
  }

  _setup() {
    this.state.prepareLevel(5, 10);

    //Create the renderer
    this.renderer = Pixi.autoDetectRenderer(640, 320);
    var stage = this.stage = new Pixi.Container();

    var map = this.state.grid.map;
    var x = 0, y = 0;

    map.forEach(function(row){
      x = 0;
      row.forEach(function(node){
        node.x = x * 64;
        node.y = y * 64;
        stage.addChild(node);
        x++;
      });
      y++;
    });

    debugger;
    //Add the canvas to the HTML document
    document.body.appendChild(this.renderer.view);

    this.renderer.render(this.stage);
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

}

module.exports = Game;