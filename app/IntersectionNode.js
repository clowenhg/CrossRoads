class IntersectionNode {
    constructor (x, y) {
        this._x = x;
        this._y = y;
        
        this._containsAccident = false;
        
        this._north = null;
        this._south = null;
        this._east = null;
        this._west = null;
    }
    
    get x() { return this._x; }
    get y() { return this._y; }
    
    get containsAccident() { return this._containsAccident; }
    set containsAccident(value) { this._containsAccident = value; }
    
    get north() { return this._north; }
    set north(value) { this._north = value; }
    
    get south() { return this._south; }
    set south(value) { this._south = value; }
    
    get east() { return this._east; }
    set east(value) { this._east = value; }
    
    get west() { return this._west; }
    set west(value) { this._west = value; }
}

module.exports = IntersectionNode;