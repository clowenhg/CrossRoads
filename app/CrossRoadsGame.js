var IntersectionNode = require('./IntersectionNode.js');
var TrafficGrid = require('./TrafficGrid.js');
var TrafficPath = require('./TrafficPath.js');

class CrossRoadsGame {
    constructor() {
        this._grid = null;
        this._trafficPaths = null;
        this._newTrafficPath = null;
        this._dayCount = 0;
        this._mostSuccessfulPaths = 0;
    }
    
    get grid() { return this._grid; }
    get trafficPaths() { return this._trafficPaths; }
    get newTrafficPath() { return this._newTrafficPath; }
    get dayCount() { return this._dayCount; }
    get mostSuccessfulPaths() { return this._mostSuccessfulPaths; }
    
    startLevel() {
        this._grid = new TrafficGrid(10, 10);
        this._grid.makeFullMesh();
        
        this._trafficPaths = [];
        this._dayCount = 0;
        this._mostSuccessfulPaths = 0;
    }
    
    addTrafficPath(node) {
        this._newTrafficPath = new TrafficPath(node);
        this._trafficPaths.push(this._newTrafficPath);
    }
    
    removeTrafficPath(trafficPath) {
        var index = this._trafficPaths.indexOf(trafficPath);
        
        if (index > -1) {
            this._trafficPaths.splice(index, 1);
        }
    }
    
    update() {
        this._updateTrafficPaths();
    }
    
    _updateTrafficPaths() {
        if (this._trafficPaths.length < 1) {
            return;
        }
        this._trafficPaths.forEach(function(item) { item.stepRoute(); });
        
        if (this._trafficPaths.length < 2) {
            return;
        }
        var newPathCollision = this._checkNewPathCollisions();
        
        if (!newPathCollision) {
            return;
        }
        this._checkAllPathCollisions();
    }
    
    _checkNewPathCollisions() {
        var collisionOccured = false;
        var newPathX;
        var newPathY;
        
        newPathX = this._newTrafficPath.route[this._newTrafficPath.routePosition].x;
        newPathY = this._newTrafficPath.route[this._newTrafficPath.routePosition].y;
        
        var trafficPathCounter = 1;
        while (trafficPathCounter < this._trafficPaths.length) {
            var trafficPath = this._trafficPaths[trafficPathCounter];
            var trafficPathX = trafficPath.route[trafficPath.routePosition];
            var trafficPathY = trafficPath.route[trafficPath.routePosition];
            
            if (newPathX == trafficPathX && newPathY == trafficPathY) {
                collisionOccured = true;
                this.removeTrafficPath(trafficPath);
                
                collisionNode = this._grid.getNode(newPathX, newPathY);
                collisionNode.containsAccident = true;
            }
            else {
                trafficPathCounter++;
            }
        }
        
        if (collisionOccured) {
            this.removeTrafficPath(this._newTrafficPath);
            return true;
        }
        
        return false;
    }
    
    _checkAllPathCollisions() {
        var trafficPathCounter = 1;
        while (trafficPathCounter < this._trafficPaths.length) {
            var trafficPath = this._trafficPaths[trafficPathCounter];
            var collisionDetected = false;
            
            if (trafficPath.gridPosition.containsAccident) {
                collisionDetected = true;
                this.removeTrafficPath(trafficPath);
            }
            
            if (!collisionDetected) {
                trafficPathCounter++;
            }
        }
    }
}

module.exports = CrossRoadsGame;