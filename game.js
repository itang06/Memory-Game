var userClickedPattern = [];
var gamePattern = [];
var count = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var count2 = 0;
var highscore = 0;
var newRecord = false;
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
/* Make a for loop to implement order of flashing every level */
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function() {
            playSound(gamePattern[i]);
            $("." + gamePattern[i]).fadeOut(100).fadeIn(100);
            count2++;
        }, i * 400);
    }
}

$(".btn").on("click", function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
    playSound(userChosenColor);
})

function playSound(ohio) {
    var sound = new Audio("./sounds/" + ohio + ".mp3");
    sound.volume = 0.15;
    sound.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

$(document).on("keydown", function () {
    if (count === 0) {
        count++;
        setTimeout(function () {
            $("h1").text("Level 0");
            nextSequence();
            $("#score").text("Highscore: " + highscore);
        }, 400);
    }
})

function checkAnswer() {
    if (count2 < level) {
        return handleGameOver("Too Early!");
    } 
    
    if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
        return handleGameOver("Game Over,");
    }

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 900);
        userClickedPattern = [];
        count2 = 0;
        checkHighScore();
    };
}

function startOver() {
    count = 0;
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
}

function handleGameOver(cool) {
    $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);

        $("h1").text(cool + " Press Any Key to Restart");
        var sound = new Audio("./sounds/wrong.mp3");
        sound.volume = 0.2;
        sound.play();
        startOver();
        if (newRecord == true) {
            $("#score").text("New Highscore of " + highscore + "!");
        }
        newRecord = false;
}

function checkHighScore() {
    if (highscore < level) {
        highscore = level;
        newRecord = true;
    }
    $("#score").text("Highscore: " + highscore);
}