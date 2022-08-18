 
 /*
 * HTML 5 Snake Game
 * http://www.kurtulusulker.com.tr
 * Copyright (C) 2013 by Kurtulus Ulker , kurtulus.ulker@gmail.com
 * Licensed under the MIT or GPL Version 2 licenses.
 */

var ctx;

var step=10;
var backW=300;
var backH=300;
var direction=2;
var x=10;var y=10;
var x2=10;var y2=10;
var leavetrace= new Array(parseInt(backW/step)*parseInt(backH/step));
var leavetraceCordinat= new Array(parseInt(backW/step));
var iz=0;
var track2=0; 
var  wait=200;  // Wait value and speed are inversely proportional. So we can speed up the snake from here.
var Int1,Int2;
var lineW=step;
var foodX,foodY;
var cornerRadius = 20;
var snakeColor="lime";
var backColor="black";
var foodColor="red";
function setBackground() {
        ctx.strokeStyle = snakeColor ;
        ctx.fillStyle = backColor; 
        ctx.lineWidth = lineW;
        ctx.lineJoin = "round";
        ctx.fillRect(0, 0, backW, backH);
        ctx.moveTo(x, 0);
    }

    function start(isPause) {
        if (!isPause) {
            x = 10;
            y = 10;
            x2 = 10;
            y2 = 10;
            leavetrace = new Array(parseInt(backW / step) * parseInt(backH / step));
            leavetraceCordinat = new Array(parseInt(backW / step));
            iz = 0;
            track2 = 0;
            yon = 2;

            move();
            addFood();
            Int1 = setInterval(move, wait);
            setTimeout("Int2=setInterval(followUp,wait)", 3000);
        } else {
            Int1 = setInterval(move, wait);
            Int2 = setInterval(izsur, wait);
        }

        if (document.getElementById("BtnStop"))
            document.getElementById("BtnStop").disabled = false;
        document.body.focus();
    }
    function stop() {
        clearInterval(Int1);
        clearInterval(Int2);
        if (document.getElementById("Btnplay"))
            document.getElementById("Btnplay").disabled = false;

    }

    function init() {
        var domZem = (document.getElementById("Zemin")) ? document.getElementById("Zemin") : 0;
        if (!domZem)
            return false;
        domZem.innerHTML = '<canvas id="canvas" width="' + backW + '" height="' + backH + '"></canvas>';

        var canvs = document.getElementById('canvas');
        ctx = canvs.getContext('2d');
        canvs.addEventListener("keydown", captureKeys, true);
        canvs.addEventListener("keypress", captureKeys, true);
        console.log("canvas", canvs);
        setBackground();
        start();
    }

    function addFood() {

        foodX = Math.ceil(backW * Math.random());
        foodY = Math.ceil(backH * Math.random());
        foodX = foodX - (foodX % step);
        foodY = foodY - (foodY % step); // We round the bait coordinates according to the snake's steps.

        if (foodX > (step * 2))
            foodX = foodX - step; // Don't let the food match the exact limits.
        if (foodY > (step * 2))
            foodY = foodY - step;



        if (typeof leavetraceCordinat[parseInt(foodX / step)] !== "undefined")
        {
            if (typeof leavetraceCordinat[parseInt(foodX / step)][parseInt(foodY / step)] !== "undefined" && leavetraceCordinat[parseInt(foodX / step)][parseInt(foodY / step)] !== 0)
            {
                addlog("!");//The food came on it, try again.
                addFood();
            }
        }
        ctx.fillStyle = foodColor;
        ctx.fillRect(foodX, foodY, lineW, lineW);

    }

    function captureKeys(e) {
        var kcode = e.keyCode;
        console.log(kcode);
        switch (kcode) {
            case 38 :
                direction = 3;
                break; //up
            case 37 :
                direction = 1;
                break; //left
            case 39 :
                direction = 2;
                break; //right
            case 40 :
                direction = 4;
                break; //down

        }
        return false;

    }
    function followUp() {
        switch (leavetrace[track2]) {
            case 2:
                x2 = x2 + step;
                break;
            case 1:
                x2 = x2 - step;
                break;
            case 4:
                y2 = y2 + step;
                break;
            case 3:
                y2 = y2 - step;
                break;
            case 5:
                return true;
                break;
            default:
                return true;
                break;
        }


        ctx.fillStyle = backColor;
        ctx.fillRect(x2, y2, lineW, lineW);
        leavetrace[track2] = 0;
        leavetraceCordinat[parseInt(x2 / step)][parseInt(y2 / step)] = 0;
        track2++;
    }

    function upToHere(IsGameOver) {
        if (IsGameOver)
            alert("Game Over");
        clearInterval(Int1);
        clearInterval(Int2);
        setBackground();

    }

    function whereGoing(cx, cy) {
        if (typeof leavetraceCordinat[parseInt(cx / step)][parseInt(cy / step)] !== "undefined" && leavetraceCordinat[parseInt(cx / step)][parseInt(cy / step)] !== 0)
        {
            upToHere(true);//kendi üzerine geldi
            addlog('!')
        }



        if (cx < 1 || cx + lineW > backW)
            upToHere(true);
        if (cy < 1 || cy + lineW > backH)
            upToHere(true);

        if (cx == foodX && cy == foodY)
        {
            //tam isabet
            addFood();
            clearInterval(Int2); // Let's look extend.
            setTimeout("Int2=setInterval(followUp,wait)", 800);
        }

    }
    function move() {
        ctx.save();
        ctx.fillStyle = snakeColor;
        switch (direction) {
            case 2:
                x = x + step;
                break;
            case 1:
                x = x - step;
                break;
            case 4:
                y = y + step;
                break;
            case 3:
                y = y - step;
                break;

        }
        if (typeof leavetraceCordinat[parseInt(x / step)] === "undefined")
            leavetraceCordinat[parseInt(x / step)] = new Array(parseInt(backH / step));

        whereGoing(x, y);
        leavetrace[iz] = direction;


        leavetraceCordinat[parseInt(x / step)][parseInt(y / step)] = 1;
        ctx.fillRect(x, y, lineW, lineW);
        iz++;

    }

    function addlog(str) {
        console.log(str);
    }