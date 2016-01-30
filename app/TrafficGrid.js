class TrafficGrid {
	constructor(height, width) {
		this._map = [];
		
		for (int rowCounter = 0; rowCounter < height; rowCounter++) {
			var row = [];
			for (int columnCounter = 0; columnCounter < width; columnCounter++) {
				row.push(new IntersectionNode(columnCounter, rowCounter));
			}
			this._map.push(row);
		}
	}
	
	get map() { return this._map; }
	
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
		
		if (node.y == 0 || node.y == this._map.length) {
			connectionsCount++;
		}
		else if (node.y > 0 && node.y < this._map.length) {
			connectionsCount += 2;
		}
		
		var row = this._map[node.y];
		if (node.x == 0 || node.x == row.length) {
			connectionsCount++;
		}
		else if (node.x > 0 && node.x < row.length) {
			connectionsCount += 2;
		}
		
		return connectionsCount;
	}
	
	randomize() {
		throw "Not Yet Implemented!  Cause I'm fucking tired..."
	}
}