/*global createjs, snakegame*/
(function () {
    "use strict";
    var stage,
        score = 0,
        player,
        cherry,
        perimeter,
        gameWidth = 30,
        gameHeight = 30,
        scoreText;
    
    /**
     * Crea il quadro di gioco
     *
     * @function createGameField
     */
    function createGameField() {
        perimeter = new createjs.Container();
        scoreText = new createjs.Text("0", "10px Verdana", "#333");
        scoreText.x = 10;
        scoreText.y = 280;
        var hi,
            wi,
            b;
        
        for (hi = 0; hi < gameHeight; hi++) {
            for (wi = 0; wi < gameWidth; wi++) {
                if (hi === 0 || hi === gameHeight - 1 || wi === 0 || wi === gameWidth - 1) {
                    b = new window.snakegame.Wall();
                    b.x = wi * b.width;
                    b.y = hi * b.height;
                    perimeter.addChild(b);
                }
            }
        }
        stage.addChild(perimeter);
        stage.addChild(scoreText);
    }
    
    /**
     * Ferma tutto
     *
     * @function gameOver
     */
    function gameOver() {
        createjs.Ticker.paused = true;
    }
    
    /**
     * Verifica se il serpente ha mangiato una ciliegia
     *
     * @function hitCherry
     * @return {Boolean}
     */
    function hitCherry() {
        if (player.hitHead(cherry)) {
            return true;
        }
        return false;
    }
    
    /**
     * Verifica se il serpente ha urtato una parete
     *
     * @function hitWall
     * @return {Boolean}
     */
    function hitWall() {
        for (var i = 0; i < perimeter.numChildren; i++) {
            if (player.hitHead(perimeter.getChildAt(i))) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Inizializza tutte le variabili e attiva il Ticker
     *
     * @function init
     */
    function init() {
        stage = new createjs.Stage("snakeGameCanvas");
        player = new snakegame.Player(5, 'E', 1, 1);
        cherry = new snakegame.Cherry();
        randomPlace(cherry);
        
        createGameField();
        stage.addChild(player);
        stage.addChild(cherry);
        
        player.addEventListener('hit his own tail', function() {
            gameOver();
        })
        
        createjs.Ticker.framerate = 12;
        createjs.Ticker.addEventListener("tick", function (event) {
            if (!event.paused) {
                player.enterFrame();
                if (hitWall()) {
                    createjs.Ticker.paused = true;
                    gameOver();
                }
                if (hitCherry()) {
                    player.length++;
                    score += 10;
                    createjs.Ticker.framerate = 12 + Math.floor(score / 50);
                    randomPlace(cherry);
                }
            }
            scoreText.text = score;
            stage.update();
        });
    
        /**
         * Cambia la direzione del serpente in funzione del tasto premuto
         *
         * @function keyPressed
         */
        function keyPressed(event) {
            var direction = 'E',
                captured = false;
            switch (event.keyCode) {
                case 40:
                    direction = 'S';
                    captured = true; /// Evita lo scroll down
                    break;
                case 83:
                    direction = 'S';
                    break;
                case 38:
                    direction = 'N';
                    captured = true; /// Evita lo scroll up
                    break;
                case 87:
                    direction = 'N';
                    break;
                case 39:
                case 68:
                    direction = 'E';
                    break;
                case 37:
                case 65:
                    direction = 'W';
                    break;
                case 80:
                    startGame();
                    break;
            }
            if (captured) {
                event.preventDefault();
            }
            player.changeDirection(direction);
        }
        window.parent.addEventListener('keydown', keyPressed);
        gameOver();
    }
    
    /**
     * Posiziona randomicamente un Elemento
     *
     * @function randomPlace
     * @param {DisplayObject} element
     */
    function randomPlace(element) {
        var rX = Math.floor(Math.random() * (gameWidth - 2)) + 1,
            rY = Math.floor(Math.random() * (gameHeight - 2)) + 1;
        
        element.x = rX * element.width;
        element.y = rY * element.height;
        if (player.hitTail(element)) {
            randomPlace(element)
        }
    }
    
    /**
     * Re-inizializza tutte le variabili e fa ripartire il Ticker
     *
     * @function startGame
     */
    function startGame() {
        score = 0;
        createjs.Ticker.paused = false;
        createjs.Ticker.framerate = 12;
        player.reset();
    }
    
    window.onload = init;
}());
