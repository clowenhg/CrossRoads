var IntersectionNode = require('./IntersectionNode.js');
var TrafficGrid = require('./TrafficGrid.js');
var TrafficPath = require('./TrafficPattern.js');

class CrossRoadsGame {
    constructor() {
        this._grid = null;
        this._trafficPatterns = null;
        this._newTrafficPattern = null;
        this._dayCount = 0;
        this._mostSuccessfulPatterns = 0;
    }
    
    get grid() { return this._grid; }
    get trafficPatterns() { return this._trafficPatterns; }
    get newTrafficPattern() { return this._newTrafficPattern; }
    get dayCount() { return this._dayCount; }
    get mostSuccessfulPatterns() { return this._mostSuccessfulPatterns; }
    
    prepareLevel(height, width) {
        this._grid = new TrafficGrid(height, width);
        this._grid.makeFullMesh();
        
        this._trafficPatterns = [];
        this._dayCount = 0;
        this._mostSuccessfulPatterns = 0;
    }
    
    addTrafficPattern(node) {
        this._newTrafficPattern = new TrafficPattern(node);
        this._trafficPatterns.push(this._newTrafficPath);
    }
    
    removeTrafficPattern(trafficPattern) {
        var index = this._trafficPatterns.indexOf(trafficPattern);
        
        if (index > -1) {
            this._trafficPatterns.splice(index, 1);
        }
    }
    
    update() {
        this._updateTrafficPatterns();
    }
    
    _updateTrafficPatterns() {
        if (this._trafficPatterns.length < 1) {
            return;
        }
        this._trafficPatterns.forEach(function(item) { item.stepRoute(); });
        
        if (this._trafficPatterns.length < 2) {
            return;
        }
        var newPatternCollision = this._checkNewPatternCollisions();
        
        if (!newPatternCollision) {
            return;
        }
        this._checkAllPatternCollisions();
    }
    
    _checkNewPatternCollisions() {
        var collisionOccured = false;
        var newPatternX;
        var newPatternY;
        
        newPatternX = this._newTrafficPattern.route[this._newTrafficPattern.routePosition].x;
        newPatternY = this._newTrafficPattern.route[this._newTrafficPattern.routePosition].y;
        
        var trafficPatternCounter = 1;
        while (trafficPatternCounter < this._trafficPatterns.length) {
            var trafficPattern = this._trafficPatterns[trafficPatternCounter];
            var trafficPatternX = trafficPattern.route[trafficPattern.routePosition];
            var trafficPatternY = trafficPattern.route[trafficPattern.routePosition];
            
            if (newPatternX == trafficPatternX && newPatternY == trafficPatternY) {
                collisionOccured = true;
                this.removeTrafficPattern(trafficPattern);
                
                collisionNode = this._grid.getNode(newPatternX, trafficPatternY);
                collisionNode.containsAccident = true;
            }
            else {
                trafficPatternCounter++;
            }
        }
        
        if (collisionOccured) {
            this.removeTrafficPattern(this._newTrafficPattern);
            return true;
        }
        
        return false;
    }
    
    _checkAllPatternCollisions() {
        var trafficPatternCounter = 1;
        while (trafficPatternCounter < this._trafficPaths.length) {
            var trafficPattern = this._trafficPaths[trafficPatternCounter];
            var collisionDetected = false;
            
            if (trafficPattern.gridPosition.containsAccident) {
                collisionDetected = true;
                this.removeTrafficPattern(trafficPattern);
            }
            
            if (!collisionDetected) {
                trafficPatternCounter++;
            }
        }
    }
}

module.exports = CrossRoadsGame;