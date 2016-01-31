var IntersectionNode = require('./IntersectionNode.js');

class TrafficGrid {
    constructor(rows, columns, onClick) {
        this._randomConnectionThreshold = 0.5;
        this._height = rows;
        this._width = columns;
        this._map = [];
        
        for (var rowCounter = 0; rowCounter < rows; rowCounter++) {
            var row = [];
            for (var columnCounter = 0; columnCounter < columns; columnCounter++) {
                row.push(new IntersectionNode(rowCounter, columnCounter, onClick));
            }
            this._map.push(row);
        }
    }
    
    get map() { return this._map; }
    get height() { return this._height; }
    get width() { return this._width; }

    getNode(rowIndex, columnIndex) {
        if(rowIndex >= this.height || columnIndex >= this.width){
            return null;
        }

        var row = this._map[rowIndex];
        
        if (row) {
            return row[columnIndex];
        }

        return undefined;
    }
    
    getNodeByDirection(node, direction) {
        if (direction == "north") {
            return this.getNode(node.rowIndex - 1, node.columnIndex);
        }
        else if (direction == "south") {
            return this.getNode(node.rowIndex + 1, node.columnIndex);
        }
        else if (direction == "east") {
            return this.getNode(node.rowIndex, node.columnIndex + 1);
        }
        else if (direction == "west") {
            return this.getNode(node.rowIndex, node.columnIndex - 1);
        }
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
    
    getValidConnections(node) {
        var validConnection = [];
        
        if (node.rowIndex > 0){
            validConnection.push("north");
        }
        if (node.rowIndex < this._map.length - 1) {
            validConnection.push("south");
        }
        
        var row = this._map[node.rowIndex];
        if (node.columnIndex > 0) {
            validConnection.push("west");
        }
        if (node.columnIndex < row.length - 1) {
            validConnection.push("east");
        }
        
        return validConnection;
    }
    
    makeRandomMesh() {
        var self = this;
        this._map.forEach(function(item) {
            item.forEach(function(item) { self._randomizeConnections(item); });
        });
    }
    
    makeFullMesh() {
        var self = this;
        this._map.forEach(function(item) {
            item.forEach(function(item) { self._setAllConnections(item); });
        });
    }
    
    _randomizeConnections(node) {
        var availableConnections = this.getValidConnections(node);
        
        var self = this;
        availableConnections.forEach(function(item) {
            var makeConnection = Math.random();
            
            if (makeConnection > self._randomConnectionThreshold) {
                var otherNode = self.getNodeByDirection(node, item);
                
                if (!otherNode){
                    debugger;
                }
                self.connectNodes(node, otherNode, item);
            }
        });
    }
    
    _setAllConnections(node) {
        var northNode = this.getNode(node.rowIndex - 1, node.columnIndex);
        var southNode = this.getNode(node.rowIndex + 1, node.columnIndex);
        var eastNode = this.getNode(node.rowIndex, node.columnIndex + 1);
        var westNode = this.getNode(node.rowIndex, node.columnIndex - 1);
        
        if (northNode) {
            this.connectNodes(node, northNode, "north");
        }
        if (southNode) {
            this.connectNodes(node, southNode, "south");
        }
        if (eastNode) {
            this.connectNodes(node, eastNode, "east");
        }
        if (westNode) {
            this.connectNodes(node, westNode, "west");
        }
    }
}

module.exports = TrafficGrid;