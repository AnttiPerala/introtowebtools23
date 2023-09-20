//create some variable references to the important elements on the page:
const playerHand = document.getElementById('playerHand');
const computerHand = document.getElementById('computerHand');
const resultInfo = document.getElementById('result');

function game(playerChoice){

    const randomResult = Math.random();
    const flooredResult = Math.floor(randomResult * 3);

    playerHand.classList.add('shakeIt');
    computerHand.classList.add('shakeIt');
    const computerChoiceArray = ['rock', 'paper', 'scissors'];
    const selectedComputerHand = computerChoiceArray[flooredResult];
    
    computerHand.addEventListener('animationend', function reveal(){
        
        playerHand.src = playerChoice + '.png';
            computerHand.src = selectedComputerHand + '.png';

            if (playerChoice == selectedComputerHand){
                resultInfo.textContent = 'This round was a draw'; 
            } else if (
            (playerChoice == 'rock' && selectedComputerHand == 'scissors') ||
            (playerChoice == 'scissors' && selectedComputerHand == 'paper') ||
            (playerChoice == 'paper' && selectedComputerHand == 'rock')
            ){
                resultInfo.textContent = 'You win!'; 
            } else {
                resultInfo.textContent = 'Computer wins!'; 
            }

    })


    
   
   
}