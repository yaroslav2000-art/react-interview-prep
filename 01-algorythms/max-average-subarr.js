// You have a list of numbers. You are given a fixed number k.

// Your job is to find a block of exactly k numbers that
// are right next to each other (this is what "contiguous subarray" means),
// calculate the average of that block, and then find the highest possible
// average among all the blocks.
const lengthOfLongestSubstring = (str) => {
  //general pattern
  let left = 0;
  let maxLength = 0;
  const charSet = new Set();

  for (let right = 0; right < str.length; right++) {
    const current = str[right];
    while (charSet.has(current)) {
      charSet.delete(str[left]);
      left++;
    }

    charSet.add(current);
    maxLength = Math.max(maxLength, charSet.size);
  }
  return maxLength;
};
const str = "abcabcbb";
//console.log(lengthOfLongestSubstring(str));
// const findMaxAverage = (nums, k) => {

//   if (nums.length < k) return;
//   const arrOfAverages = [];
//   for (let i = 0; i < nums.length; i++) {
//     const subArr = nums.slice(i, i + k);
//     if (subArr.length === k) {
//       const average = subArr.reduce((acc, cur) => acc + cur, 0) / k;
//       arrOfAverages.push(average);
//     }
//   }
//   return Math.max(...arrOfAverages);
// };

// const findMaxAverage = (nums, k) => {
//   let left = 0;
//   let maxAverage = 0;
//   const numMap = new Map();

//   for (let right = 0; right < nums.length; right++) {
//     current = nums[right];
//     while (right - left + 1 > k) {
//       numMap.delete(current);
//       left++;
//     }
//     numMap.set(nums[right], right);
//     maxAverage = Math.max(
//       maxAverage,
//       Array.from(numMap.keys()).reduce((acc, curr) => acc + curr, 0) / k,
//     );
//   }
//   return maxAverage;
// };

const findMaxAverage = (nums, k) => {
  let left = 0;
  let currentSum = 0;
  let maxSum = -Infinity;

  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];

    if (right - left + 1 > k) {
      currentSum -= nums[left]; //subtract  left element
      left++;
    }

    if (right - left + 1 === k) {
      maxSum = Math.max(maxSum, currentSum);
    }
  }
  return maxSum / k;
};
const nums = [1, 12, -5, -6, 50, 3];
const k = 4;

console.log(findMaxAverage(nums, k));
