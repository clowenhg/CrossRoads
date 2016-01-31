var IntersectionNode = require('./IntersectionNode.js');

class TrafficGrid {
    constructor(height, width, onClick) {
        this._height = height;
        this._width = width;
        this._map = [];
        
        for (var rowCounter = 0; rowCounter < height; rowCounter++) {
            var row = [];
            for (var columnCounter = 0; columnCounter < width; columnCounter++) {
                row.push(new IntersectionNode(columnCounter, rowCounter, onClick));
            }
            this._map.push(row);
        }
    }
    
    get map() { return this._map; }
    get height() { return this._height; }
    get width() { return this._width; }

    getNode(rowIndex, columnIndex) {
        if(rowIndex >= this.width || columnIndex >= this.height){
            return null;
        }

        var row = this._map[rowIndex];
        
        if (row) {
            return row[columnIndex];
        }

        return undefined;
    }
    
    connectNodes(node1, node2, direction) {
        if (direction == "north") {
            node1.north = node2;
            node2.south = node1;
        }
        else if (direction == "south") {
            node1.south = node2;
            node2.north = node1;
        }
        else if (direction == "east") {
            node1.east = node2;
            node2.west = node1;
        }
        else if (direction == "west") {
            node1.west = node2;
            node2.east = node1;
        }
    }
    
    getAvailableConnectionsCount(node) {
        var connectionsCount = 0;
        
        if (node.rowIndex == 0 || node.rowIndex == this._map.length) {
            connectionsCount++;
        }
        else if (node.rowIndex > 0 && node.rowIndex < this._map.length) {
            connectionsCount += 2;
        }
        
        var row = this._map[node.rowIndex];
        if (node.columnIndex == 0 || node.columnIndex == row.length) {
            connectionsCount++;
        }
        else if (node.columnIndex > 0 && node.columnIndex < row.length) {
            connectionsCount += 2;
        }
        
        return connectionsCount;
    }
    
    makeRandomMesh() {
        throw "Not Yet Implemented!  Cause I'm fucking tired..."
    }
    
    makeFullMesh() {
        for (var rowCounter = 0; rowCounter < this._map.length; rowCounter++) {
            var row = this._map[rowCounter];
            for (var columnCounter = rowCounter % 2; columnCounter < row.length; columnCounter++) {
                var sourceNode = row[columnCounter];
                var northNode = this.getNode(rowCounter - 1, columnCounter);
                var southNode = this.getNode(rowCounter + 1, columnCounter);
                var eastNode = this.getNode(rowCounter, columnCounter + 1);
                var westNode = this.getNode(rowCounter, columnCounter - 1);
                
                if (northNode) {
                    this.connectNodes(sourceNode, northNode, "north");
                }
                if (southNode) {
                    this.connectNodes(sourceNode, southNode, "south");
                }
                if (eastNode) {
                    this.connectNodes(sourceNode, eastNode, "east");
                }
                if (westNode) {
                    this.connectNodes(sourceNode, westNode, "west");
                }
            }
        }
    }
}

module.exports = TrafficGrid;