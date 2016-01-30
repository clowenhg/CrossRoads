class TrafficPattern {
    constructor(startNode) {
        this._route = [];
        addNode(startNode);
        
        this._routePosition = 0;
    }
    
    get route() { return this._route; }
    get routePosition() { return this._routePosition; }
    get gridPosition() { return this._route[this._routePosition]; }
    get destinationReached() { return (this._routePosition >= this._route.length); }
    
    addNode(node) {
        this._route.push(node);
    }
    
    removeNodes(count) {
        for (count; count > 0; count--) {
            this._route.pop();
        }
    }
    
    stepRoute() {
        if (!this.destinationReached) {
            this._routePosition++;
        }
    }
}

module.exports = TrafficPattern;