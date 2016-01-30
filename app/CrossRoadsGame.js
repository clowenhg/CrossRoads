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
    //get allTrafficPathsComplete() { return }
    
    startLevel() {
        this._grid = new TrafficGrid(100, 100);
        this._grid.randomize();
        
        this._trafficPaths = [];
        this._dayCount = 0;
        this._mostSuccessfulPaths = 0;
    }
    
    addTrafficPath(x, y) {
        this._newTrafficPath = new TrafficPath(x, y);
        this._trafficPaths.push(this._newTrafficPath);
    }
    
    removeTrafficPath(trafficPath) {
        var index = this._trafficPaths.indexOf(trafficPath);
        
        if (index > -1) {
            this._trafficPaths.splice(index, 1);
        }
    }
    
    update() {
        _updateTrafficPaths();
    }
    
    _updateTrafficPaths() {
        if (this._trafficPaths.length < 1) {
            return;
        }
        this._trafficPaths.forEach(function(item) { item.stepRoute(); });
        
        if (this._trafficPaths.length < 2) {
            return;
        }
        var newPathCollision = _checkNewPathCollisions();
        
        if (!newPathCollision) {
            return;
        }
        
    }
    
    _checkTrafficPaths() {
        if (this._trafficPaths.length < 2) {
            return;
        }
        
        var collisionRouteIndex = _checkNewPathCollisions();
        if (collisionRouteIndex) {
            _checkAllPathCollisions(collisionRouteIndex);
        }
        
        var completePathCounter = 1;
        while (completePathCounter < this._trafficPaths.length) {
            this._trafficPaths.forEach(function(item) { if (!item.destinationReached) {
                                                            item.stepRoute();
                                                            if (item.destinationReached) { completePathCounter++; }
                                                        }
                                                      });
        }
        
        this._dayCount++;
        if (this._mostSuccessfulPaths < this._trafficPaths.length) {
            this._mostSuccessfulPaths = this._trafficPaths.length;
        }
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
                removeTrafficPath(trafficPath);
                
                collisionNode = this._grid.getNode(newPathX, newPathY);
                collisionNode.containsAccident = true;
            }
            else {
                trafficPathCounter++;
            }
        }
        
        if (collisionOccured) {
            removeTrafficPath(this._newTrafficPath);
            return true;
        }
        
        return false;
    }
    
    _checkAllPathCollisions(collisionRouteIndex) {
        var trafficPathCounter = 1;
        while (trafficPathCounter < this._trafficPaths.length) {
            var trafficPath = this._trafficPaths[trafficPathCounter];
            var collisionDetected = false;
            
            for (var routeCounter = collisionRouteIndex; routeCounter < trafficPath.route.length || collisionDetected; routeCounter++) {
                var routeNode = trafficPath.route[routeCounter];
                if (routeNode.containsAccident) {
                    collisionDetected = true;
                    removeTrafficPath(trafficPath);
                }
            }
            
            if (!collisionDetected) {
                trafficPathCounter++;
            }
        }
    }
}

module.exports = CrossRoadsGame;