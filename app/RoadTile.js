'use strict';

var Pixi = require('pixi.js'),
  Container = Pixi.Container,
  Graphics = Pixi.Graphics;

class RoadTile extends Container {
  constructor(height, width){
    super();

    this.height = height;
    this.width = width;

    //Center point
    this._cx = width / 2;
    this._cy = height / 2;

    this.graphics = {
      north: new Graphics(),
      east: new Graphics(),
      south: new Graphics(),
      west: new Graphics()
    };

    this._buildGraphics();

    return this;
  }

  _buildGraphics(){
    this.graphics = {
      north: new Graphics(),
      east: new Graphics(),
      south: new Graphics(),
      west: new Graphics()
    };

    //Center points
    var cx = this._cx;
    var cy = this._cy;

    //Draw
    this.graphics.north.lineStyle(0, 0xFFFFFF, 0);
    this.graphics.north.beginFill(0x0088FF);
    this.graphics.north.drawRect(0, 0, 10, cy);
    this.graphics.north.endFill();
    this.graphics.north.x = cx - 5;
    this.graphics.north.y = 0;
    this.addChild(this.graphics.north);

    this.graphics.west.lineStyle(0, 0xFFFFFF, 0);
    this.graphics.west.beginFill(0x0088FF);
    this.graphics.west.drawRect(0, 0, cx, 10);
    this.graphics.west.endFill();
    this.graphics.west.x = 0;
    this.graphics.west.y = cy - 5;
    this.addChild(this.graphics.west);

    /*this.graphics.east.drawRect(cx , cy - 1, this._width, cy + 1);
    this.graphics.south.drawRect(cx - 1, cy, cx + 1, this.height);
    this.graphics.west.drawRect(0, cy - 1, cx, cy + 1);*/

    /*for(var direction in this.graphics){
      this.addChild(this.graphics[direction]);
    }*/
  }
}

module.exports = RoadTile;
