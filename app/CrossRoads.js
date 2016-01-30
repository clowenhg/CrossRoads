var CrossRoadsGame = require('./CrossRoadsGame.js');
var Pixi = require('pixi.js');
var RoadTile = require('./RoadTile.js');
var Sprite = Pixi.Sprite;
var loader = Pixi.loader;

class Game {
  constructor() {
    var state = new CrossRoadsGame();
    this.state = state;
    debugger;
  }

  load(){
    loader.add('roads', 'assets/roads/roads.json', this._setupTile.bind(this))
      .on('error', console.log)
      .load(this._setupStage.bind(this));
  }

  gameLoop(time){
    window.requestAnimationFrame(this.gameLoop.bind(this));
    console.log('render[' + time + ']');

    this.tiles.nsew.x += 1;
    this.tiles.nsew.y += 1;

    this.renderer.render(this.stage);
  }

  _setupStage() {
    //Create the renderer
    this.renderer = PIXI.autoDetectRenderer(512, 512);

    //Add the canvas to the HTML document
    document.body.appendChild(this.renderer.view);

    debugger;
    this.stage = new PIXI.Container();
    this.stage.addChild(this.tiles.nsew);

    this.renderer.render(this.stage);
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  _setupTile() {
    var resource = loader.resources.roads;

    this.tiles = {};

    this.tiles.nsew = new Sprite(resource.textures['road_nsew.png']);
    //T's
    this.tiles.nse = new Sprite(resource.textures['road_nse.png']);
    this.tiles.nsw = new Sprite(resource.textures['road_nsw.png']);
    this.tiles.new = new Sprite(resource.textures['road_new.png']);
    this.tiles.sew = new Sprite(resource.textures['road_sew.png']);
    //Turns
    this.tiles.ne = new Sprite(resource.textures['road_ne.png']);
    this.tiles.nw = new Sprite(resource.textures['road_nw.png']);
    this.tiles.se = new Sprite(resource.textures['road_se.png']);
    this.tiles.sw = new Sprite(resource.textures['road_sw.png']);
    //Straights
    this.tiles.ns = new Sprite(resource.textures['road_ns.png']);
    this.tiles.ew = new Sprite(resource.textures['road_ew.png']);

    this.tiles.nsew.x = 0;
    this.tiles.nsew.y = 0;
  }
}

module.exports = Game;