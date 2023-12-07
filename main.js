const fs = require('fs');
let total = 0;

function doublePoints(counter) {
  total += counter * 2;
}

try {
  const data = fs.readFileSync('strings.txt', 'utf8');
  const parsedData = data.split('\r\n');
  const cardRemovedFromData = parsedData.map((card) => {
    const colon = card.indexOf(':');
    const result = card
      .substring(colon + 1)
      .trim()
      .replace(/\s{2,}/g, ' ')
      .trim();
    return result;
  });

  for (let card = 0; card < cardRemovedFromData.length - 1; card++) {
    const bothNumberSets = cardRemovedFromData[card].split(' | ');
    const winningNumbers = bothNumberSets[0];
    const numbersToMatch = bothNumberSets[1];
    console.log(`Winning Numbers: ${winningNumbers}`);
    console.log(`Numbers to Match: ${numbersToMatch}\n\n`);

    let winningCounter = 1;
    for (let winningNumber = 0; winningNumber < winningNumbers.length; winningNumber++) {
      for (let numberToMatch = 0; numberToMatch < numbersToMatch.length; numberToMatch++) {
        if (winningNumbers[winningNumber] === numbersToMatch[numberToMatch]) {
          doublePoints(winningCounter);
        }
      }
    }

    console.log(`Total for Card ${card + 1}: ${total}`);
  }

  console.log(`Cumulative Total: ${total}`);
} catch (error) {
  console.error(error);
}
