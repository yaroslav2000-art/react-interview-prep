//space complexity: 0(1) => do not create new array
function reverseString(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  return arr;
}

console.log(reverseString(["y", "a", "r", "i", "k"]));
