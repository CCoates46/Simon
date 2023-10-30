let gamePattern = []
let userClickedPattern = []
const buttonColours = ['red', 'blue', 'green', 'yellow']
let started = false
let level = 0
let incorrectGuess = 'wrong'

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed")
    setTimeout(function() {
        $(`#${currentColour}`).removeClass("pressed")
    }, 200)
}


function nextSequence() {
    userClickedPattern = []
    
    level++
    $("#level-title").text('Level ' + level)

    let randomNumber = Math.floor(Math.random() * 4)

    let randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    console.log('GamePattern:::', gamePattern)

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeIn(100)
    
    playSound(randomChosenColour)
    
}

function checkAnswer(currentLevel) {
    
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log('Success')
           
            if(userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence()
                }, 1000);
                }
        } else {
            console.log('Wrong')

            playSound(incorrectGuess)

            $('body').addClass("game-over")
            setTimeout(function() {
                $("body").removeClass("game-over")
            }, 200)

            $("#level-title").text('Game Over, Press Any Key to Restart')

            startOver()
    }   
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}

$(document).keydown(function(event) {
   if(!started) {
    $("#level-title").text('Level ' + level)
    nextSequence()
    started = true
   }
})

$('.btn').click(function() {
    let userChosenColour = $(this).attr("id")

    userClickedPattern.push(userChosenColour)

    console.log('User Pattern::', userClickedPattern)

    playSound(userChosenColour)

    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1)
    
})
