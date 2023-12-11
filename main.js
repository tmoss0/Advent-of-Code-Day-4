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
  const lengthOfCardRemovedFromData = cardRemovedFromData.length;
  const copiesOfCards = {};
  for (let card = 0; card < lengthOfCardRemovedFromData; card++) {
    copiesOfCards[card + 1] = 0;
  }

  // Iterate through each card
  for (let card = 0; card < lengthOfCardRemovedFromData; card++) {
    const currentCard = card + 1;
    let numberOfMatches = 0;
    const [winningNumbers, numbersToMatch] = cardRemovedFromData[card];
    console.log(`\nCard Number ${currentCard}\n`);
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
    console.log(`Number of Matches: ${numberOfMatches}`);

    // Update the copiesOfCards object with the count of copies for the current card
    copiesOfCards[currentCard] += numberOfMatches;

    if(currentCard === 211) {
      console.log('Hello');
    }

    if (numberOfMatches > 0) {
      const endOfCopies =
      currentCard + numberOfMatches < lengthOfCardRemovedFromData ? currentCard + numberOfMatches : lengthOfCardRemovedFromData;
      for (let copyCard = currentCard + 1; copyCard <= endOfCopies; copyCard++) {
        copiesOfCards[copyCard]++;
      }
    }
  }

  console.log('\nNumber of Copies for Each Card:', copiesOfCards);

  // Calculate the total number of scratchcards
  const totalScratchcards = Object.values(copiesOfCards).reduce((acc, val) => acc + val, 0);
  console.log('Total Scratchcards:', totalScratchcards);
} catch (error) {
  console.error(error);
}
