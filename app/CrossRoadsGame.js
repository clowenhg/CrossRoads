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

  /**
   * @param {Number} height
   * @param {Number} width
   */
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
        //Check if we're updating patterns, or waiting for user to build new path
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
        var newPatternColumnIndex;
        var newPatternRowIndex;
        
        newPatternNode = this._newTrafficPattern.route[this._newTrafficPattern.routePosition];
        
        var trafficPatternCounter = 1;
        while (trafficPatternCounter < this._trafficPatterns.length) {
            var trafficPattern = this._trafficPatterns[trafficPatternCounter];
            
            if (newPatternNode == trafficPattern) {
                collisionOccured = true;
                this.removeTrafficPattern(trafficPattern);
                
                newPatternNode.containsAccident = true;
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