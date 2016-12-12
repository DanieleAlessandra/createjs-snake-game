/*global createjs, snakegame*/
(function () {
    "use strict";
    /**
     * Disegna un quadrato rosso
     *
     * @class Cherry
     */
    function Cherry() {
        this.Container_constructor();
        
        var square = new snakegame.Square('#FF3333');
        this.width = square.width;
        this.height = square.height;
        
        this.addChild(square);
    }
    var prototype = createjs.extend(Cherry, createjs.Container);
    
    window.snakegame = window.snakegame || {};
    window.snakegame.Cherry = createjs.promote(Cherry, "Container");
}());