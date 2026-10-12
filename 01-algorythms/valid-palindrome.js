// function isPalindrome(str) {
//   let strToLower = str.toLowerCase();
//   let newStr = "";
//   for (let i = 0; i < strToLower.length; i++) {
//     const current = strToLower[i];
//     if (!current.match("[^a-zA-Z0-9]")) {
//       newStr += current;
//     }
//   }
//   return newStr === newStr.split("").reverse().join("");
// }

function isAlphaNumeric(c) {
  return /^[a-z0-9]$/i.test(c);
}

function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    while (left < right && !isAlphaNumeric(str[left])) {
      left++;
    }
    while (left < right && !isAlphaNumeric(str[right])) {
      right--;
    }

    if (str[left].toLowerCase() !== str[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));
