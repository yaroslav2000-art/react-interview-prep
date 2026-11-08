// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Thoughts:
// We keep track of opening bracket and their order:

const isValid = (str) => {
  const stack = [];
  const matchingBrackets = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(" || str[i] === "[" || str[i] === "{") {
      stack.push(str[i]);
    } else {
      const topStack = stack.pop();
      if (topStack !== matchingBrackets[str[i]]) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
console.log(isValid("([])"));
