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

    this.lastTime = 0;
    this.time = 0;

    this.config = config;
  }

  load() {
    loader.add('roads', 'assets/roads/roads.json')
      .on('error', console.log)
      .load(this._setup.bind(this));
  }

  gameLoop(time) {
    window.requestAnimationFrame(this.gameLoop.bind(this));
    this.state.update(time);
    this.renderer.render(this.paddingStage);
  }

  _setup() {
    //Create the renderer
    var fullWidth = this.config.columns * tileWidth + 16;
    var fullHeight = this.config.rows * tileWidth + 16;
    this.renderer = Pixi.autoDetectRenderer(this.config.columns * tileWidth + 16, this.config.rows * tileWidth + 16, null, true);

    if (!this.config.parent) {
      //Add the canvas to the HTML document
      document.body.appendChild(this.renderer.view);
    }
    else {
      parent.append(this.renderer.view);
    }

    var paddingStage = new Pixi.Container();
    var surround = new Pixi.Graphics();
    surround.x = 0;
    surround.y = 0;
    surround.lineStyle(8, 0x644100);
    surround.beginFill(0x008800);
    surround.drawRoundedRect(0, 0, fullWidth, fullHeight, 8);
    surround.endFill();

    paddingStage.addChild(surround);

    this.paddingStage = paddingStage;
    var stage = this.stage = new Pixi.Container();
    stage.x = 8;
    stage.y = 8;
    var mapStage = this.mapStage = new Pixi.Container();

    this.paddingStage.addChild(stage);

    var patternStage = new Pixi.Container();
    this.state = new CrossRoadsGame(patternStage);
    this.state.prepareLevel(this.config.rows, this.config.columns);

    this.stage.addChild(this.mapStage);
    this.stage.addChild(patternStage);

    var map = this.state.grid.map;
    var x = 0, y = 0;

    map.forEach(function (row) {
      x = 0;
      row.forEach(function (node) {
        node.x = x * 64;
        node.y = y * 64;
        mapStage.addChild(node);
        x++;
      });
      y++;
    });

    this.renderer.render(this.paddingStage);
    this.state.startInputState();
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

}

module.exports = Game;