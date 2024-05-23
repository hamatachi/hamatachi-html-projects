// parameters + variables
let level = 0;
let generatedSequenceList = [];
let userClickedPattern = [];
let gameStarted = false;

const buttonColors = ["red", "blue", "green", "yellow"];

// generate random sequence //
function generateSequence(level) {
    generatedSequenceList = [];
    for (let i = 0; i < level; i++) {
        const randomIndex = Math.floor(Math.random() * buttonColors.length);
        generatedSequenceList.push(buttonColors[randomIndex]);
    }
}

// cpu output //
function cpuSequence() {
    level++;
    $("h1").text("Level " + level);
    generateSequence(level);
    displaySequence();
}

// display generated sequence //
function displaySequence() {
    for (let i = 0; i < generatedSequenceList.length; i++) {
        setTimeout(function() {
            playSound(generatedSequenceList[i]); // <-- added! play sounds for each color! 
            handleButtonClick(generatedSequenceList[i]);
        }, i * 1000);
    }
}

// button clicks and animations //
function handleButtonClick(buttonColor) {
    $('#' + buttonColor).fadeTo("fast", 0.5, function() {
        $(this).fadeTo("fast", 1);
    });
}

// play color sounds //

function playSound(color) {
    $('#' + color + "Sound")[0].play();
}

// play error sound //

function playErrorSound() {
    $("#errorSound")[0].play();
}

// sound handlers //

$("div[id='red']").click(buttonClickedRed);
$("div[id='blue']").click(buttonClickedBlue);
$("div[id='green']").click(buttonClickedGreen);
$("div[id='yellow']").click(buttonClickedYellow);


// click sound functions //

function buttonClickedRed(){
    playSound('red');
    $("div[id='red']").fadeTo("fast", 0.5, function() {
        $(this).fadeTo("fast", 1);
    });
};

function buttonClickedBlue(){
    playSound('blue');
    $("div[id='blue']").fadeTo("fast", 0.5, function() {
        $(this).fadeTo("fast", 1);
    });
};

function buttonClickedGreen(){
    playSound('green');
    $("div[id='green']").fadeTo("fast", 0.5, function() {
        $(this).fadeTo("fast", 1);
    });
};

function buttonClickedYellow(){
    playSound('yellow');
    $("div[id='yellow']").fadeTo("fast", 0.5, function() {
        $(this).fadeTo("fast", 1);
    });
};


// user input //
$(".btn").click(function() {
    if (gameStarted) {
        const buttonColor = $(this).attr("id");
        const userChosenColor = $(this).attr("id");
        playSound(userChosenColor);  // <--- added //
        userClickedPattern.push(buttonColor);
        handleButtonClick(buttonColor); // <-- switched with above
        checkNextSequence();
    }
});

// check if user sequence matches cpu //
function checkNextSequence() {
    let success = true;
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== generatedSequenceList[i]){
            success = false;
            break;
        }
    }
    if (!success) {
        gameOver();
        playErrorSound(); // <-- add wrong sound
    } else if (userClickedPattern.length === generatedSequenceList.length) {
        userClickedPattern = [];
        setTimeout(cpuSequence, 1000);
    }
}

// game start //
$(document).keydown(function startGameSequence() {
    if (!gameStarted) {
        gameStarted = true;
        $("h1").text("Ready...").hide().fadeIn(1000, function() {
            setTimeout(function() {
                $("h1").text("Steady...").hide().fadeIn(1000, function() {
                    setTimeout(function() {
                        $("h1").text("GO!!!").hide().fadeIn(2000, function() {
                            setTimeout(function() {
                                $("h1").text("Level 1").hide().fadeIn(1000, function() {
                                    cpuSequence();
                                });
                            }, 1000);
                        });
                    }, 1000);
                });
            }, 1000);
        });
    }
});

// game over //

function gameOver() {
    // text //
    $('h1').text("Game Over, press any key to restart");

    // fade //
    $('body').css({'background-color': 'rgba(255, 0, 0, 0.7)' 
    }).fadeIn('slow');

    gameStarted = false;
    level = 0;
    generatedSequenceList = [];
    userClickedPattern = [];
    $(document).one("keydown", function(){
        $('body').css('background-color', '#011F3F');
        startGameSequence();
    });
}


