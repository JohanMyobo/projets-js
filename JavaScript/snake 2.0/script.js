window.onload = function () {
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;
    var score;
    var timeout;

    init();

    function init() {
        var container = document.createElement("div");
        container.style.textAlign = "center";
        document.body.appendChild(container);

        var canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "5px solid #333";
        canvas.style.backgroundColor = "#222";
        canvas.style.display = "block";
        canvas.style.margin = "auto";
        document.body.appendChild(canvas);
        
        ctx = canvas.getContext("2d");

        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0;
        refreshCanvas();
    }

    function refreshCanvas() {
        snakee.advance();
        if (snakee.checkCollision()) {
            gameOver();
        } else {
            if (snakee.isEatingApple(applee)) {
                score++;
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                } while (applee.isOnSnake(snakee));
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawScore();
            snakee.draw();
            applee.draw();
            timeout = setTimeout(refreshCanvas, delay);
        }
    }

    function gameOver() {
        ctx.save();
        ctx.font = "bold 60px sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2 - 40);

        var restartButton = document.createElement("button");
        restartButton.innerText = "Rejouer";
        restartButton.style.padding = "10px 20px";
        restartButton.style.fontSize = "18px";
        restartButton.style.border = "none";
        restartButton.style.backgroundColor = "#ff4747";
        restartButton.style.color = "white";
        restartButton.style.cursor = "pointer";
        restartButton.style.position = "absolute";
        restartButton.style.left = "50%";
        restartButton.style.top = "calc(50% + 40px)";
        restartButton.style.transform = "translateX(-50%)";
        restartButton.onclick = function () {
            document.body.removeChild(restartButton);
            restart();
        };
        document.body.appendChild(restartButton);
        ctx.restore();
    }

    function restart() {
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0;
        clearTimeout(timeout);
        refreshCanvas();
    }

    function drawScore() {
        ctx.save();
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "right";
        ctx.fillText("Score: " + score, canvasWidth - 20, 30);
        ctx.restore();
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillStyle = "limegreen";
        ctx.fillRect(x, y, blockSize - 2, blockSize - 2);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "limegreen";
            this.body.forEach(part => drawBlock(ctx, part));
            ctx.restore();
        };
        
        this.advance = function () {
            var nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left": nextPosition[0] -= 1; break;
                case "right": nextPosition[0] += 1; break;
                case "down": nextPosition[1] += 1; break;
                case "up": nextPosition[1] -= 1; break;
            }
            this.body.unshift(nextPosition);
            if (!this.ateApple) this.body.pop();
            else this.ateApple = false;
        };

        this.setDirection = function (newDirection) {
            var allowedDirections = this.direction === "left" || this.direction === "right" ? ["up", "down"] : ["left", "right"];
            if (allowedDirections.includes(newDirection)) this.direction = newDirection;
        };

        this.checkCollision = function () {
            var [snakeX, snakeY] = this.body[0];
            var wallCollision = snakeX < 0 || snakeX >= widthInBlocks || snakeY < 0 || snakeY >= heightInBlocks;
            var snakeCollision = this.body.slice(1).some(block => block[0] === snakeX && block[1] === snakeY);
            return wallCollision || snakeCollision;
        };

        this.isEatingApple = function (apple) {
            return this.body[0][0] === apple.position[0] && this.body[0][1] === apple.position[1];
        };
    }

    function Apple(position) {
        this.position = position;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "red";
            ctx.beginPath();
            var radius = blockSize / 2;
            ctx.arc(this.position[0] * blockSize + radius, this.position[1] * blockSize + radius, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function () {
            this.position = [Math.floor(Math.random() * widthInBlocks), Math.floor(Math.random() * heightInBlocks)];
        };

        this.isOnSnake = function (snake) {
            return snake.body.some(part => part[0] === this.position[0] && part[1] === this.position[1]);
        };
    }

    document.onkeydown = function (e) {
        var directions = { 37: "left", 38: "up", 39: "right", 40: "down", 32: restart };
        if (directions[e.keyCode]) typeof directions[e.keyCode] === "function" ? directions[e.keyCode]() : snakee.setDirection(directions[e.keyCode]);
    };
};
