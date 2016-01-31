var IntersectionNode = require('./IntersectionNode.js');
var TrafficGrid = require('./TrafficGrid.js');
var TrafficPattern = require('./TrafficPattern.js');

class CrossRoadsGame {
  constructor(patternStage, seed) {
    this._grid = null;
    this._trafficPatterns = null;
    this._newTrafficPattern = null;
    this._dayCount = 0;
    this._mostSuccessfulPatterns = 0;
    this._evaluateTrafficPatterns = false;
    this.lastTime = 0;
    this._stepTime = 400;

    this.patternStage = patternStage;
    this._seed = seed;
  }

  get grid() {
    return this._grid;
  }

  get trafficPatterns() {
    return this._trafficPatterns;
  }

  get newTrafficPattern() {
    return this._newTrafficPattern;
  }

  get dayCount() {
    return this._dayCount;
  }

  get mostSuccessfulPatterns() {
    return this._mostSuccessfulPatterns;
  }

  get evaluateTrafficPatterns() {
    return this._evaluateTrafficPatterns;
  }
  
  get seed() { return this._seed; }

  /**
   * @param {Number} rows
   * @param {Number} columns
   */
  prepareLevel(rows, columns) {
    this._grid = new TrafficGrid(rows, columns, this._nodeClick.bind(this), this._seed);
    this._grid.makeRandomMesh();

    this._trafficPatterns = [];
    this._dayCount = 0;
    this._mostSuccessfulPatterns = 0;
  }

  removeTrafficPattern(trafficPattern) {
    var index = this._trafficPatterns.indexOf(trafficPattern);

    if (index > -1) {
      this._trafficPatterns.splice(index, 1);
    }
  }

  startEvaluationState() {
    console.log('Starting Evaluation');

    var stage = this.patternStage;
    stage.removeChildren();

    this._evaluateTrafficPatterns = true;
    this._trafficPatterns.push(this._newTrafficPattern);
    this._newTrafficPattern = null;

    this._trafficPatterns.forEach(function (pattern) {
      stage.addChild(pattern);
      pattern.startPathing();
    });
    
    this._dayCount++;
    if (this._trafficPatterns.length > this._mostSuccessfulPatterns) {
        this._mostSuccessfulPatterns = this._trafficPatterns.length;
    }

    this._stepTime = Math.max(this._stepTime - this._dayCount * 5, 200);

    this._skipUpdates = 1;
  }

  startInputState() {
    console.log('Starting Input');
    this._evaluateTrafficPatterns = false;
    this._destinationNode = null;
    var startNode = null;

    var x = 0;
    var y = 0;

    while (!startNode || !startNode.hasExit()) {
      x = Math.floor(Math.random() * this._grid.width);
      y = Math.floor(Math.random() * this._grid.height);

      startNode = this._grid.getNode(y, x);
    }

    while (!this._destinationNode || this._destinationNode === startNode || !this._destinationNode.hasExit() || startNode.isConnected(this._destinationNode)) {
      x = Math.floor(Math.random() * this._grid.width);
      y = Math.floor(Math.random() * this._grid.height);

      this._destinationNode = this._grid.getNode(y, x);
    }
    this._newTrafficPattern = new TrafficPattern(startNode);

    this.patternStage.addChild(this._newTrafficPattern);
    this.patternStage.addChild(this._newTrafficPattern.generateGraphics(this._destinationNode, null, 0xFF0000, true));
    this.patternStage.addChild(this._newTrafficPattern.generateGraphics(startNode, null, 0x0088FF, true));
  }

  update(time) {
    var timeStep = time - this.lastTime > this._stepTime;
    if (this._evaluateTrafficPatterns) {
      if (timeStep) {
        if (this._skipUpdates <= 0) {
          this._updateTrafficPatterns();
        }

        this.lastTime = time;
        this._skipUpdates--;
      }
      if (this._skipUpdates <= 0) {
        this._drawUpdates(this.lastTime - time);
      }
    }
  }

  _checkAllPatternCollisions() {
    console.log('check collisions');
    var subjectIter = 0;
    var compareIter = subjectIter + 1;

    var subject, compare;

    while (subjectIter < this._trafficPatterns.length) {
      subject = this._trafficPatterns[subjectIter];
      compareIter = subjectIter + 1;
      while (compareIter < this._trafficPatterns.length) {
        compare = this._trafficPatterns[compareIter];

        console.log('compare');
        if (!(subject.destinationReached || compare.destinationReached)) {
          if (subject.gridPosition.rowIndex === compare.gridPosition.rowIndex
            && subject.gridPosition.columnIndex === compare.gridPosition.columnIndex) {
            subject.collided = true;
            compare.collided = true;
            console.log('collision ' + subject + ' - ' + compare);
          }
        }

        compareIter++;
      }

      subjectIter++;
    }
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

  _drawUpdates(time) {
    var step = time / this._stepTime;
    this._trafficPatterns.forEach(function (item) {
      item.drawUpdate(step);
    });
  }

  _nodeClick(node) {
    if (!this._evaluateTrafficPatterns) {
      if (this.newTrafficPattern.last.isConnected(node)) {
        this.newTrafficPattern.addNode(node);
        if (node === this._destinationNode) {
          this.startEvaluationState();
        }
      }
    }
  }

  _updateTrafficPatterns() {
    if (this._trafficPatterns.length < 1) {
      this.startInputState();
      return;
    }

    var complete = true;
    this._trafficPatterns.forEach(function (item) {
      complete = complete && (item.destinationReached || item.collided);
      item.stepRoute();
    });

    if (complete) {
      for (var i = 0; i < this._trafficPatterns.length; i++) {
        if (this._trafficPatterns[i].collided) {
          this._trafficPatterns[i].clean();
          this._trafficPatterns.splice(i, 1);
        }
      }
      this.startInputState();
    }

    this._checkAllPatternCollisions();
  }
}

module.exports = CrossRoadsGame;