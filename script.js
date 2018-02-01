let voiceline = document.querySelector(".voiceline");
let character = document.querySelector(".character");

let answering = false;
let current = 0;

document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 65:
        case 37:
            checkAnswer(false);
            break; 
        case 68:
        case 39:
            checkAnswer(true);
            break; 
    }
}); 

document.querySelector("button.enemy").addEventListener("click", function(e) {
    checkAnswer(false);
});
document.querySelector("button.ally").addEventListener("click", function(e) {
    checkAnswer(true);
});

let checkAnswer = function(isAlly) {
    if (answering) {
        return;
    }
    answering = true;

    if (isAlly && voicelines[current].type == "allied") {
        showCorrect();
    } else 
    if (!isAlly && voicelines[current].type == "enemy") {
        showCorrect();
    } else {
        showWrong();
    }

    character.innerHTML = voicelines[current].type + " " + voicelines[current].character;    
    window.setTimeout(function() {
        newLine();
    }, 2000);

    window.setTimeout(function() {
        answering = false;
    }, 2000);
}

let showCorrect = function() {
    var result = document.querySelector(".result");
    var correct = result.querySelector(".correct");
    result.classList.add("active");
    correct.classList.add("active");
}

let showWrong = function() {
    var result = document.querySelector(".result");
    var wrong = result.querySelector(".wrong");
    result.classList.add("active");
    wrong.classList.add("active");
}

let shuffleVoicelines = function() {
    var m = voicelines.length, t, i;
    while (m) {  
      i = Math.floor(Math.random() * m--);  
      t = voicelines[m];
      voicelines[m] = voicelines[i];
      voicelines[i] = t;
    }
}


let newLine = function() {
    var result = document.querySelector(".result");
    var correct = result.querySelector(".correct");
    var wrong = result.querySelector(".wrong");
    result.classList.remove("active");
    correct.classList.remove("active");
    wrong.classList.remove("active");

    current++;
    if (current >= voicelines.length) {
        shuffleVoicelines();
        current = 0;
    }

    var item = voicelines[current];    
    console.log(item);

    character.innerHTML = "???";
    voiceline.innerHTML = item.line;
}

shuffleVoicelines();
newLine();


// --- Swipe detection 
let touchStart = {x:0, y:0};
let touchEnd = {x:0, y:0};

document.body.addEventListener("touchstart", function(event) {
    touchStart.x = event.event.changedTouches[0].screenX;
    touchStart.y = event.event.changedTouches[0].screenY;
}, false);

document.body.addEventListener("touchend", function(event) {
    touchEnd.x = event.event.changedTouches[0].screenX;
    touchEnd.y = event.event.changedTouches[0].screenY;

    // check if the user swiped horizontally
    if (Math.abs(touchEnd.x - touchStart.x) > Math.abs(touchEnd.y - touchStart.y)) {
        // swipe right
        if (touchEnd.x > touchStart.x) {
            checkAnswer(true);
        }

        // swipe left
        if (touchEnd.x < touchStart.x) {
            checkAnswer(false);
        }
    }

}, false); 
