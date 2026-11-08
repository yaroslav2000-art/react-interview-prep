Core Algorithm Patterns

1. Hash Map / Frequency Counting
   Main Explanation: You trade a little bit of memory (O(n) space) for a massive speed boost (O(n) time). You use a Map or Set to remember what you've seen so far, allowing you to look up values instantly instead of using nested loops.
   How to recognize it (Trigger words):

"Find a pair that equals..."

"Contains duplicates?"

"Have I seen this element before?"

"Compare frequencies/occurrences of characters."

Your files: two-sum.js, contains-duplicate.js, anagram.js

2. Two Pointers (Opposite Ends / Converging)
   Main Explanation: You place one pointer at the start (left = 0) and one at the end (right = length - 1). You move them toward each other based on a condition until they meet. It is usually O(1) space.
   How to recognize it (Trigger words):

The array is Sorted. (This is the biggest clue).

Checking symmetry.

Reversing data in-place.

"Find two numbers that add up to X (in a sorted array)."

Your files: valid-palindrome.js, reverse-string.js, two-sum.js (the sorted variant).

3. Two Pointers (Same Direction / Fast & Slow)
   Main Explanation: Also known as the "Snowplow" method. Both pointers start at the beginning. The fast pointer scans ahead, while the slow pointer keeps track of where to place the next valid element. You usually swap or overwrite elements.
   How to recognize it (Trigger words):

"Do this in-place."

"Move all [elements] to the front/back."

"Remove duplicates from a sorted array."

Your files: move-zeroes.js

4. Sliding Window
   Main Explanation: You maintain a "window" (a subarray or substring) and slide it across the data. You update the state (sum, length, frequency) incrementally rather than recalculating from scratch.
   How to recognize it (Trigger words):

"Contiguous subarray" or "Substring".

"Longest", "Shortest", "Maximum", or "Minimum" sequence.

The problem gives you a specific size k.

Your files: max-average-subarr.js (Fixed Window), longest-common-prefix.js (Horizontal Scanning).

5. Running Min/Max (Greedy)
   Main Explanation: You make the best choice at the current moment without worrying about the future. You track the "best so far" (like the lowest price) in a single pass.
   How to recognize it (Trigger words):

"Max profit" / "Best time to buy and sell."

Finding the highest/lowest point in a sequence where order matters.

Your files: best-time-to-buy-and-sell.js

6. Linked List Traversal (Dummy Node)
   Main Explanation: Linked Lists don't have indices, only .val and .next. You use a fake dummy node to easily hold the start of the new list, and a current pointer to build the new chain by moving pointers around.
   How to recognize it (Trigger words):

The problem mentions "Given the head of a linked list..."

Merging, sorting, or deleting nodes in a chain.

Your files: merge-2-sorted-lists.js

(Note: closure.js and map.js are JavaScript language fundamentals, not algorithmic patterns. They belong in your React/JS notes!)

How to use this daily:
When you read a new LeetCode problem, don't start typing. Read the prompt, look for the trigger words, and say out loud: "Ah, it says 'contiguous subarray', this is a Sliding Window problem." Recognizing the pattern before you code is 80% of passing the interview.

01.11:

## Pattern: Boyer-Moore Voting Algorithm (Majority Element)

**Main Explanation:** You find the majority element (appearing more than n/2 times) by treating elements as voters. If you see the candidate, you add a vote (count++). If you see someone else, you cancel a vote (count--). If count hits 0, you pick a new candidate. The majority element will always survive the cancellations.
**Time:** O(n) - Single pass.
**Space:** O(1) - Only two variables (candidate, count).
**How to recognize it (Trigger words):**

- "Find the element that appears more than n/2 times."
- "Find the majority element."
- "Find the element that appears more than n/3 times." (Requires a slight variation with two candidates).

## Pattern: Prefix / Suffix (Running Products)

**Main Explanation:** To find the product of everything except self, use two passes. Keep a running variable for the left product and another for the right product. At each step, multiply the two running variables. Do not use division (it breaks on zeroes).
**Time:** O(n) - Two passes.
**Space:** O(1) - Not counting the output array.
**Gotcha:** Using `.slice()` and `.reduce()` inside a `for` loop makes it O(n²). Always use a running variable instead.

## Pattern: Stack (Matching Pairs / Balanced Brackets)

**Main Explanation:** Use a Stack (LIFO - Last In, First Out) to keep track of the most recently seen "opening" elements. When you encounter a "closing" element, pop the top of the stack and check if it matches. If they don't match, the string is invalid.
**Time:** O(n) - We iterate through the string once.
**Space:** O(n) - In the worst case (e.g., "((((("), the stack holds all elements.

**How to recognize it (Trigger words):**

- "Valid parentheses/brackets."
- "Matching pairs."
- "Nested structures." (Like HTML tags `<div><span></span></div>`).

**The Algorithm (Step-by-Step):**

1. Create an empty `stack = []`.
2. Create a Hash Map (dictionary) for matching pairs: `{ ")": "(", "]": "[", "}": "{" }`.
3. Loop through each character in the string:
   - If it's an **opening** bracket (`(`, `[`, `{`), push it to the stack.
   - If it's a **closing** bracket (`)`, `]`, `}`):
     - Pop the top element from the stack.
     - Check if the popped element matches the current closing bracket (using the dictionary). If not, return `false`.
4. After the loop, if the stack is **empty**, return `true`. If it's not empty (e.g., leftover opening brackets), return `false`.

**Code Template:**

```javascript
const isValid = (str) => {
  const stack = [];
  const matching = { ")": "(", "]": "[", "}": "{" };

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else {
      const topStack = stack.pop();
      // Gotcha: Look up the matching bracket for the CURRENT char, not the popped char!
      if (topStack !== matching[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
```

## Pattern: Two Stacks (Tracking Minimums)

**Main Explanation:** When you need O(1) access to both the most recent element AND the minimum element, use two stacks. One stack holds the actual data, and the "Min Stack" holds a history of the minimums.
**Time:** O(1) for all operations.
**Space:** O(n) for the extra Min Stack.
**Trigger Words:**

- "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time."
- "Keep track of the min/max while pushing and popping."

**Gotchas:**

- In `push()`, use `<=` instead of `<` when comparing to the Min Stack. This ensures that if you push duplicate minimums (e.g., `push(5)`, `push(5)`), they both get tracked.
- In `pop()`, you must check if the value leaving the main stack matches the top of the Min Stack. If it does, pop the Min Stack too.
