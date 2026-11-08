const majorityElement = (nums) => {
  let candidate = null;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
    }

    if (candidate === nums[i]) {
      count++;
    } else {
      count--;
    }
  }

  return candidate;
};

console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));
