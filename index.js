const colours = ["green", "red", "yellow", "blue"]
let gamePattern = []
let userPattern = []
let started = false
let level = 0
//Starting the game
$(document).keypress(function () {
  if (!started) {
    nextsequence()
    started = true
  }
})
// Clicking listener to verify
$(".btn").click(function () {
  let userChoosenColour = this.id
  userPattern.push(userChoosenColour)
  animatePress(userChoosenColour)
  checkAnswer(userPattern.length - 1)
})
//Random Number generated and added to gamePattern
function nextsequence() {
  userPattern = []
  level++
  $("h1").text("Level " + level)
  let number = Math.floor(Math.random() * 4)
  let choosenColour = colours[number]
  gamePattern.push(choosenColour)
  $("#" + choosenColour)
    .fadeOut(100)
    .fadeIn(100)
}

function checkAnswer(currentValue) {
  if (userPattern[currentValue] === gamePattern[currentValue]) {
    if (userPattern.length === gamePattern.length) {
      playAudio("success")
      setTimeout(function () {
        nextsequence()
      }, 1000)
    }
  } else {
    gameOver()
  }
}
//Game over mesage and resetting the game
function gameOver() {
  $("body").addClass("game-over")
  setTimeout(function () {
    $("body").removeClass("game-over")
  }, 200)
  playAudio("failure")
  $("h1").text("Game Over , Press Any Key to Restart")
  started = false
  level = 0
  gamePattern = []
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed")
  }, 100)
}
function playAudio(status) {
  let audio = new Audio("audio/" + status + ".mp3")
  audio.play()
}
