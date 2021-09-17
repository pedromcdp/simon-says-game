var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(".btn").click(function(e){
    if(started){
        var userChosenColour = e.currentTarget.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
});

$("body").keypress(function() {
    if (!started){
        started = true;
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level " + level);
    level++;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press any key to restart!");
        reset();
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
    }
}

function playSound(name){
    new Audio("./sounds/" + name + ".mp3").play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function reset() {
    level = 0;
    gamePattern = [];
    started = false;
}