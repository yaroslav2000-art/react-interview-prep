// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Note that you must do this in-place without making a copy of the array.

const moveZeroes = (nums) => {
  let slow = 0;

  //fast pointer scans every item in the array
  for (let fast = 0; fast < nums.length; fast++) {
    //if fast pointer finds non-zero number
    if (nums[fast] !== 0) {
      //1. Swap the items at slow and fast
      const temp = nums[slow]; //0 - in order to remember
      nums[slow] = nums[fast]; //1
      nums[fast] = temp; //0

      slow++;
    }
  }
};

console.log(moveZeroes([0, 1, 0, 3, 12]));
