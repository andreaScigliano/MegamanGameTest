const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = canvas.width = screen.width;
const height = canvas.height = 480;
const frameWidth = 60;
const frameHeight = 90;
let xPos = 0;
let xPosRevers = width;
const yPos = 160;
const scale = 1;
const fps = 60;
const secondsToUpdate = .04* fps;
let count = 0;
let countReverse = 0;
canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";
const spriteSheet = new Image();
spriteSheet.src = "./megaMan.png";
const spriteSheetReverse = new Image();
spriteSheetReverse.src = "./megaManReverse.png";

const State = {
    states: {},
    generateState: function(name, startIndex, endIndex) {
    if (!this.states[name]) {
            this.states[name] = {
                frameIndex: startIndex,
                startIndex: startIndex,
                endIndex: endIndex
        };
    }
    },
    getState: function(name) {
        if (this.states[name]) {
            return this.states[name];
        }
    }
};

State.generateState("breath", 0, 4);
State.generateState("angry", 4, 8);
State.generateState("jump", 8, 14);


function animate(state) {
    context.drawImage(
        spriteSheet,
        state.frameIndex * frameWidth,
        0,
        frameWidth,
        frameHeight,
        xPos,
        yPos,
        frameWidth * scale,
        frameHeight * scale
    );

    count ++;
    if (count > secondsToUpdate) {
        state.frameIndex ++;
        count = 0;
        xPos+=7.5;
    }
    if (state.frameIndex > state.endIndex) {
        state.frameIndex = state.startIndex;
        xPos=(xPos>=width)?0:xPos;
    }
}
const StateReverse = {
    states: {},
    generateState: function(name, startIndex, endIndex) {
    if (!this.states[name]) {
            this.states[name] = {
                frameIndex: startIndex,
                startIndex: startIndex,
                endIndex: endIndex
        };
    }
    },
    getState: function(name) {
        if (this.states[name]) {
            return this.states[name];
        }
    }
};

StateReverse.generateState("hello",0,4);

function animateReverse(state) {
    context.drawImage(
        spriteSheetReverse,
        state.frameIndex * frameWidth,
        0,
        frameWidth,
        frameHeight,
        xPosRevers,
        yPos,
        frameWidth * scale,
        frameHeight * scale
    );
    countReverse ++;
    if (countReverse > secondsToUpdate) {
        state.frameIndex ++;
        countReverset = 0;
        xPosRevers-=7.5;
    }
    if (state.frameIndex > state.endIndex) {
        state.frameIndex = state.startIndex;
        xPosRevers=(xPosRevers<=0)?width:xPosRevers;
    }
}

function frame() {
    context.clearRect(0, 0, width, height);
    animate(State.getState("breath")),
    animateReverse(StateReverse.getState("hello"))
    requestAnimationFrame(frame);
}

frame();