/*global createjs, snakegame*/
(function () {
    "use strict";
    
    /**
     * Crea un quadrato delle dimensioni e del colore definiti
     *
     * @class Square
     * @param {string} color - Il codice esadecimale del colore
     * @param {number} size - la dimensione in pixel del lato
     */
    function Square(color, size) {
        this.Shape_constructor();
        this.color = color;
        size = isNaN(size) ? 10 : Math.floor(size);
        if (size < 10) {
            size = 10;
        }
        this.width = size;
        this.height = size;
        this.drawSquare();
    }
    var prototype = createjs.extend(Square, createjs.Shape);
    
    /**
     * La funzione di disegno cera e propria
     *
     * @method drawSquare
     */
    prototype.drawSquare = function () {
        this.graphics.beginFill(this.color);
        this.graphics.drawRect(1, 1, this.width - 2, this.height - 2);
        this.graphics.endFill();
    };
    
    window.snakegame = window.snakegame || {};
    window.snakegame.Square = createjs.promote(Square, "Shape");
}());