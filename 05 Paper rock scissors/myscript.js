// Get references to the player's hand, computer's hand, and result elements from the webpage
const playerHand = document.getElementById('playerHand'); // player's hand element
const computerHand = document.getElementById('computerHand'); // computer's hand element
const resultInfo = document.getElementById('result'); // result display element
const scorePlaceholder = document.getElementById('scorePlaceholder');
let computerScore = 0;
let playerScore = 0;

// Define the game function, which takes the player's choice as an argument
function game(playerChoice) {

    // Generate a random number between 0 and 1
    const randomResult = Math.random();

    // Multiply the random number by 3 and round down to get a whole number (0, 1, or 2)
    const flooredResult = Math.floor(randomResult * 3);

    // Add a 'shakeIt' class to both hands (presumably for some CSS animation effect)
    playerHand.classList.add('shakeIt');
    computerHand.classList.add('shakeIt');

    // Temporarily set both hand images to show 'rock'
    playerHand.src = 'rock.png';
    computerHand.src = 'rock.png';

    // Define an array of possible choices for the computer's hand
    const computerChoiceArray = ['rock', 'paper', 'scissors'];

    // Get the computer's choice using the flooredResult as an index
    const selectedComputerHand = computerChoiceArray[flooredResult];

    // Add an event listener to the computerHand to detect when the shaking animation ends
    computerHand.addEventListener('animationend', function reveal() {

        // Once the animation ends, immediately remove this event listener to ensure it's not triggered again
        computerHand.removeEventListener('animationend', reveal)

        // Update the images to reflect the player's choice and the randomly selected computer's choice
        playerHand.src = playerChoice + '.png';
        computerHand.src = selectedComputerHand + '.png';

        // Compare the player's choice and the computer's choice to determine the game result

        // Check if both choices are the same, resulting in a draw
        if (playerChoice == selectedComputerHand) {
            resultInfo.textContent = 'This round was a draw';
        }
        // Check specific combinations where the player wins
        else if (
            (playerChoice == 'rock' && selectedComputerHand == 'scissors') ||
            (playerChoice == 'scissors' && selectedComputerHand == 'paper') ||
            (playerChoice == 'paper' && selectedComputerHand == 'rock')
        ) {
            resultInfo.textContent = 'You win!';
            playerScore++;
        }
        // If neither of the above conditions are met, the computer wins
        else {
            resultInfo.textContent = 'Computer wins!';
            computerScore++;
        }

        // Remove the 'shakeIt' class from both hands, stopping the shaking animation
        playerHand.classList.remove('shakeIt');
        computerHand.classList.remove('shakeIt');

        scorePlaceholder.textContent = 'Player ' + playerScore + ' - ' + computerScore + ' Computer';


    })

}
