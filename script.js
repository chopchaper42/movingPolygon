'use strict'

let polygon = {
    leftUp: {
        x: 100,
        y: 100,
        rX: 0,
        rY: 0,
    },
    leftBottom: {
        x: 100,
        y: 500,
        rX: 0,
        rY: 0,
    },
    rightUp: {
        x: 500,
        y: 100,
        rX: 0,
        rY: 0,
    },
    rightBottom: {
        x: 500,
        y: 500,
        rX: 0,
        rY: 0,
    },
};

const LUp = polygon.leftUp;
const LBot = polygon.leftBottom;
const RUp = polygon.rightUp;
const RBot = polygon.rightBottom;

const doButton = document.querySelector('.change-form-button');
const stopButton = document.querySelector('.stop-button');
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const executingTime = 5000;
const oneInterval = 50;
const intervalRatio = executingTime / oneInterval;

let intervalID;
let count = 1;
let keepTransforming = true;

doButton.addEventListener('click', start);
stopButton.addEventListener('click', () => {
    keepTransforming = false;
    clearInterval(intervalID);
});

function getRandomCoordinate(obj) {
    obj.rX = Math.floor(Math.random() * 1260);
    obj.rY = Math.floor(Math.random() * 700);
}

function movePoint(obj) {
    let dX = obj.rX - obj.x;
    let dY = obj.rY - obj.y;
    const xPerInterval = dX / intervalRatio;
    const yPerInterval = dY / intervalRatio;

    let int = setInterval(() => {

        if (!keepTransforming) return;

        if (count === intervalRatio) {
            obj.x = Math.round(obj.x);
            obj.y = Math.round(obj.y);
            console.log(obj.x);
            console.log(obj.y);
            clearInterval(int);

        } else {
            obj.x += xPerInterval;
            obj.y += yPerInterval;
            count += 0.25;
        }

        redrawPolygon();

    }, oneInterval);

}

function redrawPolygon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(LUp.x, LUp.y);
    ctx.lineTo(LBot.x, LBot.y);
    ctx.lineTo(RBot.x, RBot.y);
    ctx.lineTo(RUp.x, RUp.y);
    ctx.lineTo(LUp.x, LUp.y);
    ctx.stroke();
}

function start() {
    keepTransforming = true;
    if (intervalID) clearInterval(intervalID);
    ignite();
    intervalID = setInterval(() => {
        count = 1;
        for (let polygonKey in polygon) {
            getRandomCoordinate(polygon[polygonKey]);
            movePoint(polygon[polygonKey]);
        }
    }, executingTime + 30);
}

function ignite() {
    count = 1;
    for (let polygonKey in polygon) {
        getRandomCoordinate(polygon[polygonKey]);
        movePoint(polygon[polygonKey]);
    }
}