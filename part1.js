const fs = require('fs');
let total = 0;

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

  // Loop over each card, extract the winning numbers and numbers to match
  for (let card = 0; card < cardRemovedFromData.length - 1; card++) {
    console.log(`Card Number ${card}`);
    const [winningNumbers, numbersToMatch] = cardRemovedFromData[card].split(' | ').map((set) => set.split(' '));
    console.log(`Winning Numbers: ${winningNumbers}`);
    console.log(`Numbers to Match: ${numbersToMatch}`);

    let points = 0;
    // Get running total of points from matches
    for (let winningNumber of winningNumbers) {
      for (let numberToMatch of numbersToMatch) {
        if (winningNumber === numberToMatch) {
          points = points === 0 ? 1 : points * 2;
          console.log(`Match: ${winningNumber}`);
          console.log(`Number of Matches: ${points}`);
        }
      }
    }
    total += points;
    console.log(`Total for Card ${card}: ${total}\n\n`);
  }
  console.log(`Cumulative Total: ${total}`);
} catch (error) {
  console.error(error);
}
