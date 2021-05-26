
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function playSound(name) {
  var sound = new Audio( name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(function(event) {

  switch (event.keyCode) {
    case 32:
      if (started == false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
      break;
    case 13:
      if (started == false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
      break;
    case 49:
      // var colorChosen = "green";
      buttonPressed("green");
      break;
    case 50:
      buttonPressed("red");
      break;
    case 51:
      buttonPressed("yellow");
      break;
    case 52:
      buttonPressed("blue");
      break;
    case 17:
      window.location.href = "help.html";
      break;

    default:
      console.log(event.keyCode);

  }

});

function buttonPressed(userChosenColor) {

  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  setTimeout(function() {
    checkAnswer(userClickedPattern.length - 1);
  }, 1000);

}

$(".btn").click(function() {
  buttonPressed($(this).attr("id"))
});
