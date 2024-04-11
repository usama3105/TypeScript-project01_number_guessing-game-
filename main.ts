import * as inquirer from 'inquirer';

// Generate a random number between min and max (inclusive)
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function guessNumberGame() {
  console.log("Welcome to Guess the Number Game!");
  console.log("I'm thinking of a number between 1 and 100...");

  const secretNumber = getRandomNumber(1, 100);
  let attempts = 0;

  while (true) {
    const { guess } = await inquirer.prompt({
      type: 'input',
      name: 'guess',
      message: 'Enter your guess:',
      validate: (input: string) => {
        const n = parseInt(input);
        if (isNaN(n) || n < 1 || n > 100) {
          return 'Please enter a valid number between 1 and 100.';
        }
        return true;
      }
    });

    attempts++;

    const guessedNumber = parseInt(guess);
    if (guessedNumber === secretNumber) {
      console.log(`Congratulations! You guessed the number ${secretNumber} correctly in ${attempts} attempts.`);
      break;
    } else if (guessedNumber < secretNumber) {
      console.log("Too low! Try again.");
    } else {
      console.log("Too high! Try again.");
    }
  }
}

// Start the game
guessNumberGame();
