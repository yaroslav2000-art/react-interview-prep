function maxProfit(prices) {
  let minValue = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    const current = prices[i];

    if (current < minValue) {
      minValue = current;
    } else if (current - minValue > maxProfit) {
      maxProfit = current - minValue;
    }
  }

  return maxProfit;
}

const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices));
