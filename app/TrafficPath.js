class TrafficPath {
	constructor(startX, startY) {
		this._route = [];
		this._route.push([startX, startY]);
		
		this._routePosition = 0;
	}
	
	get route() { return this._route; }
	get routePosition() { return this._routePosition; }
	get destinationReached() { return (this._routePosition == this._route.length); }
	
	addNode(node) {
		this._route.push([node.x, node.y]);
	}
	
	removeNodes(count) {
		for (count; count > 0; count--) {
			this._route.pop();
		}
	}
	
	stepRoute() {
		if (this._routePosition < this._route.length) {
			this._routePosition++;
		}
	}
}