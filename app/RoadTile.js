'use strict';

var Pixi = require('pixi.js'),
  Container = Pixi.Container,
  Sprite = Pixi.Sprite;

class RoadTile extends Sprite {
  constructor(textures, height, width){
    super();

    this._textures = textures;
    return this;
  }

  setExits(exitString){
    this.texture = this._textures['road_' + exitString + '.png'];
  }
}

module.exports = RoadTile;
