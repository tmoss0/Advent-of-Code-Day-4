const fs = require('fs');

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
    return result.split(' | ').map((set) => set.split(' '));
  });
  const lengthOfCardRemovedFromData = cardRemovedFromData.length - 1;
  console.log(`Length: ${lengthOfCardRemovedFromData}`);
  const copiesOfCards = {};
  for (let card = 1; card < lengthOfCardRemovedFromData + 1; card++) {
    copiesOfCards[card] = 0;
  }

  // Iterate through each card
  for (let card = 1; card < lengthOfCardRemovedFromData; card++) {
    let numberOfMatches = 0;
    const [winningNumbers, numbersToMatch] = cardRemovedFromData[card];
    console.log(`\nCard Number ${card}\n`);
    console.log(`Winning Numbers: ${winningNumbers}`);
    console.log(`Numbers to Match: ${numbersToMatch}`);

    // Count matches
    for (let winningNumber of winningNumbers) {
      for (let numberToMatch of numbersToMatch) {
        if (winningNumber === numberToMatch) {
          console.log(`Match: ${winningNumber}`);
          numberOfMatches++;
        }
      }
    }
    // Update the copiesOfCards object with the count of copies for the current card
    copiesOfCards[card] += numberOfMatches;

    // Iterate through subsequent cards to generate copies
    for (let copyCard = card + 1; copyCard <= card + numberOfMatches; copyCard++) {
      copiesOfCards[copyCard]++;
    }
  }

  console.log('\nNumber of Copies for Each Card:', copiesOfCards);

  // Calculate the total number of scratchcards
  const totalScratchcards = Object.values(copiesOfCards).reduce((acc, val) => acc + val, 0);
  console.log('Total Scratchcards:', totalScratchcards);
} catch (error) {
  console.error(error);
}
