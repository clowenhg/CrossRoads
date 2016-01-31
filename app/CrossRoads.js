var CrossRoadsGame = require('./CrossRoadsGame.js');
var Pixi = require('pixi.js');
var Sprite = Pixi.Sprite;
var loader = Pixi.loader;

var TrafficGrid = require('./TrafficGrid.js');

class Game {
  constructor() {
    this.lastTime = 0;
    this.time = 0;
  }

  load(){
    loader.add('roads', 'assets/roads/roads.json')
      .on('error', console.log)
      .load(this._setup.bind(this));
  }

  gameLoop(time){
    window.requestAnimationFrame(this.gameLoop.bind(this));
    this.state.update(time);
    this.renderer.render(this.stage);
  }

  _setup() {
    //Create the renderer
    this.renderer = Pixi.autoDetectRenderer(256, 256);
    var stage = this.stage = new Pixi.Container();
    var mapStage = this.mapStage = new Pixi.Container();

    var patternStage = new Pixi.Container();
    this.state = new CrossRoadsGame(patternStage);
    this.state.prepareLevel(4, 4);

    this.stage.addChild(this.mapStage);
    this.stage.addChild(patternStage);

    var map = this.state.grid.map;
    var x = 0, y = 0;

    map.forEach(function(row){
      x = 0;
      row.forEach(function(node){
        node.x = x * 64;
        node.y = y * 64;
        mapStage.addChild(node);
        x++;
      });
      y++;
    });

    //Add the canvas to the HTML document
    document.body.appendChild(this.renderer.view);

    this.renderer.render(this.stage);
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

}

module.exports = Game;