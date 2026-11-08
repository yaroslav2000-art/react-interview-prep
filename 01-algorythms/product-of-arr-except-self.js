// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.

const productExceptSelf1 = (nums) => {
  let res = [];

  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      res[i] = 1;
    } else {
      const productArrBeforeLast = nums.slice(0, i);
      res[i] = productArrBeforeLast.reduce(
        (accumulator, currentValue) => accumulator * currentValue,
        1,
      );
    }
  }
  for (let i = nums.length; i >= 0; i--) {
    if (i === nums.length - 1) {
      res[i] *= 1;
    } else {
      const productArrAfterFirst = nums.slice(i + 1);
      res[i] *= productArrAfterFirst.reduce((acc, current) => acc * current, 1);
    }
  }
  return res;
};

const productExceptSelf = (nums) => {
  const res = [];

  let leftProduct = 1;

  for (let i = 0; i < nums.length; i++) {
    res[i] = leftProduct;
    leftProduct *= nums[i];
  }

  let rightProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return res;
};

console.log(productExceptSelf([1, 2, 3, 4]));
