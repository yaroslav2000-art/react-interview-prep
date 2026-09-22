// //two-sum
// 1. Two Sum

// You are given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

// Constraints:

// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// Only one valid answer exists.

// Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

// function twoSum(nums, target) {
//   "use Strict";
//   let res = [];
//   let accumulator = 0;

//   for (let i = 0; i < nums.length; i++) {
//     if (res.length === 2 && accumulator === target) {
//       return res;
//     }
//     if (accumulator === 0) {
//       if (nums[i] <= target) {
//         accumulator += nums[i];
//         res.push(i);
//       }
//     } else if (target - accumulator === nums[i]) {
//       accumulator += nums[i];
//       res.push(i);
//       return res;
//     }
//   }
// }

function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const currentItem = nums[i];
    const x = target - currentItem;

    if (map.has(x)) {
      return [map.get(x), i];
    }

    map.set(currentItem, i);
  }

  return [];
}

const nums = [2, 7, 11, -15];
const target = -13;

console.log(twoSum(nums, target));
