/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1, max = 10, 
winningNum = getRandomNum(min, max),
guessesLeft = 3; 

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
      window.location.reload(); 
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate
    if( isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won 
    if(guess === winningNum){
        // // Game over - won
        gameOver(true, `${winningNum} is correct, You win!`);
    } else{
        guessesLeft -= 1;
        if(guessesLeft === 0){
            // Game over - lost
            gameOver(false, `Game over, you lost!. The correct number is ${winningNum}`);
        } else{
            // Game continues - answer wrong
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }
    }
});


function gameOver(won, msg){

    let color = won === true ? 'green' : 'red';
    // Game over - won
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);
    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// get Winning Number
function getRandomNum(min, max){
    let num =(Math.floor(Math.random()*(max-min+1)+min));
    console.log(num);
    return num;
}
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}