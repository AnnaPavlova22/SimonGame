let gamePattern = [];
let  userClickedPattern = [];
let gameStarted = false;
let level = 0;
const buttonColors = ["red", "blue", "green", "yellow"];

$('.start-button').click(function(){
  if (!gameStarted){
    $("h1").text("Level:" + level);
    nextSequence();
    gameStarted = true;
  }
});

$('.btn').click(function(){
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over.\n" + "Level:" + level + ". Press Start button to restart");
    console.log("wrong");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  
  $("h1").text("Level:" + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
  .fadeIn(100)
  .fadeOut(100)
  .fadeIn(100);
  playSound(randomChosenColor);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function playSound(colorname){
  let audio = new Audio("sounds/" + colorname + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+ currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+ currentColor).removeClass("pressed");
  },100);
}
