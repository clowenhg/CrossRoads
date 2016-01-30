'use strict';
var Pixi = require('pixi.js'),
  Sprite = Pixi.Sprite;

class IntersectionNode extends Sprite {
    constructor (rowIndex, columnIndex) {
        super();
        this._rowIndex = rowIndex;
        this._columnIndex = columnIndex;

        this._containsAccident = false;
        
        this._north = null;
        this._south = null;
        this._east = null;
        this._west = null;

        this._exitString = '';

        this.buttonMode = true;
        this.interactive = true;

        this.on('mousedown', function(){
            this._mousedown = true;
            this._setTexture();
        });

        this.on('mouseup', function(){
            this._mousedown = false;
            this._setTexture();
        });

        this.on('mouseout', function(){
            this._mousedown = false;
            this._setTexture();
        });

        return this;
    }
    
    get rowIndex() { return this._rowIndex; }
    get columnIndex() { return this._columnIndex; }

    get containsAccident() { return this._containsAccident; }
    set containsAccident(value) { this._containsAccident = value; }
    
    get north() { return this._north; }
    set north(value) {
        this._north = value;
        this._setTexture();
    }
    
    get south() { return this._south; }
    set south(value) {
        this._south = value;
        this._setTexture();
    }
    
    get east() { return this._east; }
    set east(value) {
        this._east = value;
        this._setTexture();
    }
    
    get west() { return this._west; }
    set west(value) {
        this._west = value;
        this._setTexture();
    }

    _setTexture(){
        this._exitString = '';
        this._exitString += !!this.north?'n':'';
        this._exitString += !!this.south?'s':'';
        this._exitString += !!this.east?'e':'';
        this._exitString += !!this.west?'w':'';

        this._exitString += !!this._mousedown?'_clicked':'';

        this.texture = Pixi.loader.resources.roads.textures['road_' + this._exitString + '.png'];
    }
}

module.exports = IntersectionNode;