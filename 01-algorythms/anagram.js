// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// Example 1:

// Input: s = "anagram", t = "nagaram"

// Output: true

// Example 2:

// Input: s = "rat", t = "car"

// Output: false

//thoughts: we create the count for storing the character and number of its occurences.

function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const count = new Map();

  for (let i = 0; i < s.length; i++) {
    //frequency count
    const current = s[i];
    count.set(current, (count.get(current) || 0) + 1);
  }

  for (let i = 0; i < t.length; i++) {
    const current = t[i];
    if (!count.has(current)) return false;

    count.set(current, count.get(current) - 1);

    if (count.get(current) < 0) return false;
  }

  return true;
}

console.log(isAnagram("margo", "ogrfam"));
