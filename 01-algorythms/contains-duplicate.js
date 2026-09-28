// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

// Example 1:

// Input: nums = [1,2,3,1]

// Output: true

// Explanation:

// The element 1 occurs at the indices 0 and 3.
function containsDuplicate(nums) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (map.has(current)) {
      return true;
    }
    map.set(current, i);
  }

  return false;
}
const nums = [1, 2, 3, 4];
console.log(containsDuplicate(nums));
