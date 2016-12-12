/*global createjs, snakegame, Event*/
(function () {
    "use strict";
    
    
    function Player(initLength, initDir, initX, initY) {
        this.Container_constructor();
        
        this.initLength = initLength;
        this.initDir = initDir;
        this.initX = initX;
        this.initY = initY;
        
        this.reset();
    }
    var prototype = createjs.extend(Player, createjs.Container);
    
    prototype.changeDirection = function (direction) {
        var directions = ['N', 'E', 'S', 'W'];
        if (directions.indexOf(direction) >= 0) {
            this.nextDirection = direction;
        }
    };
    
    prototype.enterFrame = function () {
        if (this.squares.length <= 0) {
            return false;
        }
        var i = 0;
        this.direction = this.nextDirection;
        var offsetX = 0,
            offsetY = 0,
            p = new snakegame.Square('#006699');
        
        switch (this.direction) {
        case 'E':
            offsetX = 1;
            break;
        case 'W':
            offsetX = -1;
            break;
        case 'N':
            offsetY = -1;
            break;
        case 'S':
            offsetY = 1;
            break;
        }
        console.log('meh');
        
        p.x = this.getHead().x + p.width * (offsetX);
        p.y = this.getHead().y + p.height * (offsetY);
        this.addChild(p);
        this.squares.push(p);
        
        while (this.squares.length > this.length) {
            this.removeChild(this.squares[0]);
            this.squares.splice(0, 1);
        }
        
        if (this.hitTail(this.getHead())) {
            this.dispatchEvent(new Event("hit his own tail"));
        }
    };
    
    prototype.getHead = function () {
        return this.squares[this.squares.length - 1];
    };
    
    prototype.hitHead = function (element) {
        var head = this.getHead();
        if (this.squares.length && head.x === element.x && head.y === element.y) {
            return true;
        }
        return false;
    }
    
    prototype.hitTail = function (element) {
        var i,
            tailElement;
        for (i = 0; i < this.squares.length - 1; i++) {
            tailElement = this.squares[i];
            if (tailElement.x === element.x && tailElement.y === element.y) {
                return true;
            }
        }
        return false;
    };
    
    prototype.reset = function() {
        this.removeAllChildren();
        
        var li, p;
        
        this.squares = [];
        this.length = this.initLength;
        this.direction = this.initDir;
        this.nextDirection = this.initDir;
        
        for (li = 0; li < this.length; li += 1) {
            p = new snakegame.Square('#006699');
            p.x = p.width * (this.initX + (this.direction === 'E' ? li : this.direction === 'W' ? -1 * li : 0));
            p.y = p.height * (this.initY + (this.direction === 'S' ? li : this.direction === 'N' ? -1 * li : 0));
            this.squares.push(p);
            this.addChild(p);
        }
    }
    
    window.snakegame = window.snakegame || {};
    window.snakegame.Player = createjs.promote(Player, "Container");
}());