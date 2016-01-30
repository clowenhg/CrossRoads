class IntersectionNode {
    constructor (rowIndex, columnIndex) {
        this._rowIndex = rowIndex;
        this._columnIndex = columnIndex;
        
        this._containsAccident = false;
        
        this._north = null;
        this._south = null;
        this._east = null;
        this._west = null;
    }
    
    get rowIndex() { return this._rowIndex; }
    get columnIndex() { return this._columnIndex; }
    
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