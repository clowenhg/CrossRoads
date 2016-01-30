class GridNode {
	constructor (x, y) {
		this._x = x;
		this._y = y;
		
		this._north = null;
		this._south = null;
		this._east = null;
		this._west = null;
		
		this._containsAccident = false;
		this._containsCar = false;
	}
	
	get x { return this._x; }
	get y { return this._y; }
	
	get north { return this._north; }
	set north { this._north = value; }
	
	get south { return this._south; }
	set south { this._south = value; }
	
	get east { return this._east; }
	set east { this._east = value; }
	
	get west { return this._west; }
	set west { this._west = value; }
	
	get containsAccident { return this._containsAccident; }
	get containsCar { return this._containsCar; }
}