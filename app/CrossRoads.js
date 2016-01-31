var CrossRoadsGame = require('./CrossRoadsGame.js');
var Pixi = require('pixi.js');
var Sprite = Pixi.Sprite;
var loader = Pixi.loader;

var TrafficGrid = require('./TrafficGrid.js');

var tileWidth = 64;

class Game {
  constructor(config) {
    config = config || {};
    config.columns = config.columns || 4;
    config.rows = config.rows || 4;

    config.random = !!config.random || true;
    config.seed = !!config.seed || this._getRandomSeed();

    this.lastTime = 0;
    this.time = 0;

    this.config = config;
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
    this.renderer = Pixi.autoDetectRenderer(this.config.columns * tileWidth, this.config.rows * tileWidth);

    if(!this.config.parent){
      //Add the canvas to the HTML document
      document.body.appendChild(this.renderer.view);
    }
    else{
      parent.append(this.renderer.view);
    }

    var stage = this.stage = new Pixi.Container();
    var mapStage = this.mapStage = new Pixi.Container();

    var patternStage = new Pixi.Container();
    this.state = new CrossRoadsGame(patternStage, this.config.seed);
    this.state.prepareLevel(this.config.rows, this.config.columns);

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

    this.renderer.render(this.stage);
    this.state.startInputState();
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  _getRandomSeed() {
      var min = 0;
      var max = 10000;
      
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = Game;