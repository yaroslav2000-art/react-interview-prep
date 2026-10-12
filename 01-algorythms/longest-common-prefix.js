//Write a function to find the longest common prefix string amongst an array of strings.

//If there is no common prefix, return an empty string "".

function longestCommonPrefix(arr) {
  if (arr.length === 0) return "";

  let prefix = arr[0];

  for (let i = 1; i < arr.length; i++) {
    while (!arr[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}
