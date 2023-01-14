var buttonColors = ["red", "blue", "green", "yellow"];

// The pattern produced by the computer randomly.

var gamePattern = [];

// The pattern entered by the user by clicking on the appropriate buttons.

var userClickedPattern = [];
var currentLevel = 0;
var started = false;



// function to check whether the gamePattern matches with userClickedPattern
function checkAnswer() {

  console.log("Success");

  var flag = true;

  for (var index = 0; index < userClickedPattern.length; index++) {
    if (userClickedPattern[index] !== gamePattern[index]) {
      flag = false;
      break;
    }
  }

  if (flag) {

    if (userClickedPattern.length === gamePattern.length) {

      userClickedPattern = [];

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    $("body").addClass("game-over");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    setTimeout(() => {
      $("body").removeClass("game-over");
      audio.pause();
    }, 500);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document).on("keydown", startOver);

  }

}

// To restart the Game from scratch
function startOver() {
  currentLevel = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  startGame();
}


// To generate the next Level obstacles and all.
function nextSequence() {

  currentLevel++;

  $("#level-title").text("Level " + currentLevel);

  // To generate a random number among 4 given colours
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // To add the blink animation for each buttons
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  // To add corresponding sounds for each buttons
  playSound(randomChosenColor);

}

// Check when any of the 4 given buttons are clicked.
$(".btn").on("click", function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound($(this).attr("id"));
  animatePress($(this).attr("id"));
  checkAnswer();
});

// play corresponding sound when an user clicked on a button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// give the currently active/clicked button a special effect for 100ms.
function animatePress(currenColor) {
  $("#" + currenColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currenColor).removeClass("pressed");
  }, 100);
}

// According to new chrome policy we need to interact with the DOM , to play the audio .

$(document).keydown(startGame);

function startGame() {
  if (!started) {
    $("#level-title").text("Level " + currentLevel);
    nextSequence();
    started = true;
  }
}
