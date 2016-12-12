/*global createjs, snakegame*/
(function () {
    "use strict";
    /**
     * Disegna un quadrato nero
     *
     * @class Wall
     */
    function Wall() {
        this.Container_constructor();
        
        var square = new snakegame.Square('#000000');
        this.width = square.width;
        this.height = square.height;
        
        this.addChild(square);
    }
    var prototype = createjs.extend(Wall, createjs.Container);
    
    window.snakegame = window.snakegame || {};
    window.snakegame.Wall = createjs.promote(Wall, "Container");
}());