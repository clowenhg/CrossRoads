var Pixi = require('pixi.js');
var Container = Pixi.Container;
var Graphics = Pixi.Graphics;

class TrafficPattern extends Container {
    constructor(startNode) {
        super();

        this._collided = false;

        this._route = [];
        this.addNode(startNode);
        
        this._routePosition = 0;
        this._routing = false;
        this._stepGfx = new Graphics();
        this._stepGfx.beginFill(0xFFFF00);
        this._stepGfx.drawCircle(0, 0, 8);
        this._stepGfx.endFill();

        return this;
    }
    
    get route() { return this._route; }
    get routePosition() { return this._routePosition; }
    get gridPosition() { return this._route[this._routePosition]; }
    get destinationReached() { return (this._routePosition >= this._route.length - 1); }
    get collided() { return this._collided; }
    set collided(value) {
        this._collided = !!value;

        this._setStepGraphics(0xFF0000, 12);
    }
    get last() { return this._route[this._route.length - 1]; }
    get next() { return this._route[this._routePosition + 1]; }

    addNode(node) {
        this._route.push(node);
        this._updateGraphics();
    }

    clean(){
        this.removeChildren();
        this._route.splice(0, this._route.length);
        this._stepGfx = null;
    }

    drawUpdate(step){
        if(this.collided || this.destinationReached){
            return;
        };
        if(this.next){
            var x = ((this.gridPosition.rowIndex * 64 + 32) - (this.next.rowIndex * 64 + 32)) * step;
            var y = ((this.gridPosition.columnIndex * 64 + 32) - (this.next.columnIndex * 64 + 32)) * step;

            x += this.gridPosition.rowIndex * 64 + 32;
            y += this.gridPosition.columnIndex * 64 + 32;

            this._stepGfx.x = x;
            this._stepGfx.y = y;
        }
    }

    generateGrahpics(node, nodeTo, color){
        var gfx = new Graphics();
        color = color || 0x0088FF;

        var x = node.rowIndex * 64;
        var y = node.columnIndex * 64;

        var sx = 0;
        var sy = 0;
        var dx = 0;
        var dy = 0;

        if(nodeTo){
            if(node.north === nodeTo){
                sx = -4;
                dx = 8;
                dy = -64;
            }
            else if(node.south === nodeTo){
                sx = -4;
                dx = 8;
                dy = 64;
            }
            else if(node.east === nodeTo){
                dx = 64;
                dy = 8;
                sy = -4
            }
            else if(node.west === nodeTo){
                dx = -64;
                dy = 8;
                sy = -4;
            }

            gfx.beginFill(0x0088FF);
            gfx.drawRect(sx, sy, dx, dy);
            gfx.endFill();
        }

        gfx.beginFill(color);
        gfx.drawCircle(0, 0, 8);
        gfx.endFill();

        gfx.x = x + 32;
        gfx.y = y + 32;

        return gfx;
    }

    removeNodes(count) {
        for (count; count > 0; count--) {
            this._route.pop();
        }

        this._updateGraphics();
    }

    startPathing(){
        this._routePosition = 0;
        this._routing = true;

        this._stepGfx.x = this.gridPosition.rowIndex * 64 + 32;
        this._stepGfx.y = this.gridPosition.columnIndex * 64 + 32;

        this._setStepGraphics(0xFFFF00, 8);

        this.removeChildren();
        this.addChild(this._stepGfx);
    }

    stopPathing(){
        this._routing = false;
    }

    stepRoute() {
        if (!this.destinationReached && !this.collided) {
            this._routePosition++;
            this._stepGfx.x = this.gridPosition.rowIndex * 64 + 32;
            this._stepGfx.y = this.gridPosition.columnIndex * 64 + 32;

            if(this.destinationReached){
                this._setStepGraphics(0x00AA00, 6);
            }
        }
    }

    _setStepGraphics(color, radius){
        this._stepGfx.clear();
        this._stepGfx.beginFill(color);
        this._stepGfx.drawCircle(0, 0, radius);
        this._stepGfx.endFill();
    }

    _updateGraphics(){
        this.removeChildren();

        for(var i = 0; i < this.route.length; i++){
            this.addChild(this.generateGrahpics(this.route[i], this.route[i + 1]));
        }
    }
}

module.exports = TrafficPattern;